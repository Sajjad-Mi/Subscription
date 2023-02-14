
const invoiceTable = `
    CREATE TABLE if not exists invoice (
        name VARCHAR(255) NOT NULL,
        userId INTEGER NOT NULL,
        startSubTime TIMESTAMP NOT NULL,
        startTime TIMESTAMP  NOT NULL,
        endTime TIMESTAMP  NOT NULL,
        PRIMARY KEY (name, userId, startTime),
        FOREIGN KEY (name, userId, startSubTime) REFERENCES user_subs(name, userId, startTime)
    );
`
module.exports = invoiceTable;
