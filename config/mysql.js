const { Sequelize } = require('sequelize')

const database = process.env.MYSQL_DATABASE
const username = process.env.MSQL_USER
const password = process.env.MSQL_PASSWORD
const host = process.env.MSQL_HOST

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql'
})

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexion MySql correcto')
  } catch (e) {
    console.log('Msql Error de conexcion', e)
  }
}

module.exports = { sequelize, dbConnectMySql }
