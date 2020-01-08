function Game(opts) {
    this.data = opts.data; // 数据
    this.nav = document.querySelector(opts.navWrap);
    this.person = document.querySelector(opts.person);
    this.btn = document.getElementById(opts.btn);
    this.input = document.querySelector(opts.input);
    this.init();
}
Game.prototype = {
    constructor: Game,
    // 初始化方法 
    init: function() {
        // 渲染职责
        this.renderJob();

    },
    // 渲染职责
renderJob: function() {
    var html = ``;
    for (var k in this.data) {
        html += `<li>
        <label><input type="checkbox" value="${k}">
        ${this.data[k].tit}</label></li>`;
        // 渲染人物
        this.renderPerson(this.data[k].item);
    }
    this.nav.innerHTML = html;
    // 调用点击分类
    this.classfiy();
    this.search();
},
    // 渲染人物
    renderPerson: function(data) {
        var html = ``;
        // 遍历分类中的人物
        data.map(function(person) {
            html += `<dl>
                        <dt><img src="img/${person.url}"></dt>
                        <dd>${person.tit[0]}</dd>
                    </dl>`;
        });

        this.person.innerHTML += html;
    },
    // 点击分类
    classfiy: function() {
        var that = this;
        var cek = Array.from(this.nav.querySelectorAll('input'));
        cek.forEach(function(item) {
            item.onclick = function() {
                // 查找所有选中的分类 :checked
                var checked = Array.from(that.nav.querySelectorAll(":checked"));
                if (checked.length > 0) {
                    // 清除
                    that.person.innerHTML = '';
                    checked.map(function(inp) {
                        var val = inp.value;
                        // 渲染人物
                        that.renderPerson(that.data[val].item);
                    });
                } else {
                    that.person.innerHTML = '';
                    for (var k in that.data) {
                        // 渲染人物
                        that.renderPerson(that.data[k].item);
                    }
                }

            }
        });
    },
    // 模糊搜索
    search: function() {
        var that = this;
        this.btn.addEventListener('click', function() {
            // 判断输入内容
            var val = that.input.value.trim();

            if (val) {
                // 开始搜索
                var arr = [];
                for (var k in that.data) {
                    that.data[k].item.map(function(item) {
                        item.tit.map(function(n) {
                            if (n.indexOf(val) > -1) {

                                arr.push(item);
                                return;
                            }
                        })
                    })
                }
                // 渲染人物
                that.person.innerHTML = '';
                that.renderPerson(arr);
            }
        });
        // 给文本框绑定input
        this.input.oninput = function() {
            var val = this.value.trim();

            if (!val) {
                that.person.innerHTML = '';
                for (var k in that.data) {
                    // 渲染人物
                    that.renderPerson(that.data[k].item);
                }
            }
        }
    }
};