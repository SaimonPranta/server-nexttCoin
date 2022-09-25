
const user_collection = require("../../db/schemas/user_schema");



const before_registation_phoneNumber_checking = async (req, res) => {
    try {
        const { phoneNumber } = await req.body

        if (phoneNumber) {
            const phoneNumberChacking = await user_collection.find({ phoneNumber: phoneNumber }).select({
                phoneNumber: 1,
                referNumber: 1,
            })

        }
    } catch (err) {
        res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
    }
};

module.exports = before_registation_phoneNumber_checking;