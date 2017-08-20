const express = require('express');

let app = express();

const server = require('http').createServer(app);

let io = require('socket.io')(server);

let messages = [];
let storedMessages = (name, data) => {
	messages.push({name: name, data: data});
	if (messages.length > 5) {
		messages.shift();
	}
};

io.on('connection', (client) => {
	console.log('Client connected');
	client.emit('messages', {hello: 'world'});

	client.on('join', (name) => {
		client.nickname = name;
		messages.forEach((message) => {
			client.emit('messages', message.name + ' says: ' + message.data);
		});
	});

	client.on('messages', (data) => {
		console.log(data);
		var name = client.nickname;
		storedMessages(name, data);
		client.broadcast.emit('messages', name + ' says: ' + data);
		client.emit('messages', name + ' says 2: ' + data);
	});

});



app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});



server.listen(8080); // notice is not APP but SERVER
console.log('Listening on 8080');