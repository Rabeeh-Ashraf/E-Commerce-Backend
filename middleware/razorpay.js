const razorpay = require('razorpay');

var instance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
module.exports = instance