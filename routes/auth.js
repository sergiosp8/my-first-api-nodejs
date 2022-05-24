const express = require('express')
const { loginCtrl, registerCtrl } = require('../controllers/auth')

const { validatorLogin, validatorRegister } = require('../validators/auth')
const router = express.Router()

router.post('/register', validatorRegister, registerCtrl)

router.post('/login', validatorLogin, loginCtrl)

module.exports = router
