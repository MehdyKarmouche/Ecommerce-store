const asynchHandler = require('express-async-handler')
const Order = require('../models/orderModel')

//POST an ordered
//Protected
const addOrderItems = asynchHandler(async(req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items')
        return
    }
    else {
        const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
            
    }
})

//GET an ordered
//Protected
const getOrderById = asynchHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("order not found")
    }
})


module.exports = {
    addOrderItems, getOrderById
}