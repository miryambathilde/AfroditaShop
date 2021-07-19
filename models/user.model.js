// importamos el helper executeQuery
const { executeQuery, executeQueryUnique } = require('../helpers');

// usamos el metodo para el registro de usuarios //
const create = ({ username, email, password }) => {
	return executeQuery(
		'insert into users (username, email, password, role) values (?,?,?,?)',
		[username, email, password, 'R']
	);
};

// usamos un metodo para filtrar los usuarios por mail, para comprobar si ya existe el mail en BBDD //
const getByEmail = (email) => {
	return executeQueryUnique('select * from users where email = ?', [email]);
};

//metodo para conseguir para filtrar usuarios por id
const getById = (userId) => {
	return executeQueryUnique('select * from users where id = ?', [userId]);
	console.log(getById);
};

module.exports = {
	create,
	getByEmail,
	getById,
};
