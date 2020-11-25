var express = require('express');
var {authUser,getUserProfile, registerUser,updateUserProfile}= require("../controllers/userController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();



router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/').post(registerUser)







module.exports = router;