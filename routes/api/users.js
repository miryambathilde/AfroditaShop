const express = require('express');
const router = express.Router();
// importamos bcrypt para encriptar password //
const bcrypt = require('bcryptjs');

// importamos los metodos del user model
const { create, getByEmail } = require('../../models/user.model');

router.post('/register', async (req, res) => {
	//TODO: validaciones sobre req.body //

	// comprobar si el email ya existe //
	const user = await getByEmail(req.body.email);
	// si ya existe aparece este error y no hará el registro en la BBDD //
	if (user) {
		return res.json({
			error: 'Error en el registro. Revisa los datos',
		});
	}

	// encriptación del password, el 10 es el parametro salt //
	// para que se guarde la encriptación del password, lo que hacemos es asignarlo al password de la BBDD //
	req.body.password = bcrypt.hashSync(req.body.password, 10);

	const result = await create(req.body);
	res.json(result);
});

module.exports = router;
