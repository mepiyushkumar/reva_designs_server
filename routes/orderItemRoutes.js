const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/OrderItem:
 *   get:
 *     summary: List all OrderItem records
 *     tags: [OrderItem]
 *   post:
 *     summary: Create a new OrderItem record
 *     tags: [OrderItem]
 */
router.get('/', getAllRecords(OrderItem));
router.post('/', createRecord(OrderItem));

/**
 * @swagger
 * /entities/OrderItem/bulk:
 *   post:
 *     summary: Bulk create OrderItem records
 *     tags: [OrderItem]
 *   delete:
 *     summary: Delete multiple OrderItem records
 *     tags: [OrderItem]
 */
router.post('/bulk', bulkCreate(OrderItem));
router.delete('/bulk', bulkDelete(OrderItem));

/**
 * @swagger
 * /entities/OrderItem/{OrderItem_id}:
 *   get:
 *     summary: Get an OrderItem record by ID
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: OrderItem_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update an OrderItem record
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: OrderItem_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete an OrderItem record
 *     tags: [OrderItem]
 *     parameters:
 *       - in: path
 *         name: OrderItem_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(OrderItem));
router.put('/:id', updateRecord(OrderItem));
router.delete('/:id', deleteRecord(OrderItem));

module.exports = router;
