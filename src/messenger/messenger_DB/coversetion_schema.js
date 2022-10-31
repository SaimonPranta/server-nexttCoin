const mongoose = require("mongoose");
const dbConnection = require("../../db/connection.js");

const coversetion_sechema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    }
},
{timestamps: true}
)
const coversation_collection = dbConnection.messengerBD.model("coversation", coversetion_sechema)


module.exports = coversation_collection;

