const  mongoose = require("mongoose")
const cartschema = new mongoose.Schema ({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required  : true
    },
    products : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'products',
                required : true
            },
            quantity : {  
                type : Number ,
                required : true, 
                min : 1 ,
                default : 1

            },
            price : {
                type :Number
            },
            netamount : {
                type : Number
            }
            
        }
    ], 
    totalprice : {
        type : Number ,
    }
    

})
module.exports = mongoose.model('cart',cartschema)