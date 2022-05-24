const express = require('express')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/tracks')
const checkRolMiddelware = require('../middleware/rol')
const authMiddleware = require('../middleware/session')
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const router = express.Router()

/**
 * Listar los items
 */
router.get('/', authMiddleware, getItems)
/**
 * Obterner detalle de item
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem)
/**
 * Crear un item
 */
// eslint-disable-next-line quotes
router.post('/', authMiddleware, checkRolMiddelware(['admin', 'user']), validatorCreateItem, createItem)
/**
 * Eliminar Item
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem)

/**
 * Actualizar Item
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem)

module.exports = router
