const asynchHandler = require('express-async-handler')
const Order = require('../models/orderModel')

//POST an ordered
//Protected
const addOrderItems = asynchHandler(async(req, res) => {
    const {orderItems, shippingItems, paymentMethod, itemsPrice, texPrice,shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items')
        return
    }
    else {
        const order = new Order({
                user: req.user._id,
                orderItems,
                shippingItems,
                paymentMethod,
                itemsPrice,
                texPrice,
                shippingPrice,
                totalPrice
            })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
    }
})


module.exports = {
    addOrderItems,
}