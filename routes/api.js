const express = require('express');
const router = express.Router();

// api/products.js
const apiProductsRouter = require('./api/products');
const apiClientsRouter = require('./api/clients');
const apiUsersRouter = require('./api/users');

// delegamos las queries al router de api/products.js //
router.use('/products', apiProductsRouter);
router.use('/clients', apiClientsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;
