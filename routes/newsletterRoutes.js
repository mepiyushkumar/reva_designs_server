const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Newsletter:
 *   get:
 *     summary: List all Newsletter records
 *     tags: [Newsletter]
 *   post:
 *     summary: Create a new Newsletter record
 *     tags: [Newsletter]
 */
router.get('/', getAllRecords(Newsletter));
router.post('/', createRecord(Newsletter));

/**
 * @swagger
 * /entities/Newsletter/bulk:
 *   post:
 *     summary: Bulk create Newsletter records
 *     tags: [Newsletter]
 *   delete:
 *     summary: Delete multiple Newsletter records
 *     tags: [Newsletter]
 */
router.post('/bulk', bulkCreate(Newsletter));
router.delete('/bulk', bulkDelete(Newsletter));

/**
 * @swagger
 * /entities/Newsletter/{Newsletter_id}:
 *   get:
 *     summary: Get a Newsletter record by ID
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: Newsletter_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Newsletter record
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: Newsletter_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Newsletter record
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: Newsletter_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Newsletter));
router.put('/:id', updateRecord(Newsletter));
router.delete('/:id', deleteRecord(Newsletter));

module.exports = router;
