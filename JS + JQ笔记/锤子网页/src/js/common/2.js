define(["ajax", "getData"], function (ajax) {
    var btn = document.getElementById("login");
    btn.addEventListener('click', function () {
        var usernameVal = document.getElementById("username").value;
        var passwordVal = document.getElementById("password").value;
        ajax({
            url: "api/interFace",
            type: "post",
            data: {
                username: usernameVal,
                password: passwordVal,
            },
            success: function (data) {
                data = JSON.parse(data);
                if (data.status) {
                    location.href = "./1.html";
                    localStorage.setItem("username", data.username);
                } else {
                    alert(data.message)
                }
            }
        })

    })
    // btn.onclick = function () {
    //     var usernameVal = document.getElementById("username").value;
    //     var passwordVal = document.getElementById("password").value;
    //     ajax({
    //         url: "api/interFace",
    //         type: "post",
    //         data: {
    //             username: usernameVal,
    //             password: passwordVal,
    //         },
    //         success: function (data) {
    //             data = JSON.parse(data);
    //             if (data.status) {
    //                 location.href = "./1.html";
    //                 localStorage.setItem("username", data.username);
    //             } else {
    //                 alert(data.message)
    //             }
    //         }
    //     })
    // }
})