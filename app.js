require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morganBody = require('morgan-body')
const dbConnect = require('./config/mongo')
const loggerStream = require('./utils/handleLogger')
const { dbConnectMySql } = require('./config/mysql')
const app = express()

const ENGINE_DB = process.env.ENGINE_DB

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (_req, res) {
    return res.statusCode < 400
  }
})
const port = process.env.PORT || 3000

/**
 * route invocation 😊
 */

app.use('/api', require('./routes'))

app.listen(port, () => {
  console.log(`Tu app esta lista en el puerto :${port}`)
})

ENGINE_DB === 'nosql' ? dbConnect() : dbConnectMySql()
