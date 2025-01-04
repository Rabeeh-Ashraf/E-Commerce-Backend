const express = require("express")
const Router = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {addwishlist} = require("../controller/wishlist")
Router.post("/addwishlist/:productId",jsonwebtoken,addwishlist)

module.exports = Router 