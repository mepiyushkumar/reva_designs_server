const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Banner:
 *   get:
 *     summary: List all Banner records
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: List of all banners
 *   post:
 *     summary: Create a new Banner record
 *     tags: [Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               subtitle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Banner created successfully
 */
router.get('/', getAllRecords(Banner));
router.post('/', createRecord(Banner));

/**
 * @swagger
 * /entities/Banner/bulk:
 *   post:
 *     summary: Bulk create Banner records
 *     tags: [Banner]
 *   delete:
 *     summary: Delete multiple Banner records
 *     tags: [Banner]
 */
router.post('/bulk', bulkCreate(Banner));
router.delete('/bulk', bulkDelete(Banner));

/**
 * @swagger
 * /entities/Banner/{Banner_id}:
 *   get:
 *     summary: Get a Banner record by ID
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: Banner_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Banner record
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: Banner_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Banner record
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: Banner_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Banner));
router.put('/:id', updateRecord(Banner));
router.delete('/:id', deleteRecord(Banner));

module.exports = router;
