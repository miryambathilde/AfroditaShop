const express = require('express');
const router = express.Router();

const { getAll, create, getById } = require('../models/product.model');

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

/* GET localhost:3000/products/edit/productId
VISTA: products/edit.pug
	1. Antes de renderizar la vista tenemos que recuperar el producto a editar
	2. Renderizar la vista y pasarle el producto
	3. Generar el formulario dentro de la vista:
-Dentro del formulario debemos incorporar los datos del producto a editar */
router.get('/edit/:productId', (req, res) => {
	getById(req.params.productId)
		.then((product) => {
			console.log(product);
			res.render('products/edit', { product });
		})
		.catch((error) => console.log(error));
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
