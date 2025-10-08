 const jwt = require('jsonwebtoken');
const User = require('../models/user');
 const adminauth = (req,res,next) =>{
    const token = "zytygyx"
    if(token === "zyx"){
        next()
    }
    else{
        console.log("unauthorized")
        res.status(401).send("unauthorized accesss")
    }
};
const userauth = async(req,res,next) =>{
    try {
        const {token} = req.cookies
        if(!token){
            throw new Error("Token is not valid")
        }
        const decodedObj = await jwt.verify(token,"DEV@Tinder@1900")
        const {_id} = decodedObj
        const user = await User.findById({_id:_id}) 
        if(!user){
            throw new Error("User not found")
        }
        req.user= user
        next()
    }
    catch (error) {
        console.log(error)
         res.status(403).send("Error"+error.message)
    }
   
}
module.exports = {
    adminauth,
    userauth
}