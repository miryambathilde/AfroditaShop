const express = require('express');
const router = express.Router();
const productModel = require('../../models/product.model');

// TODO: extraer solo las funciones que vamos a usar
router.get('/', (req, res) => {
	// 1 - Recuperar los productos de la BBDD, como nos devuelve una promesa el metodo de la query, tenemos que poner el then y el catch
	// TODO: opcion async await
	productModel
		.getAll()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json(err.message);
		});
});

router.post('/', (req, res) => {
	res.end('Ruta POST /api/products');
});

router.put('/', (req, res) => {
	res.end('Ruta PUT /api/products');
});

router.delete('/', (req, res) => {
	res.end('Ruta DELETE /api/products');
});

module.exports = router;
