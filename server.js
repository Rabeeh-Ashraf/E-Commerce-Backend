const env = require('dotenv')
const express = require("express"); 
const app = express(); 
const connectdb = require("./mongodbconnect/connectdb")
const auth = require("./routes/authenticatate")
const port = process.env.port

env.config()
connectdb()

app.use (express.json())
app.use(express.urlencoded({extended:true}))

app.use(auth)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
 