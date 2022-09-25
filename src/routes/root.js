// const user_collectio = require("../db/schemas/user_schema");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const root = async (req, res) => {
    try {
        // console.log(user)
        res.send("we are now online")
    } catch (error) {
        res.send("we are now online")
    }
};

module.exports = root;