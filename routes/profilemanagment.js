const express = require("express")
const Router  = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const tokenexpire =require("../middleware/blacklist")
const {updateprofile,profiledetails,changepassword,addaddress,logout}=require("../controller/profilemanagment")
Router.put('/updateprofile/:id',updateprofile)
Router.get('/profiledetails/:id',profiledetails)
Router.put('/changepassword',jsonwebtoken,tokenexpire,changepassword) 
Router.put('/addaddress', jsonwebtoken, tokenexpire,addaddress)
Router.post('/logout', jsonwebtoken,logout)

module.exports = Router