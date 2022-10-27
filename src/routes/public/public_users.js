const user_collection = require("../../db/schemas/user_schema");

const public_users = async (req, res) => {
    try {
        const allUser = await user_collection.find().select({
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            totalIncome: 1,
            profilePicture: 1,
            generation_1: 1,
            generation_2: 1,
            generation_3: 1,
            generation_4: 1,
            generation_5: 1,
            generation_6: 1,
            generation_7: 1,
            generation_8: 1,
            generation_9: 1,
            generation_10: 1
        })
        res.status(200).json({data: allUser})

    } catch (error) {
        res.status(500).json({ })

    }
}


module.exports = public_users;