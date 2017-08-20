let request = require('request');
let url = require('url');
let express = require('express');
const twitterUrl = '/tweets/:username';
const twitterApi = 'api.twitter.com';
const twitterPath = '/1/statuses/user_timeline.json';

class TwitterClient {

	constructor() {
		let listenGET = () => {
			this.app.get(twitterUrl, (req, response) => {
				let twitterAccount = req.params.username;
				let options = {
					protocol: 'http',
					host: twitterApi,
					pathname: twitterPath,
					query: {
						screen_name: twitterAccount,
						count: 10
					}
				}

				request(url.format(options)).pipe(response);
			});
		};

		this.app = express();
		listenGET();
		this.app.listen(8080);
	}
}

module.exports = TwitterClient;