const mongoose = require("mongoose")
const wishlistschema = new mongoose.Schema({
userId : {
    type :mongoose.Schema.Types.ObjectId,
    ref : "user"
},
products : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : "products"
}]
})
module.exports = mongoose.model("wishlist",wishlistschema)
