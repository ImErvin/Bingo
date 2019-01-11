var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var user = require('./user');
var path = require('path');
var game = require('./game');
var card = require('./card');

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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// ROUTES FOR OUR API
var userRouter = express.Router();      // get an instance of the express Router

userRouter.route('/users')
    .post((req, res) => {
        if (!users.some(e => e.username === req.body.username)) {
            var newUser = new user.User(req.body.username);
            var newCard = new card.Card("1");
            newCard.generateCardNumbers();
            newUser.addCard(newCard);
            users.push(newUser);
            res.statusCode = 200;
            res.json(JSON.stringify(newUser));
        } else {
            res.statusCode = 409;
            res.json("User already exists");
        }
    })
    .delete((req, res) => {

    })
    .get((req, res) => {
        console.log("get")
    });

io.on('connection', (socket) => {

    // the channel for add user to connected users
    socket.on('connected', (username) => {
        console.log('is:' + username);
        GAME.players.push(users.find(u => u.username === username));
        console.log(GAME.players);
        gameplayers.push(username);
        console.log(gameplayers);

        io.emit('connected', gameplayers);
    });

    socket.on('game', () => {
        var number = 12;
        setInterval(io.emit('game', 1), 3000);
        
    });

    var spitOutNumbers = function (array) {

        if (!array) {
            var numbersInGame = (() => {
                tempNumbers = new Array(90);
                for (var i = 1; i <= 90; i++) {
                    tempNumbers.push(i);
                }

                return tempNumbers;
            })();

            numbersInGame = shuffle(numbersInGame);
        }
        if (numbersInGame.length < 2) {
            return {
                returnedNumber: returnedNumber,
                numbersInGame: null
            };
        } else {
            var returnedNumber = numbersInGame[numbersInGame.length];

            numbersInGame = numbersInGame.pop();
            return {
                returnedNumber: returnedNumber,
                numbersInGame: numbersInGame
            };
        }

    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
})


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /user
app.use(userRouter);

http.listen(3101, () => {
    console.log("Listening on port 3101")
});


