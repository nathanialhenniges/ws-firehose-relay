require('dotenv').config();

const privateKey = fs.readFileSync(process.env.KEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERT, 'utf8');

const credentials = { key: privateKey, cert: certificate };
const https = require('https');

const httpsServer = https.createServer(credentials);
httpsServer.listen(process.env.PORT_SSL);

const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: process.env.PORT,
  server: httpsServer
});

require("./firehose")(wss);


const { connect } = require("./connection");
wss.on("connection", connect);
