const connection = require('../db');

//find duration of subsciption Plan then
//calculate start date and end date of user subsciption
const subscribeToPlan = async (subsciption) => {
    try {
        const [duResult] = await connection.query(`
            SELECT duration 
            FROM subscription_plan
            WHERE name = (?);
        `, [subsciption.planName]);

        const [startTimeResult] = await connection.query(`
            SELECT CURRENT_TIMESTAMP() AS startTime`);

        const [endTimeResult] = await connection.query(`
            SELECT  ADDDATE( CURRENT_TIMESTAMP(), INTERVAL +${duResult[0].duration} MONTH) AS endTime;`);

        const subsResult = await connection.query(`
            INSERT INTO user_subs(name, userId, startTime, endTime, isActive)
            VALUES (?, ?, ?, ?, true)
        `, [subsciption.planName, subsciption.userId, startTimeResult[0].startTime, endTimeResult[0].endTime]);

       return Promise.resolve("subsciption added");
    } catch (error) {
        console.log(error.message);
        return Promise.reject(`${error.message}`);
    }
   
   
}

//check if user subscription for a plan is active or inactive then toggle it
const toggleSubscription = async (userId, planName) =>{
    try {
        let [userSubsResult] = await findSubscription(userId, planName)
        let isActive = false;
        let message = 'inactive';
        if(userSubsResult.isActive == false){
            isActive = true;
            message = 'active';
        }

        const [Result] = await connection.query(`
            UPDATE user_subs 
            SET isActive = (?)
            WHERE name = (?) and userId = (?);
        `, [isActive, planName, userId]);

        return Promise.resolve(`subsciption is now ${message}`);
    } catch (error) {
        console.log(error.message);
        return Promise.reject(`${error.message}`);
    }
   
}
const findSubscription = async (userId, planName) =>{
    try {
        const [Result] = await connection.query(`
            SELECT * 
            FROM user_subs
            WHERE name = (?) and userId = (?);
        `, [planName, userId]);
      
        return Promise.resolve(Result);
    } catch (error) {
        console.log(error.message);
        return Promise.reject(`${error.message}`);
    }
   
}

module.exports = {subscribeToPlan, toggleSubscription}