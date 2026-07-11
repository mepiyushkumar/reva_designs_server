const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/WishlistItem');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/WishlistItem:
 *   get:
 *     summary: List all WishlistItem records
 *     tags: [WishlistItem]
 *   post:
 *     summary: Create a new WishlistItem record
 *     tags: [WishlistItem]
 */
router.get('/', getAllRecords(WishlistItem));
router.post('/', createRecord(WishlistItem));

/**
 * @swagger
 * /entities/WishlistItem/bulk:
 *   post:
 *     summary: Bulk create WishlistItem records
 *     tags: [WishlistItem]
 *   delete:
 *     summary: Delete multiple WishlistItem records
 *     tags: [WishlistItem]
 */
router.post('/bulk', bulkCreate(WishlistItem));
router.delete('/bulk', bulkDelete(WishlistItem));

/**
 * @swagger
 * /entities/WishlistItem/{WishlistItem_id}:
 *   get:
 *     summary: Get a WishlistItem record by ID
 *     tags: [WishlistItem]
 *     parameters:
 *       - in: path
 *         name: WishlistItem_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a WishlistItem record
 *     tags: [WishlistItem]
 *     parameters:
 *       - in: path
 *         name: WishlistItem_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a WishlistItem record
 *     tags: [WishlistItem]
 *     parameters:
 *       - in: path
 *         name: WishlistItem_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(WishlistItem));
router.put('/:id', updateRecord(WishlistItem));
router.delete('/:id', deleteRecord(WishlistItem));

module.exports = router;
