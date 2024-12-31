// const schema = require("../model/wishlistschema")
const addwishlist = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "error in adding wishlist"
        })
    }
}
module.exports = {addwishlist}