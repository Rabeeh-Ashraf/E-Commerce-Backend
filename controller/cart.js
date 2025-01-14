const cartschema = require("../model/cartschema");
const productschema = require("../model/productschema");
//add to cart
const addtocart = async (req, res) => {
  try {
    //taking productid from params
    const productId = req.params.productId;
    //taking userid from authorization
    const userId = req.user.id;
    //finding productId from schema
    const product = await productschema.findById(productId);
    //findind userid from cartschema
    let carts = await cartschema.findOne({ userId });
    //if it is not creating a new cartschema
    if (carts) {

       //if the producrt exist
    const productexist = carts.products.find(
      (item) => item.productId.toString() === productId
    );
    if (productexist) {
      return res.status(400).json({
        message: " the product is already in the cart ",
      });
    }
     //pushing the next product to userId's cartschema
     carts.products.push({
      productId,
      quantity: 1,
      price: product.price,
      netamount:product.price,
    });
    //saving the new cartschema
    carts.totalprice = carts.products.reduce((total,product)=>{
      return total + product.netamount 
    },0)
    await carts.save();
    return res.status(200).json({
      messasge: " cart created and product added successfully",
      carts,
    });
  }
      //creating new cart for the user 
       carts = new cartschema({
        userId,
        products: [{ productId ,
          quantity: 1,
        price: product.price,
        netamount:product.price
      }],
      });
      //saving the new cartschema
      carts.totalprice = carts.products.reduce((total,product)=>{
        return total + product.netamount 
      },0)
      await carts.save();
      return res.status(200).json({
        messasge: " cart created and product added successfully",
        carts,
      });
  } 
  //catching the error
  catch (error) {
        res.status(400).json({
      message: " error occurs in addtocart",error:error.message
    });
  }
};
//viewing the cart 
const viewcart = async (req, res) => {
  try {
    //userId from the authorization
    const userId = req.user.id
    //taking the products from productschema
    const cart  =await cartschema.findOne({userId}).populate("products.productId")
        if(!cart){
        return res.status(400).json({
            message : " does not have any cart items left"
        })
    }
    //products retrieving 
    res.status(200).json({
        message : "retrieved all the product in the cart ",
        cart,
    })
      }
  
    //catching the error
   catch (error) {
    res.status(400).json({
      message: " error occurs while viewing the cart",
    });
  }
};
//changing the quantity 
const quantity = async (req,res)=>{
    try {
        //taking the userId
        const userId = req.user.id
        //taking the productId
        const productId = req.params.Id

        const product =await productschema.findById(productId)
        const cart = await cartschema.findOne({userId})
        //takiing quantity from body
        const {quantity}=req.body
        //validate if the quantity is valid
        if(!quantity ||quantity < 1){
          return res.status(400).json({
            message : "no any quantity founded here "
          })
        }
        //check the users cart exists
        if(!cart){
            return res.status(404).json({
                message :"cart is not found of the user"
            })
        }
        //finding the product from cart matching to product id 
        const productFromCart = cart.products.find((item)=>item.productId.toString()===productId)
        if(!productFromCart ){
          return res.status(404).json({
            message : "product not find in the cart"
          })
        }
        //update the quantity of product in the cart 
        productFromCart.quantity = quantity;
        productFromCart.netamount= productFromCart.price*quantity
        //calculating all the sum in the cart 
        cart.totalprice = cart.products.reduce((total,product)=>{
          return total + product.netamount 
        },0)
        //saving the updated cart
        await cart.save()
        res.status(200).json({
          message : " cart quantity updated successfully ",
          cart,
        })         
    } catch (error) {
        res.status(400).json({
            message : "error in quantity",error:error.message
        })
    }
}
//removing item from the cart 
const removecart = async(req,res)=>{
  try {
    const userId  = req.user.id
    const productId = req.params.productId
    //remove the product from cart
    const cart = await cartschema.findOneAndUpdate({userId},{$pull : {products : {productId}}},{new :true}) 
    //cart not found
    if(!cart){
      return res.status(404).json({
        message : " cart not found for the user"
      })
    }
    //calculate the total price after removing
    cart.totalprice = cart.products.reduce((total,product)=>{
      return total + product.netamount 
    },0)
    //save the updated cart 
    await cart.save()
    res.status(200).json({
      message : " product removed from cart",
      cart,
    })
  } catch (error) {
    res.status(400).json({
      message : "error in  removing product from cart",error:error.message
    })
  }
}
module.exports = { addtocart, viewcart ,quantity,removecart};
