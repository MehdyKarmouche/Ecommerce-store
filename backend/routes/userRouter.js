var express = require('express');
var {authUser,getUserProfile, registerUser,updateUserProfile, getUsers}= require("../controllers/userController")
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

var router = express.Router();


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)








module.exports = router;