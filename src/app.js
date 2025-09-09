const express = require("express")
const app = express()
app.use("/",(req,res)=>{
    res.send("welcome to devtinder")
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("App is listening on port",PORT)
})