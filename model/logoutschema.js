const mongoose = require("mongoose")
const blacklistschema  = new mongoose.Schema({
    token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})
module.exports  =  mongoose.model("blacklists",blacklistschema)