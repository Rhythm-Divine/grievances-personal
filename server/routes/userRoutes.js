const express = require('express')
const { registerUser } = require('../functions/userFunctions')

const router = express.Router()



//super admin routes
router.route('/registerAdmin').post()


// student routes
router.route('/registerStudent').post(registerUser)


//admin routes
router.route('/registerStaffIncharge').post()


// staff incharge routes
router.route('/registerStaff').post()


//staff routes


module.exports = router