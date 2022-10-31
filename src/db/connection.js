const mongoose= require("mongoose")
const dotenv = require("dotenv");
dotenv.config()


const uri = process.env.USER_URI
const messenger_uri = process.env.MESSENGER_URI


mongoose.connect(uri)
.then(sucess=> {
    console.log("sucessfully connected to database")
})

mongoose.messengerBD = mongoose.createConnection(messenger_uri)

module.exports = mongoose


