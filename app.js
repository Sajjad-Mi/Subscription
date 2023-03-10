const express = require('express');
const app = express();
const connection = require('./db');

const authRoutes = require('./Routes/Auth');
const subscriptionRoutes = require('./Routes/Subscription');
const invoiceRoutes = require('./Routes/Invoice');

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
    console.log(err)
  }
 
}

main();

app.post('/AddSubscriptionPlan', async (req, res) => {
  try {
    await connection.query(`
    INSERT INTO subscription_plan(name, duration, price)
    VALUES ((?), (?), (?));
    `, [req.body.name, req.body.duration, req.body.price]);
    res.json({message: "plan added"});
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post('/AddCredit', checkAuthorization, async (req, res) => {
  try {
    await connection.query(`
      UPDATE users
      SET credit = credit + (?)
      WHERE id = (?)
      `, [req.body.credit, req.id]);
      res.json({message: "credit increased"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use('/api/Auth/', authRoutes);
app.use('/api/Subscription/', checkAuthorization, subscriptionRoutes);
app.use('/api/',checkAuthorization, invoiceRoutes);