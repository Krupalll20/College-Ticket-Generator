const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require('dotenv').config()

const query = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['PENDING', 'DONE']
    },
    query: {
        type: String,
        required: [true, "Please provides email"]
    }
}, {
    collection: "Query"
})

const Query = mongoose.model("Query", query)

module.exports = Query