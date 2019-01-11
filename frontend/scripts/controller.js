var service = service;

(() => {
    $(() => {

        $('#gamePage').hide();
        $('#loginForm').submit((e) => {
            e.preventDefault();
            var user = {};
            user.username = $('#usernameForm').val();
            service.createUser(user)
                .done((data) => {
                    $('#messageFromServer').text(data);
                    $('#loginPage').hide();
                    $('#loginPage').prop('disabled', true);
                    $('#gamePage').show();
                    var data = JSON.parse(data);
                    console.log(data);
                    for (var i of data.card.cardNumbers.sort((a, b) => a - b)) {
                        $('#cardNumbers').append('<span class="badge badge-pill badge-warning mr-2 p-3">' + i + "</span>");
                    }
                    //$('#cardNumbers').text(data.card.cardNumbers.sort((a, b) => a - b));
                    $('#username').text("Welcome, " + data.username);
                    // connection here
                    connect(data.username);
                })
                .fail((error) => {
                    $('#messageFromServer').text(error.responseJSON);
                });
        });

        var connect= function (username) {
            socket.emit('connected', username);
            socket.on('connected', function (players) {
                $('#playersInGame').empty();
                for (var name of players) {
                    $('#playersInGame').append('<span class="badge badge-pill badge-warning mr-2 p-3">' + name + "</span>");
                }
                return players;
            });
        }

        function sortNumber(a, b) {
            return a - b;
        }

    });
})();