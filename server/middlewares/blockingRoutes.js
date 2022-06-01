const isSomething = (...roles)=>{

    return(
        (req,res,next)=>{
            console.log(req.user.role)
            console.log(roles)
            if(!roles.includes(req.user.role)){
                return next(res.status(400).json({
                    msg:`you need one of the ${roles} role to get access this route`
                }))
            }
            next();
        }
    )
}


const isLoggedIn = (req,res,next)=>{
    if(!req.user){
        return next(
            res.status(400).json({
                msg:"you need to be logged in in order to vieew thhis content"
            })
        )
    }

    next()
}

const isLoggedout = (req,res,next)=>{
    if(req.cookies.token){
        return next(
            res.status(400).json({
                msg:"you need to be logged out in order to vieew thhis content"
            })
        )
    }
    next()
}


module.exports = {
    isSomething,
    isLoggedIn,
    isLoggedout
}