const mongoose = require('mongoose');
const Joi = require('joi');

const toySchema = new mongoose.Schema({
    name:String,
    info:String,
    category:String,
    img_url:String,
    price:Number,
    date_created:{type:Date, default:Date.now()},
    user_id:String
});

exports.ToyModel = mongoose.model('toys', toySchema);

exports.validToy = (_dataBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(3).max(99).required(),
        info:Joi.string().min(5).max(300).required(),
        category:Joi.string().min(3).max(50).required(),
        img_url:Joi.string().required(),
        price:Joi.number().min(5).max(2000).required()
    });
    return joiSchema.validate(_dataBody);
}