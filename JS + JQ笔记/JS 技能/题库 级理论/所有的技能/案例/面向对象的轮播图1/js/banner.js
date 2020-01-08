function Banner(opt) {
    // 实例属性
    this.Time = opt.Time;
    this.opt = opt;
    // 调用初始化方法 
    this.init();
}
Banner.prototype = {
    constructor: Banner,
    // 初始化方法 
    init: function() {
        var that = this;
        this.timer = null;
        this.box = document.querySelector(this.opt.box);
        this.pic = document.querySelector(this.opt.pic); // 放图的父元素 
        this.pics = Array.from(this.pic.children); // 所有图
        this.btn = document.querySelector(this.opt.btn); // 放分页器的父元素 
        this.btns = Array.from(this.btn.children); // 所有分页器
        this.idx = 0; // 当前图片索引
        // 经过停止自动,离开继续
        this.box.onmouseover = function() {
            clearInterval(that.timer);
        };
        this.box.onmouseout = function() {
            that.autoPlay();
        };
        // 调用自动轮播
        this.autoPlay();
        // 调用点击切换
        this.pagenation();
    },
    // 自动轮播
    autoPlay: function() {
        var that = this;
        this.timer = setInterval(function() {
            that.idx++;
            that.idx %= that.pics.length; // 1%3 1 2%3  2  3%3
            that.change(that.idx);
        }, this.Time);
    },
    // 点击切换
    pagenation: function() {
        var that = this;
        this.btns.forEach(function(item, i) {
            item.onclick = function() {
                that.change(i);
                that.idx = i;
            };
        });
    },
    // 图片切换
    change: function(n) {
        var that = this;
        // 让所有图片的zIndex = 0
        this.pics.forEach(function(item, i) {
            item.style.zIndex = 0;
            that.btns[i].className = '';
        });
        // 控制当前图片zIndex=1
        this.pics[n].style.zIndex = 1;
        this.btns[n].className = this.opt.cName;
    }
};