const express = require("express")
const Router = express.Router()
const {allproduct} = require("../controller/productmodule")
Router.get('/allproduct',allproduct)

module.exports = Router