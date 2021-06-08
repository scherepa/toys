const express = require('express');
const bcrypt = require('bcrypt');
const {pick} = require('lodash');
const {UserModel, validUser, validLogin, getToken} = require('../models/usersModel');
const {authToken} = require('../middlewares/auth');

const router = express.Router();

router.get("/", async(req,res) => {
    /* res.json({msg: 'users works'}); */
    //let data = UserModel.find()
    let page = req.query.page ? req.query.page : 0;
    let perpage = 10;
    let data = await UserModel.find({},{password:0}).skip(page*perpage).limit(perpage);
    return res.json(data);
})

router.get("/userinfo", authToken, async(req, res) => {
    try{
        let data = await UserModel.findOne({_id:req.tokenData._id},{password:0});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})

router.post("/login", async (req, res) => {
    let validBody = validLogin(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        //check email
        let user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.status(401).json("user not found");
        }
        //check password
        let pass = await bcrypt.compare(req.body.password,user.password);
        if(!pass){
            return res.status(401).json("invalid password");
        }
        //everything ok then creat token for user wich is valid for 60min
        let newToken = getToken(user._id);
        res.status(200).json({token:newToken});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})

router.post("/", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try{
        let user = new UserModel(req.body);
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(200).json(pick(user,["name","email","_id","createdAt"]));
    } 
    catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

module.exports = router;