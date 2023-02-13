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


module.exports.invoice_post = async (req , res) =>{
    try {
        const invoice = await InvoiceModel.getInvoice(req.id, req.body.from, req.body.until);
        res.json({ invoice });
    
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}