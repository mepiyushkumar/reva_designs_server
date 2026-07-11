const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkDelete, bulkCreate } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Address:
 *   get:
 *     summary: List all Address records
 *     tags: [Address]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *   post:
 *     summary: Create a new Address record
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_line1
 *               - city
 *               - state
 *               - pincode
 *     responses:
 *       201:
 *         description: Address created successfully
 */
router.get('/', getAllRecords(Address));
router.post('/', createRecord(Address));

/**
 * @swagger
 * /entities/Address/bulk:
 *   post:
 *     summary: Bulk create Address records
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *     responses:
 *       201:
 *         description: Addresses created successfully
 *   delete:
 *     summary: Delete multiple Address records
 *     tags: [Address]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *     responses:
 *       200:
 *         description: Addresses deleted successfully
 */
router.post('/bulk', bulkCreate(Address));
router.delete('/bulk', bulkDelete(Address));

/**
 * @swagger
 * /entities/Address/{Address_id}:
 *   get:
 *     summary: Get an Address record by ID
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: Address_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address record retrieved
 *   put:
 *     summary: Update an Address record
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: Address_id
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
 *         description: Address updated successfully
 *   delete:
 *     summary: Delete an Address record
 *     tags: [Address]
 *     parameters:
 *       - in: path
 *         name: Address_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 */
router.get('/:id', getRecordById(Address));
router.put('/:id', updateRecord(Address));
router.delete('/:id', deleteRecord(Address));

module.exports = router;
