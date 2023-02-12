const UserModel = require('../Models/User');

//add user to database then 
//send a jwt to remember user and check user authorization for other request.
module.exports.signup_post = async (req , res) =>{
    try {
        const { username } = req.body;
        const [user] = await UserModel.addUser(username, 100);

        token = UserModel.createToken(user.id, user.username);

        res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ user: username });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err });
    }
}

module.exports.signin_post = async (req , res) =>{
    try {
        const { username } = req.body;
        const [user] = await UserModel.findUserByUsername(username);
        console.log(user)
        token = UserModel.createToken(user.id, user.username);

        res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
        res.status(201).json({ user: username });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ err });
    }
}