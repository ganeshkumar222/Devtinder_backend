const express = require("express")
const { connectDb } = require("./config/database")
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

const {authRouter} = require("./routes/auth")
const {profileRouter} = require("./routes/profile")
const {requestRouter} = require("./routes/request")
const {userRouter} = require("./routes/user")

app.use("/",authRouter)
app.use("/user",profileRouter)
app.use("/request",requestRouter)
app.use("/user-requests",userRouter)

connectDb().then(() => {
    console.log("Database connected")
    const PORT = 3000
    app.listen(PORT, () => {
        console.log("App is listening on port", PORT)
    })
}).catch((err) => {
    console.log("Database conection failed")
})
