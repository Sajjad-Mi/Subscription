const InvoiceModel = require('../Models/Invoice');

module.exports.invoice_get = async (req , res) =>{
    try {
        const invoice = await InvoiceModel.getAllUserInvoice(req.id);
        res.json( invoice  );
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}
