const mongoose = require("mongoose");


const coversetion_sechema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    }
},
{timestamps: true}
)
const coversation_collection = new mongoose.model("coversation", coversetion_sechema)

module.exports = coversation_collection;