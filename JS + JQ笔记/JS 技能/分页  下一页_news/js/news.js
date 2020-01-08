function News(opts) {
    this.data = opts.data; // 数据
    this.page = opts.page;
    this.wrap = this.page.parentNode.parentNode;
    this.news = opts.news;
    // 调用方法
    this.init();
}
News.prototype = {
    constructor: News,
    init: function() {
        // 渲染第1页新闻列表  : slice(0,3)
        this.renderList(this.data.slice(0, 3));
        // 渲染分页器
        this.renderPage();
        // 点击页码切换
        this.addEvent();
    },
    renderList: function(data) {
        var li = '';
        data.map(function(item) {
            li += `<li><h3>${item.tit}</h3>
            <p>${item.msg}</p>
            <span>${item.time}</span>
            <span>${item.keyword[0]}&nbsp;${item.keyword[1]}&nbsp;${item.keyword[2]}</span>
            <span class="right">评论${item.num}</span></li>`;
        });
        this.news.innerHTML = li;
    },
    // 渲染分页器
    renderPage: function() {
        var pages = Math.floor(this.data.length / 3),
            html = '';
        for (var i = 1; i <= pages; i++) {
            if (i === 1) {
                html += '<span class="color">' + i + '</span>';
            } else {
                html += '<span>' + i + '</span>';
            }
        }
        this.page.innerHTML = html;
        this.page.style.width = (this.page.children[0].offsetWidth + 5) * pages + 'px';
    },
    // 
    addEvent: function() {
        var that = this,
            btn = that.page.children,
            w = btn[0].offsetWidth + 5;
        // 事件委托方式给button绑定事件
        this.wrap.onclick = function(e) {
            var eve = e || event,
                tar = eve.target || eve.srcElement;
            // 下一页
            if (tar.innerHTML === '下一页') {
                // 当前页的下一页
                var cur = document.querySelector('.color').innerHTML;
                // 当前页>5
                cur++;
                if (cur > 5 && cur <= btn.length) {
                    that.page.style.marginLeft = -(cur - 5) * w + 'px';
                } else if (cur > btn.length) {
                    cur = 1;
                    that.page.style.marginLeft = 0;
                }
                // 切换按钮样式
                document.querySelector('.color').classList.remove('color');
                btn[cur - 1].classList.add('color');
                // 切换新闻列表内容
                var s = (cur - 1) * 3,
                    e = s + 3;
                that.renderList(that.data.slice(s, e));

            } else if (tar.innerHTML === '上一页') { // 上一页
                // 当前页的下一页
                var cur = document.querySelector('.color').innerHTML;
                // 当前页>5
                cur--;
                if (cur > 5 && cur <= btn.length) {
                    that.page.style.marginLeft = -(cur - 5) * w + 'px';
                } else if (cur <= 5 && cur >= 1) {
                    that.page.style.marginLeft = 0;
                } else if (cur <= 0) {
                    cur = 10;
                    that.page.style.marginLeft = -(cur - 5) * w + 'px';
                }
                // 切换按钮样式
                document.querySelector('.color').classList.remove('color');
                btn[cur - 1].classList.add('color');
                // 切换新闻列表内容
                var s = (cur - 1) * 3,
                    e = s + 3;
                that.renderList(that.data.slice(s, e));
            } else if (tar.innerHTML === '后5页') { // 下5页
                var cur = document.querySelector('.color').innerHTML * 1 + 5;
                that.page.style.marginLeft = -(10 - 5) * w + 'px';
                // 切换按钮样式
                document.querySelector('.color').classList.remove('color');
                btn[cur - 1].classList.add('color');
                // 切换新闻列表内容
                var s = (cur - 1) * 3,
                    e = s + 3;
                that.renderList(that.data.slice(s, e));
            } else if (tar.nodeName === 'SPAN') { // 切换对应页
                var page = tar.innerHTML,
                    s = (page - 1) * 3, //起始下标
                    e = s + 3; // 结束下标
                that.renderList(that.data.slice(s, e));
                document.querySelector('.color').classList.remove('color');
                tar.classList.add('color');
            }
        }
    }
}