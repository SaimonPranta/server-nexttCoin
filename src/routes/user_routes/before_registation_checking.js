const user_collection = require("../../db/schemas/user_schema");



const before_registation_checking = async (req, res) => {
    try {
        const { phoneNumber, referNumber } = await req.body

        if (referNumber && phoneNumber) {
            const refNumberChacking = await user_collection.findOne({ phoneNumber: referNumber }).select({
                phoneNumber: 1,
                referNumber: 1,
                isActive: 1
            })
            if (refNumberChacking && refNumberChacking._id) {
                if (refNumberChacking.isActive) {
                    const phoneNumberChacking = await user_collection.findOne({ phoneNumber: phoneNumber }).select({
                        phoneNumber: 1,
                        referNumber: 1,
                    })

                    // res.json({})

                    if (phoneNumberChacking && phoneNumberChacking._id) {
                        res.status(404).send({ failed: "This Phone Number are Already Exist, Please try With Another Number !" })
                    } else {
                        res.status(200).send({ sucess: true })
                    }

                } else {
                    res.status(404).send({ failed: "Your Porvided Referrence User are not Active !" })
                }
            } else {
                res.status(404).send({ failed: "Your Porvided Referrence Number are not Exist !" })
            }
        } else {
            res.status(404).send({ failed: "Please Fill the Full Form and then Tryout !" })
        }
    } catch (err) {
        res.status(404).send({ failed: "Failed to Create Your Account, Please tryout Latter !" })
    }
};

module.exports = before_registation_checking;