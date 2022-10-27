const user_collection = require("../../db/schemas/user_schema");
const date_provider = require("../../functions/date_provider");


const investment = async (req, res) => {
    try {
        const { id, provider, amount, phoneNumber } = req.body;
        if ( id && provider && amount && phoneNumber) {
            const requestID = await Math.floor(Math.random() * 10) + Date.now();
            const reqestObj = await {
                requestID: requestID,
                number: phoneNumber,
                amount: amount,
                provider: provider,
                apporoval: false,
                date: date_provider(new Date())
            }

            const user = await user_collection.findOneAndUpdate({ _id: id.toString()},
                {
                    $push: { investment: { $each: [reqestObj], $position: 0 } }
                },
                {
                    new: true
                });
            if (user._id) {
                res.status(200).json({
                    sucess: "Your Investment request are sucessfull !",
                    data: user
                })
            } else {
                res.status(500).json({ failed: "Failed to create Investment request, please try again !" })
            }

        } else {
            res.status(500).json({ failed: "Please fill all the fild and try again !" })
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to create Investment request, please try again !" })
    }
}


module.exports = investment;
