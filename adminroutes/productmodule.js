const express =require("express")
const Router = express.Router()

const {createproduct,allproducts,updateproducts,deleteproduct,productdetails} = require("../admincontroller/productmodules")

const upload=require("../middleware/multer")
Router.get('/allproducts',allproducts)
Router.post('/createproduct',upload.array('image',5), createproduct)
Router.put('/updateproducts/:id',updateproducts)
Router.delete('/deleteproduct/:id',deleteproduct)
Router.get('/productdetails/:id',productdetails)

module.exports=Router  