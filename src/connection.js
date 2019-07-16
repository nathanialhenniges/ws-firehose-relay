const { message } = require('./message');
module.exports.connect = function(client) {
	client.isAuthed = false;
	client.channels = {};

	client.on('message', message)
}
