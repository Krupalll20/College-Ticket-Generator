const express = require('express')
const dotenv = require("dotenv")
const mongoose= require("mongoose")
const app = express()
dotenv.config({path:'./config.env'})
const port=process.env.PORT;
require("./db/conn.js")

const cors = require('cors');  
app.use(cors());


app.use(express.json())

app.use(require("./router/auth"))

app.get("/",(req, res) => {
    res.send("main")
})

app.listen(port,()=>{
    console.log(`server is working on port no. : ${port}`)
})