const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Collection:
 *   get:
 *     summary: List all Collection records
 *     tags: [Collection]
 *   post:
 *     summary: Create a new Collection record
 *     tags: [Collection]
 */
router.get('/', getAllRecords(Collection));
router.post('/', createRecord(Collection));

/**
 * @swagger
 * /entities/Collection/bulk:
 *   post:
 *     summary: Bulk create Collection records
 *     tags: [Collection]
 *   delete:
 *     summary: Delete multiple Collection records
 *     tags: [Collection]
 */
router.post('/bulk', bulkCreate(Collection));
router.delete('/bulk', bulkDelete(Collection));

/**
 * @swagger
 * /entities/Collection/{Collection_id}:
 *   get:
 *     summary: Get a Collection record by ID
 *     tags: [Collection]
 *     parameters:
 *       - in: path
 *         name: Collection_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Collection record
 *     tags: [Collection]
 *     parameters:
 *       - in: path
 *         name: Collection_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Collection record
 *     tags: [Collection]
 *     parameters:
 *       - in: path
 *         name: Collection_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Collection));
router.put('/:id', updateRecord(Collection));
router.delete('/:id', deleteRecord(Collection));

module.exports = router;
