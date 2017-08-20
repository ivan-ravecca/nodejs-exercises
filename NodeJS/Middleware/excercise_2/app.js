const express = require('express');
const bodyParser = require('body-parser');
let app = express();

let parseUrlEncoded = bodyParser.urlencoded({ extended: false});
// middleware ---^

app.use(express.static('public'));

let objBlocks = {
	fixed: 'Blha 1',
	Movable: 'Blha 2',
	Rotating: 'Blha 3'
};

app.post('/blocks', parseUrlEncoded, (req, res) => {
	let newBlock = req.body;
	objBlocks[newBlock.name] = newBlock.description;

	res.status(201).json(newBlock.name);
});

app.delete('/blocks/:name', parseUrlEncoded, (req, res) => {
	delete objBlocks[req.blockName];

	res.sendStatus(200);
});

app.get('/blocks/:name', (req, res) => {
	
	// with params middleware
	let desc = objBlocks[req.blockName];
	if (!!desc) {
		res.json(desc);
	} else {
		res.status(404).json('can\'t find: ' + req.params.name);
	}
	// curl -i http://localhost:3000/blocks/fIxEd

});

app.get('/blocks', (req, res) => {
	res.status(200).json(Object.keys(objBlocks));
});

// middleware for params
// commonly used for running pre-conditions on Dynamic Routes
app.param('name', (req, res, next) => {
	let name = req.params.name;
	// Arbitrary way to build a index
	let key = name[0].toUpperCase() + name.slice(1).toLowerCase();

	req.blockName = key;
	next();
});

app.listen(3000, () => {
	console.info('Server listening at 3000');
});

// =========== Alternativa usando **route instance** para no codificar tanto repetido
/*
app.route('/blocks')
	.get((request, response) => {
		// app.get('/blocks') <-- used to be

	})
	.post(parseUrlEncoded, (request, response) => {
		// app.post('/blocks') <-- used to be
	});

app.route('/blocks:name')
	.get((request, response) => {
		// app.get('/blocks/:name') <-- used to be

	})
	.delete(parseUrlEncoded, (request, response) => {
		// app.post('/blocks/:name') <-- used to be
	});
*/

// =========== Alternativa moviendo las  **route instance** para los modulos
/*
let routesBlocks = require('./routes/blocks');
app.use('/blocks', routesBlocks);
// noticed bnunch of code from here is moved into the route

*/