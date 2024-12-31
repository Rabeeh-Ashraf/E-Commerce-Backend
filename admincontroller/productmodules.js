const schema = require("../model/productschema");
const createproduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    //bringing image path from file
    // const image = req.files.path

    //creating a new scshema in database
    const newproduct = new schema({
      name,
      description,
      price,
      category,
      stock,
      image,
    });
    // all fields are required
    if (!name || !description || !price || !category || !stock) {
      return res.status(200).json({
        message: "all fields are required ",
      });
    }
    //condition of when the image  is required
    if (req.files[0] == undefined) {
      return res.send("image required");
    }
    //pushing the files of the image
    if (req.files) {
      let files = [];
      req.files.forEach((fileName) => {
        files.push(fileName.path);
      });
      newproduct.image = files;
    }
    //saving the product
    await newproduct.save();

    return res.status(200).json({
      message: " product created successfully",
    });
    //error of the creating product
  } catch (error) {
    res.status(400).json({
      message: "internal server error",
    });
    console.log(error, "mesaage");
  }
};
//showinig all the products in admin side
const allproducts = async (req, res) => {
  try {
    //view all products
    const products = await schema.find({});
    if (!products) {
      return res.status(404).json({
        message: "products not find ",
      });
    }
    //listing all the product whwn success
    res.status(200).json({
      message: "listed all the products",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: "internal server error",
    });
  }
};
// updating the product from admin side
const updateproducts = async (req, res) => {
  try {
    //taking request id 
    const productid = req.params.id;
    const updates = req.body;
    if (!productid) {
      return res.status(404).json({
        message: "product id is required ",
      });
    }
    //finding from schema and update
    const updatedproduct = await schema.findByIdAndUpdate(productid, updates);
    if (!updatedproduct) {
      return res.status(400).json({
        message: "cannot update product ",
      });
    }
    res.status(200).json({
      message: "product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "updation of  product is invalid ",
    });
  }
};
//deleting products
const deleteproduct = async (req, res) => {
  try {
    const productid = req.params.id;
    if (!productid) {
      return res.status(400).json({
        message: "product id is not required ",
      });  
    }
    const deletedproducts = await schema.findByIdAndDelete(productid);
    if (!deletedproducts) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    return res.status(200).json({
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "server error  ",
    });
  }
};
const productdetails = async (req,res)=>{
  try {
    const productid = req.params.id
    const productdetails  = await schema.findById(productid)
    return res.status(200).json({
      message : "showing the product detals",
      productdetails,
    })
  } catch (error) {
    res.status(400).json({
      message : "error occurs while showing product details"
    })
  }
}

module.exports = { createproduct, allproducts, updateproducts, deleteproduct ,productdetails};
