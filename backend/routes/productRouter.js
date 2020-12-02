var express = require('express');
var {getProducts, getProductById, deleteProduct} = require("../controllers/productController")
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
var router = express.Router();



router.route('/').get(getProducts)


//get one product

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)




module.exports = router;