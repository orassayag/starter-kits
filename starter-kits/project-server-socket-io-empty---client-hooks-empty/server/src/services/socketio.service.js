const socketIo = require('socket.io');

class SocketIoService {

	constructor() {
		this.socketIO = null;
	}

	initiate(server) {
		this.socketIO = socketIo(server, {
			cors: {
				origin: '*'
			}
		});
		this.socketIO.on('connection', (socket) => {
			this.log(`socketIo ${socket.id} connected.`);
			socket.on('disconnect', () => this.log(`socketIo ${socket.id} disconnected.`));
			socket.on('terminate', (data) => {
				const socketToKill = this.socketIO.sockets.sockets[data.socketId];
				if (socketToKill) {
					this.log(`socket ${data.socketId} terminated`);
					socketToKill.disconnect();
				}
			});
		});

		setInterval(() => {
			this.socketIO.emit('message', { parameter1: new Date().toLocaleString(), parameter2: 'Hello', parameter3: 'world' });
		}, 5000);
	}

	log(text) {
		console.log(`===${text}===`);
	}
}

module.exports = new SocketIoService();