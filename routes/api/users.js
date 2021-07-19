const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers');
const { create, getByEmail, getById } = require('../../models/user.model');

router.post(
	'/register',

	body(
		'username',
		'Debes incluir el campo username, con una longitud mayor de 3 caracteres'
	)
		.exists()
		.isLength({ min: 3 }),
	body('password', 'Debes incluir un password de 3 caracteres y menor de 10')
		.exists()
		.isLength({ min: 4, max: 10 })
		.custom((value) => {
			const regex = new RegExp(
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,})'
			);
			return regex.test(value);
		}),
	body('email', 'Debes incluir un email correcto')
		.exists()
		.isEmail(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json(errors.array());
		}
		const user = await getByEmail(req.body.email);
		if (user) {
			return res.json({ error: 'Error en el registro. Revisa tus datos' });
		}
		req.body.password = bcrypt.hashSync(req.body.password, 10);

		const result = await create(req.body);
		res.json(result);
	}
);

// POST localhost:3000/api/users/login (email y password)
router.post('/login', async (req, res) => {
	const user = await getByEmail(req.body.email);
	if (!user) {
		return res.json({
			error: 'Error en usuario y/o contraseña 1',
		});
	}

	//comprobamos si funciona
	//console.log(req.body.password, user.password);
	// en la respuesta almacenamos el mensaje de success y el token

	const equal = bcrypt.compareSync(req.body.password, user.password);
	if (equal) {
		res.json({
			success: 'Login correcto',
			token: createToken(user),
		});
	} else {
		res.json({
			error: 'Error en usuario y/o contraseña 2',
		});
	}
});

module.exports = router;
