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
const router = express.Router()


router.route('/create').post(isAuthenticated,createNewGrievances)
router.route('/all').get(getAllGrievances)
router.route('/me').get(getUserGrievances)
router.route('/single/:id').get(getSingleGrievance)
router.route('/assign/admin/:id').post(assignGrievanceToAdmin)
router.route('/assign/staffIncharge/:id').post(assignGrievanceToStaffIncharge)
router.route('/assign/staff/:id').post(assignGrievanceToStaff)
router.route('/complete/:id').post(completeGrievanceRequestByStaff)
router.route('/verify/:id').post(verifyGrievance)

module.exports = router