const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/User:
 *   get:
 *     summary: List all User records
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-created_date"
 *     responses:
 *       200:
 *         description: List of all users
 *   post:
 *     summary: Create a new User record
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - full_name
 *             properties:
 *               email:
 *                 type: string
 *               full_name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.get('/', getAllRecords(User));
router.post('/', createRecord(User));

/**
 * @swagger
 * /entities/User/{User_id}:
 *   get:
 *     summary: Get a User record by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: User_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User record retrieved
 *   put:
 *     summary: Update a User record
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: User_id
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
 *         description: User updated successfully
 *   delete:
 *     summary: Delete a User record
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: User_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.get('/:id', getRecordById(User));
router.put('/:id', updateRecord(User));
router.delete('/:id', deleteRecord(User));

module.exports = router;
