const express = require("express")
const Router  = express.Router()
const {register, login,forgetpassword,resetpassword}= require('../controller/authentication')

Router.post('/register',register)
Router.post('/login',login)
Router.post('/forgetpassword',forgetpassword)
Router.post('/resetpassword/:id',resetpassword)


module.exports = Router  