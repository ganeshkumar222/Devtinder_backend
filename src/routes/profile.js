const express = require("express")
const {  userauth } = require("../middlewares/auth")
const profileRouter = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const {validateEditProfileData, validateChangePassword} = require("../utils/validation")

profileRouter.get("/profile",userauth, async(req,res)=>{
    try {
        const user  = req.user
        res.send(user)
    } catch (error) {
        res.status(400).send("Error"+err.message)
    }
   
})
profileRouter.patch("/profile/edit",userauth,async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser =  req.user
        console.log(loggedInUser)
        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]))
        console.log(loggedInUser)
        await loggedInUser.save()
        // res.send("profile updated successfully")
        res.json({
            message:"Profile updated successfully",
            data:loggedInUser
        })

    } catch (error) {
        res.status(400).send("Error:"+error.message)
    }
})
profileRouter.patch("/changepassword",userauth,async(req,res)=>{
try {
    const user = req.user
    console.log(validateChangePassword(req), " in handler")
    if(!validateChangePassword(req)){
        console.log("validation error")
        throw new Error("Bad Request")
    }
    const oldPasswordCheck = await bcrypt.compare(req.body.currentPassword , user.password)
    if(!oldPasswordCheck){
        throw new Error("Current password mismatch")
    }
    const hashPassword = await bcrypt.hash(req.body.newPassword,10)
    user.password = hashPassword
    await user.save()
    res.json({
        message:"password updated successfully"
    })
} catch (error) {
    res.status(400).send("Error"+error.message)
}
})
module.exports = {
    profileRouter
}