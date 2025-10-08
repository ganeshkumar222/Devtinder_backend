const validator = require('validator')
const validateSignupData = (req) =>{
    const { firstName, lastName , emailId , password } = req.body

    if(!firstName || !lastName) {
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please Enter a Strong Password")
    }

}
const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstName","lastName","PhotoUrl","gender","age","about","skills"]
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))
    return isEditAllowed
}
const validateChangePassword = (req) =>{
   const  {currentPassword , newPassword} = req.body
    const allowedFields = ["currentPassword","newPassword"]
    const isPasswordChangeAllowed = Object.keys(req.body).every(field => allowedFields.includes(field))
    console.log(isPasswordChangeAllowed)
    if(!isPasswordChangeAllowed){
        return isPasswordChangeAllowed
    }
    else if(!validator.isStrongPassword(newPassword)){
        console.log("password val;idation error")
        throw new Error("please Enter a Strong Password")
    }
    return isPasswordChangeAllowed
}
module.exports = {
    validateSignupData,
    validateEditProfileData,
    validateChangePassword
}