const mongoose = require("mongoose")
const env = require('dotenv')
env.config()
async function dbconnect() {
    try{
        await mongoose.connect(process.env.Mongoconnectionstring )
        console.log("mongodb connected successfully")
    }catch(err){
        console.log(err,"error")
    }
   
    
}
module.exports=dbconnect