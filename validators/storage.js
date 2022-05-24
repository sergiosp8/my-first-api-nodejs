const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorIdItemStorage = [
  check('id').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorIdItemStorage }
