const coversation_collection = require("../messenger_DB/coversetion_schema");

const conversation_porvider = async (req, res) => {
    try {
        const userID = await req.params.userID

        const result = await coversation_collection.find({
            members: { $in: [userID] }
        })
        console.log(result)
        res.status(200).json({ data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ faild: "Failed to provide Conversation." })
    }
}

module.exports = conversation_porvider;

