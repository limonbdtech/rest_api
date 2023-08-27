let jwt = require('jsonwebtoken');
let checklogin = (req,res,next)=>{
    let {authorization} = req.headers
    try {
        let token = authorization.split(" ")[1]
        
        let  decoded = jwt.verify(token, process.env.token_security);
        let {username,userid} = decoded;
         req.username = username;
         req.userid = userid ;
         next()
    } catch (error) {
        next("authentication failed")
    }

}
module.exports = checklogin