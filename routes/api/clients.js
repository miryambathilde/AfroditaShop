const express = require('express');
const router = express.Router();
const { getAll, create, getByUserId } = require('../../models/client.model');
const { getByClient } = require('../../models/product.model');

// GET http://localhost:3000/api/clients
/* como devuelve una promesa ASYNC AWAIT TRY CATCH */
// 1. delante de la funcion que devuelve la promesa le ponemos el await
// 2. el await lo guardamos en una constante
// 3. el async lo tenemos que ponerlo delante de la ejecución de la función

// 4. añadimos el metodo del product model getByClient() dentro del bucle for que recorrera todos los clientes

// RECUPERAMOS LOS CLIENTES Y LOS PRODUCTOS QUE HAN COMPRADO, YA HEMOS HECHO LA RELACION
router.get('/', async (req, res) => {
	try {
		const clients = await getAll();

		for (let client of clients) {
			const products = await getByClient(client.id);
			// creamos una nueva propiedad products dentro de client
			client.products = products;
		}
		res.json(clients);
	} catch (error) {
		res.json({ error: error.message });
	}
});

// POST http://localhost:3000/api/clients
router.post('/', async (req, res) => {
	try {
		const result = await create(req.body);
		res.json(result);
	} catch (error) {
		res.json({ error: error.message });
	}
});

// PUT

// DELETE

// recuperar clientes del usuario logado Y QUE SEA admin A//
// añadimos a clients el campo user_id
// asignamos a los clientes un usuario a cada uno

// GET http://localhost:3000/api/clients/user
router.get('/user', async (req, res) => {
	try {
		// comprobamos que funciona:
		// res.json(req.user);

		const clients = await getByUserId(req.user.id);
		res.json(clients);
	} catch (error) {
		res.json({ error: error.message });
	}
});

module.exports = router;
