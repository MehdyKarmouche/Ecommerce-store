var express = require('express');
var router = express.Router();
const products = require('../products')

/* GET home page. */
router.get('/api/products', (req, res, next)=> {
  console.log("Ok")
  res.json(products)
});

router.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
});

module.exports = router;
