const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

/* HELPER METHODS */

// hacemos una función para ejecutar las queries, pasamos por parametro, la query y el array de los parametros que es lo que cambia en cada ejecución
function executeQuery(query, arrParams = []) {
	return new Promise((resolve, reject) => {
		db.query(query, arrParams, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

// hacemos una función para queries con filtrado
function executeQueryUnique(query, arrParams = []) {
	return new Promise((resolve, reject) => {
		db.query(query, arrParams, (err, result) => {
			if (err) return reject(err);
			if (result.length !== 1) return resolve(null);
			resolve(result[0]);
		});
	});
}

// función para generar el token, INSTALAMOS DAYJS
// en expire_at: usamos dayjs para la fecha de ahora, le añadimos 5 minutos y lo transformamos a formato unix
function createToken(user) {
	const payload = {
		user_id: user.id,
		expire_at: dayjs()
			.add(5, 'days')
			.unix(),
		create_at: dayjs().unix(),
		role: user.role,
	};

	// esto nos devuelve el token
	// SECRET_KEY de env.
	return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {
	executeQuery,
	executeQueryUnique,
	createToken,
};
