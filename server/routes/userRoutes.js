const express = require('express')
const { registerUser, deleteUser, getAllusers, createAdmin, removeAdmin, getAllAdmins, getSingleAdmin, createStaffIncharge, createStaff, getAllStaffIncharges, getAllStaff, getSingleUser, getSingleStaffIncharge, removeStaffIncharge, getSingleStaff, removeStaff } = require('../functions/userFunctions')

const router = express.Router()



//super admin routes
router.route('/registerAdmin').post(createAdmin)
router.route('/delete/admin/:id').delete(removeAdmin)
router.route('/admins/all').get(getAllAdmins)
router.route('/admins/:id').get(getSingleAdmin)

// student routes
router.route('/registerStudent').post(registerUser)


//admin routes
router.route('/registerStaffIncharge').post(createStaffIncharge)
router.route('/delete/student/:id').delete(deleteUser)
router.route('/students/all').get(getAllusers)
router.route('/student/:id').get(getSingleUser)
router.route('/staffIncharge/all').get(getAllStaffIncharges)
router.route('/staffIncharge/:id').get(getSingleStaffIncharge)
router.route('/delete/staffIncharge/:id').delete(removeStaffIncharge)

// staff incharge routes
router.route('/registerStaff').post(createStaff)
router.route('/staff/all').get(getAllStaff)
router.route('/staff/:id').get(getSingleStaff)
router.route('/delete/staff/:id').delete(removeStaff)


//staff routes


module.exports = router