var express = require('express');
const asynchHandler = require('express-async-handler')
const Product = require('../models/productModel')
var router = express.Router();

//Get all product

router.get('/', asynchHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}))


//get one product

router.get('/:id', asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product)
        res.json(product)
    else
        res.status(404).json({message:"Sorry, product not found"})
}))




module.exports = router;