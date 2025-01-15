const cartschema = require("../model/cartschema")
const orderschema  = require("../model/orderschema")




const getorders = async(req,res)=>{
    try {
        const userId = req.user.id
        const getdetails = await cartschema.findOne({userId}).populate({path: 'products.productId'})
        // console.log(getdetails);
        
        if(!getdetails){
            return res.status(404).json({
                message : "user id has not for the user "
            })
        }
        res.status(200).json({
            messaage : "user orders retrieved successfully",
            getdetails ,
        })
    } catch (error) {
        res.status(500).json({
            message : "error in getting orders"
        })
        console.log(error);
        
    }
}
const updateorder = async(req,res)=>{
    try {
        const orderId = req.params.orderId
        const  status  = req.body
        const order =await orderschema.findById(orderId)
        if(!order){
            return res.status(404).json({
                message : " order id not found"
            })
        }
        await orderschema.findByIdAndUpdate(orderId,status)
        return res.status(200).json({
            message : "user order  status updated "
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error"
        })
    }
}

module.exports = {getorders,updateorder}
