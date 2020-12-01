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

// Register new user, not protected
const registerUser = asynchHandler(async(req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})
    
    if(userExists) {
        res.status(400)
        throw new Error("user already exists")
    }
    const user = await User.create({
        name,
        password,
        email
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid input")
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
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User Not found")
    }
})


//update user profile PUT
//Pria
const updateUserProfile = asynchHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User Not found")
    }
})

//GET all users
//protected, for admin only
const getUsers = asynchHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)

    
})

//DELETE a user
//protected, for admin only
const deleteUser = asynchHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'user deleted'})
    } else {
        res.status(404)
        throw new Error('User not Found')
    }

    
})


//GET a user by ID
//protected, for admin only
const getUserById = asynchHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

    
})

// update user
//put request for admin only
const updateUser = asynchHandler(async(req, res) => {
    console.log("wahya")
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User Not found")
    }
})





module.exports = {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById,updateUser}