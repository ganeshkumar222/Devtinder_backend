const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new  mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        minLength:4
    },
    lastName:{
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        validate(value) {
           if(!validator.isEmail(value)){
               throw new Error("Email Id is not valid");
           }
        }
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        lowercase:true,
        enum:{
         values : ["male","female","other"],
         message:`{VALUE} gender is not allowed`
        },
        validate(value){
            if(!value) return
            const valueCase = value.toLowerCase()
            if(!["male","female","others"].includes(valueCase)){
               throw new Error("Gender data is not valid");
            }
        }
    },
    age:{
        type: Number,
        min:18
    },
    photoUrl : {
        type: String,
        default: "https://www.shutterstock.com/image-vector/simple-gray-avatar-icons-representing-600nw-2473353263.jpg",
        validate(value){
                  if(!validator.isURL(value)){
                    throw new Error("Not a valid Url")
                  }
        }
    },
    skills:{
        type: [String]
    },
    about:{
        type: String,
        default: "This is default about the user"
    }
},{ timestamps: true});
userSchema.methods.getJWT = async function (){
    const user = this

    const token = await jwt.sign({_id : user._id},"DEV@Tinder@1900",{
        expiresIn:"7d"
    })
    return token
}
userSchema.methods.validatepassword = async function(userEnteredPassword){
    const user = this
    const HashPassword = user.password

    const isPasswordvalid = await bcrypt.compare(
        userEnteredPassword , HashPassword
    )
    return isPasswordvalid
}
// const User = mongoose.model("User",userSchema)
module.exports = mongoose.model("User",userSchema)