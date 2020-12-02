var express = require('express');
var {getProducts, getProductById, deleteProduct, createProduct, updateProduct} = require("../controllers/productController")
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
var router = express.Router();



router.route('/').get(getProducts).post(protect, admin, createProduct)


//get one product

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin,updateProduct)




module.exports = router;