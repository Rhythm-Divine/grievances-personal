const loginUser = async (req,res,model,id,password)=>{
    const user = await model.findById(id);
    // console.log(model)
    if(!user){
        // console.log("here")
        return res.status(400).json({
            err:"user with this email does not exists"
        })
    }

    const isPasswordMatched = await user.comparePassword(password)
    
    if(!isPasswordMatched){
        return res.status(401).json({
            err:"password did not matched"
        })
    }

    sendToken(req,res,user)
}

const sendToken = (req,res,user)=>{
    const token = user.createJwtToken()
    // console.log(token)
    return res.status(200).cookie('token',token,{
        httpOnly:true,
        expiresIn : new Date(Date.now() + process.env.COOKIE_FINISH)
    }).json({
        msg:"logged in successfully",
        user
    })
}

module.exports = {loginUser}