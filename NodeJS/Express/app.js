/*
let express = require('express');
let app = express();

app.get('/', (request, response) => {
	response.sendFile(__dirname + '/app.js');
});

app.listen(8080);
*/

let TwitterClient = require('./twitter_client.js');
new TwitterClient();