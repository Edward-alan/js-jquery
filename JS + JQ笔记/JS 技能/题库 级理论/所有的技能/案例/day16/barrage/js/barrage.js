function Barrage(opts) {
    this.el = opts.el;
    this.inp = opts.inp;
    this.data = opts.data;
    this.timer = [];
};
Barrage.prototype = {
    constructor: Barrage,
    //添加弹幕
    addBarrage: function() {
        var that = this;
        this.size = {
            w: that.el.offsetWidth,
            h: that.el.offsetHeight
        };
        this.data.forEach(function(item, i) {
            that.create(item, i);
        });
    },
    // 创建弹幕
    create: function(item, i) {
        var that = this;
        var attr = {
            color: that.randomColor(), // 随机颜色
            size: that.random(12, 20), // 随机字体
            speed: that.random(1, 5), // 随机速度
            left: that.random(0, that.size.w), // 随机left位置
            top: that.random(0, (that.size.h - 20)) // 随机top位置
        };
        // 创建弹幕文字
        var barrage = document.createElement('span');
        barrage.className = 'barrage';
        barrage.style.cssText = 'color:' + attr.color + ';font-size:' + attr.size + 'px;left:' + attr.left + 'px;top:' + attr.top + 'px;';
        barrage.innerHTML = item.msg;
        barrage.setAttribute('speed', attr.speed);
        barrage.id = i;
        that.el.appendChild(barrage);
        that.animate(barrage);
    },
    // 添加动画
    animate: function(item) {
        var that = this;
        var left = parseInt(item.style.left),
            speed = item.getAttribute('speed');
        this.timer[item.id] = setInterval(function() {
            if (left <= -item.offsetWidth) {
                clearInterval(that.timer[item.id]);
                if (that.el.children) {
                    that.el.removeChild(item);
                };
                return;
            };
            item.style.left = --left + 'px';
        }, speed);
    },
    // 删除弹幕
    clear: function() {
        this.el.innerHTML = '';
        this.timer.map(function(item) {
            clearInterval(item);
        })
    },
    // 随机颜色
    randomColor: function() {
        var color16 = [],
            letter = ['A', 'B', 'C', 'D', 'E', 'F'],
            sColor = '#';
        for (var i = 0; i < 10; i++) {
            color16.push(i);
        }
        color16.push.apply(color16, letter);
        for (var j = 0; j < 6; j++) {
            sColor += color16[Math.floor(Math.random() * color16.length)];
        }
        return sColor;
    },
    // 随机数
    random: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    // 添加弹幕数据
    addData: function(val) {
        this.create({
            "msg": val
        });
        this.data.push({
            "msg": val
        });
    }
};