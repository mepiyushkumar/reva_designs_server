const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Coupon:
 *   get:
 *     summary: List all Coupon records
 *     tags: [Coupon]
 *   post:
 *     summary: Create a new Coupon record
 *     tags: [Coupon]
 */
router.get('/', getAllRecords(Coupon));
router.post('/', createRecord(Coupon));

/**
 * @swagger
 * /entities/Coupon/bulk:
 *   post:
 *     summary: Bulk create Coupon records
 *     tags: [Coupon]
 *   delete:
 *     summary: Delete multiple Coupon records
 *     tags: [Coupon]
 */
router.post('/bulk', bulkCreate(Coupon));
router.delete('/bulk', bulkDelete(Coupon));

/**
 * @swagger
 * /entities/Coupon/{Coupon_id}:
 *   get:
 *     summary: Get a Coupon record by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: Coupon_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Coupon record
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: Coupon_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Coupon record
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: Coupon_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Coupon));
router.put('/:id', updateRecord(Coupon));
router.delete('/:id', deleteRecord(Coupon));

module.exports = router;
