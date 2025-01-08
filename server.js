const env = require('dotenv')
const express = require("express"); 
const app = express(); 
const connectdb = require("./mongodbconnect/connectdb")
const auth = require("./routes/authenticatate")
const adminproductmodule = require("./adminroutes/productmodule")
const userproductmodule = require("./routes/productmodule")
const adminusermanagment = require("./adminroutes/usermanagment")
const userprofilemanagment = require("./routes/profilemanagment")
const category = require("./routes/category")
const wishlist = require("./routes/wishlist")
const cart = require ("./routes/cart")
const port = process.env.port


env.config()
connectdb()

app.use (express.json())
app.use(express.urlencoded({extended:true}))


app.use(auth)
app.use(adminproductmodule)
app.use(userproductmodule)
app.use(adminusermanagment)
app.use(userprofilemanagment)
app.use(category)
app.use(wishlist)
app.use(cart)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 
 