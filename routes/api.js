const express = require('express');
const router = express.Router();

// api/products.js
const apiProductsRouter = require('./api/products');

// delegamos las queries al router de api/products.js //
router.use('/products', apiProductsRouter);

module.exports = router;
