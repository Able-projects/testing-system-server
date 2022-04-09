const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
createUser = async(req, res) => {
    const body = req.body
    if (!body) { 
        return res.status(400).json({ success: false, error: 'You must provide a user info', }) 
    }
 
    const salt = await bcrypt.genSalt(10)

    const [hashPassword] = await Promise.all([
        bcrypt.hash(body.password, salt)
    ])
    const newUserData = {
        name: body.name,
        email: body.email,
        password: hashPassword,
        rating: body.rating
    }
    const newUser = new User(newUserData)
    if (!newUser) { 
        return res.status(400).json({ success: false, error: err })
    }
    newUser.save().then(() => {
        return res.status(201).json({
            success: true,
            id: newUser._id,
            message: 'User is created!',
        })
    })
    .catch(error => { return res.status(400).json({ error, message: 'User not created!', })
    })
}

signInUser = async(req,res) => {
    const body = req.body
    if (!body) { 
        return res.status(400).json({ success: false, error: 'You must provide a user info', }) 
    }
    await User.findOne({ email: body.email }, async(err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res
            .status(404)
            .json({ success: false, error: `User not found` })
            }

        const isMatch = bcrypt.compareSync(body.password, user.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect Password' })
        }
        const token = await makeJWT(user)
        return res.status(200).json({ success: true, data: user, token })
        }).catch(err => console.log(err))
}

async function makeJWT(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, 'able_private_key', {
        expiresIn: 18000,
    })
}



getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!user) {
        return res
        .status(404)
        .json({ success: false, error: `User not found` })
        }
    return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}


getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!users.length) {
    return res
        .status(404)
        .json({ success: false, error: `Users not found` })
    }
    return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

updateUser = async (req, res) => {
    const body = req.body
    if (!body) { return res.status(400).json({ success: false, error: 'You must provide a body to update', }) }
        User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) { return res.status(404).json({ err, message: 'User not found!', }) }
        user.name = body.name
        user.rating = body.rating
        user.email = body.email
        user.password = body.password
        user.save().then(() => {
    return res.status(200).json({
        success: true,
        id: user._id,
        message: 'User updated!',
        })
    })
    .catch(error => { return res.status(404).json({ error, message: 'User not updated!', }) })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!user) {
        return res
        .status(404)
        .json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}


module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsers,
    signInUser
}