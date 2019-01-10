var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('frontend'));

io.on('connection', (socket) => {

    socket.on('connected', (message) => {
        io.emit('connected', message);
    });

    socket.on('chat message', (username, message) => {
        console.log(username + " " + message);
        io.emit('chat message', username + ": " +message);
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
})

http.listen(3101, () => {
    console.log("Listening on port 3101")
});