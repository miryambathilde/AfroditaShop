const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Aprendiendo node con Mario',
		clasesV2: ['primera', 'segunda', 'tercera'],
		products: 1,
		animals: ['perro', 'gato', 'hamster', 'conejo'],
	});
});

/* GET info, renderizamos la vista info.pug */
router.get('/info', (req, res) => {
	res.render('info', {
		people: [
			{ name: 'Aitor', surname: 'Gonzalez', age: 19 },
			{ name: 'Rocío', surname: 'García', age: 23 },
			{ name: 'Manuel', surname: 'Roble', age: 49 },
			{ name: 'Laura', surname: 'Fernández', age: 33 },
		],
	});
});

module.exports = router;
