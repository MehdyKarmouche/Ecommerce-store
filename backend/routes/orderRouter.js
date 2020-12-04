var express = require('express');
var {addOrderItems}= require("../controllers/orderController")
var {getOrderById} = require("../controllers/orderController")
var {updateOrderToPaid} = require("../controllers/orderController")
var {getMyOrders} = require("../controllers/orderController")
var {getOrders} = require("../controllers/orderController")
var {updateOrderToDelivered} = require("../controllers/orderController")
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
var router = express.Router();

//router.get('/:id', protect,getOrderById)

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)







module.exports = router;