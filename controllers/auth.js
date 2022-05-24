const { matchedData } = require('express-validator')
const users = require('../models/nosql/users')
const handleHttpErros = require('../utils/handleHttpErros')
const { tokenSing } = require('../utils/handleJwt')
const { encrypt, compare } = require('../utils/handlePassword')

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password }
    const dataUser = await users.create(body)
    dataUser.set('password', undefined, { strict: false })

    const data = {
      token: await tokenSing(dataUser),
      user: dataUser
    }
    res.send({ messsage: 'success', data })
  } catch (e) {
    handleHttpErros(res, 'ERROR_REGISTER_USER')
  }
}

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await users.findOne({ email: req.email }).select('password name role email')
    if (!user) {
      handleHttpErros(res, 'USER_NOT_EXISTS', 404)
    }

    const hashPassword = user.password
    const check = await compare(req.password, hashPassword)

    if (!check) {
      handleHttpErros(res, 'PASSWORD_INVALID', 401)
      return res
    }

    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSing(user),
      user
    }
    res.send({ data })
  } catch (e) {
    handleHttpErros(res, 'ERRO_LOGIN_API')
  }
}

module.exports = { registerCtrl, loginCtrl }
