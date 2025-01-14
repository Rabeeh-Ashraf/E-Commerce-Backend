const mongoose = require("mongoose")
const orderschema = mongoose.Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  totalprice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now()},
  paymentMethod : {
    type : String,
    enum :['onlinePayment','COD'],
    required : true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  }
}) 
module.exports = mongoose.model("order",orderschema)