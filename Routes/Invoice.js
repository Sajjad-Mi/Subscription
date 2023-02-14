const {Router} = require("express");
const invoiceControllers = require("../Controllers/InvoiceController");
const router = Router();

router.get("/invoice", invoiceControllers.invoice_get);
router.post("/invoice", invoiceControllers.invoice_post);

module.exports = router;
