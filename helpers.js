/* HELPER METHODS */

// hacemos una funcion para ejecutar las queries, pasamos por parametro, la query y el array de los parametros que es lo que cambia en cada ejecución
function executeQuery(query, arrParams = []) {
	return new Promise((resolve, reject) => {
		db.query(query, arrParams, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	executeQuery,
};
