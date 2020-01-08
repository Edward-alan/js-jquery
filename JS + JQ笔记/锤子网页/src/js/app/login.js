define(["ajax", 'getData_login'], function (ajax) {
    var username = document.getElementsByClassName("username")[0];
    var password = document.getElementsByClassName("password")[0];
    var usernameE = document.getElementsByClassName("username-error")[0];
    var passwordE = document.getElementsByClassName("password-error")[0];
    var submit = document.getElementsByClassName("submit")[0];
    submit.onclick = function () {
        var usernameReg = /(^1[3-9]\d{9}$)|(^\w+@\w+\.(com|cn|net)$)/;
        var passwordReg = /^.{6,11}$/;
        if (!usernameReg.test(username.value) && false) {
            usernameE.style.display = "block";
        } else if (!passwordReg.test(password.value) && false) {
            passwordE.style.display = "block";
        } else {
            usernameE.style.display = "none";
            passwordE.style.display = "none";

            ajax({
                url: 'api/loginFace',
                type: "post",
                data: {
                    username: username.value,
                    password: password.value,
                },
                success: function (data) {
                    data1 = JSON.parse(data)
                    if (data1.status) {
                        localStorage.setItem("user", data)
                        location.href = "./index.html";
                    } else {
                        // usernameE.style.display = "block";
                        // passwordE.style.display = "block";
                        alert("账号密码不正确!!!");
                    }
                }
            })
        }

    }
})