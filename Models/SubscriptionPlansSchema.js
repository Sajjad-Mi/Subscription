
const subsPlanTable = `
    CREATE TABLE if not exists subscription_plan (
        name VARCHAR(255) PRIMARY KEY ,
        duration INTEGER NOT NULL,
        price INTEGER  NOT NULL
    );
`
module.exports = subsPlanTable;
