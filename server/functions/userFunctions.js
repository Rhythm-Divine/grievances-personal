const userModel = require('../models/userModel')
const mongooseDynamic = require('mongoose-dynamic-schemas')



const registerUser = async(req,res)=>{ // creating user
    const {name,rollNumber,semester,gender,collegeMail,mobileNumber,password,confirmPassword,branch} = req.body
    if(password !== confirmPassword){
        console.log("wrong password")
        res.status(400).json({
            err:"password did not matched"
        })
    }

    const user = await userModel.create({
        name,
        rollNumber,
        semester,
        gender,
        collegeMail,
        mobileNumber,
        password,
        branch,
        role:"student"
    })
    console.log(user)

    res.status(201).json({
        user
    })
}

const deleteUser = async(req,res)=>{
    const user = await userModel.findById(req.params.id) 
    if(!user){
        res.status(400).json({
            err:"user does not exists"            
        })
    }

    await userModel.findByIdAndDelete(user._id)
    res.status(200).json({
        msg:"user deleted successfully",
        deletedUser:user
    })
}

const getAllusers = async(req,res)=>{
    const users = await userModel.find()


    if(!users){
        res.status(400).json({
            msg:"bad request"
        })
    }

    res.status(200).json({
        users
    })
}

const createAdmin = async(req,res)=>{
    
}


module.exports = {
    registerUser,
    deleteUser,
    getAllusers,
    createAdmin
}