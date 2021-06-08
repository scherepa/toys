let jwt = require("jsonwebtoken");

exports.authToken = (req,res,next) => {
  let validToken = req.header("x-auth-token");
  if(!validToken){
    return res.status(401).json({msg:"no token -no information!"});
  }
  try{
    let decodeToken = jwt.verify(validToken,"MonkeysSecret");
    // after the check we send decoded data to the req for next functions usage
    req.tokenData = decodeToken;
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({err:"token invalid or expired"});
  }
}