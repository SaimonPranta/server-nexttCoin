const user_collection = require("../../db/schemas/user_schema");

const user_porvider = async (req, res) => {
    try {
        const userID = await req.params.userID

        const result = await user_collection.findOne({_id: userID}).select({
            _id: 1,
            firstName: 1,
            lastName: 1,
            profilePicture: 1
        });
        res.status(200).json({data: result})

    } catch (error) {
        res.status(500).json({faild: "Failed to provide Conversation."})
    }
}

module.exports = user_porvider;