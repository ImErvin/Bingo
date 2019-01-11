var service = service;

(() => {
    $(() => {

        $('#gamePage').show();
        $('#loginForm').submit((e) => {
            e.preventDefault();
            alert("Entered");
            var user = {};
            user.username = $('#usernameForm').val();
            service.createUser(user)
                .done((data) => {
                    $('#messageFromServer').text(data);
                    $('#loginPage').hide();
                    $('#loginPage').prop('disabled', true);
                    $('#gamePage').show();
                })
                .fail((error) => {
                    console.log(error);
                    $('#messageFromServer').text(error.responseJSON);
                });
        });


    });
})();