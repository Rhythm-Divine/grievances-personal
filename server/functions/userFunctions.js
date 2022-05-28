const userModel = require('../models/userModel')
const adminModel = require('../models/adminModel')
const staffModel = require('../models/staffModel')

const registerUser = async(req,res)=>{ // creating user
    const {name,rollNumber,semester,gender,collegeMail,mobileNumber,password,confirmPassword,branch} = req.body
    if(password !== confirmPassword){
        // console.log("wrong password")
        return res.status(400).json({
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
        return res.status(400).json({
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
        return res.status(400).json({
            msg:"bad request"
        })
    }

    res.status(200).json({
        users
    })
}

const getSingleUser = async(req,res)=>{
    const user = await userModel.findById(req.params.id)
    if(!user){
        return res.status(400).json({
            msg:"user with this id does not exists"
        })
    }

    res.status(200).json({
        user
    })
}

const createAdmin = async(req,res)=>{

    const {name,gender,collegeMail,mobileNumber,password,confirmPassword} = req.body

    if(password !== confirmPassword){

        return res.status(400).json({
            err:"password did not matched"
        })
    }
    const admin = await adminModel.create({
        name,
        gender,
        collegeMail,
        mobileNumber,
        password
    })

    res.status(200).json({
        msg:"admin created sucessfully",
        admin
    })
}

const removeAdmin =  async(req,res)=>{
    const admin = await adminModel.findById(req.params.id);
    if(!admin){
        return res.status(400).json({
            msg:"admin with this id does not exists"
        })
    }

    res.status(200).json({
        msg:"admin deleted successfully",
        admin
    })
}

const getAllAdmins = async(req,res)=>{
    const admins = await adminModel.find()

    res.status(200).json({
        admins
    })
}

const getSingleAdmin = async(req,res)=>{
    const admin = await adminModel.findById(req.params.id)
    if(!admin){
        return res.status(400).json({
            msg:"admin with this id does not exists"
        })
    }

    res.status(200).json({
        admin
    })
}


const createStaffIncharge = async (req,res)=>{
    const {name,gender,collegeMail,mobileNumber,password,confirmPassword,category} = req.body

    if(password !== confirmPassword){
        return res.status(400).json({
            msg:"password did not matched"
        })
    }
    
    const staffIncharge = await staffModel.create({
        name,
        gender,
        collegeMail,
        mobileNumber,
        password,
        category,
        role:"staffIncharge"
    })

    res.status(201).json({
        msg:"staff inchharge created successfully",
        staffIncharge
    })
}

function checkIncharge(el){ // helper function to get staff and staff incharges
    return (el.role === 'staffIncharge')
}

function checkStaff(el){
    return (el.role === 'staff')
}

const getAllStaffIncharges = async(req,res)=>{
    const allStaff = await staffModel.find()
    if(!allStaff){
        return res.status(400).json({
            err:"BAD REQUEST",
        })
    }


    const staffIncharges = allStaff.filter(checkIncharge)
    if(!staffIncharges){
        return res.status(400).json({
            err:"no staff incharge fouund"
        })
    }
    
    res.status(200).json({
        staffIncharges
    })
}

const createStaff = async (req,res)=>{
    const {name,gender,collegeMail,mobileNumber,password,confirmPassword,category} = req.body

    if(password !== confirmPassword){
        return res.status(400).json({
            msg:"password did not matched"
        })
    }
    
    const staffIncharge = await staffModel.create({
        name,
        gender,
        collegeMail,
        mobileNumber,
        password,
        category,
        role:"staff"
    })

    res.status(201).json({
        msg:"staff created successfully",
        staffIncharge
    })
}

const getAllStaff = async(req,res)=>{
    const allStaff = await staffModel.find()
    if(!allStaff){
        return res.status(400).json({
            err:"BAD REQUEST",
        })
    }


    const staff = allStaff.filter(checkStaff)
    if(!staff){
        return res.status(400).json({
            err:"no staff found"
        })
    }
    
    res.status(200).json({
        staff
    })
}

const getSingleStaffIncharge = async(req,res)=>{
    const staffMem = await staffModel.findById(req.params.id);
    if(!staffMem){
        return res.status(400).json({
            err:"staff incharge with this id not found"
        })
    }

    if(staffMem.role !== 'staffIncharge'){
        return res.staff(400).json({
            err:"given id is not of a staff incharge"
        })
    }

    res.status(200).json({
        staffIncharge:staffMem
    })
}

const removeStaffIncharge = async(req,res)=>{
    const staffMem = await staffModel.findById(req.params.id);
    if(!staffMem){
        return res.status(400).json({
            err:"staff incharge with this id not found"
        })
    }

    if(staffMem.role !== 'staffIncharge'){
        return res.staff(400).json({
            err:"given id is not of a staff incharge"
        })
    }

    const deletedStaffIncharge = await staffModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        msg:"staff incharge deleted successfully",
        deletedStaffIncharge
    })
}

const getSingleStaff = async(req,res)=>{
    const staffMem = await staffModel.findById(req.params.id);
    if(!staffMem){
        return res.status(400).json({
            err:"staff incharge with this id not found"
        })
    }

    if(staffMem.role !== 'staff'){
        return res.staff(400).json({
            err:"given id is not of a staff "
        })
    }

    res.status(200).json({
        staff:staffMem
    })
}

const removeStaff = async(req,res)=>{
    const staffMem = await staffModel.findById(req.params.id);
    console.log(staffMem)
    if(!staffMem){
        return res.status(400).json({
            err:"staff incharge with this id not found"
        })
    }

    if(staffMem.role !== 'staff'){
        return res.staff(400).json({
            err:"given id is not of a staff "
        })
    }

    const deletedMember = await staffModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        msg:"staff member removed successfully",
        member: deletedMember
    })
}

module.exports = {
    registerUser,
    deleteUser,
    getAllusers,
    createAdmin,
    removeAdmin,
    getAllAdmins,
    getSingleUser,
    getSingleAdmin,
    createStaffIncharge,
    createStaff,
    getAllStaffIncharges,
    getAllStaff,
    getSingleStaffIncharge,
    removeStaffIncharge,
    getSingleStaff,
    removeStaff
}