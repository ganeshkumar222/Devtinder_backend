const express = require("express")
const {  validateSignupData } = require("../utils/validation")
const authRouter = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
   
    try {
        console.log(req.body,"before validation")
        validateSignupData(req)//validation before Db hit
        console.log(req.body,"after validation")
         const {password, firstName , lastName , emailId} = req.body
         const passwordHash =await bcrypt.hash(password , 10)
         console.log(passwordHash)
         const user = new User({
            firstName, lastName , emailId, password: passwordHash
         })
        await user.save()
        res.send("User created sucessfully")
    } catch (error) {
        res.status(400).send("Error saving the user:" + error.message)
    }
})
authRouter.post("/login" , async (req,res)=>{
    try {
        const { emailId , password } = req.body 
        const user  =  await User.findOne({emailId : emailId})
        if(!user){
            res.status(404).send("Invalid credentails")
        } 
        else{
            console.log(user , user.password , password)
            const isPasswordvalid = await user.validatepassword(password)
            if(!isPasswordvalid){
                res.status(403).send("Invalid credentails")
            }
            else{
                const token  = await user.getJWT()
                console.log("token",token)
                res.cookie("token", token , {
                    expires:new Date(Date.now() + 8 *3600000)
                })
                res.send(user)
            }

        }
    } catch (error) {
        console.log(error)
         res.status(500).send("Error saving the user:" + error.message)
    }
})
authRouter.post("/logout", async(req,res)=>{
    try {
        res.cookie("token",null,{
            expires: new Date(Date.now())
        }).send("user loggeed out successfully")
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Error  logging out",+ error.message)
    }
})
module.exports = {
    authRouter
}