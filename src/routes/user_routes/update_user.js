const user_collection = require("../../db/schemas/user_schema");


const update_user = async (req, res) => {
    try {
        const { firstName, lastName, bio, phoneNumber, _id } = await req.body;
        
        if (firstName && lastName && bio && phoneNumber && _id) {
            const updateUser = await user_collection.findOneAndUpdate({ _id: _id, phoneNumber: phoneNumber },
                {
                    $set: {
                        firstName: firstName,
                        lastName: lastName,
                        bio: bio
                    }
                },
                {
                    new: true
                })
            if (updateUser) {
                updateUser.password = null;
                res.status(200).json({
                    data: updateUser,
                    message: { sucess: "Sucessfully updated your information." }
                })
            } else {
                res.status(500).json({ message: { failed: "Failed to update your information, please try again." } })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: { failed: "Failed to update your information, please try again." } })
    }
};

module.exports = update_user;