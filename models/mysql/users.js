const { DataTypes } = require('sequelize')
const { sequelize } = require('../../config/mysql')

const users = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.NUMBER
    },
    email: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING('admin')
    }
  },
  {
    timestamps: true
  }
)

module.exports = users
