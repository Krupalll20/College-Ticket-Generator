const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require('dotenv').config()

const user = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provides email"]
    },
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    phone: {
        type: String,
        required: [true, "Please provide phone"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    },
    department:{
        type:String,
        required:[true,"Please provide department"]
    },
    role: {
        type: String,
        enum: ['ADMIN', 'FACULTY']
    }
},
    {
        collection: "User"
    })

user.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", user)

module.exports = User