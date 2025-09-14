const express = require("express")
const {connectDb} = require("./config/database")
const app = express()
const { adminauth, userauth}= require("./middlewares/auth")
const User = require("./models/user")
app.use(express.json())
app.post("/signup",async(req,res)=>{
    console.log(req.body)
 //creating a new instance of User model
 const user = new User(req.body)
 try {
     await user.save()
 res.send("User created sucessfully")
 } catch (error) {
    res.status(400).send("Error saving the user:" + error.message)
 }
})
connectDb().then(()=>{
    console.log("Database connected")
const PORT = 3000
app.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})
}).catch((err)=>{
   console.log("Database conection failed")
})
