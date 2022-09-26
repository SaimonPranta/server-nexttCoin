const message_collection = require('../messenger_DB/message_schema');

const create_message = async (req, res) => {
    try {
        const { conversetionID, senderID, message } = await req.body
        console.log("hit")

        const conversation = await new message_collection({
            conversetionID: conversetionID,
            senderID: senderID,
            message: message
        })
        const result = await conversation.save()
        console.log(result)
        res.status(200).json({ data: result })

    } catch (error) {
        console.log(error)
        res.status(500).json({ faild: "Failed to create Conversation." })
    }
}

module.exports = create_message;
