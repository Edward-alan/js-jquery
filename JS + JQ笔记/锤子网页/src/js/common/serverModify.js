define([], function () {
    return serverModify;
})

function serverModify(data, par) {
    var dialog = document.querySelector(".dialog");
    if (data == "删除") {
        par.parentNode.removeChild(par);
    } else if (data != undefined) {
        var username = dialog.querySelector(".username").value;
        var age = dialog.querySelector(".age").value;
        var address = dialog.querySelector(".address").value;
        var tel = dialog.querySelector(".tel").value;
        var containerBox = document.querySelector(".container-box");
        var div = document.createElement("div");
        div.className = "every-box";
        var html = `
                    <p>姓名：<span class=username>${username}</span></p>
                    <p>年级：<span class=age>${age}</span></p>
                    <p>地址: <span class=address>${address}</span></p>
                    <p>电话: <span class=tel>${tel}</span></p>
                    <div>
                        <button class="modify">修改</button>
                        <button class="del">删除</button>
                    </div>
        `;
        div.innerHTML = html;
        if (data == "添加") {
            containerBox.appendChild(div);
        } else if (data == "修改") {
            par.parentNode.replaceChild(div, par);
        }
    }
    document.body.removeChild(dialog);
}