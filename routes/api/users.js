const express = require('express');
const router = express.Router();

// importamos los metodos del user model
const { create } = require('../../models/user.model');

router.post('/register', async (req, res) => {
	//TODO comprobar si el email ya existe //

	const result = await create(req.body);
	console.log(result);
	res.end('funciona bien el POST USERS');
});

module.exports = router;
