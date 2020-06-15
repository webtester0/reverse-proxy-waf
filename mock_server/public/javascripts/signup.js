$(document).ready(function () {
    let signup_button = $("#signup");
    let username_field = $("#usernameInput");
    let password_field = $("#passwordInput");
    let help1 = $("#help1");
    let help2 = $("#help2");

    help1.hide();
    help2.hide();

    signup_button.on("click", function () {
        let check = true;
        let username = username_field.val();
        let password = password_field.val();
        if (username === "" || password === "") {
            check = false;
            help2.show();
        }
        if (check) {
            $.ajax({
                method: "POST",
                url: "./users/signup",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data:JSON.stringify({password:password, username: username}),
            }).done(function (msg) {
                alert("User Signed Up");
                location.href = "http://localhost:3001"
            });
        }
    });

});