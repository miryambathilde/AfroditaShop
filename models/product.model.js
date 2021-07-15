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

/*  exportamos el module/modelo y tiene una clave y valor, que si tienen el mismo nombre 
puede ponerse solo una vez */
module.exports = {
	getAll,
};
