const adminModel = require('../models/adminModel')
const grievanceModel = require('../models/grievancesModel')
const staffModel = require('../models/staffModel')

const createNewGrievances = async(req,res)=>{
    const {type,urgency,description} = req.body

    const grievance = await grievanceModel.create({
        type,
        by:req.user.id,
        urgency,
        description
    })

    res.status(201).json({
        msg:"grievance registered successfully",
        grievance
    })
}

const getAllGrievances = async(req,res)=>{
    const grievances = await grievanceModel.find({})

    res.status(200).json({
        grievances
    })
}

const getUserGrievances = async(req,res)=>{
    const grievances = await grievanceModel.find({});
    
    let requiredGrievances = [];
    grievances.forEach((grievance)=>{
        if(grievance.by == req.user.id){
            requiredGrievances.push(grievance)
        }
    })

    res.status(200).jsoon({
       grievances:requiredGrievances 
    })
}

const getSingleGrievance = async(req,res)=>{
    console.log(req.params.id)
    const grievance = await grievanceModel.findOne({id:req.params.id})

    if(!grievance){
        return res.status(400).json({
            err:"grievance with this id not found"
        })
    }

    res.status(200).json({
        grievance
    })
}

const assignGrievanceToAdmin = async(req,res)=>{
    let grievance = await grievanceModel.findById(req.params.id)
    if(!grievance){
        return res.status(400).json({
            err:"grievance with this id not found"
        })
    }
    const {adminId} = req.body;
    const adminToBeAssigned = await adminModel.findById(adminId)
    if(!adminToBeAssigned){
        return res.status(400).json({
            msg:"admin with given id not found"
        })
    }
    grievance.assignedToAdmin = adminToBeAssigned;
    grievance.status = 'toAdmin';

    await grievance.save();
    res.status(200).json({
        grievance
    })
}

const assignGrievanceToStaffIncharge = async(req,res)=>{
    let grievance = await grievanceModel.findById(req.params.id)
    if(!grievance){
        return res.status(400).json({
            err:"grievance with this id not found"
        })
    }
    const {staffInId} = req.body;
    const staffInToBeAssigned = await staffModel.findById(staffInId)
    if(!staffInToBeAssigned){
        return res.status(400).json({
            msg:"staffIncharge with given id not found"
        })
    }
    if(staffInToBeAssigned.role !== 'staffIncharge'){
        return res.status(400).json({
            msg:"staff with given id not found"
        })
    }
    grievance.assignedToIncharge = staffInToBeAssigned;
    grievance.status = 'toIncharge';

    await grievance.save();
    res.status(200).json({
        grievance
    })
}

const assignGrievanceToStaff = async(req,res)=>{
    let grievance = await grievanceModel.findById(req.params.id)
    if(!grievance){
        return res.status(400).json({
            err:"grievance with this id not found"
        })
    }
    const {staffId} = req.body;
    const staffToBeAssigned = await staffModel.findById(staffId)
    if(!staffToBeAssigned){
        return res.status(400).json({
            msg:"staff with given id not found"
        })
    }
    if(staffToBeAssigned.role !== 'staff'){
        return res.status(400).json({
            msg:"staff with given id not found"
        })
    }

    grievance.assignedToStaff = staffToBeAssigned;
    grievance.status = 'toStaff';

    await grievance.save();
    res.status(200).json({
        grievance
    })
}

const completeGrievanceRequestByStaff = async(req,res)=>{
    let grievance = await grievanceModel.findById(req.params.id)
    if(!grievance){
        return res.status(400).json({
            err:"grievance with this is not found"
        })
    }

    grievance.status = 'completed'
    grievance.save()

    res.status(200).json({
        grievance
    })
}

const verifyGrievance = async(req,res)=>{
    let grievance = await grievanceModel.findById(req.params.id)
    if(!grievance){
        return res.status(400).json({
            err:"grievance with this is not found"
        })
    }

    grievance.status = 'verified'
    grievance.save()

    res.status(200).json({
        grievance
    })
}

module.exports = {
    createNewGrievances,
    getAllGrievances,
    getUserGrievances,
    getSingleGrievance,
    assignGrievanceToAdmin,
    assignGrievanceToStaffIncharge,
    assignGrievanceToStaff,
    completeGrievanceRequestByStaff,
    verifyGrievance
}