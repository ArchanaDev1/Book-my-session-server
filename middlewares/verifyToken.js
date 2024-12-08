const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "JWT_SECRET", (err, decode) => {
        if(err){
            console.log("I am error");
            res.status(400).json({message: "Invalid token"})
        }
        else{
            req.userInfo = decode;
            console.log(decode);
            next();
        }
    })
}

module.exports = verifyToken;