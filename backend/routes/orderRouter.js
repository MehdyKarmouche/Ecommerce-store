var express = require('express');
var {addOrderItems}= require("../controllers/orderController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();



router.route('/').post(protect, addOrderItems)







module.exports = router;