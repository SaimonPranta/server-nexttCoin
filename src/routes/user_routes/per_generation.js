const user_collection = require("../../db/schemas/user_schema");

const per_generation = async (req, res) => {
    try {
        const generation = req.query.gen
        const id = await req.id

        const user = await user_collection.findOne({ _id: id });

        if (user && user._id && generation) {
            if (generation == 1) {
                const arrayOfGeneration = await [...user.generation_1]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 2) {
                const arrayOfGeneration = await [...user.generation_2]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 3) {
                const arrayOfGeneration = await [...user.generation_3]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 4) {
                const arrayOfGeneration = await [...user.generation_4]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 5) {
                const arrayOfGeneration = await [...user.generation_5]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 6) {
                const arrayOfGeneration = await [...user.generation_6]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 7) {
                const arrayOfGeneration = await [...user.generation_7]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 8) {
                const arrayOfGeneration = await [...user.generation_8]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 9) {
                const arrayOfGeneration = await [...user.generation_9]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            } else if (generation == 10) {
                const arrayOfGeneration = await [...user.generation_10]

                const allActiveUser = await user_collection.find({ phoneNumber: arrayOfGeneration });
                const allUnactiveUser = await user_collection.find({ referNumber: user.phoneNumber, isActive: false });

                const allGenerationUser = await [...allActiveUser, ...allUnactiveUser];

                res.status(200).json({ data: allGenerationUser })
            }
        } else {
            res.status(200).send({ faild: "sorry, your request are unathorize." })
        }

    } catch (error) {
        res.status(500).json({ faild: "failed to load data." })
    }
}

module.exports = per_generation;