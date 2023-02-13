const {Router} = require("express");
const subscriptionController = require("../Controllers/SubscriptionController");
const router = Router();

router.get("/Subscribe/:name", subscriptionController.subscribe_get);
router.patch("/toggle", subscriptionController.toggle_patch);


module.exports = router;
