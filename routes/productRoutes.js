const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord, bulkCreate, bulkDelete } = require('../controllers/genericController');

/**
 * @swagger
 * /entities/Product:
 *   get:
 *     summary: List all Product records
 *     tags: [Product]
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
 *         description: List of all products
 *   post:
 *     summary: Create a new Product record
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               collection:
 *                 type: string
 *               is_featured:
 *                 type: boolean
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.get('/', getAllRecords(Product));
router.post('/', createRecord(Product));

/**
 * @swagger
 * /entities/Product/bulk:
 *   post:
 *     summary: Bulk create Product records
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *     responses:
 *       201:
 *         description: Products created successfully
 *   delete:
 *     summary: Delete multiple Product records
 *     tags: [Product]
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
 *         description: Products deleted successfully
 */
router.post('/bulk', bulkCreate(Product));
router.delete('/bulk', bulkDelete(Product));

/**
 * @swagger
 * /entities/Product/{Product_id}:
 *   get:
 *     summary: Get a Product record by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: Product_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product record retrieved
 *   put:
 *     summary: Update a Product record
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: Product_id
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
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete a Product record
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: Product_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.get('/:id', getRecordById(Product));
router.put('/:id', updateRecord(Product));
router.delete('/:id', deleteRecord(Product));

module.exports = router;
