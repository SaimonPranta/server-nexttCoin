const user_collection = require("../../db/schemas/user_schema");



const check_forgot_pass_phonenumber = async (req, res) => {
    try {
        
        const { phoneNumber } = await req.body

        if (phoneNumber) {
            const phoneNumberChacking = await user_collection.find({ phoneNumber: phoneNumber }).select({
                phoneNumber: 1,
            })
            if (phoneNumberChacking.length > 0) {
                res.status(200).send({ sucess: true })
            } else {
                res.status(404).send({ failed: "This Phone Number are not Exist !" })
            }
        } else {
            res.status(404).send({ failed: "Please Provide the Phoen Number & Try Again !" })
        }
    } catch (err) {
        console.log(err)
        res.status(404).send({ failed: "Failed to Find Your Phone Number, Please Try Again Letter !" })
    }
};

module.exports = check_forgot_pass_phonenumber;