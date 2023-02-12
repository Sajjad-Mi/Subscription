const express = require('express');
const app = express();
const connection = require('./db');

const authRoutes = require('./Routes/Auth');
const userTable = require('./Models/UserSchema');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const main = async () =>{
  const createUserTable = await connection.query(userTable)
  app.listen(PORT, () => console.log(`server listening in port ${PORT}`))
}

main();

app.use(authRoutes);