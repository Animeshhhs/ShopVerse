const express = require('express');
const router = express.Router();
const { getProducts, getProduct, addToCart } = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/cart', protect, addToCart);

module.exports = router;