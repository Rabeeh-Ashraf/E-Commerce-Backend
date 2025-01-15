const logoutschema = require("../model/logoutschema")
const logout  = async (req,res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const blacklisted = await logoutschema.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({
        message: "Token is invalid or expired. Please log in again.",
      });
    }
    next()
}
module.exports = logout