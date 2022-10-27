const mongoose= require("mongoose")
const dotenv = require("dotenv");
dotenv.config()
// const uri =  "mongodb://127.0.0.1:27017/users"
const uri = `mongodb+srv://my-investment-site:${process.env.MONGODB_USER_PASSWORD}@cluster0.mxr8thh.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri)
.then(sucess=> {
    console.log("sucessfully connected to database")
})
