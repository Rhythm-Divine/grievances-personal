const userModel = require('../models/userModel')

const registerUser = async(req,res)=>{
    const {name,rollNumber,semester,gender,collegeMail,mobileNumber,password,confirmPassword} = req.body
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
        role:"student"
    })
    console.log(user)

}

module.exports = {
    registerUser,
}