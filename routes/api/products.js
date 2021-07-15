const express = require('express');
const router = express.Router();

// DONE: extraer solo las funciones que vamos a usar
const { getAll } = require('../../models/product.model');

router.get('/', (req, res) => {
	// 1 - Recuperar los productos de la BBDD, como nos devuelve una promesa el metodo de la query, tenemos que poner el then y el catch
	getAll()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json(err.message);
		});
});

// Recuperar los productos de la BBDD, como nos devuelve una promesa el metodo de la query, tenemos que poner el then y el catch
// TODO: CON opcion ASYNC AWAIT y TRY CATCH
// 1. delante de la funcion que devuelve la promesa le ponemos el await
// 2. el wait lo guardamos en una constante
// 3. el async lo tenemos que ponerlo delante de la ejecución de la función

router.get('/v2', async (req, res) => {
	try {
		const result = await getAll();
		res.json(result);
	} catch (err) {
		res.json({ error: err.message });
	}
});

// TODO: recuperar datos por ID

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
