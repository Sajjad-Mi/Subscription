const connection = require('../db');
let isCreditSync;

const generateInvoice = async (invoice)=>{
    try {
        
        const firstInvoiceResult = await connection.query(`
            INSERT INTO invoice(name, userId, startTime, endTime)
            VALUES (?, ?, CURRENT_TIMESTAMP(), ADDDATE( CURRENT_TIMESTAMP(), INTERVAL +10 MINUTE))
        `, [invoice.planName, invoice.userId]);
        console.log(firstInvoiceResult)
    } catch (error) {
        console.log(error)
    }
   

}
const generateInvoiceInterval = setInterval(async ()=> {
    try {
        const [invoiceArray] = await connection.query(`
            SELECT invoice.name, invoice.userId,TIMEDIFF(CURRENT_TIMESTAMP(), max(invoice.endTime))>0 as isDueReached
            FROM invoice inner join user_subs
            WHERE invoice.name=user_subs.name and invoice.userId = user_subs.userId and user_subs.isActive = true
            group by invoice.name, invoice.userId
        `);
       

        invoiceArray.forEach( async (invoice) => {
            if(invoice.isDueReached ){
                isCreditSync = await syncCredit(invoice.name, invoice.userId)
                if(isCreditSync){
                    generateInvoice({planName: invoice.name, userId: invoice.userId})
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

module.exports = {generateInvoice, syncCredit}