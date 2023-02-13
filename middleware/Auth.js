const jwt = require('jsonwebtoken');

//check the cookie validation and authorization
const checkAuthorization = (req, res , next)=>{  
    const token = req.cookies.jwt;                                       
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                console.log(err)
                res.status(401).json("you don't have authorization");
            } else{
                req.id = decode.id
                req.username = decode.username
                next();
            }
        })
    } else{
        res.status(401).json("you don't have authorization");
    }
}

module.exports = {checkAuthorization}
