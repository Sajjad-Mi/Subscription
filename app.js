const express = require('express');
const app = express();
const connection = require('./db');

require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 8080;

const main = async () =>{
 
  app.listen(PORT, () => console.log(`server listening in port ${PORT}`))
}

main();

