const asynchHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// Authenticate User and send token
const authUser = asynchHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//Get profile, protected

const getUserProfile = asynchHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error("User Not found")
    }
})

module.exports = {authUser, getUserProfile}