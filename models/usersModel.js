const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: { 
        type: Date, default: Date.now()
    },
    role: String
});

exports.UserModel = mongoose.model("toysUsers",userSchema);

//create token
exports.getToken = (_userId) => {
    let token = jwt.sign({_id:_userId},"MonkeysSecret",{expiresIn:"60mins"});
    return token;
}

exports.validUser = (_dataBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(99).required(),
        email:Joi.string().min(2).max(99).email().required(),
        password:Joi.string().min(2).max(99).required(),
        role:Joi.string().required()
    })

  return joiSchema.validate(_dataBody)
}

exports.validLogin = (_dataBody) => {
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(99).email().required(),
        password:Joi.string().min(2).max(99).required()
    })

    return joiSchema.validate(_dataBody)
}