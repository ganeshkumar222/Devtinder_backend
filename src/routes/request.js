const express = require("express")
const requestRouter = express.Router()
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")
const { userauth } = require("../middlewares/auth")

requestRouter.post("/send/:status/:toUserId", userauth, async (req, res, next) => {
    try {
        const fromUser = req.user
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status
        console.log(fromUserId, toUserId, status)
        const allowedStats = ["ignored", "interested"]
        if (!allowedStats.includes(status)) {
            throw new Error("Invalid status type")
        }
        const toUser = await User.findById(toUserId)
        if (!toUser) {
            throw new Error("Receiver does not exist")
        }
        const existingconnectionrequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingconnectionrequest) {
            throw new Error("request already exists")
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()
        console.log(data)
        res.json({
            success: true,
            status,
            message: `You have ${status} the connection request with ${toUser.firstName}`
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
})
requestRouter.post("/review/:status/:requestId",userauth,async(req,res)=>{
try {
    const loggedUser = req.user
    const {status , requestId} = req.params
    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            message : "Status not allowed"
        })
    }
    console.log(requestId , loggedUser , status ,"review connection request" )
    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId:loggedUser._id,
        status:"interested",
    })
    if(!connectionRequest){
        return res.status(404).json({
            message:"connection request not found"
        })
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save()
    res.json({
        message:`connection request ${status}`,data
    })
} catch (error) {
     console.log(error)
        res.status(400).json({ error: error.message });
}
})
module.exports = {
    requestRouter
}