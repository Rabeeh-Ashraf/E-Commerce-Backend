const express = require ("express")
const  Router  =express.Router()
const jsonwebtoken = require("../middleware/jsonwebtoken")
const {placeorder,cancelorder,deleteorder,getorders} = require("../controller/ordermanagement")

Router.post('/placeorder',jsonwebtoken,placeorder)
Router.delete('/cancelorder/:id',jsonwebtoken,cancelorder)
Router.delete('/deleteorder/:id',jsonwebtoken,deleteorder)
Router.get('/getorders',jsonwebtoken,getorders)

module.exports  =Router
