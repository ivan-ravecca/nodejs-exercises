let EventEmitter = require('events').EventEmitter;
let logger = new EventEmitter();

logger.on('error', (message) => {
	console.log('ERR: ' + message);
});

logger.on('blha', (message) => {
	console.log('Blha: ' + message);
});

logger.emit('error', 'Some error message');
logger.emit('blha', 'Some blha message');

// node logger.js