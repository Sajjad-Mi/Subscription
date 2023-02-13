
const invoiceTable = `
    CREATE TABLE if not exists invoice (
        name VARCHAR(255) NOT NULL,
        userId INTEGER NOT NULL,
        startTime TIMESTAMP  NOT NULL,
        endTime TIMESTAMP  NOT NULL,
        PRIMARY KEY (name, userId, startTime),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (name) REFERENCES subscription_plan(name)
    );
`
module.exports = invoiceTable;
