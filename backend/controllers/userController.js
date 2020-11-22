const asynchHandler = require('express-async-handler')
const User = require('../models/userModel')

// Authenticate User and send token
const authUser = asynchHandler(async(req, res) => {
    console.log("Hit")
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })

    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

module.exports = authUser