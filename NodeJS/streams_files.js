let fs = require('fs');

let file = fs.createReadStream('streams.js');
let newFile = fs.createWriteStream('streams (copy).js');

file.pipe(newFile);

// node streams_files.js
/*
// ======= Alternativas =======
let file = fs.createReadStream('streams.js');
file.on('readable', function(){
  var chunk;
  while(null !== (chunk = file.read())){
    console.log(chunk.toString());
  }
});

// ======= Alternativas =======
let file = fs.createReadStream('streams.js');
file.pipe(process.stdout);

// ======= Alternativas =======
// server responde con index.html usando pipe
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('index.html');
  file.pipe(response);
}).listen(8080);

*/