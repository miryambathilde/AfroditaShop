const express = require('express');
const router = express.Router();

const { getAll, create } = require('../models/product.model');

router.get('/', (req, res) => {
	// 1. Recuperar todos los productos de la BD - HECHO
	// 2. Pasar los productos recuperados de la vista
	// 3. Dentro de la vista iterarlos para mostrarlos

	getAll(1, 20)
		.then((products) => {
			res.render('products/index', { products });
		})
		.catch((error) => console.log(error));
});

router.get('/new', (req, res) => {
	res.render('products/new');
});

router.get('/edit', (req, res) => {
	res.render('products/edit');
});

router.get('/remove', (req, res) => {
	res.render('products/remove');
});

router.post('/create', (req, res) => {
	create(req.body)
		.then((result) => res.redirect('/products'))
		.catch((error) => console.log(error));
});

module.exports = router;
