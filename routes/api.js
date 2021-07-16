const express = require('express');
const router = express.Router();

// api/products.js
const apiProductsRouter = require('./api/products');
const apiClientsRouter = require('./api/clients');

// delegamos las queries al router de api/products.js //
router.use('/products', apiProductsRouter);
router.use('/clients', apiClientsRouter);

module.exports = router;
