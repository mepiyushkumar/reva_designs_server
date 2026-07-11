const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/CartItem:
 *   get:
 *     summary: List all CartItem records
 *     tags: [CartItem]
 *   post:
 *     summary: Create a new CartItem record
 *     tags: [CartItem]
 */
router.get('/', getAllRecords(CartItem));
router.post('/', createRecord(CartItem));

/**
 * @swagger
 * /entities/CartItem/bulk:
 *   post:
 *     summary: Bulk create CartItem records
 *     tags: [CartItem]
 *   delete:
 *     summary: Delete multiple CartItem records
 *     tags: [CartItem]
 */
router.post('/bulk', bulkCreate(CartItem));
router.delete('/bulk', bulkDelete(CartItem));

/**
 * @swagger
 * /entities/CartItem/{CartItem_id}:
 *   get:
 *     summary: Get a CartItem record by ID
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: CartItem_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a CartItem record
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: CartItem_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a CartItem record
 *     tags: [CartItem]
 *     parameters:
 *       - in: path
 *         name: CartItem_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(CartItem));
router.put('/:id', updateRecord(CartItem));
router.delete('/:id', deleteRecord(CartItem));

module.exports = router;
