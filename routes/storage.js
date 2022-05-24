const express = require('express')
const uploadMiddleware = require('../utils/handleStorage')
const { createItem, getItems, getItem, updateItem, deleteItems } = require('../controllers/storage')
const { validatorIdItemStorage } = require('../validators/storage')

const router = express.Router()

/**
 * Create file in store
 */
router.post('/', uploadMiddleware.single('myfile'), createItem)

/**
 * Get item store with id
 */
router.get('/:id', validatorIdItemStorage, getItem)

/**
 * Get all items store
 */
router.get('/', getItems)

/**
 * Update item storage with id
 */
router.put('/:id', validatorIdItemStorage, updateItem)

/**
 * delete item storage with id
 */
router.delete('/:id', validatorIdItemStorage, deleteItems)
module.exports = router
