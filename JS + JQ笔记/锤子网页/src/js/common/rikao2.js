define(function () {
        var circle = document.querySelector(".circle");
        var mask = document.querySelector(".container-box");
        var box = document.querySelector(".container");
        var boxLeft = box.offsetLeft;
        circle.onmousedown = function () {
                box.onmousemove = function (e) {
                        var x = e.pageX - boxLeft;
                        circle.style.left = x + "px";
                        mask.style.width = x + "px";
                }

        }
        document.onmouseup = function () {
                box.onmousemove = '';
        }

})