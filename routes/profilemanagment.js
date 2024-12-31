const express = require("express")
const Router  = express.Router()
const {updateprofile,profiledetails}=require("../controller/profilemanagment")
Router.put('/updateprofile/:id',updateprofile)
Router.get('/profiledetails/:id',profiledetails)
module.exports = Router