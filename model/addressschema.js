const mongoose = require("mongoose")
const addressschema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    street : {
        type : String,
        required : true
    },
    city : {
        type : String ,
        required : true
    },
    state : {
        type : String , 
        required : true,
    },
    pin : {
        type : Number,
        required : true
    },
    country : {
        type : String,
        required : true ,
    },
    phonenumber : {
        type :Number,
        
    }

})
module.exports = mongoose.model("address",addressschema)