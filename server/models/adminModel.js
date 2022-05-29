const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[2,'name should be greater than 1 character'],
        maxlength:[15,'name should be less than 16 characters']
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        default:'male',
    },
    collegeMail:{
        type:String,
        required:true,
        unique: true,
        validate:[validator.isEmail , "this field takes only email values"]
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true,
        minlength:[8,"this field should be of 10 characters"],
        maxlength:[10,"this field should be of 10 characters"]
    },
    token:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password should be atleast 8 characters long"]
    },
    role:{
        type:String,
        enum:["admin","staffIncharge","superAdmin"],
        default:"admin",
        required:true,
    }
})

adminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})

adminSchema.methods.comparePassword = async function(password){
    // console.log(this)
    const isPassMatched = await bcrypt.compare(password,this.password)
    // console.log(isPassMatched)
    return isPassMatched;
}

adminSchema.methods.createJwtToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES
        }
    )
}

module.exports = mongoose.model('incharges',adminSchema); // can  be renamed as faculty