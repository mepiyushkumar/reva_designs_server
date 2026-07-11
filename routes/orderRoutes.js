const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Order:
 *   get:
 *     summary: List all Order records
 *     tags: [Order]
 *   post:
 *     summary: Create a new Order record
 *     tags: [Order]
 */
router.get('/', getAllRecords(Order));
router.post('/', createRecord(Order));

/**
 * @swagger
 * /entities/Order/bulk:
 *   post:
 *     summary: Bulk create Order records
 *     tags: [Order]
 *   delete:
 *     summary: Delete multiple Order records
 *     tags: [Order]
 */
router.post('/bulk', bulkCreate(Order));
router.delete('/bulk', bulkDelete(Order));

/**
 * @swagger
 * /entities/Order/{Order_id}:
 *   get:
 *     summary: Get an Order record by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: Order_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update an Order record
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: Order_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete an Order record
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: Order_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Order));
router.put('/:id', updateRecord(Order));
router.delete('/:id', deleteRecord(Order));

module.exports = router;
