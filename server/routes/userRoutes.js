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
const { isLoggedout,isSomething,isLoggedIn } = require('../middlewares/blockingRoutes')

const router = express.Router()



// for all
router.route('/logout').post(isLoggedout,logoutUser)

//super admin routes
router.route('/registerAdmin').post(isAuthenticated,isLoggedIn,isSomething('superAdmin'),createAdmin)
router.route('/delete/admin/:id').delete(isAuthenticated,isLoggedIn,isSomething('superAdmin'),removeAdmin)
router.route('/admins/all').get(isAuthenticated,isLoggedIn,isSomething('superAdmin'),getAllAdmins)
router.route('/admins/:id').get(isAuthenticated,isLoggedIn,isSomething('superAdmin'),getSingleAdmin)

// student routes
router.route('/registerStudent').post(isLoggedout,registerUser)
router.route('/login/student').post(isLoggedout,loginStudent)


//admin routes
router.route('/registerStaffIncharge').post(isAuthenticated,isLoggedIn,isSomething('admin'),createStaffIncharge)
router.route('/delete/student/:id').delete(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),deleteUser)
router.route('/students/all').get(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),getAllusers)
router.route('/student/:id').get(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),getSingleUser)
router.route('/staffIncharge/all').get(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),getAllStaffIncharges)
router.route('/staffIncharge/:id').get(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),getSingleStaffIncharge)
router.route('/delete/staffIncharge/:id').delete(isAuthenticated,isLoggedIn,isSomething('admin'),removeStaffIncharge)
router.route('/staff/all').get(isAuthenticated,isLoggedIn,isSomething('staffIncharge','superAdmin'),getAllStaff)
router.route('/login/admin').post(isLoggedout,loginAdmin)

// staff incharge routes
router.route('/registerStaff').post(isAuthenticated,isLoggedIn,isSomething('staffIncharge'),createStaff)
router.route('/staff/:id').get(isAuthenticated,isLoggedIn,isSomething('staffIncharge,superAdmin'),getSingleStaff)
router.route('/delete/staff/:id').delete(isAuthenticated,isLoggedIn,isSomething('staffIncharge'),removeStaff)
router.route('/login/staffIncharge').post(loginStaffIncharge)
router.route('/staffs/me').get(isAuthenticated,getStaffRespectiveToStaffIncharge) // get staff of same category as that of instructor 


//staff routes
router.route('/login/staff').post(isLoggedout,loginStaff)


module.exports = router