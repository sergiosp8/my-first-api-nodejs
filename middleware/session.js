const users = require('../models/nosql/users')
const handleHttpErrors = require('../utils/handleHttpErros')
const { verifyToker } = require('../utils/handleJwt')
const getProperties = require('../utils/handlePropertiesEngine')
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpErrors(res, 'NOT_TOKEN', 401)
      return
    }
  } catch (e) {
    handleHttpErrors(res, 'NOT_SESSION', 4001)
  }

  const token = req.headers.authorization.split(' ').pop()
  const dataToken = await verifyToker(token)
  console.log(token)
  console.log(dataToken)

  if (!dataToken) {
    handleHttpErrors(res, 'NOT_PAYLOAD_DATA', 401)
    return
  }
  const query = {
    [propertiesKey.id]: dataToken[propertiesKey.id]
  }
  const user = await users.findOne(query)
  req.user = user

  next()
}

module.exports = authMiddleware
