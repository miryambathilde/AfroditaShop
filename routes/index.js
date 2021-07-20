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

module.exports = router;
