const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res)=>{
    fs.readFile('./public/readme.md.html', (err, data)=>{
        if (err) throw err;
        const ourData = String(data);
        res.writeHead(200, {'Content-Type':"text/html"});
        res.write(ourData);
        res.end();
    })
})

module.exports = router;