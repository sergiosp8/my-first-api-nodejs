const bcryptjs = require('bcryptjs')

const encrypt = async (passwordClean) => {
  const hash = await bcryptjs.hash(passwordClean, 10)
  return hash
}

const compare = async (passwordClean, hash) => {
  return await bcryptjs.compare(passwordClean, hash)
}

module.exports = { encrypt, compare }
