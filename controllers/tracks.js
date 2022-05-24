const { matchedData } = require('express-validator')
const { tracksModel } = require('../models')
const handleHttpErrors = require('../utils/handleHttpErros')
/**
 * get list from database
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({})
    res.send({ data, user })
  } catch (error) {
    handleHttpErrors(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * get detail item
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const data = await tracksModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpErrors(res, 'ERROR_GET_ITEM')
  }
}

/**
 * create Item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const data = await tracksModel.create(body)
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErrors(res, 'ERROR_CREATE_ITEMS')
  }
}

/**
 * delete item
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await tracksModel.delete({ _id: id })
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErrors(res, 'ERROR_DELETE_ITEM')
  }
}

/**
 * create Item
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req)
    console.log(id, body)
    const data = await tracksModel.findOneAndUpdate(id, body)
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErrors(res, 'ERROR_UPDATE_ITEM')
  }
}

module.exports = { getItems, getItem, createItem, deleteItem, updateItem }
