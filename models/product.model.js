// CREAMOS METODO PARA: Recupero todos los productos

// Ejemplo para lanzar una query y la manejamos con una promesa //
// dentro de la promesa va la query
const getAll = () => {
	const prom = new Promise((resolve, reject) => {
		db.query('select * from products', (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
	return prom;
};

// RECUPERAR EL PRODUCTO POR ID - select * from product where id = 1 //
// el ? es para parametros dinnámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array
// o resuelve devolviendo un nulo, si no lo encuentra,  if (result.length !== 1) return resolve(null);
// o se resuelve devolviendo el producto en sí resolve(result[0]);

const getById = (productId) => {
	return new Promise((resolve, reject) => {
		db.query(
			'select * from products where id = ?',
			[productId],
			(err, result) => {
				if (err) return reject(err);
				if (result.length !== 1) return resolve(null);
				resolve(result[0]);
			}
		);
	});
};


// RECUPERAR PRODUCTOS POR CATEGORIA getByCategory GET localhost:3000/api/products/cat/oficina
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array

const getByCategory = (category) => {
	return new Promise((resolve, reject) => {
		db.query(
			'select * from products where category = ?',
			[category],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};


// insertar nuevo registro en la BBDD //
// insert into productos (name, description, price, category, available, created_at) value (...)
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array

const create = ({name, description, price, category}) => {
	return new Promise((resolve, reject) => {
		db.query(
			'insert into products (name, description, price, category, available, created_at) values(?, ?, ?, ?, ?, ?)',
			[name, description, price, category, true, new Date()],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};


// actualizar los datos de un producto
// query: update products set name = '', description = '', price = , category = '' where id = ?
// el ? es para parametros dinámicos y siempre despues de la ? tiene que ir un array con tantos valores como interrogaciones tenga la sentencia de la query
// y después del array siempre va una función anómima con el error y el resultado, el resultado siempre será un array
// el id va fuera del objeto porque es un parametro dinámico

const update = (id, { name, description, price, category }) => {
	return new Promise((resolve, reject) => {
		db.query (
			'update products set name = ?, description = ?, price = ?, category = ? where id = ?',
			[name, description, price, category, id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
}

// BORRAR EL PRODUCTO POR ID - delete * from product where id = 1 //
const remove = (id) => {
	return new Promise((resolve, reject) => {
		db.query(
			'DELETE from products where id = ?',
			[id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
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
}

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
