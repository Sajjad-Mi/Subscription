const {Router} = require("express");
const authControllers = require("../Controllers/InvoiceController");
const router = Router();

router.get("/invoice", authControllers.invoice_get);

module.exports = router;
