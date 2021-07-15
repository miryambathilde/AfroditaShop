const express = require('express');
const router = express.Router();

// DONE: extraer solo las funciones que vamos a usar
const { getAll, getById, create, getByCategory } = require('../../models/product.model');

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



//como nos devuelve una promesa, tenemos que hacerlo con ASYNC AWAIT TRY CATCH

router.get('/:productId', async (req, res) => {
	try {
	const result = await getById(req.params.productId);
	if (result) {
		res.json(result);
	} else {
		res.json({error: 'El producto no existe en la base de datos'})
	}
	} catch (error) {
		res.json({ error: err.message });
	}
});

// RECUPERAR PRODUCTOS POR CATEGORIA getByCategory GET localhost:3000/api/products/cat/oficina
router.get('/cat/:category', async (req, res) => {
	getByCategory(req.params.category)
		.then(result => res.json(result))
		.catch(error => res.json({ error: error.message }));
});


// con opcion THEN CATCH, sin async ni await ni try catch, pero es lo mismo de antes
router.get('/:productId/v2', (req, res) => {
	getById(req.params.productId)
			.then(result => {
					if (result) {
							res.json(result);
					} else {
							res.json({ error: 'El producto no existe en la base de datos' });
					}
			})
			.catch(error => res.json({ error: error.message }));
});

// para añadir un nuevo producto //
// con async await, el async siempre va delante del callback y después manejamos req y res dentro del try catch
router.post('/', async (req, res) => {
	try {
		//INSERTAR los datos dentro de la BD //
		const result = await create(req.body);
		const product = await getById(result.insertId);
		res.json(product);
	} catch {
		res.json({ error: error.message });
	}
});

// con opcion THEN CATCH, sin async ni await ni try catch, pero es lo mismo de antes
router.post('/v2', (req, res) => {
	create(req.body)
			.then(result => {
					getById(result.insertId)
							.then(product => {
									res.json(product);
							})
							.catch(error => res.json({ error: error.message }));
			})
			.catch(error => res.json({ error: error.message }));
});

router.put('/', (req, res) => {
	res.end('Ruta PUT /api/products');
});

router.delete('/', (req, res) => {
	res.end('Ruta DELETE /api/products');
});

module.exports = router;
