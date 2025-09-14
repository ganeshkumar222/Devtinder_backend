const mongoose = require("mongoose")

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://ganeshgmv004:rImO11MmAtYjZCUr@cluster0.csgisfy.mongodb.net/devTinder")
}

module.exports = {
  connectDb
}