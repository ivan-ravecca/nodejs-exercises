let http = require('http');
let makeRequest = (message) => {
	const options = {
		host: 'localhost',
		port: 8080,
		path: '/',
		method: 'POST'
	};

	let request = http.request(options, (response) => {
		response.on('data', ((data) => {
			console.log(data);
		}))
	});

	request.write(message);
	request.end();
}

module.exports = makeRequest;