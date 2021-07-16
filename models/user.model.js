// importamos el helper executeQuery
const { executeQuery } = require('../helpers');

// usamos el metodo para el registro de usuarios //
const create = ({ username, email, password }) => {
	return executeQuery(
		'insert into users (username, email, password, role) values (?,?,?,?)',
		[username, email, password, 'R']
	);
};

module.exports = {
	create,
};
