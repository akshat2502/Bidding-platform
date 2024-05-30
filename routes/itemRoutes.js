const express = require('express');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authenticateToken, authorizeRole('user'), createItem);
router.put('/:id', authenticateToken, authorizeRole('admin'), updateItem);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteItem);

module.exports = router;
