var express = require('express');
var authUser= require("../controllers/userController")
var router = express.Router();



router.post('/login', authUser)







module.exports = router;