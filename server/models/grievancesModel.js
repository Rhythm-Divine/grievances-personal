const mongoose = require('mongoose')

const grievancesSchema = mongoose.Schema({
    type:{
        type:String,
        default:'other',
        required:true
    },
    status:{    
        type:String,
        enum:['initiated','toAdmin','toIncharge','toStaff','completed','verified'],
        default:'initiated',
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    assignedToAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'incharges',
    },
    assignedToIncharge:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff',
        required:false
    },
    assignedToStaff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff',
        required:false
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students',
        required:true
    },
    urgency:{
        type:String,
        enum:['high','med','low'],
        required:true,
        default:'low'
    },
    reviewGiven:{
        required:false,
        by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'students',
            // required:true,
        },
        rating:{
            type:Number,
            // required:true,
        },
        description:{
            type:String,
            // required:false
        }
    },
})

module.exports = mongoose.model('grievances',grievancesSchema); // can be renamed as issues