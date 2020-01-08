define([], function () {
    return server;
})

function server(type, tar) {
    var alert = document.getElementsByClassName("alert")[0];
    var btn = alert.querySelector(".server");
    btn.onclick = function () {
        var nameVal = alert.querySelector(".name").value;
        var tel = alert.querySelector(".tel").value;
        var container = document.getElementsByClassName("container-box")[0];
        var html = `
        <div class="every">
            名字：<span class="name">${nameVal}</span><br>
            电话:<span class="tel">${tel}</span><br>
            <button class="xiugai">修改</button>
            <button class="del">删除</button>
        </div>
        `;
        if (type == 1) {
            container.innerHTML += html;
        } else if (type == 2) {
            var div = document.createElement("div");
            div.classList.add("every");
            div.innerHTML = `
                名字：<span class="name">${nameVal}</span><br>
                电话:<span class="tel">${tel}</span><br>
                <button class="xiugai">修改</button>
                <button class="del">删除</button>
            `
            tar.parentNode.parentNode.replaceChild(div, tar.parentNode)
        }
        document.body.removeChild(alert);
    }
}