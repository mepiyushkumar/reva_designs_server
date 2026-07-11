const express = require('express');
const router = express.Router();
const UserActivity = require('../models/UserActivity');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/UserActivity:
 *   get:
 *     summary: List all UserActivity records
 *     tags: [UserActivity]
 *   post:
 *     summary: Create a new UserActivity record
 *     tags: [UserActivity]
 */
router.get('/', getAllRecords(UserActivity));
router.post('/', createRecord(UserActivity));

/**
 * @swagger
 * /entities/UserActivity/bulk:
 *   post:
 *     summary: Bulk create UserActivity records
 *     tags: [UserActivity]
 *   delete:
 *     summary: Delete multiple UserActivity records
 *     tags: [UserActivity]
 */
router.post('/bulk', bulkCreate(UserActivity));
router.delete('/bulk', bulkDelete(UserActivity));

/**
 * @swagger
 * /entities/UserActivity/{UserActivity_id}:
 *   get:
 *     summary: Get a UserActivity record by ID
 *     tags: [UserActivity]
 *     parameters:
 *       - in: path
 *         name: UserActivity_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a UserActivity record
 *     tags: [UserActivity]
 *     parameters:
 *       - in: path
 *         name: UserActivity_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a UserActivity record
 *     tags: [UserActivity]
 *     parameters:
 *       - in: path
 *         name: UserActivity_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(UserActivity));
router.put('/:id', updateRecord(UserActivity));
router.delete('/:id', deleteRecord(UserActivity));

module.exports = router;
