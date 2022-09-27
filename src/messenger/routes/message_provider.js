const message_collection = require("../messenger_DB/message_schema");

const message_provider = async (req, res) => {
    try {
        const conversetionID = await req.params.conversetionID

        const result = await message_collection.find({conversetionID: conversetionID})
        console.log(result)
        res.status(200).json({data: result})

    } catch (error) {
        res.status(500).json({faild: "Failed to provide Message."})
    }
}

module.exports = message_provider;