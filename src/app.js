const express = require("express")
const app = express()
app.get("/user/:userID",(req,res)=>{
    console.log(req.params)
    res.send({
        firstname : "Ganesh",
        lastname: "kumar"
    })
})
app.post("/user",(req,res)=>{
    console.log(req.body)
    console.log("save the data to the database")
    res.send("user added suceesffully")
})
app.use("/test",(req,res)=>{
    res.send("welcome to devtinder")
})
app.delete("/user",(req,res)=>{
    res.send("user deleted successfully")
})
app.patch("/user",(req,res)=>{
    res.send("user updated successfully")
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})