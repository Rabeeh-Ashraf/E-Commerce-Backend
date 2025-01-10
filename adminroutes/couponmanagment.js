const express =require("express")
const Router = express.Router()
const jsonwebtoken =require("../middleware/jsonwebtoken")
const {createcoupon,viewcoupon,deletecoupon,updatecoupon } = require("../admincontroller/couponmanagment")

Router.post('/createcoupon',jsonwebtoken,createcoupon)
Router.get('/viewcoupon',jsonwebtoken,viewcoupon)
Router.delete('/deletecoupon/:id',jsonwebtoken,deletecoupon)
Router.put('/updatecoupon/:couponid',jsonwebtoken,updatecoupon )
module.exports = Router