function Shopping(opt) {
    var table = document.querySelector(opt.table);
    //var tBody = table.tBodies[0];

    // 实例属性
    this.cAll = Array.from(document.querySelectorAll(opt.cAll));
    this.tBody = table.tBodies[0];
    this.procBox = Array.from(this.tBody.querySelectorAll('input[type=checkbox]'));
    this.dAll = document.querySelector(opt.dAll);
    this.add = opt.add;
    this.reduce = opt.reduce;
    this.del = opt.del;
    this.n = document.querySelector(opt.n);
    this.m = document.querySelector(opt.m);
    this.init();
}
Shopping.prototype = {
    constructor: Shopping,
    // 初始化方法
    init: function() {
        // 调用全选方法 
        this.checkAll();
        this.delAll();
        this.bindEvent();
    },
    // 全选:
    checkAll: function() {
        var that = this;
        this.cAll.map(function(item, i) {
            item.addEventListener('click', function() {
                // 设置所有的商品的复选框的checked = 当前点击对象checked
                var checked = this.checked;
                that.procBox.forEach(function(cBox) {
                    cBox.checked = checked;
                });
                if (i === 1) {
                    that.cAll[0].checked = checked;
                } else {
                    that.cAll[1].checked = checked;
                }
                // 调用合计
                that.countTotal();

            });
        });
    },
    // 删除选中项
    delAll: function() {
        var that = this;
        this.dAll.onclick = function() {
            // 删除选中项
            var total = Array.from(that.tBody.querySelectorAll(':checked'));
            total.forEach(function(item) {
                that.tBody.removeChild(item.parentNode.parentNode)
            });
        };
    },
    // 绑定事件
    bindEvent: function() {
        var that = this;
        this.tBody.onclick = function(e) {
            var eve = e || window.event; // 事件对象
            var tar = eve.target || eve.srcElement; // 事件源
            // 判断事件源是不是span
            if (tar.nodeName === 'SPAN') {
                // 判断加
                if (tar.className === that.add) {
                    that.addFn(tar);
                } else if (tar.className === that.reduce) {
                    that.reduceFn(tar);
                } else if (tar.className === that.del) {
                    that.delFn(tar);
                }
            } else if (tar.nodeName === 'INPUT' && tar.type === 'checkbox') {
                that.countTotal();
            }

        }
    },
    // 添加
    addFn: function(tar) {
        // 显示减按钮
        var td = tar.parentNode;
        var r = td.children[0];
        var n = td.children[1];
        r.style.opacity = 1;
        n.value = Number(n.value) + 1;
        this.count(n.value, tar);
        this.countTotal();
    },
    // 减少
    reduceFn: function(tar) {
        // 显示减按钮
        var td = tar.parentNode;
        var r = td.children[0];
        var n = td.children[1];
        if (n.value > 1) {
            n.value = n.value - 1;
        } else {
            r.style.opacity = 0;
        }
        this.count(n.value, tar);
        this.countTotal();
    },
    // 删除单个
    delFn: function(tar) {
        this.tBody.removeChild(tar.parentNode.parentNode);
    },
    // 小计
    count: function(n, tar) {
        var children = tar.parentNode.parentNode.children;
        var price = children[2].innerHTML;
        children[4].innerHTML = (price * n).toFixed(2);
        console.log(price * n)
    },
    // 合计
    countTotal: function() {
        var product = Array.from(this.tBody.querySelectorAll(":checked"));
        var sum = 0;
        var money = 0;
        product.forEach(function(item) {
            var tr = item.parentNode.parentNode;
            var n = tr.querySelector("input[type=text]").value * 1;
            var p = tr.children[4].innerHTML * 1;
            sum += n;
            // 累加数量和小计
            money += p;
        });
        this.n.innerHTML = sum;
        this.m.innerHTML = money.toFixed(2);
    }
};