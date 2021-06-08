const express = require('express');
const {
    authToken
} = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const {
    validToy, ToyModel
} = require('../models/toyModel');
const router = express.Router();

router.get("/", async(req, res) => {
    let page = req.query.page ? req.query.page : 0;
    let perpage = 10;
    if (!req.query.s) {
        let data = await ToyModel.find({}).skip(page * perpage).limit(perpage);
        return res.json(data);
    }
    let word = RegExp(`${req.query.s}`);
    data = await ToyModel.find({
        $or: [{
            name: word
        }, {
            info: word
        }]
    }).skip(page * 10).limit(10);

    res.json(data);
})

router.get("/prices", async(req, res) => {
    let page = req.query.page ? req.query.page : 0;
    let perpage = 10;
    let min = req.query.min ? req.query.min : 5;
    let max = req.query.max ? req.query.max : 2000;
    let sort = (req.query.sort) ? req.query.sort : "price";
    let reverse = req.query.reverse ? -1 : 1;
    let data = await ToyModel.find({
        $and: [{
            price: {
                $lte: max
            }
        }, {
            price: {
                $gte: min
            }
        }]
    }).sort({
        [sort]: reverse
    }).skip(page * perpage).limit(perpage);
    return res.json(data);


    res.json(data);
})

router.get('/cat', async(req, res) => {
    let data = await ToyModel.distinct("category");
    res.json(data);
})

router.get("/cat/:catname", async(req, res) => {
    //res.json({msg:"toys work!"});
    let page = req.query.page ? req.query.page : 0;
    let perpage = 10;
    try {
        let catname = req.params.catname;
        let data = await ToyModel.find({
            category: RegExp(`${catname}`)
        }).skip(page * perpage).limit(perpage);
        //console.log(data); it doesn't work with !data...
        data = data.length == 0 ? {
            msg: "no such category"
        } : data;
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.delete("/:delId", authToken, async(req, res) => {
    let delId = req.params.delId;
    try {
        let data = await ToyModel.deleteOne({
            _id: delId,
            user_id: req.tokenData._id
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.put("/:editId", authToken, async(req, res) => {
    let editId = req.params.editId;
    let validBody = validToy(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await ToyModel.updateOne({
            _id: editId,
            user_id: req.tokenData._id
        }, req.body);
        console.log(data);
        if (!data) {
            return res.status(401).json(err);
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.post("/", authToken, async(req, res) => {
    let validBody = validToy(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let toy = new ToyModel(req.body);
        toy.user_id = req.tokenData._id;
        await toy.save();
        res.status(200).json(toy);
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})
module.exports = router;
