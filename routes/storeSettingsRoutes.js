const express = require('express');
const router = express.Router();
const StoreSettings = require('../models/StoreSettings');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/StoreSettings:
 *   get:
 *     summary: List all StoreSettings records
 *     tags: [StoreSettings]
 *     responses:
 *       200:
 *         description: List of all store settings
 *   post:
 *     summary: Create a new StoreSettings record
 *     tags: [StoreSettings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: StoreSettings created successfully
 */
router.get('/', getAllRecords(StoreSettings));
router.post('/', createRecord(StoreSettings));

/**
 * @swagger
 * /entities/StoreSettings/{StoreSettings_id}:
 *   get:
 *     summary: Get a StoreSettings record by ID
 *     tags: [StoreSettings]
 *     parameters:
 *       - in: path
 *         name: StoreSettings_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StoreSettings record retrieved
 *   put:
 *     summary: Update a StoreSettings record
 *     tags: [StoreSettings]
 *     parameters:
 *       - in: path
 *         name: StoreSettings_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: StoreSettings updated successfully
 *   delete:
 *     summary: Delete a StoreSettings record
 *     tags: [StoreSettings]
 *     parameters:
 *       - in: path
 *         name: StoreSettings_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: StoreSettings deleted successfully
 */
router.get('/:id', getRecordById(StoreSettings));
router.put('/:id', updateRecord(StoreSettings));
router.delete('/:id', deleteRecord(StoreSettings));

module.exports = router;
