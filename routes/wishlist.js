const express = require("express")
const Router = express.Router()
const {addwishlist} = require("../controller/wishlist")
Router.post("/addwishlist",addwishlist)

module.exports = Router