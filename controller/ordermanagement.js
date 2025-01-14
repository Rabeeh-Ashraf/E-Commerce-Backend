const orderschema = require("../model/orderschema");
// const userschema = require("../model/userschema")
const cartschema = require("../model/cartschema");
const addressschema = require("../model/addressschema");
const razorpay = require("../middleware/razorpay");

const placeorder = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const userId = req.user.id;
    const user = await cartschema.findOne({ userId });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const Address = await addressschema.findOne({ userId });
    if (!Address) {
      return res.status(400).json({
        message: "address is not for the user ",
      });
    }
    // console.log("address",Address);

    // console.log(user);

    const order = new orderschema({
      cartId: user._id,
      userId: userId,
      addressId: Address._id,
      totalprice: user.totalprice,
      paymentMethod,
    });
    // await order.save()
    // res.send("order created")
    //    res.status(200).json({
    //     message : "oredered through cash on delivery"
    //   })
    console.log(order);
    if (paymentMethod === "onlinePayment") {
      const razorpayOrder = razorpay.orders.create({        
        amount: user.totalprice * 100,      
        currency: "INR",
        receipt: order._id.toString(),
        payment_capture: 1,
      });
      if (!razorpayOrder) {
        return res.status(500).json({
          message: "error creating in razorpayorder",
        });
      }
      await order.save();

      return res.status(200).json({
        message: "online payment done successfully",
      });
    } else if (paymentMethod === "COD") {
      res.status(200).json({
        message: "ordered through cash on delivery ",
      });
      await order.save();
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error in placing an order ",
    });
    console.log(error);
  }
};
const cancelorder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const order = await orderschema.findOne({ _id: orderId }, { userId });
    if (!order) {
      return res.status(404).json({
        message: "order not found or does not belong o the user ",
      });
    }
    order.status = "Cancelled";
    await order.save();
    return res.status(200).json({
      message: "order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error in cancelling order ",
    });
  }
};
const deleteorder  = async(req,res)=>{
    try {
        const userId = req.user.id
        const orderId = req.params.id
        const order = await orderschema.findByIdAndDelete({ _id: orderId }, { userId });
        if(!order){
            return res.status(404).json({
                message : "order does not match for the user "
            })
            
        }
        res.status(200).json({
            mssage : "order deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "error in deleting an order "
        })
    }
}
const getorders = async(req,res)=>{
    try {
        const userId = req.user.id
        const getdetails = await cartschema.findOne({userId}).populate({path: 'products.productId'})
        // console.log(getdetails);
        
        if(!getdetails){
            return res.status(404).json({
                message : "user id has not for the user "
            })
        }
        res.status(200).json({
            messaage : "user orders retrieved successfully",
            getdetails ,
        })
    } catch (error) {
        res.status(500).json({
            message : "error in getting orders"
        })
        console.log(error);
        
    }
}

module.exports = { placeorder, cancelorder,deleteorder , getorders };
