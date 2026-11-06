const http = require('http');
const { Server } = require('socket.io');

let io;

const handleChatMessage = (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
}
const handleRoomChange = (socket, roomName) => {
    socket.rooms.array.forEach(room => {
        if(room===socket.id)return;
        //not done not done
     //   io.to
    });

}
const SocketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        })

        socket.on('chat message', (msg)=>handleChatMessage(socket,msg));
        socket.on('room change', (room)=>handleRoomChange(socket,room));
    })

    return server;
};

module.exports = SocketSetup;
