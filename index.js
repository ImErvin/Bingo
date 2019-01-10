var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var user = require('./user');

// users arr
var users = [];

// console.log(new user.User('a'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('frontend'));

// ROUTES FOR OUR API
var userRouter = express.Router();      // get an instance of the express Router

userRouter.post('/', function(req, res){
    console.log('user: ' + req.body.username);
    //console.log('with card: '+ req.body.card);
    // check exist user
    console.log('yy '+users);
    if (!users.some(e => e.username === req.body.username) ){
        users.push(new user.User(req.body.username));
    }
    console.log(users);
    res.send('success!');
    
})

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


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /user
app.use('/user', userRouter);

http.listen(3101, () => {
    console.log("Listening on port 3101")
});


