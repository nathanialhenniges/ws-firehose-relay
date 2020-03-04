require('dotenv').config();

const fs = require('fs');
const WebSocket = require('ws');
let wss;
if (process.env.SSL === 'true') {
  const privateKey = fs.readFileSync(process.env.KEY, 'utf8');
  const certificate = fs.readFileSync(process.env.CERT, 'utf8');

  const credentials = { key: privateKey, cert: certificate };
  const https = require('https');

  const httpsServer = https.createServer(credentials);
  httpsServer.listen(process.env.PORT);

  wss = new WebSocket.Server({
    server: httpsServer
  });
} else {
  wss = new WebSocket.Server({ port: process.env.PORT })
}


require("./firehose")(wss);


const { connect } = require("./connection");
wss.on("connection", connect);

console.log('SERVER STARTED')
