// METODO #1 PARA OBTENER TODOS LOS CLIENTES //

/* const getAll = () => {
	return new Promise((resolve, reject) => {
		db.query('select * from clients', (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};
 */

// REFACTORIZACION CON EL HELPER METHOD DE LA FUNCION CREATE //
const getAll = () => {
	return executeQuery('select * from clients');
};
// METODO #2 PARA CREART UN CLIENTE y luego pasarlo a la BBDD //
// insertar nuevo registro en la BBDD //
// insert into productos (name, email, address, phone) values (...)
// el ? es para parametros dinnámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array

/* const create = ({ name, email, address, phone }) => {
	return new Promise((resolve, reject) => {
		db.query(
			'insert into clients (name, email, address, phone) values (?,?,?,?)',
			[name, email, address, phone],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};
 */
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
