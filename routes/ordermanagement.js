const express = require ("express")
const  Router  =express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const tokenexpire =require("../middleware/blacklist")
const {placeorder,cancelorder,deleteorder,getorders} = require("../controller/ordermanagement")

Router.post('/placeorder',jsonwebtoken,tokenexpire,placeorder)
Router.delete('/cancelorder/:id',jsonwebtoken,tokenexpire,cancelorder)
Router.delete('/deleteorder/:id',jsonwebtoken,tokenexpire,deleteorder)
Router.get('/getorders',jsonwebtoken,tokenexpire,getorders)

module.exports  =Router
