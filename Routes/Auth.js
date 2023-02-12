const {Router} = require("express");
const authControllers = require("../Controllers/AuthController");
const router = Router();

router.post("/SignUp", authControllers.signup_post);
router.post("/SignIn", authControllers.signin_post);

module.exports = router;
