const wishlistschema = require("../model/wishlistschema");
const userschema = require("../model/userschema");
const productschema = require("../model/productschema");
const addwishlist = async (req, res) => {
  try {
    //product id from request params
    const productId = req.params.productId;
    //user id from user authentication/or using user token
    const userId = req.user.id;
    //validating user and product 
    const user = await userschema.findById(userId);
    const product = await productschema.findById(productId);
    const wishlist = await wishlistschema({
      userId: userId,
      products: productId,
    });
    //check if the user already has  wishlist 
    const userwishlist = await wishlistschema.findOne({ userId });

    if (userwishlist) {
        //if product is already in the wishlist 
      if (userwishlist.products.includes(productId)) {
        return res.status(400).json({
          message: " the product is already in the wishlist ",
        });
      }
      //add product to wishlist
      userwishlist.products.push(productId);
      await wishlistschema.findByIdAndUpdate(userwishlist._id, {
        products: userwishlist.products,
      });
      return res.send("product added to wishlist successfully ");
    }
    //save the updated wishlist 
    await wishlist.save();
    res.status(200).json({
      message: " wishlist added suxccessfully  ",
      products: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "error in adding wishlist",
    });
  }
};
module.exports = { addwishlist };
