const express = require("express")
const Router = express.Router()
const category = require("../controller/category")
Router.get('/category',category)
module.exports = Router