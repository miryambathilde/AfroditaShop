const express = require('express');
const router = express.Router();

// api/products.js
const apiProductsRouter = require('./api/products');
const apiClientsRouter = require('./api/clients');
const apiUsersRouter = require('./api/users');
const { checkToken, checkAdmin, checkRole } = require('./middlewares');

// delegamos las queries al router de api/products.js //
// incluimos los middleware //
router.use('/products', /* checkToken, checkRole('R'), */ apiProductsRouter);
router.use('/clients', checkToken, checkAdmin, apiClientsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;
