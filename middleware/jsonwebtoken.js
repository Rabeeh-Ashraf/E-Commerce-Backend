
const jsonwebtoken = require("jsonwebtoken")
function verifyToken (req,res,next){
 const authHeader =  req.header('Authorization') 
 const token = authHeader.split(' ') [1]
 
 jsonwebtoken.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    if(err){
        return res.status(400).json({
            message : "error inverify"
        })
            }
    req.user = decode
    next()
 })
}

module.exports = verifyToken;