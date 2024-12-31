const schema = require("../model/productschema")
const allproduct= async(req,res)=>{
    try {
        const products  = await schema.find({})
        if(!products){
            return res.status(404).json({
                message :"does not have any product pls!! try again later "
            })
        }
        res.status(200).json({
            message :" all the products have listed here ",
            products, 
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
module.exports = {allproduct}