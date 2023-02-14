
const subsPlanTable = `
    CREATE TABLE if not exists subscription_plan (
        name VARCHAR(255) PRIMARY KEY ,
        duration INTEGER NOT NULL,
        price DECIMAL(15,2) NOT NULL
    );
`
module.exports = subsPlanTable;
