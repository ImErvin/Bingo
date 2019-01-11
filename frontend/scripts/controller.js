var service = service;

function testCreateUser() {
    $('loginForm').submit((event) => {
        var user = {};
        user.userName = $('usernameForm').val();
        service.createUser(user).done((data) => {
            alert("done");
        })
        .fail((error) => {
            alert("error");
        });
        
        event.preventDefault();
        return false;
    });
}