const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[2,'name should be greater than 1 character'],
        maxlength:[15,'name should be less than 16 characters']
    },
    rollNumber:{
        type:Number,
        required:true,   
        unique:true,

    },
    semester:{
        type:Number,
        required:true,
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
    moileNumber:{
        type:Number,
        required:true,
        unique:true,
        minlength:[10,"this field should be of 10 characters"],
        maxlength:[10,"this field should be of 10 characters"]
    },
    token:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,"password should be atleast 8 characters long"]
    },
    role:{
        type:String,
        enum:["student","admin","staffIncharge","staff","superAdmin"],
        default:"student",
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})

module.exports = mongoose.model('users',userSchema);