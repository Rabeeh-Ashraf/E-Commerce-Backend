const express = require("express")
const Router = express.Router()
const {viewusers,deleteusers,blockuser,blockedusers,userdetails} = require("../admincontroller/usermanagments")
Router.get('/viewusers',viewusers)
Router.delete('/deleteusers/:id',deleteusers)
Router.put('/blockuser/:id',blockuser)
Router.get('/blockedusers',blockedusers)
Router.get('/userdetails/:id',userdetails)



module.exports = Router