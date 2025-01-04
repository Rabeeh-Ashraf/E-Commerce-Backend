const express = require("express")
const Router = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {addwishlist,viewwishlist,removeitemwishlist} = require("../controller/wishlist")
Router.post("/addwishlist/:productId",jsonwebtoken,addwishlist)
Router.get("/viewwishlist",jsonwebtoken,viewwishlist)
Router.delete("/removeitemwishlist/:productId",jsonwebtoken,removeitemwishlist)

module.exports = Router 