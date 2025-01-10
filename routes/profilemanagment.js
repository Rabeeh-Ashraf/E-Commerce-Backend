const express = require("express")
const Router  = express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {updateprofile,profiledetails,changepassword,addaddress}=require("../controller/profilemanagment")
Router.put('/updateprofile/:id',updateprofile)
Router.get('/profiledetails/:id',profiledetails)
Router.put('/changepassword',jsonwebtoken,changepassword) 
Router.put('/addaddress',jsonwebtoken,addaddress)

module.exports = Router