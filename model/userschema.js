const  mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    link:{type:String},
    resettokenexpire:{type:String},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
        blocked : {
        type  :Boolean,
        default:false
    }
})
module.exports=mongoose.model("user",userschema)