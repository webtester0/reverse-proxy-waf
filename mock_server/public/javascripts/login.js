$(document).ready(function () {
    let username_field = $("#usernameInputL");
    let password_field = $("#passwordInputL");

    let login_button = $("#loginL");
    let signup_button = $("#signupL");

    let help1 =  $("#help1");
    let help2 =  $("#help2");

    help1.hide();
    help2.hide();

    login_button.on("click", function () {
        help1.hide();
        help2.hide();
        let check = true;
        let username = username_field.val();
        let password = password_field.val();
        console.log(username);
        console.log(password);
        if (username === "" || password === "") {
            check = false;
            help2.show();
        }
        if (check) {
            $.ajax({
                method: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data:JSON.stringify({password:password, username: username}),
                url: "./users/login"
            }).done(function (data) {
                if(data["msg"] === "logged in"){
                    location.href = "http://localhost:3001/dashboard";
                }else{
                    help1.show();
                }
            });
        }
    });


    signup_button.on("click", function () {
        location.href = "http://localhost:3001/signup"
    });

});