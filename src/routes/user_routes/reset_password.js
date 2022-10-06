const bcrypt = require("bcrypt");
const user_collection = require("../../db/schemas/user_schema");

const reset_password = async (req, res) => {
    try {
        const { _id, oldPassword, newPassword } = await req.body

        if (_id && oldPassword && newPassword) {
            const user = await user_collection.findOne({ _id: _id }).select({
                password: 1
            })


            const checkPassword = await bcrypt.compare(oldPassword, user.password)
            if (checkPassword) {
                const hashingPassword = await bcrypt.hash(newPassword, 10)

                console.log(hashingPassword)

                const updateUser = await user_collection.findOneAndUpdate({ _id: _id },
                    {
                        $set: {
                            password: hashingPassword
                        }
                    },
                    {
                        new: true
                    })

                if (updateUser._id) {
                    updateUser.password = null;
                    res.status(200).json({ sucess: "Sucessfully your password." })
                } else {
                    res.status(500).json({failed: "Failed to reset your password, please try again." })
                }
            }
        }
    } catch (error) {
        res.status(500).json({failed: "Failed to reset your password, please try again." })
    }
};

module.exports = reset_password;

