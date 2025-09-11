const express = require("express")
const app = express()
const { adminauth, userauth}= require("./middlewares/auth")
app.get("/admin/getalldata", adminauth,(req,res)=>{
res.send("all data sent")
})
app.get("/admin/getadmindata",adminauth, (req,res)=>{
res.send("all admin data sent")
})
app.get("/user",userauth,(req,res,next)=>{
    res.send("user data fetched successsfully")
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})