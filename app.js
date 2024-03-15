const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let clients = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    clients.push(socket);

    socket.on('message', (data) => {
        console.log('Message received:', data);
        broadcast(data, socket);
    });
});

function broadcast(message, sender) {
    clients.forEach(client => {
        if (client !== sender) {
            client.emit('message', message);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
