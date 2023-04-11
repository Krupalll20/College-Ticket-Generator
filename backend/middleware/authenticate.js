const jwt =  require("jsonwebtoken");
const User = require("../model/user");

const authenticate = async (req,res,next) =>{

    try {
        
        // console.log('Hello in Auth')
        const authHeader = req.headers.authorization
        // console.log(authHeader)
        const token = authHeader.split(' ')[1]

        if(!authHeader || !token){
            res.json({res:"error",msg:"Please Provide Token"})
        }

        const verifyToken = jwt.verify(token , process.env.SECRET_KEY)

        req.user= {_id:verifyToken._id}

        next(); 

    } catch (error) {
        res.status(401).json({res:"error",msg:"Please Provide Valid Token"})
    }

}

module.exports = authenticate