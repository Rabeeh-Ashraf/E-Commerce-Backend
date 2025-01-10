const mongoose = require("mongoose")
// const mongoose = require("mongoose")
const couponschema = mongoose.Schema({
    code : {
        type : String ,
        required : true,
        unique : true,
    },
    expirydate : { 
        type : Date ,  
        required : true ,
    },
    discountpercentage : {
        type : Number,
        reuired :true,
    },
    // productId : {
    //             type : mongoose.Schema.Types.ObjectId,
    //             ref : 'products',
    //             required : true
    //         },


    
})
module.exports = mongoose.model("coupon",couponschema)  