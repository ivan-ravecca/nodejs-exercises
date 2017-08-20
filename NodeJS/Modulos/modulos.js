let hello = require('./custom_hello');
let gb = require('./custom_bye');
let makeRequest = require('./make_request');

hello();
gb.goodbye();
console.log('Finish');

makeRequest('This is a test');