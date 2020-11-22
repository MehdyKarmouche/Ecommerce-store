var express = require('express');
var {getProducts, getProductById} = require("../controllers/productController")
var router = express.Router();



router.route('/').get(getProducts)


//get one product

router.route('/:id').get(getProductById)




module.exports = router;