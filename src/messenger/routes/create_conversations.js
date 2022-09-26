const coversation_collection = require("../messenger_DB/coversetion_schema");

const create_conversations = async (req, res) => {
    try {
        const {userID, senderID} = await req.body

        console.log(userID, senderID)

        const conversation = await new coversation_collection({
            members: [userID, senderID]
        })
        const result = await conversation.save()
        res.status(401).json({data: res})

    } catch (error) {
        res.status(500).json({faild: "Failed to create Conversation."})
    }
}

module.exports = create_conversations;