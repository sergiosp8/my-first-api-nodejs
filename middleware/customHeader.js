const customHeader = (req, res, next) => {
  try {
    const apiKey = req.header.apiKey
    if (apiKey === 'SASP_API_KEY') {
      next()
    } else {
      res.status(403)
      res.send({ errors: 'API_KEY_NO_ES_CORRECTA' })
    }
  } catch (error) {
    res.status(403)
    res.send({ errors: 'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER' })
  }
}

module.exports = customHeader
