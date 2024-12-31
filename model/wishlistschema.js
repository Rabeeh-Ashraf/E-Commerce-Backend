const mongoose = require("mongoose")
const wishlistschema = new mongoose.schema({
userid : {
    type :mongoose.Schema.Types.ObjectId,
    ref : "user"
},
products : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : "products"
}]
})
module.exports = mongoose.model("wishlist",wishlistschema)