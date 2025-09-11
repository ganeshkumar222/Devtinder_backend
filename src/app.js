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
    try {
        throw new Error("error check")
         res.send("user data fetched successsfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
   
})
app.use("/",(err, req, res, next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})