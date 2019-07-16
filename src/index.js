require('dotenv').config();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT });

require("./firehose")(wss);

const { connect } = require("./connection");
wss.on("connection", connect);
