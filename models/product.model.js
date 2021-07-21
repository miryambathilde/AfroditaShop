const { executeQuery, executeQueryUnique } = require('../helpers');

// PAGINACION DE PRODUCTOS //

// CREAMOS METODO PARA: Recupero todos los productos, con limite + offset

// Ejemplo para lanzar una query y la manejamos con una promesa //
// dentro de la promesa va la query
// page: 1,2,3,4,5,6,7...
// limit: 5
// calcular offset: limit * (page-1)
// lo INICIAMOS EN LOS PARAMETROS POR DEFECTO: PAGE 1 Y LIMIT 5

const getAll = (page = 1, limit = 5) => {
	return executeQuery('select * from products limit ? offset ?', [
		limit,
		limit * [page - 1],
	]);
};

// RECUPERAR EL PRODUCTO POR ID - select * from product where id = 1 //
// el ? es para parametros dinnámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array
// o resuelve devolviendo un nulo, si no lo encuentra,  if (result.length !== 1) return resolve(null);
// o se resuelve devolviendo el producto en sí resolve(result[0]);

const getById = (productId) => {
	return executeQueryUnique('select * from products where id = ?', [productId]);
};

// RECUPERAR PRODUCTOS POR CATEGORIA getByCategory GET localhost:3000/api/products/cat/oficina
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array

const getByCategory = (category) => {
	return executeQuery('select * from products where category = ?', [category]);
};

// insertar nuevo registro en la BBDD //
// insert into productos (name, description, price, category, available, created_at) value (...)
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array

const create = ({ name, description, price, category }) => {
	return executeQuery(
		'insert into products (name, description, price, category, available, created_at) values(?, ?, ?, ?, ?, ?)',
		[name, description, price, category, true, new Date()]
	);
};

// actualizar los datos de un producto
// query: update products set name = '', description = '', price = , category = '' where id = ?
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array
// el id va fuera del objeto porque es un parametro dinámico

const update = (id, { name, description, price, category }) => {
	return new Promise((resolve, reject) => {
		db.query(
			'update products set name = ?, description = ?, price = ?, category = ? where id = ?',
			[name, description, price, category, id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

// BORRAR EL PRODUCTO POR ID - delete * from product where id = 1 //
const remove = (id) => {
	return new Promise((resolve, reject) => {
		db.query('DELETE from products where id = ?', [id], (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};

// RECUPERAR LOS PRODUCTOS COMPRADOS POR CLIENTES //
// en la query el id del cliente será un parametro dinámico

const getByClient = (clientId) => {
	return new Promise((resolve, reject) => {
		db.query(
			'select p.* from products p, tbi_clients_products tbi where p.id = tbi.product_id and tbi.client_id = ?',
			[clientId],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};

/*  exportamos el module/modelo y tiene una clave y valor, que si tienen el mismo nombre 
puede ponerse solo una vez */
module.exports = {
	getAll,
	getById,
	create,
	getByCategory,
	update,
	remove,
	getByClient,
};
