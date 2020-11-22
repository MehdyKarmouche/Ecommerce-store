var express = require('express');
var {authUser,getUserProfile, registerUser}= require("../controllers/userController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();



router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/').post(registerUser)







module.exports = router;