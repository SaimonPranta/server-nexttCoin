const user_collection = require("../../db/schemas/user_schema");
const date_provider = require("../../functions/date_provider");

const mobile_rechare = async (req, res) => {
    try {
        const id = req.id
        const { simProvider, amount, phoneNumber, simStatus } = req.body;
        if (simProvider && amount && phoneNumber && simStatus) {
            const requestID = await Math.floor(Math.random() * 10) + Date.now();
            const reqestObj = await {
                requestID: requestID,
                simProvider: simProvider,
                amount: amount,
                number: phoneNumber,
                simStatus: simStatus,
                apporoval: false,
                date: date_provider(new Date())
            }

            const user = await user_collection.findOneAndUpdate({ _id: id },
                {
                    $push: { mobileRechareInfo: { $each: [reqestObj], $position: 0 } }
                },
                {
                    new: true
                });
            if (user._id) {
                res.status(200).json({
                    sucess: "Your Mobile Recharge are sucessfull !",
                    data: user
                })
            } else {
                res.status(500).json({ failed: "Failed to create Mobile Mecharge, please try again !" })
            }


        } else {
            res.status(500).json({ failed: "Failed to create Mobile Recharge, please try again !" })
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to create Mobile Recharge, please try again !" })
    }
};

module.exports = mobile_rechare;
