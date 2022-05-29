const jwt = require('jsonwebtoken')
const adminModel = require('../models/adminModel')
const staffModel = require('../models/staffModel')
const userModel = require('../models/userModel')

const isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return next(res.status(401).json({
            err:"Unauthorized"
        }))
    }

    const tokenValue =  jwt.verify(token,process.env.JWT_SECRET)
    // console.log(tokenValue)

    let user = await userModel.findById(tokenValue.id)
    if(!user){
        const temp = await adminModel.findById(tokenValue.id)
        if(!temp){
            const temp2 = await staffModel.findById(tokenValue.id)

            req.user = temp2;
        }
        else{
            req.user = temp;
        }
    }
    else{
        req.user = user
    }
    // console.log(req.user)
    next()
}


module.exports = {isAuthenticated}