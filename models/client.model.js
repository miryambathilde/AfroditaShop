const { executeQuery } = require('../helpers');

// METODO #1 PARA OBTENER TODOS LOS CLIENTES //

// REFACTORIZACION CON EL HELPER METHOD DE LA FUNCION CREATE //
const getAll = () => {
	return executeQuery('select * from clients');
};

// METODO #2 PARA CREART UN CLIENTE y luego pasarlo a la BBDD //

// REFACTORIZACION CON EL HELPER METHOD DE LA FUNCION CREATE //
const create = ({ name, email, address, phone }) => {
	return executeQuery(
		'insert into clients (name, email, address, phone) values (?,?,?,?)',
		[name, email, address, phone]
	);
};

module.exports = {
	getAll,
	create,
};
