const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'afrodita_shop',
	port: 3306,
});

// hacemos la query y luego el callback para gestionar error o resultado //
connection.connect((err) => {
	connection.query('select * from products', (err, result) => {
		if (err) {
			return console.log(err.message);
		}
		console.log(result);
	});
	connection.end();
});
