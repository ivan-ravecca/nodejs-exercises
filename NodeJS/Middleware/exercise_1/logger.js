module.exports = (request, response, next) => {
	let stream = process.stdout;
	const start = +new Date(); // get timestamp
	const url = request.url;
	const method = request.method;

	response.on('finish', () => {
		const duration = +new Date() - start;
		let message = method + ' to ' + url + ' and took ' + duration + 'ms \n\n';

		stream.write(message);
	})

	next();
};