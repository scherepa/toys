const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/hipo5", {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;
db.on('error', console.error.bind("bad connection to db"));
db.once('open', ()=>{
    console.log("mongo connected successfully");
});
module.exports = db;