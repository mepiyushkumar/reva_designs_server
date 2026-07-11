const express = require('express');
const router = express.Router();
const PaymentSettings = require('../models/PaymentSettings');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/PaymentSettings:
 *   get:
 *     summary: List all PaymentSettings records
 *     tags: [PaymentSettings]
 *   post:
 *     summary: Create a new PaymentSettings record
 *     tags: [PaymentSettings]
 */
router.get('/', getAllRecords(PaymentSettings));
router.post('/', createRecord(PaymentSettings));

/**
 * @swagger
 * /entities/PaymentSettings/{PaymentSettings_id}:
 *   get:
 *     summary: Get a PaymentSettings record by ID
 *     tags: [PaymentSettings]
 *     parameters:
 *       - in: path
 *         name: PaymentSettings_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a PaymentSettings record
 *     tags: [PaymentSettings]
 *     parameters:
 *       - in: path
 *         name: PaymentSettings_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a PaymentSettings record
 *     tags: [PaymentSettings]
 *     parameters:
 *       - in: path
 *         name: PaymentSettings_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(PaymentSettings));
router.put('/:id', updateRecord(PaymentSettings));
router.delete('/:id', deleteRecord(PaymentSettings));

module.exports = router;
