const user_collection = require("../../db/schemas/user_schema");



const before_registation_refarNumber_checking = async (req, res) => {
    try {
        const { referNumber } = await req.body

        if (referNumber) {
            const refNumberChacking = await user_collection.find({ phoneNumber: referNumber }).select({
                phoneNumber: 1,
                referNumber: 1,
                isActive: 1
            })

        }
    } catch (err) {
        res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
    }
};

module.exports = before_registation_refarNumber_checking;