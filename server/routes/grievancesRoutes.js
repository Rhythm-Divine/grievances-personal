const express = require('express')
const { createNewGrievances, 
        getAllGrievances, 
        getUserGrievances, 
        getSingleGrievance, 
        assignGrievanceToAdmin,
        assignGrievanceToStaffIncharge,
        assignGrievanceToStaff,
        completeGrievanceRequestByStaff,
        verifyGrievance} = require('../functions/grievancesFunctions')

const {isAuthenticated} = require('../middlewares/auth')
const {isSomething, isLoggedIn} = require('../middlewares/blockingRoutes')
const router = express.Router()


router.route('/create').post(isAuthenticated,isLoggedIn,isSomething('student'),createNewGrievances)
router.route('/all').get(isAuthenticated,isLoggedIn,isSomething('superAdmin'),getAllGrievances)
router.route('/me').get(isAuthenticated,isLoggedIn,isSomething('student'),getUserGrievances)
router.route('/single/:id').get(isAuthenticated,isLoggedIn,isSomething('admin','superAdmin'),getSingleGrievance)
router.route('/assign/admin/:id').post(isAuthenticated,isLoggedIn,isSomething('superAdmin'),assignGrievanceToAdmin)
router.route('/assign/staffIncharge/:id').post(isAuthenticated,isLoggedIn,isSomething('admin'),assignGrievanceToStaffIncharge)
router.route('/assign/staff/:id').post(isAuthenticated,isLoggedIn,isSomething('staffIncharge'),assignGrievanceToStaff)
router.route('/complete/:id').post(isAuthenticated,isLoggedIn,isSomething('staff'),completeGrievanceRequestByStaff)
router.route('/verify/:id').post(isAuthenticated,isLoggedIn,isSomething('student'),verifyGrievance)

module.exports = router