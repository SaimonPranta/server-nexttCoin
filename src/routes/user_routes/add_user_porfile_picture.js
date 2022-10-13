const fs = require('fs-extra')
const user_collection = require("../../db/schemas/user_schema");

const add_user_porfile_picture = async (req, res) => {
    try {
        console.log("Call")
        const image = await req.files.image
        const id = req.body.id
        if (
            image.mimetype !== "image/jpg" &&
            image.mimetype !== "image/png" &&
            image.mimetype !== "image/jpeg" && 
            id
        ) {
            res.status(500).send({ failed: "Only .jpg .png or .jpeg format allowed !" })
        } else if (image.size >= "1500012") {
            res.status(500).send({ failed: "Image Size are too large !" })
        } else {
            const extention = await image.mimetype.split("/")[1]
            image.name = await image.name.split(".")[0] + Math.floor(Math.random() * 10) + Date.now() + "." + extention
            const imageUpload = await image.mv(`${__dirname}/../../../src/images/slider_img/${image.name}`)

            const imgInfo = await {
                profilePicture: image.name
            }
            // const imgOutPut = await user_collection(imgInfo)
            // const createdUser = await imgOutPut.save()
            const updateUser = await user_collection.findOneAndUpdate({ _id: id },
                {
                    $set: imgInfo
                },
                {
                    new: true
                })


            if (updateUser._id) {
                res.status(200).json({ data: updateUser })
            } else {
                res.status(500).json({ failed: "Failed to upload image, please try again !" })
            }
        }
    } catch (error) {
        res.status(500).json({ failed: "Failed to upload image, please try again !" })

    }
}


module.exports = add_user_porfile_picture;