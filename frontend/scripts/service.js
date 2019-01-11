var service = {
    server: {
        url : "http://127.0.0.1:3101/",
    },
    createUser: (user) =>{
        console.log("user");
        return $.ajax({
            url: service.server.url + "users",
            method: 'POST',
            data: JSON.stringify(user),
            dataType: "json",
            contentType: "application/json"
        });
    }
}