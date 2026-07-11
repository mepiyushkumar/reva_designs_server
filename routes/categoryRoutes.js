const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Category:
 *   post:
 *     summary: Create a new Category record
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sarees
 *               description:
 *                 type: string
 *                 example: Traditional Sarees Collection
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               slug:
 *                 type: string
 *                 example: sarees
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               display_order:
 *                 type: integer
 *                 example: 1
 */
router.get('/', getAllRecords(Category));
router.post('/', createRecord(Category));

/**
 * @swagger
 * /entities/Category/{Category_id}:
 *   put:
 *     summary: Update a Category record
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: Category_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               slug:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               display_order:
 *                 type: integer
 */
router.post('/bulk', bulkCreate(Category));
router.delete('/bulk', bulkDelete(Category));

/**
 * @swagger
 * /entities/Category/{Category_id}:
 *   get:
 *     summary: Get a Category record by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: Category_id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a Category record
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: Category_id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a Category record
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: Category_id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', getRecordById(Category));
router.put('/:id', updateRecord(Category));
router.delete('/:id', deleteRecord(Category));

module.exports = router;
