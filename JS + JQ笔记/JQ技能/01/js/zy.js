(function(window) {
    //构造函数
    var jQuery = function(selector, context) {
        //无new实例化
        return new jQuery.fn.init(selector);
    };
    // jQuery.from = function(objectArray) {
    //     return Array.prototype.slice.call(objectArray)
    // };
    //fn静态属性=prototype
    jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            /**
             * 
             * @param {String} selector 
             * @param {String}  context
             */
            init: function(selector, context) {
                //给context设置默认document
                context = context || document;
                //判断context是不是实例
                context = context.nodeType ? context : context[0];
                // console.log(context);
                //console.log(selector, context);
                this.length = 0;
                if (!selector) {
                    return this;
                }
                if (typeof selector === 'string') {
                    //判断是不是html标签,创建节点并将该节点做实例对象的属性
                    if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                        var oDiv = document.createElement('div');
                        oDiv.innerHTML = selector;
                        this[0] = oDiv.firstChild || oDiv.firstElementChild;
                        this.length = 1;
                    } else if (selector[0] == '#' && this.strNum(selector, '#') == 1) { //判断是不是id选择器
                        var dom = context.getElementById(selector.slice(1));
                        if (dom) {
                            this[0] = dom;
                            this.length = 1;
                        }
                    } else {
                        //其他选择器,通过SelectorAll来获取元素
                        var eles = context.querySelectorAll(selector);
                        for (i = 0; i < eles.length; i++) {
                            //console.log(eles[i])
                            this.push(eles[i]);
                        }
                    }
                } else if (selector.nodeType) {
                    //将DOM节点转为jQuery对象
                    this[0] = selector;
                    this.length = 1;
                } else if (selector instanceof jQuery) { //判断selector是不是jQuery对象
                    return selector;
                } else {
                    return this
                }
            },
            parent: function() {
                return jQuery(this[0].parentNode)
            },
            parents: function(string) {
                var targetParen = jQuery(String);
                var that = this;
                var el = jQuery();
                while (that.parentNode) {
                    that = that.parentNode;
                    if (that.nodeType !== 9) {
                        el.push(that)
                    };
                };
                if (string) {
                    el.each(function(i, val) {
                        if (val === targetParen[0]) {
                            el = jQuery(val)
                        };
                    });

                }
                return el;
            },
            next: function() {
                return jQuery(this[0].nextElementSibling)
            },
            nextAll: function() {
                var a = jQuery();
                var p = this[0].nextElementSibling;
                while (p) {
                    if (p.nodeType == 1) {
                        a.push(p)
                    }
                    p = p.nextElementSibling;
                }
                return a;
            },
            prev: function() {
                return jQuery(this[0].previousElementSibling)
            },
            prevAll: function() {
                var a = jQuery();
                var p = this[0].previousElementSibling;
                while (p) {
                    if (p.nodeType == 1) {
                        a.push(p)
                    }
                    p = p.previousElementSibling;
                }
                return a;
            },
            hide: function() {
                this.each(function(index, el) {
                    el.style.display = "none";
                })
            },
            show: function() {
                this.each(function(index, el) {
                    el.style.display = "block";
                })
            },
            toggle: function() {
                this.each(function(index, el) {
                    var displaystates = getComputedStyle(el, null).display;
                    el.style.display = displaystates === 'display' ? 'block' : 'none';
                })
            },
            slidedown: function(time) {
                time = time || 400;
                if (typeof time === 'string') {
                    time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
                }
                this.each(function(i, el) {
                    el.style.display = 'block';
                    var totalH = el.offsetHeight;
                    el.style.height = 0;
                    var currentH = 0;
                    var step = totalH / (time / 10);
                    var timer = setInterval(function() {
                        currentH = currentH + step;
                        el.style.height = currentH + 'px';
                        if (currentH >= totalH) {
                            clearInterval(timer);
                            el.style.height = totalH + 'px'
                        }
                    })
                })
            }
        }
        //无new 实例化如何使用jquery函数原型方法
    jQuery.prototype.init.prototype = jQuery.prototype;
    //将jQ局部函数变为全局变量$来使用
    window.jQuery = window.$ = jQuery;
})(window)