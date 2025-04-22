const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/authMiddleware');  // <-- Import auth middleware

// Secure category routes
router.post('/', authenticateToken, categoryController.createCategory);
router.get('/', authenticateToken, categoryController.getCategories);
router.put('/:id', authenticateToken, categoryController.updateCategory);
router.delete('/:id', authenticateToken, categoryController.deleteCategory);

module.exports = router;
