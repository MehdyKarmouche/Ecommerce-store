const asynchHandler = require('express-async-handler')
const Product = require('../models/productModel')


//Get all product
const getProducts = asynchHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product)
        res.json(product)
    else
        res.status(404).json({message:"Sorry, product not found"})
})

//Delete a product
//Private for admin only
const deleteProduct = asynchHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message:"product removed"})
    }
    else
        res.status(404).json({message:"Sorry, product not found"})
})

const createProduct = asynchHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/tablette.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })

//Update a product 


const updateProduct = asynchHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })


module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}