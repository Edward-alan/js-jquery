(function(window) {
    var jQuery = function(selector, context) {
        //无new实例化
        return new jQuery.fn.init(selector);
    };
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context) {
            var that = this;
            context = context || document;
            context = context.nodeType ? context : context[0];
            this.length = 0
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {
                if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                    oDiv = document.createElement('div');
                    oDiv.innerHTML = selector;
                    this[0] = oDiv.firstChild || oDiv.firstElementChild;
                    this.length = 1;
                } else if (selector[0] === '#' && this.strNum(selector, '#') == 1) {
                    var dom = document.getElementById(selector.slice(1));
                    if (dom) {
                        this[0] = dom;
                        this.length = 1;
                    }
                } else {
                    var els = context.querySelectorAll(selector);
                    for (var i = 0; i < els.length; i++) {
                        this.push(els[i])
                    }
                }

            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) {
                return selector;
            } else {
                return this;
            }
        },
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
        },
        push: function(context) {
            Array.prototype.push.call(this, context)
        },
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i])
            }
        },
        addClass: function(cName) {
            var that = this;
            cName = cName.split(' ');
            cName.forEach(function(cssName) {
                that.each(function(i, item) {
                    item.classList.add(cssName)
                })
            })
            return this;
        },
        removeClass: function(cName) {
            this.each(function(i, item) {
                item.classList.remove(cName)
            })
            return this;
        },
        toggleClass: function(cName) {
            if (this[0].getAttribute('class').indexOf(cName) > -1) {
                this.removeClass(cName);

            } else {
                this.addClass(cName);
            }
            return this;
        },
    }

    jQuery.prototype.init.prototype = jQuery.prototype;
    //将jQ局部函数变为全局变量$来使用
    window.jQuery = window.$ = jQuery;
})(window)