var express = require('express');
var {addOrderItems, getOrderById}= require("../controllers/orderController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();



router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)







module.exports = router;