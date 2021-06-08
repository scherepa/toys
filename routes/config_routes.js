const indexR = require("./index");
const toysR = require("./toys");
const usersR = require("./users");

exports.routerInit = (app)=>{
    app.use("/", indexR);
    app.use("/toys", toysR);
    app.use("/users", usersR);
    
    app.use((req, res)=>{
        res.json({msg: "404 Page not found..."});
    });
}