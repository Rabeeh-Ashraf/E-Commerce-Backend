const mongoose = require("mongoose")
const productschema  =  new mongoose.schema({
    name : {type:String,required:true},
    description :{type:String,required:true},
    price:{type:String,required:true},
    category : {type:String,required:true},
    stock :{type:Number,required:true},
    images : {type:Array,required:true}
})
module.exports=mongoose.model("products",productschema)