
const user_collection = require("../../db/schemas/user_schema");

const investment_request_decline = async (req, res) => {
    try {
        const { id, requestID } = req.body
        const userVarifing = await user_collection.findOne({ _id: id })
        if (userVarifing._id) {
            const currentUser = await user_collection.findOneAndUpdate(
                {
                    _id: id,
                    "investment.requestID": requestID
                },
                {
                    $pull: { investment: { requestID: requestID } }
                }

            )

            if (currentUser._id) {
                res.status(200).json({ sucess: "sucessfuly approved" })
            } else {
                res.status(500).json({ failed: "Faild to approved" })
            }
        } else {
            res.status(500).json({ failed: "Faild to approved" })
        }


    } catch (error) {
        res.status(500).json({ failed: "Faild to approved" })
    }
}


module.exports = investment_request_decline;