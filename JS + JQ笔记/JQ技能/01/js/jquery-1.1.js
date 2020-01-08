/*
 * @Author: furao 
 * @Date: 2018-10-30 11:22:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-30 16:04:06
 */
/**
 * @fun 封装jquery
 */
(function(window) {
    //构造函数
    var jQuery = function(selector, context) {
        //无new实例化
        return new jQuery.fn.init(selector);
    };
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
                console.log(context);
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
                    this[0] = selector;
                    this.length = 1;
                } else if (selector instanceof jQuery) {
                    return selector
                } else {
                    return this
                }
            },
            /**
             * @param {String} str
             * @param {String} str
             * @func [检测一个字符在数组中出现的次数]
             */
            strNum: function(str, char) {
                var count = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str[i] === char) {
                        count++;
                    }
                }
                return count;
            },
            /**
             * 
             * @param {String} context 
             */
            push: function(context) {
                Array.prototype.push.call(this, context);
            }
        }
        //
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)