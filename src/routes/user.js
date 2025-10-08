const express =  require("express")
const { userauth } = require("../middlewares/auth")
const connectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const userRouter = express.Router()
// Get all the pending connection request for the logged in user

userRouter.get("/received",userauth, async (req,res)=>{
    try {
        const loggedInUser =  req.user
        console.log(loggedInUser._id)
        const connectionRequests = await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","about","skills"])
        console.log(connectionRequests)
        res.json({
            message:"data fetched succesfully",
            connectionRequests
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})
userRouter.get("/connections",userauth, async(req,res)=>{
 try {
    const loggedInUser = req.user
    const connections = await connectionRequest.find({
        $or:[
            { toUserId: loggedInUser._id, status:"accepted"},
              { fromUserId: loggedInUser._id, status:"accepted"},
        ]
    }).populate("fromUserId toUserId", ["firstName","lastName","photoUrl","about","skills"]);
    const connectionsData = connections.map((data)=>  data.fromUserId._id.equals(loggedInUser._id)? data.toUserId : data.fromUserId)
    res.json({
        data:connectionsData
    })
 } catch (error) {
    res.status(400).json({
        message:error.message
    })
 }
})
userRouter.get("/feed", userauth , async(req,res)=>{
    try {
        const loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit>50? 50: limit
        const skip = (page-1)*limit
        const connectionRequests = await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed =  new Set()
        connectionRequests.forEach((request)=>{
            hideUsersFromFeed.add(request.fromUserId.toString())
            hideUsersFromFeed.add(request.toUserId.toString())
        })
        console.log(hideUsersFromFeed)
        const users = await User.find({
           $and:[ {_id:{$nin: Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}} ]
        }).select("firstName lastName photoUrl about skills").skip(skip).limit(limit)
        res.json({
            data:users
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = {
    userRouter
}