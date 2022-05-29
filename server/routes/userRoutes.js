const express = require('express')
const { registerUser,
        deleteUser,
        getAllusers, 
        createAdmin, 
        removeAdmin, 
        getAllAdmins, 
        getSingleAdmin, 
        createStaffIncharge, 
        createStaff, 
        getAllStaffIncharges, 
        getAllStaff, 
        getSingleUser, 
        getSingleStaffIncharge, 
        removeStaffIncharge, 
        getSingleStaff, 
        removeStaff,
        loginStudent,
        loginAdmin,
        loginStaffIncharge,
        loginStaff,
        logoutUser,
        getStaffRespectiveToStaffIncharge} = require('../functions/userFunctions')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()



// for all
router.route('/logout').post(logoutUser)

//super admin routes
router.route('/registerAdmin').post(isAuthenticated,createAdmin)
router.route('/delete/admin/:id').delete(isAuthenticated,removeAdmin)
router.route('/admins/all').get(isAuthenticated,getAllAdmins)
router.route('/admins/:id').get(isAuthenticated,getSingleAdmin)

// student routes
router.route('/registerStudent').post(registerUser)
router.route('/login/student').post(loginStudent)


//admin routes
router.route('/registerStaffIncharge').post(isAuthenticated,createStaffIncharge)
router.route('/delete/student/:id').delete(isAuthenticated,deleteUser)
router.route('/students/all').get(isAuthenticated,getAllusers)
router.route('/student/:id').get(isAuthenticated,getSingleUser)
router.route('/staffIncharge/all').get(isAuthenticated,getAllStaffIncharges)
router.route('/staffIncharge/:id').get(isAuthenticated,getSingleStaffIncharge)
router.route('/delete/staffIncharge/:id').delete(isAuthenticated,removeStaffIncharge)
router.route('/staff/all').get(isAuthenticated,getAllStaff)
router.route('/login/admin').post(loginAdmin)

// staff incharge routes
router.route('/registerStaff').post(createStaff)
router.route('/staff/:id').get(getSingleStaff)
router.route('/delete/staff/:id').delete(removeStaff)
router.route('/login/staffIncharge').post(loginStaffIncharge)
router.route('/staffs/me').get(isAuthenticated,getStaffRespectiveToStaffIncharge) // get staff of same category as that of instructor 



//staff routes
router.route('/login/staff').post(loginStaff)


module.exports = router