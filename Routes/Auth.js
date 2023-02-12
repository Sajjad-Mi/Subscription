const {Router} = require("express");
const authControllers = require("../Controllers/AuthController");
const router = Router();

router.post("/signup", authControllers.signup_post);

module.exports = router;
