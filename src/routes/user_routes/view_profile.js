const user_collection = require("../../db/schemas/user_schema");

const view_profile = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const user = await user_collection.findOne({ _id: id }).select({
                password: 0
            });
            if (user._id) {
                res.status(200).json(user)
            } else {
                res.status(500).json({ failed: "Failed to load data, please try again." })
            }
        } else {
            res.status(500).json({ failed: "Failed to load data, please try again." })
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to load data, please try again." })
    }
};


module.exports = view_profile;