
const subsUserTable = `
    CREATE TABLE if not exists user_subs (
        name VARCHAR(255) NOT NULL,
        userId INTEGER NOT NULL,
        startTime TIMESTAMP  NOT NULL,
        endTime TIMESTAMP  NOT NULL,
        isActive BOOLEAN Not NULL,
        PRIMARY KEY (name, userId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (userId) REFERENCES users(id)
    );
`
module.exports = subsUserTable;
