const express = require('express')
const UserCtrl = require('../controllers/userController')
const router = express.Router()
const isAuth = require('../validators/isAuth')
const isAdmin = require('../validators/isAdmin')
router.post('/register', UserCtrl.createUser)
router.put('/user/:id',isAuth, UserCtrl.updateUser)
router.put('/score/:id', UserCtrl.updateScore)
router.delete('/user/:id',isAuth, UserCtrl.deleteUser)
router.get('/user/:id',isAuth, UserCtrl.getUserById)
router.get('/users',isAdmin, UserCtrl.getUsers)
router.post('/signin', UserCtrl.signInUser)
module.exports = router