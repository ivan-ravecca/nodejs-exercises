const express = require('express');
const bodyParser = require('body-parser');

let router = express.Router();
let parseUrlEncoded = bodyParser.urlencoded({ extended: false});

let blocks = {
	fixed: 'Blha 1',
	Movable: 'Blha 2',
	Rotating: 'Blha 3'
};

router.route('/')
	.get((request, response) => {
		// app.get('/blocks') <-- used to be

	})
	.post(parseUrlEncoded, (request, response) => {
		// app.post('/blocks') <-- used to be
	});

router.route('/:name')
	.get((request, response) => {
		// app.get('/blocks/:name') <-- used to be

	})
	.delete((request, response) => {
		// app.post('/blocks/:name') <-- used to be
	})
	// using all we don't longer need to add "parseUrlEncoded"
	.all((request, response, next) => {
		let name = request.params.name;
		// Arbitrary way to build a index
		let key = name[0].toUpperCase() + name.slice(1).toLowerCase();

		request.blockName = key;
		next();
	});

module.exports = router;