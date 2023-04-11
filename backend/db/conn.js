const mongoose = require("mongoose")
const dburl = process.env.DBURL

mongoose.connect(dburl, {
    useNewUrlParser: true,
}).then(() => {
    console.log("connection successful")
}).catch((err) => {
    console.log(err)
})