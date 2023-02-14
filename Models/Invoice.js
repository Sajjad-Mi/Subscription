const connection = require('../db');
let isCreditSync;

const generateInvoice = async (invoice)=>{
    try {
       
        const firstInvoiceResult = await connection.query(`
            INSERT INTO invoice(name, userId, startSubTime, startTime, endTime)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP(), ADDDATE( CURRENT_TIMESTAMP(), INTERVAL +10 MINUTE))
        `, [invoice.planName,  invoice.userId, invoice.startSubTime]);
        console.log(firstInvoiceResult)
    } catch (error) {
        console.log(error)
    }
   

}

//check every 8s then generate invoice for users that 10min past
//from their last invoice and subscription is active
const generateInvoiceInterval = setInterval(async ()=> {
    try {
        const [invoiceArray] = await connection.query(`
            SELECT invoice.name, invoice.userId, invoice.startSubTime, TIMEDIFF(CURRENT_TIMESTAMP(), max(invoice.endTime))>0 as isDueReached
            FROM invoice inner join user_subs
            WHERE invoice.name=user_subs.name and invoice.userId = user_subs.userId and user_subs.isActive = true
            group by invoice.name, invoice.userId, invoice.startSubTime
        `);
       

        invoiceArray.forEach( async (invoice) => {
            if(invoice.isDueReached ){
                isCreditSync = await syncCredit(invoice.name, invoice.userId)
                if(isCreditSync){
                    generateInvoice({planName: invoice.name, userId: invoice.userId, startSubTime: invoice.startSubTime})
                }
            }
        });
  } catch (error) {
      console.log(error.message);
      
  }
}, 8000); 

//get user credit and subscription price then
//if credit is more then subscription price
//balance user credit
const syncCredit = async (planName, userId) =>{
    try {
        const [priceResult] = await connection.query(`
            SELECT price 
            FROM subscription_plan 
            where name=(?);
        `, [planName]);
        const [creditResult] = await connection.query(`
            SELECT credit 
            FROM users 
            where id=(?);
        `, [userId]);
        let diff = creditResult[0].credit - priceResult[0].price;
        if(diff >= 0){
            const [creditResult] = await connection.query(`
                UPDATE users
                SET credit = (?)
                WHERE id=(?)
            `, [diff, userId]);
            return Promise.resolve(true);
        }else{
            return Promise.resolve(false);
        }
        
    } catch (error) {
        console.log(error);
    }
}


const getAllUserInvoice = async (userId)=>{
    try {
        const [allUserInvoice] = await connection.query(`
            SELECT invoice.name, startSubTime, startTime, endTime, price
            FROM invoice INNER JOIN subscription_plan on invoice.name=subscription_plan.name
            where invoice.userId=(?)
        `, userId);
        const [[total]] = await connection.query(`
            SELECT SUM(price) as total
            FROM invoice INNER JOIN subscription_plan on invoice.name=subscription_plan.name
            where invoice.userId=(?)
        `, userId);
        return {allUserInvoice, total};
    } catch (error) {
        console.log(error);
    }
}

//get user invoice based on date
const getInvoice = async (userId, from, until)=>{
    try {
        const [allUserInvoice] = await connection.query(`
            SELECT invoice.name, startSubTime, startTime, endTime, price
            FROM invoice INNER JOIN subscription_plan on invoice.name=subscription_plan.name
            where startTime BETWEEN (?) AND (?) AND invoice.userId=(?)
        `, [from, until, userId]);
        const [[total]] = await connection.query(`
                SELECT SUM(price) as total
                FROM invoice INNER JOIN subscription_plan on invoice.name=subscription_plan.name
                where startTime BETWEEN (?) AND (?) AND invoice.userId=(?)
            `, [from, until, userId]);
            
        return {allUserInvoice, total};
    } catch (error) {
        console.log(error);
    }
}
module.exports = {generateInvoice, syncCredit, getAllUserInvoice, getInvoice}