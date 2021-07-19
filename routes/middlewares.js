const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getById } = require('../models/user.model');

const checkToken = async (req, res, next) => {
	// probamos si funciona //
	//console.log('pasa por checktoken');

	// 1. comprobacion si existe el token dentro de las cabeceras de la petición //
	// si no existe la cabecera authorization //
	if (!req.headers['authorization']) {
		return res.json({
			error: 'Debes incluir la cabecera de autenticación',
		});
	}

	const token = req.headers['authorization'];

	// 2. Desencriptar el TOKEN //
	// SECRET_KEY de env.
	let payload;
	try {
		payload = jwt.verify(token, process.env.SECRET_KEY);
	} catch (error) {
		return res.json({
			error: 'El token es incorrecto',
		});
	}
	// probamos si funciona //
	//console.log(payload);

	// 3. Comprobar si está caducado el TOKEN //
	if (payload.expire_at < dayjs().unix()) {
		return res.json({ error: 'El token ha caducado' });
	}

	// 4. Recuperar el usuario logado, está ejecución se ejecutará siempre, ya que estará logado //
	const user = await getById(payload.user_id);
	req.user = user;
	console.log(user);
	next();
};

// MIDDLEWARE chedkAdmin //

// 1. Comprobamos que el rol del usuario logado es A, si no devuelve error
// 2. Aplicamos a todas las rutas de /clients

module.exports = { checkToken };
