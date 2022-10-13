const user_collection = require("../../db/schemas/user_schema");
const nameConverter = require("../../functions/NameConverter");


const update_user = async (req, res) => {
    try {
        const { firstName, lastName, bio, phoneNumber, _id } = await req.body;

        if (firstName && lastName && bio && phoneNumber && _id) {

            const convertedFirstName = await nameConverter(firstName)
            const convertedLastName = await nameConverter(lastName)

            const updateUser = await user_collection.findOneAndUpdate({ _id: _id, phoneNumber: phoneNumber },
                {
                    $set: {
                        firstName: convertedFirstName,
                        lastName: convertedLastName,
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
                    sucess: "Sucessfully Updated Your Information."
                })
            } else {
                res.status(500).json({ failed: "Failed to Update Your Profile, Please Try Again !" } )
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: "Failed to Update Your Profile, Please Try Again !" } )
    }
};

module.exports = update_user;