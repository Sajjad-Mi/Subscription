const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 8080;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  

app.listen(PORT, () => console.log(`server listening in port ${PORT}`))