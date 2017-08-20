let http = require('http');

/*
http.createServer((request, response) => {
	response.writeHead(200);
	request.on('readable', () => {
		console.log('readable');
		let chunk = null;
		while (null !== (chunk = request.read())) {
			console.info('Chunk ' + chunk.toString());
			response.write(chunk);
		}
	});
	request.on('end', () => {
		console.log('end');
		response.end();
	});
}).listen(8080);
console.log('Listening at 8080');

*/

// ============ ALternativa usando PIPES
http.createServer((request, response) => {
	response.writeHead(200);
	request.pipe(response); // just like cat error.log | grep 'text i am looking'
	// PIPE is the opertation of listen for 'readable' and 'end' 
	// events in the above example
}).listen(8080);
console.log('Listening at 8080');

// node streams.js
// curl -d 'Text to send' http://localhost:8080