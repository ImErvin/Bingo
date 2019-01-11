var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var user = require('./user');
<<<<<<< HEAD
var path = require('path');
=======
var game = require('./game');
>>>>>>> refs/remotes/origin/master

// users array
var users = [];
// initial new game
var GAME = new game.Game();
// players array, just contain play's name
var gameplayers = [];

// console.log(new user.User('a'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('frontend'));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));


// ROUTES FOR OUR API
var userRouter = express.Router();      // get an instance of the express Router

userRouter.post('/', function(req, res){
    console.log('user: ' + req.body.username);
    //console.log('with card: '+ req.body.card);
    // check exist user
    if (!users.some(e => e.username === req.body.username) ){
        users.push(new user.User(req.body.username));
    }
    console.log(users);
    res.send('success!');
    
})

io.on('connection', (socket) => {

    // the channel for add user to connected users
    socket.on('connected', (username) => {
        GAME.players.push(users.find(u => u.username === username));
        console.log(GAME.players);
        gameplayers.push(username);
        console.log(gameplayers);

        io.emit('player list', gameplayers);
    });

    // socket.on('chat message', (username, message) => {
    //     console.log(username + " " + message);
    //     io.emit('chat message', username + ": " +message);
    // });

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
})


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /user
app.use('/users', userRouter);

http.listen(3101, () => {
    console.log("Listening on port 3101")
});


