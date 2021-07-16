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

module.exports = {
	executeQuery,
	executeQueryUnique,
};
