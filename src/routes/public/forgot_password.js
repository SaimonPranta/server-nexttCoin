const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user_collection = require("../../db/schemas/user_schema");

const forgot_password = async (req, res) => {
    try {
        const { phoneNumber, newPassword } = await req.body

        if (phoneNumber && newPassword) {
            const user = await user_collection.findOne({ phoneNumber: phoneNumber }).select({
                password: 1,
                phoneNumber: 1,
            })


            if (user && user._id) {
                const hashingPassword = await bcrypt.hash(newPassword, 10)


                const updateUser = await user_collection.findOneAndUpdate({ phoneNumber: user.phoneNumber },
                    {
                        $set: {
                            password: hashingPassword
                        }
                    },
                    {
                        new: true
                    })

                const token = await jwt.sign(
                    {
                        phoneNumber: user.phoneNumber,
                        id: user._id
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "3d" }
                );


                if (updateUser._id) {
                    updateUser.password = null;
                    res.status(200).json({
                        sucess: "New Password set Sucessfully !",
                        data: updateUser,
                        token: token
                    })
                } else {
                    res.status(500).json({ failed: "Failed to set New Password, Please Try Again !" })
                }
            } else {
                res.status(500).json({ failed: "Sorry, We con't Find Any Account !" })
            }
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to Set New Password, Please Try Again !" })
    }
};

module.exports = forgot_password;

