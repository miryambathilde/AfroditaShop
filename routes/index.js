const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Aprendiendo node con Mario',
		clasesV2: ['primera', 'segunda', 'tercera'],
		products: 1,
		animals: ['perro', 'gato', 'hamster', 'conejo', 'loro'],
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

/* GET localhost:3000/products
VISTA: products/index.pug */
router.get('/', (req, res) => {
	res.render('products/index');
});

/* GET localhost:3000/products/new
VISTA: products/new.pug */

router.get('new', (req, res) => {
	res.render('products/new');
});

/* GET localhost:3000/products/edit
VISTA: products/edit.pug */

router.get('edit', (req, res) => {
	res.render('/products/edit');
});

/* GET localhost:3000/products/remove
VISTA: products/remove.pug */

router.get('remove', (req, res) => {
	res.render('produts/remove');
});

module.exports = router;
