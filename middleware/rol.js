const handleHttpErrors = require('../utils/handleHttpErros')

const checkRolMiddelware = (roles) => (req, res, next) => {
  try {
    const { user } = req
    const rolesByUser = user.role
    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
    if (!checkValueRol) {
      handleHttpErrors(res, 'USER_NOT_PERMISSIONS', 403)
      return
    }
  } catch (e) {
    handleHttpErrors(res, 'ERROR_PERMISION', 403)
    return
  }
  next()
}

module.exports = checkRolMiddelware
