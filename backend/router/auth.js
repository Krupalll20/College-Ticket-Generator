const jwt = require("jsonwebtoken");
const express = require("express");
// const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../model/user.js');
const Query = require("../model/query.js")
const authenticate = require("../middleware/authenticate")

require("../db/conn");

router.get("/", async (req, res) => {
    res.send("main")
})

router.post("/register", async (req, res) => {

    try {

        const { email, name, phone, password, department } = req.body;
        const role = "FACULTY"

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ res: "error", data: "plz fill field properly" });
        }

        const userExist = await User.findOne({ email: email });
        // console.log(userExist)
        if (userExist) {
            return res.status(400).json({ res: "error", data: "Email already exist" });
        }

        const user = await new User({ name, email, phone, password, department, role });
        await user.save();
        res.status(200).json({ res: "success", data: "user successfully reistered" });

        // const userId=user._id
        // const query = await new Query({userId})


    } catch (error) {
        res.status(400).json({ res: "error", data: "Failed to register" });
    }

});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("error : fill the data");
            return res.status(400).json({ res: 'error', data: "please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (!userLogin) {
            console.log("error : incorrect email");
            return res.status(400).json({ res: "error", data: "Please provide valid data" });
        }

        const isPassMatch = await bcrypt.compare(password, userLogin.password);

        if (!isPassMatch) {
            console.log("error");
            return res.status(400).json({ res: "error", data: "Please provide valid data" });
        }
        const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);
        // console.log(token)

        res.json({ res: "success", token: token , role:userLogin.role});

    } catch (error) {
        res.json({ res: "error", data:"Invalid Authentication"});
    }
})

router.get("/adminhome", authenticate, async (req, res) => {
    
    const query = await Query.find({ status: 'PENDING' })
    // console.log(query)

    const arr = []
    let j = 0
    for (var i = 0; i < query.length; ++i) {
        const obj = {}
        const user = await User.findOne({ _id: query[i].userId })
        obj.query = query[i].query
        obj.idx=query[i]._id
        obj.email = user.email
        obj.name = user.name
        obj.department = user.department
        obj.phone = user.phone
        arr[j] = obj
        j++
    }
    res.status(200).json({ res: 'Success', data: arr })
})  

router.post("/addquery", authenticate, async (req, res) => {
    const { _id } = req.user
    const { query } = req.body
    var obj = { query, userId: _id, status: 'PENDING' }
    const qu = await Query.create(obj)
    res.status(200).json({ res: 'Success' })
})

router.get("/getquery", authenticate, async (req, res) => {
    const { _id } = req.user
    const query = await Query.find({ userId: _id })
    res.status(200).json({ res: 'Success', data: query })
})

router.get('/deletebutton/:id',authenticate,async(req,res)=>{
    const {id} = req.params
    const query = await Query.findOneAndDelete({_id:id})
    res.status(200).json({res:'Success'})
})

router.get('/donebutton/:id',authenticate,async(req,res)=>{
    const {id} = req.params
    const query = await Query.findOneAndUpdate({_id:id},{status:'DONE'},{ runValidators: true, new: true, setDefaultsOnInsert: true })
    res.status(200).json({res:'Success',data:query})
})

module.exports = router;