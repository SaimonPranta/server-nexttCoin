const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    referNumber: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 0
    },
    shoppingBalance:{
        type: Number,
        default: 0
    },
    totalIncome: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    rank: {
        type: String,
        default: "No Rank"
    },
    generation_1: {
        type: Array
    },
    generation_2: {
        type: Array
    },
    generation_3: {
        type: Array
    },
    generation_4: {
        type: Array
    },
    generation_5: {
        type: Array
    },
    generation_6: {
        type: Array
    },
    generation_7: {
        type: Array
    },
    generation_8: {
        type: Array
    },
    generation_9: {
        type: Array
    },
    generation_10: {
        type: Array
    },
    balanceTransperInfo: {
        type: Array
    },
    investment: {
        type: Array
    },
    mobileRechareInfo: {
        type: Array
    },
    withdrawInfo: {
        type: Array
    },
    profilePicture: {
        type: String,
        unique: true
    },
    bio: {
        type: String,
    }
})
const user_collection = new mongoose.model("user_collectionsss", userSchema)


module.exports = user_collection;