/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-27 09:39:18
 * @LastEditTime: 2018-12-29 13:09:41
 * @LastEditors: Please set LastEditors
 */
define(["server"], function (server) {
    return alertt;
})

function alertt(opt, type, tar) {
    var alert = document.getElementsByClassName("alert")[0];
    if (alert) {
        document.body.removeChild(alert);
    }

    var html = `
        名字：<input type="text" class="name" value=${opt.name}> <br>
        电话: <input type="text" class="tel" value=${opt.tel}> <br>
        <button class="server">保存</button>
    `;

    
    var div = document.createElement("div");
    div.classList.add("alert");
    div.innerHTML = html;
    document.body.appendChild(div);
    server(type, tar);
}

