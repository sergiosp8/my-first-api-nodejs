const fs = require('fs')
const path = require('path')
const { matchedData } = require('express-validator')
const { storageModel } = require('../models')
const handleHttpErros = require('../utils/handleHttpErros')

const MEDIA_PATH = path.join(__dirname, '/../storage')
const PUBLIC_URL = process.env.PUBLIC_URL
/**
 * get list from database
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({})
    res.send({ data })
  } catch (error) {
    handleHttpErros(res, 'ERRR_GET_ITEMS_STORAGE')
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
    console.log(id)
    const data = await storageModel.findById(id)
    res.send({ data })
  } catch (error) {
    handleHttpErros(res, 'ERROR_GET_ITEM_STORAGE')
  }
}

/**
 * create Item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req
    console.log(file)
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErros(res, 'ERRR_CREATE_ITEM_STORAGE')
  }
}

/**
 * delete item
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const findMedia = await storageModel.findById(id)
    const filename = findMedia.filename
    console.log(filename)
    await storageModel.delete({ _id: id })
    const filePath = `${MEDIA_PATH}/${filename}`

    fs.unlinkSync(filePath)
    const data = {
      filePath,
      delete: 1
    }
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErros(res, 'ERROR_DELETE_ITEM_STORAGE')
  }
}

/**
 * create Item
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await storageModel.findOneAndUpdate(id, req.body)
    res.send({ message: 'success', data })
  } catch (error) {
    handleHttpErros(res, 'ERROR_UPDATE_ITEM_STORAGE')
  }
}

module.exports = { getItems, getItem, createItem, deleteItems, updateItem }
