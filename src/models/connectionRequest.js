const mongoose = require("mongoose")
const connectionRequestSchema = new mongoose.Schema(
    {
      fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
      },
      toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
      },
      status:{
        type: String,
        enum:{
            values : ["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
        reuired: true,
        default:"PENDING"
      }

    },{ timestamps : true}
)
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
connectionRequestSchema.pre("save", function (next){
  const connectionRequest =  this;
  if(connectionRequest.fromUserId.equals(this.toUserId)){
    throw new Error("cannot send connection request to yourself!")
  }
  next();
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema)