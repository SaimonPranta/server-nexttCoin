const user_collection = require("../../db/schemas/user_schema");



const before_registation_checking = async (req, res) => {
    try {
        const { phoneNumber, referNumber } = await req.body

        if (referNumber && phoneNumber) {
            const refNumberChacking = await user_collection.find({ phoneNumber: referNumber }).select({
                phoneNumber: 1,
                referNumber: 1,
                isActive: 1
            })
            const phoneNumberChacking = await user_collection.find({ phoneNumber: phoneNumber }).select({
                phoneNumber: 1,
                referNumber: 1,
            })


            res.json({
                phoneNumberChacking: phoneNumberChacking ? phoneNumberChacking : false,
                refNumberChacking: refNumberChacking ? refNumberChacking : false
            })


        }
    } catch (err) {
        res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
    }
};

module.exports = before_registation_checking;