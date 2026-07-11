const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Review:
 *   get:
 *     summary: List all Review records
 *     tags: [Review]
 *   post:
 *     summary: Create a new Review record
 *     tags: [Review]
 */
router.get('/', getAllRecords(Review));
router.post('/', createRecord(Review));

/**
 * @swagger
 * /entities/Review/bulk:
 *   post:
 *     summary: Bulk create Review records
 *     tags: [Review]
 *   delete:
 *     summary: Delete multiple Review records
 *     tags: [Review]
 */
router.post('/bulk', bulkCreate(Review));
router.delete('/bulk', bulkDelete(Review));

/**
 * @swagger
 * /entities/Review/{Review_id}:
 *   get:
 *     summary: Get a Review record by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: Review_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Review record
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: Review_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Review record
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: Review_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Review));
router.put('/:id', updateRecord(Review));
router.delete('/:id', deleteRecord(Review));

module.exports = router;
