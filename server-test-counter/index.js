const WebSocket = require('ws');

const PORT = 8000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (socket) => {
    const clientId = Date.now();

    const interval = setInterval(() => {
        socket.send(JSON.stringify({ clientId }));
    }, 1000);

    socket.on('message', (msg) => {
        const data = JSON.parse(msg.toString());
        console.log('Client', data.clientId, 'clicked', data.count, 'times');
    });

    socket.on('close', () => {
        console.log(clientId, 'client disconnected');
        clearInterval(interval);
    })

    socket.on('error', (err) => {
        console.log('Got error', err);
    });
});

console.log('WS started', PORT);
