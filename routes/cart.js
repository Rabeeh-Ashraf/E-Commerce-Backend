const express = require("express")
const Router = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {addtocart,viewcart,quantity,removecart} = require("../controller/cart")
Router.post('/addtocart/:productId',jsonwebtoken,addtocart)
Router.get('/viewcart',jsonwebtoken,viewcart)
Router.put('/quantity/:Id',jsonwebtoken,quantity)
Router.delete('/removecart/:productId',jsonwebtoken,removecart)
module.exports = Router