const EventSource = require("eventsource");
const WebSocket = require("ws");

module.exports = function(server) {
	const stream = new EventSource(`https://tmi.twitch.tv/firehose?oauth_token=${process.env.OAUTH}`);

	["privmsg", "clearmsg", "roomstate", "usernotice", "userstate"].map(command => stream.addEventListener(command, handleMessage));

	function handleMessage({ data: msg }) {
		const msgJson = JSON.parse(msg);

		var target = msgJson.room.substr(1);
		if (msgJson.command != "") {
			target = msgJson.target.substr(1);
		}

		server.clients.forEach(function (client) {
			// If the connection is not open then don't sent the client anything
			if (client.readyState !== WebSocket.OPEN) return;

			if (client.channels[target]) return client.send(JSON.stringify({
				type: "PRIVMSG",
				data: msg
			}))
		});
	}
}
