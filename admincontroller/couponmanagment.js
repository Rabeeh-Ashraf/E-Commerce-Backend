const couponschema = require("../model/couponschema")
// const cuponschema = require("../model/couponschema")

const createcoupon = async(req,res)=>{
    try {
        const {code,expirydate,discountpercentage}=req.body
        if(!code||!expirydate||!discountpercentage){
            return res.status(400).json({
                message : "all fields are required "
            })
        }
        const newcoupon = new couponschema({
            code,
            expirydate,
            discountpercentage,
        })
        await newcoupon.save()
       return res.status(200).json({
            message : "coupon created successfully",
            newcoupon,
        })
      
    } catch (error) {
        res.status(400).json({
            message : "error in creating coupon"
        })
    }
}
const viewcoupon = async(req,res)=>{
    try {
         //view all coupons
            const coupons = await couponschema.find({});
            if (!coupons) {
              return res.status(404).json({
                message: "coupons not find ",
              });
            }
            //listing all the coupons when success
            res.status(200).json({
              message: "listed all the coupons ",
              coupons,
            });
    } catch (error) {
        res.status(400).json({
            message : "error in showing coupons "
        })
    }
}
const deletecoupon = async(req,res)=>{
    try {
        const couponid = req.params.id;
            if (!couponid) {
              return res.status(400).json({
                message: "coupon id is not required ",
              });  
            }
            const deletedcoupons = await couponschema.findByIdAndDelete(couponid);
            if (!deletedcoupons) {
              return res.status(404).json({
                message: "coupon not found",
              });
            }
            return res.status(200).json({
              message: "coupon deleted successfully",
              deletedcoupons,
            });
    } catch (error) {
        console.error(error);
        
        res.status(400).json({
            message : "error in deleting coupons "
        })
    }
}
const updatecoupon = async(req,res)=>{
    try {
        const couponid = req.params.couponid
        const updates = req.body
        if(!couponid){
            return res.status(404).json({
                message : " coupon id is required"
            })
        }
        const updatedcoupon = await couponschema.findByIdAndUpdate(couponid,updates)
        if (!updatedcoupon) {
            return res.status(400).json({
              message: "cannot update coupon ",
            });
          }
          res.status(200).json({
            message: "coupon updated successfully",
          });

    } catch (error) {
        res.status(400).json({
            message : "error in updating coupon"
        })
    }
}
module.exports ={createcoupon ,viewcoupon,deletecoupon,updatecoupon  }