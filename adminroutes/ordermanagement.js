const express= require("express")
const Router = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {getorders,updateorder}= require("../admincontroller/ordermanagement")
Router.get('/getorders',jsonwebtoken,getorders)
Router.put('/updateorder/:orderId',jsonwebtoken,updateorder)

module.exports = Router