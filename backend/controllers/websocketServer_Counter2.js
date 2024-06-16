// websocket server for counter 2 (Kafka consumer)
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8085 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('WebSocket server is connected');
});

module.exports = wss;
