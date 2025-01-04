const wishlistschema = require("../model/wishlistschema");
const userschema = require("../model/userschema");
const productschema = require("../model/productschema");
//adding a wishlist
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
// get ALL wishlists
const viewwishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    //populate the products field
    const wishlist = await wishlistschema
      .findOne({ userId })
      .populate("products");
    if (!wishlist) {
      return res.status(404).json({
        message: "does not have any wishlist ",
      });
    }
    //retrieved wishlist
    res.status(200).json({
      message: " wishlist retrieved successfully",
      wishlist,
    });
  } catch (error) {
    res.status(400).json({
      message: " error in viewing wishlist ",
    });
  }
};
//remove item from wishlist
const removeitemwishlist = async (req, res) => {
  try {
    //requesting user id from token
    const userId = req.user.id;
    //params of productId
    const productId = req.params.productId;
    //products removing from wishlist
    const wishlist = await wishlistschema.findOneAndUpdate({ userId },{ $pull: { products: productId } });

    return res.status(200).json({
      message: "product removed from wishlist successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: " error in removing item from wishlist",
    });
  }
};
module.exports = { addwishlist, viewwishlist, removeitemwishlist };
