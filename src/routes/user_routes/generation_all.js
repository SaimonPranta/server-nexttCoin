const user_collection = require("../../db/schemas/user_schema");


const generation_all = async (req, res) => {
    try {
        // const { generation } = await req.query
        const id = await req.id

        const user = await user_collection.findOne({ _id: id });

        if (user?._id) {
            const arrayOfGeneration = await [...user.generation_1, ...user.generation_2, ...user.generation_3, ...user.generation_4, ...user.generation_5, ...user.generation_6, ...user.generation_7, ...user.generation_8, ...user.generation_9, ...user.generation_10]
            
            const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
            const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });
            
            const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

            res.status(200).json({data: allGenerationUser})
        } else {
            res.status(200).send({faild: "sorry, your request are unathorize."})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ faild: "failed to load data." })
    }
};

module.exports = generation_all;