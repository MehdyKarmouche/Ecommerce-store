var express = require('express');
var {addOrderItems}= require("../controllers/orderController")
var {getOrderById} = require("../controllers/orderController")
const protect = require('../middleware/authMiddleware')
var router = express.Router();

//router.get('/:id', protect,getOrderById)

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)







module.exports = router;