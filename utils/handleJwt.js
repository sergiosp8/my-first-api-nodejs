const jwt = require('jsonwebtoken')
const getProperties = require('./handlePropertiesEngine')
const JWT_SECRET = process.env.JWT_SECRET

const propertiesKey = getProperties()

const tokenSing = async (user) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '2h'
    }
  )
  return sign
}

const verifyToker = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { tokenSing, verifyToker }
