let fs = require('fs');
let http = require('http');

// ====== file upload ======
/* http.createServer((request, response) => {
	// Create the file
	let newFile = fs.createWriteStream('content_from_uploaded_content.txt');

	// place content in the created file
	request.pipe(newFile); // non blocking :D

	request.on('end', () => {
		// Close the response once finish reading pipe
		response.end('done uploading');
	});
}).listen(8080);
console.log('Listening at 8080');

*/

// curl --upload-file README http://localhost:8080

// ================== with progress  ==================
http.createServer((request, response) => {
	// Create the file
	let newFile = fs.createWriteStream('content_from_uploaded_content.txt');
	let fileBytes = request.headers['content-length'];
	let uploadedBytes = 0;

	request.on('readable', () => {
		while (null !== (chunk = request.read())) {
			uploadedBytes += chunk.length;
			response.write('Progress: ' + parseInt((uploadedBytes/fileBytes) * 100, 10) + '%\n');
		}
	});

	request.pipe(newFile);

	request.on('end', () => {
		// Close the response once finish reading pipe
		response.end('done uploading');
	});
}).listen(8080);
console.log('Listening at 8080');
// curl --upload-file image.jpg http://localhost:8080