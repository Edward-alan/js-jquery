define(["dialog", "serverModify"], function (dialog, serverModify) {
    var addBtn = document.querySelector(".add-btn");
    document.onclick = function (e) {
        var tar = e.target;
        switch (e.target.className) {
            case "add-btn":
                dialog.dialogServerModify({
                    html: `
                        <i></i>
                        <div class="dialog-box">
                            <div>姓名：<input type="text" class="username"></div>
                            <div>年纪：<input type="text" class="age"></div>
                            <div>地址：<input type="text" class="address"></div>
                            <div>电话：<input type="text" class="tel"></div>
                            <div class="btn-parent"></div>
                        </div>
                    `,
                    btn: [{
                        titleName: "保存",
                        method: function () {
                            serverModify("添加");
                        },
                    }, {
                        titleName: "取消",
                        method: function () {
                            serverModify();
                        },
                    }]
                });
                break;
            case "modify":
                var par = e.target.parentNode.parentNode,
                    username = par.querySelector(".username").innerHTML,
                    age = par.querySelector(".age").innerHTML,
                    address = par.querySelector(".address").innerHTML,
                    tel = par.querySelector(".tel").innerHTML;
                dialog.dialogServerModify({
                    html: `
                        <i></i>
                        <div class="dialog-box">
                            <div>姓名：<input type="text" class="username" value=${username}></div>
                            <div>年纪：<input type="text" class="age" value=${age}></div>
                            <div>地址：<input type="text" class="address" value=${address}></div>
                            <div>电话：<input type="text" class="tel" value=${tel}></div>
                            <div class="btn-parent"></div>
                        </div>
                    `,
                    btn: [{
                        titleName: "修改",
                        method: function () {
                            serverModify("修改", par);
                        },
                    }, {
                        titleName: "取消",
                        method: function () {
                            serverModify();
                        },
                    }]
                });
                break;
            case "del":
                var par = e.target.parentNode.parentNode;
                dialog.dialogServerModify({
                    html: `
                        <i></i>
                        <div class="dialog-box">
                            <div>确定要删除吗？</div>
                            <div class="btn-parent"></div>
                        </div>
                    `,
                    btn: [{
                        titleName: "删除",
                        method: function () {
                            serverModify("删除", par);
                        },
                    }, {
                        titleName: "取消",
                        method: function () {
                            serverModify();
                        },
                    }]
                });
                break;
        }
    }
})