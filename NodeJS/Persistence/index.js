const express = require('express');

let app = express();

const server = require('http').createServer(app);

let io = require('socket.io')(server);

let redis = require('redis');
let clientRedis = redis.createClient();

let storedMessages = (name, data) => {
	clientRedis.lpush('messages', JSON.stringify({name: name, data: data}), (error, reply) => {
		clientRedis.ltrim('messages', 0, 5); //keeps 10 elements only
	});
};

io.on('connection', (client) => {
	console.log('Client connected');
	client.emit('messages', {hello: 'world'});

	client.on('join', (name) => {
		client.nickname = name;
		clientRedis.lrange('messages', 0, -1, (error, messages) => {
			messages.reverse();
			messages.forEach((message) => {
				message = JSON.parse(message);
				client.emit('messages', message.name + ' says: ' + message.data);
			});
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