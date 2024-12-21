const  mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    link:{type:String},
    resettokenexpire:{type:String}
})
module.exports=mongoose.model("user",userschema)