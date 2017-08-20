const express = require('express');
const logger = require('./logger');

let app = express();

/* app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
});
// Alternatiova, usar middleware
*/

let blocks = ['AAA', 'BBB', 'CCCC'];

app.use(express.static('public'));
app.use(logger);

/*
app.get('/blocks', (req, res) => {
	// Alternative 1
	setTimeout(function(){
		res.send(blocks);
	}, 5000);
	

	// Alternative 2
	if (req.query && req.query.limit) {
		res.json(blocks.slice(0, req.query.limit));
	} else {
		res.json(blocks);
	}
});
*/

// ======= Dinamic routes =======
let objBlocks = {
	fixed: 'Blha 1',
	Movable: 'Blha 2',
	Rotating: 'Blha 3'
};
app.get('/blocks/:name', function (req, res) {
	/*
	// without params middleware
	if (req.params && req.params.name) {
		let desc = objBlocks[req.params.name]
		if (!!desc) {
			res.json(desc);		
		} else {
			res.status(404).json('can\'t find: ' + req.params.name);
		}
	}
	*/

	// with params middleware
	let desc = objBlocks[req.blockName];
	if (!!desc) {
		res.json(desc);
	} else {
		res.status(404).json('can\'t find: ' + req.params.name);
	}
	// curl -i http://localhost:3000/blocks/fIxEd

});

// middleware for params
// commonly used for running pre-conditions on Dynamic Routes
app.param('name', (req, res, next) => {
	let name = request.params.name;
	// Arbitrary way to build a index
	let key = name[0].toUpperCase() + name.slice(1).toLowerCase();

	req.blockName = key;
	next();
});

app.listen(3000, function(){
	console.info('Server listening at 3000');
});