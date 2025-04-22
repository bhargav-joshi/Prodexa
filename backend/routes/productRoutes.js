const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const bulkController = require('../controllers/bulkUploadController');
const authenticateToken = require('../middleware/authMiddleware');

// Protect all product routes
router.use(authenticateToken);

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Bulk upload
router.post('/bulk-upload', bulkController.bulkUpload);

module.exports = router;
