const bcrypt = require("bcrypt");
const user_collection = require("../../db/schemas/user_schema");
const nameConverter = require("../../functions/nameConverter");

const edit_user = async (req, res) => {
    try {
        const id = await req.body._id
        let hashingPassword = null

        if (req.body.password) {
            hashingPassword = await bcrypt.hash(req.body.password, 10)
        }
        if (id) {
            const userObj = {}
            req.body.firstName ? userObj["firstName"] = await nameConverter(req.body.firstName) : null
            req.body.lastName ? userObj["lastName"] = await nameConverter(req.body.lastName) : null
            // req.body.rank ? userObj["rank"] = await req.body.rank : null
            req.body.balance ? userObj["balance"] = await Math.floor(req.body.balance) : null
            req.body.shoppingBalance ? userObj["shoppingBalance"] = await Math.floor(req.body.shoppingBalance) : null
            hashingPassword ? userObj["password"] = await hashingPassword : null

            const updateUser = await user_collection.findOneAndUpdate({ _id: id },
                {
                    $set: userObj
                },
                {
                    new: true
                })
            if (updateUser._id) {
                updateUser.password = null;
                res.status(200).json({
                    data: updateUser,
                    sucess: "Sucessfully Updated User Info !"
                })
            } else {
                res.status(500).json({ failed: "Failed to Update user Info !" })
            }
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to Update user Info !" })
    }
};

module.exports = edit_user;

