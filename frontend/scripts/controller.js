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
                    for(var i of data.card.cardNumbers.sort((a, b) => a - b)){
                        $('#cardNumbers').append('<span class="badge badge-pill badge-warning mr-2 p-3">'+i+"</span>");
                    }
                    //$('#cardNumbers').text(data.card.cardNumbers.sort((a, b) => a - b));
                    $('#username').text("Welcome, "+data.username);
                    // connection here
                    service.connect(data.username);
                })
                .fail((error) => {
                    $('#messageFromServer').text(error.responseJSON);
                });
        });

        function sortNumber(a,b) {
            return a - b;
        }

    });
})();