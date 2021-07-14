const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'afrodita_shop',
	port: 3306,
});

connection.connect((err) => {
	console.log(err);
});
