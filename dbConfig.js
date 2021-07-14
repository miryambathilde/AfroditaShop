const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'afrodita_shop',
	port: 3306,
});

global.db = pool;
