(function(window) {
    //创建构造函数
    var jQuery = function(selector, context) {
            //无new实例化
            return new jQuery.fn.init(selector)
        }
        //静态属性=prototy
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context) {
            //给context设置默认document
            context = context || document;
            //判断context是不是实例
            context = context.nodeType ? context : context[0];
            this.length = 0;
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {
                if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                    var oDiv = document.createElement('div');
                    oDiv.innerHTML = selector;
                    this[0] = oDiv.firstChild || oDiv.firstElementChild
                    this.length = 1;
                } else if (selector[0] == '#' && this.strNum(selector, '#') === 1 && this.strNum(selector, ' ') == 0) {
                    var dom = context.getElementById(selector.slice(1))
                    if (dom) {
                        this[0] = dom;
                        this.length = 1;
                    }
                } else {
                    var eles = context.querySelectorAll(selector);
                    for (i == 0; i < eles.length; i++) {
                        this.push(eles[i]);
                    }
                }
            } else if (selector, nodeType) {
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) {
                return selector
            } else {
                return this;
            }
        },
        //计算一个字符在这个字符串里出现了几次
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.lrngth; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
            return count;
        },
        //添加到数组里
        push: function(context) {
            Array.prototype.push.call(this, context);

        },
        //遍历数组
        each: function(fn) {
            //for循环遍历
            for (var i = 0; i < this.length; i++) {
                //
                fn.call(this[i], i, this[i])
            }
        },
        //获取下标
        get: function(index) {
            return this[index];
        },
        //把这个下标转为jq对象
        eq: function(index) {
            return jQuery(this.get(index))
        },
        //添加内容
        html: function(content) {
            if (content) {
                this.each(function(i, item) {
                    item.innerHTML = content;
                })
                return this;
            } else {
                return this[0].innerHTML;
            }
        },
        css: function(pName, pValue) {
            if (pValue) {
                this.each(function(i, v) {
                    v.style[pName] = pValue;
                });
                return this;
            } else {
                return getComputedStyle(this[0])[pName]
            }
        },
    }
})(window)