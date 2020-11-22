var express = require('express');
var {authUser,getUserProfile}= require("../controllers/userController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();



router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)







module.exports = router;