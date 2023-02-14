
const userTable = `
    CREATE TABLE if not exists users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        credit DECIMAL(15,2) NOT NULL
    );
`
module.exports = userTable;
