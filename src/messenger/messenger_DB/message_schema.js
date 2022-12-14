const mongoose = require("mongoose");
const dbConnection = require("../../db/connection.js");


const message_sechema = new mongoose.Schema({
    conversetionID: {
        type: String,
        required: true,
    },
    senderID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, 
{timestamps: true}
)
// const message_collection = new mongoose.model("message", message_sechema)
const message_collection = dbConnection.messengerBD.model("message", message_sechema)


module.exports = message_collection;