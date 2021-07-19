const express = require('express');
const router = express.Router();

// DONE: extraer solo las funciones que vamos a usar
const {
	getAll,
	getById,
	create,
	getByCategory,
	update,
	remove,
} = require('../../models/product.model');

// paginado de productos //
// GET http://localhost:3000/api/products/?page=2&limit=5

/* aqui le decimos que si no vienen los valores de page y limit, le asigne 1 y 5 respectivamente */
router.get('/', (req, res) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	// 1 - Recuperar los productos de la BBDD, como nos devuelve una promesa el metodo de la query, tenemos que poner el then y el catch
	// le ponemos parseInt para convertir el string que le pasamos a numero entero //
	getAll(parseInt(page), parseInt(limit))
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
			res.json({ error: 'El producto no existe en la base de datos' });
		}
	} catch (error) {
		res.json({ error: err.message });
	}
});

// RECUPERAR PRODUCTOS POR CATEGORIA getByCategory GET GET http://localhost:3000/api/products/cat/moda

router.get('/cat/:category', async (req, res) => {
	getByCategory(req.params.category)
		.then((result) => res.json(result))
		.catch((error) => res.json({ error: error.message }));
});

// con opcion THEN CATCH, sin async ni await ni try catch, pero es lo mismo de antes
router.get('/:productId/v2', (req, res) => {
	getById(req.params.productId)
		.then((result) => {
			if (result) {
				res.json(result);
			} else {
				res.json({ error: 'El producto no existe en la base de datos' });
			}
		})
		.catch((error) => res.json({ error: error.message }));
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
		.then((result) => {
			getById(result.insertId)
				.then((product) => {
					res.json(product);
				})
				.catch((error) => res.json({ error: error.message }));
		})
		.catch((error) => res.json({ error: error.message }));
});

// PUT actualización de producto http://localhost:3000/api/products/5

//then catch
router.put('/:productId', (req, res) => {
	const productId = req.params.productId;
	update(productId, req.body)
		.then((result) => {
			getById(productId)
				.then((result) => res.json(result))
				.catch((error) => res.json({ error: error.message }));
		})
		.catch((error) => res.json({ error: error.message }));
});

// ASYNC AWAIT TRY CATCH
// con async await, el async siempre va delante del callback y después manejamos req y res dentro del try catch
router.put('/:productId/v2', async (req, res) => {
	try {
		const productId = req.params.productId;
		const result = await update(productId, req.body);
		const product = await getById(productId);
		res.json(product);
	} catch (error) {
		res.json({ error: error.message });
	}
});

// DELETE localhost:3000/api/products/id
// CON ASYNC AWAIT Y TRY CATCH CON COMPROBACIÓN DE QUE EXISTE EL PRODUCTO
// compramos si el producto existe, si no existe, devolvemos el error
router.delete('/:productId', async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await getById(productId);
		if (!product) {
			return res.json({ error: 'El producto no existe en la base de datos' });
		}
		const result = await remove(productId);
		res.json({ success: 'El producto se ha borrado correctamente' });
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = router;
