 const adminauth = (req,res,next) =>{
    const token = "zytygyx"
    if(token === "zyx"){
        next()
    }
    else{
        console.log("unauthorized")
        res.status(401).send("unauthorized accesss")
    }
};
const userauth = (req,res,next) =>{
    const token = "abcd"
    if(token === "abcd"){
        next()
    }
    else{
        console.log("authorized access")
        res.status(401).send("unauthorized access")
    }
}

module.exports = {
    adminauth,
    userauth
}