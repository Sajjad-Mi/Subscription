const express = require('express');
const app = express();
const connection = require('./db');

const authRoutes = require('./Routes/Auth');
const subscriptionRoutes = require('./Routes/Subscription')
const userTable = require('./Models/UserSchema');
const subsPlanTable = require('./Models/SubscriptionPlansSchema');
const subsUserTable = require('./Models/UserSubscriptionSchema');
const invoiceTable = require('./Models/InvoiceSchema');

const {checkAuthorization} = require('./middleware/Auth')

const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const main = async () =>{
  try {
    const createUserTable = await connection.query(userTable);
    const createSubsTable = await connection.query(subsPlanTable);
    const createUserSubsTable = await connection.query(subsUserTable);
    const createInvoiceTable = await connection.query(invoiceTable);

    app.listen(PORT, () => console.log(`server listening in port ${PORT}`));
  } catch (err) {
    console.log(err.message)
  }
 
}

main();

app.use(authRoutes);
app.use(checkAuthorization, subscriptionRoutes);