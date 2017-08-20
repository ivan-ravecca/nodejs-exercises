let http = require('http');
/*
http.createServer((request, response) => {
	response.writeHead(200);
	response.write('Hello this is dog, running');
	setTimeout(function () {
		response.write('This is dog, Bye');
		response.end();
	}, 5000);
}).listen(8080);
console.log('Listening at 8080');
*/
// =========== alternative to write the same  ===========

let server = http.createServer();
server.on('request', (request, response) => {
	response.writeHead(200);
	response.write('Hello this is dog, running');
	setTimeout(function () {
		response.write('This is dog, Bye');
		response.end();
	}, 5000);
});

server.listen(8080);

console.log('Listening at 8080');
// node hello.js
// curl http://localhost:8080