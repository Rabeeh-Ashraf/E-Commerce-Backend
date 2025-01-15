const express = require("express")
const Router = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const tokenexpire = require("../middleware/blacklist")
const {addwishlist,viewwishlist,removeitemwishlist} = require("../controller/wishlist")
Router.post("/addwishlist/:productId",jsonwebtoken,tokenexpire,addwishlist)
Router.get("/viewwishlist",jsonwebtoken,tokenexpire,viewwishlist)
Router.delete("/removeitemwishlist/:productId",jsonwebtoken,tokenexpire,removeitemwishlist)

module.exports = Router 