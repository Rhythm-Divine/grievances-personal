const express = require('express')
const { registerUser, deleteUser, getAllusers, createAdmin } = require('../functions/userFunctions')

const router = express.Router()



//super admin routes
router.route('/registerAdmin').post(createAdmin)


// student routes
router.route('/registerStudent').post(registerUser)


//admin routes
router.route('/registerStaffIncharge').post()
router.route('/deleteStudent/:id').delete(deleteUser)
router.route('/students/all').get(getAllusers)


// staff incharge routes
router.route('/registerStaff').post()


//staff routes


module.exports = router