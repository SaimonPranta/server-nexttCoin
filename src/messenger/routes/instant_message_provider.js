const coversation_collection = require('../messenger_DB/coversetion_schema');
const message_collection = require('../messenger_DB/message_schema');

const instant_message_porvider = async (req, res) => {
    try {
        const { userID, friendID } = await req.params
        if (userID && friendID) {
            const result = await coversation_collection.findOne({
                members: { $all: [userID, friendID] }
            })
            if (result && result._id) {
                res.status(201).json({ data: result })
            } else {
                const conversation = await new coversation_collection({
                    members: [userID, friendID]
                })
                const created = await conversation.save()
                if (created && created._id) {
                    res.status(201).json({ data: created })
                } else {
                    res.status(500).json({ faild: "Failed to Create Conversation !" })
                }
            }
        } else {
            res.status(500).json({ faild: "Failed to Create Conversation !" })
        }

    } catch (error) {
        res.status(500).json({ faild: "Failed to Create Conversation !" })
    }
}

module.exports = instant_message_porvider;
