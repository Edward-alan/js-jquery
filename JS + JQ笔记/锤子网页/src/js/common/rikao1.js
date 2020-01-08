define(["alertt"], function (alertt) {
    var add = document.getElementsByClassName("add")[0];
    var containerBox = document.getElementsByClassName("container-box")[0];
    add.onclick = function () {
        alertt({
            name: ``,
            tel: "",
        }, 1);
    }
    containerBox.onclick = function (e) {
        var tar = e.target;
        if (tar.className === "xiugai") {
            var nameVal = tar.parentNode.querySelector(".name").innerHTML;
            var telVal = tar.parentNode.querySelector(".tel").innerHTML;
            alertt({
                name: nameVal,
                tel: telVal,
            }, 2, tar)
        }
        if (tar.className === "del") {
            tar.parentNode.parentNode.removeChild(tar.parentNode)
        }
    }
})