/*
 * @Author: furao 
 * @Date: 2018-10-30 11:22:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-09 19:25:10
 */
/**
 * @func 封装jquery
 */

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
        },
        /**
         * @func [操作HTML内容]
         */
        html: function(content) {
            if (content) { //有参数,设置当前对象HTML的内容
                this.each(function(i, item) {
                    item.innerHTML = content;
                });
                //为了实现链式调用
                return this;
            } else { //没参数,实现获取当前对象HMTL的内容
                return this[0].innerHTML;
            }
        },
        val: function(content) {
            if (typeof content == 'string') {
                return this[0].value = content;
            } else {
                return this[0].value;
            }

        },
        /**
         * 
         * @func [遍历jquery对象]
         */
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i])
            }
        },
        /**
         * @func [将索引制定Jquery对象转为dom节点]
         */
        get: function(index) {
            return this[index];
        },
        /**
         * @func [根据索引获取指定的jquery对象]
         */
        eq: function(index) {
            return jQuery(this.get(index))
        },
        /**
         * @func [操作css属性]
         */
        css: function(pName, pValue) {
            // if (pValue) { //两个参数,用于设置
            //     this.each(function(i, v) {
            //         v.style[pName] = pValue;
            //     })
            //     return this;
            // } else { //没有属性值,用于获取
            //     return getComputedStyle(this[0])[pName]
            // }
            if (arguments.length === 2) {
                this.each(function(i, v) {
                    v.style[pName] = pValue;
                });
                return this;
            } else {
                if (typeof pName === 'string') {
                    return getComputedStyle(this[0])[pName]
                } else {
                    for (var key in pName) {
                        this.each(function(i, v) {
                            v.style[key] = pName[key]
                        })
                    }
                    return this;
                }
            }
        },
        /**
         * @func [获取和设置HTML属性]
         */
        attr: function(pName, pValue) {
            if (pValue) { //如果是两个参数,用于设置html属性
                this.each(function(i, v) {
                    v.setAttribute(pName, pValue);
                })
                return this;
            } else { //如果是1个参数.获取HTML属性
                return this[0].getAttribute(pName);
            }
        },
        /**
         * @func [获取和设置HTML固有属性]
         */
        prop: function() {
            var arg = arguments;
            if (arg.length == 2) {
                var k = arg[0];
                var val = arg[1];
                this.each(function(i, item) {
                    item[k] = val;
                });
                return this;
            } else {
                return this[0][arg[0]];
            }
        },
        /**
         * @func [末端添加节点]
         */
        append: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                if (typeof childNode == 'string') {
                    item.innerHTML += childNode;

                } else {
                    item.appendChild(child.cloneNode(true));
                }

            })
            return this;
        },
        /**
         * @func [前端添加节点]
         */
        prepend: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                item.insertBefore(child.cloneNode(true), item.firstChild);
            })
            return this;
        },
        /**
         * @func [前端添加子节点]
         */
        prependTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.insertBefore(that[0].cloneNode(true), item.firstChild);
            })
            return this;
        },
        /**
         * @func [末端添加子节点]
         */
        appendTo: function(parent) {
            var that = this;
            this.each(function(i, item) {
                parent.appendChild(that[0].cloneNode(true));
            })
            return this;
        },
        /**
         * @func [添加类名]
         */
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
        /**
         * @func [删除类名]
         */
        removeClass: function(cName) {
            this.each(function(i, item) {
                item.classList.remove(cName)
            });
            return this;
        },
        /**
         * @func [事件模块]
         */
        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            //console.log(arg);
            arg.forEach(function(item) {
                    typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : null;
                })
                //console.log(str, callback);

            //事件处理函数
            function run(e) {
                if (data) {
                    e.data = data;
                }
                var tar = e.target;
                if (str) {
                    $(str, this).each(function(i, item) {
                        if (tar === item) {
                            callback && callback.call(tar, e); //回调函数
                            return;
                        }
                    })

                } else {
                    callback && callback.call(tar, e); //回调函数
                }
            };
            //判断判断str参数。又该参数以事件委托方式去添加事件
            if (str) { //需要事件委托绑定事件
                // this[0].addEventListener(type, run);
                //console.log(this[0]);
                this[0]['on' + type] = run
            } else { //直接绑定
                //遍历jQ
                this.each(function(i, item) {
                    //item.addEventListener(type, run)
                    item['on' + type] = run;
                })
            }
            return this;
        },
        /**
         * @func [移除事件]
         */
        off: function(type) {
            this.each(function(i, item) {
                item['on' + type] = null;
            });
            return this;
        },

        /**
         * @func [内宽=paddin g+width]
         */
        innerWidth: function() {
            var el = this[0],
                oStyle = getComputedStyle(el),
                lw = parseFloat(oStyle.borderLeftWidth),
                rw = parseFloat(oStyle.borderRightWidth);
            return el.offsetWidth - lw - rw;
        },
        /**
         * @func [内高=padding+width]
         */
        innerHeight: function() {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.borderTopWidth),
                bw = parseFloat(oStyle.borderBottomWidth);
            return el.offsetHeight - tw - bw;
        },
        /**
         * @func [外宽]
         */
        outerWidth: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.marginLeft),
                bw = parseFloat(oStyle.marginRight),
                offsetW = el.offsetWidth;
            return deep ? offsetW + (lm + rm) : offsetW;
        },
        /**
         * @func [外高]
         */
        outerHeight: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.marginTop),
                bw = parseFloat(oStyle.marginBottom),
                offsetH = el.offsetHeight;
            return deep ? offsetW + (tm + bm) : offsetH;
        },
        /**
         * @func [向下查找]
         */
        find: function() {
            var that = this[0];
            var el = jQuery();
            Array.from(that.children).forEach(function(item) {
                el.push(item);
                if (item.children.length) {
                    Array.from(item.children).forEach(function(val) {
                        el.push(val)
                    })
                }
            })
        },
        /**
         * @func [兄弟节点]
         */
        siblings: function() {
            var that = this; //点击的按钮
            var childs = Array.from(this[0].parentNode.children); //所有兄弟节点.包括本身
            var el = jQuery();
            childs.map(function(item) {
                if (item !== that[0]) { //不包含本身的兄弟节点
                    el.push(item)
                }
            })
            return el;
        },
        /**
         * @func [获取下标]
         * @return {[number]}
         */
        index: function() {
            var that = this;
            var parent = this[0].parentNode;
            var children = Array.from(this[0].parentNode.children);
            var i;
            children.forEach(function(item, index) {
                if (item === that[0]) {
                    i = index;
                }
            });
            return i;
        },
        /**
         * @func [查找父元素]
         */
        parent: function() {
            return jQuery(this[0].parentNode)
        },
        /**
         * @func [查找祖先元素]
         */
        parents: function(string) {
            var targetParent = jQuery(string);
            var that = this;
            var el = jQuery();
            while (that.parentNode) {
                that = that.parentNode;
                if (that.nodeType !== 9) {
                    el.push(that)
                }
            };
            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el = jQuery(val)
                    }
                })
            }
            return el;
        },
        /**
         * @func [查找子孙元素]
         */
        find: function() {
            var that = this[0];
            var el = jQuery();

            function addChild(parent) {
                if (parent.children.length) {
                    Array.from(parent.children).forEach(function(item) {
                        el.push(item)
                        addChild(item)
                    })
                }
            }
            addChild(that);
            return el;
        },
        /**
         * @func [差找子节点]
         */
        children: function(string) {
            var targetParent = jQuery(string);
            var that = this[0];
            var el = jQuery();
            while (that.children) {
                that = that.children;
                if (that.nodeType !== 9) {
                    el.push(that)
                }
            };
            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el.jQuery(val)
                    }
                })
            }
            return el;
        },

        /**
         * @func [显示]
         */
        show: function() {
            this.each(function(index, el) {
                el.style.display = 'block';
            })
        },
        /**
         * @func [隐藏]
         */
        hide: function() {
            this.each(function(index, el) {
                el.style.display = 'none';
            })
        },
        /**
         * @func [显示和隐藏集合]
         */
        toggle: function() {
            this.each(function(index, el) {
                var displayStatus = getComputedStyle(el, null).display;
                el.style.display = displayStatus === 'block' ? 'none' : 'block';
            })
        },
        /**
         * @func [下个兄弟节点]
         */
        next: function() {
            return jQuery(this[0].nextElementSibling);
        },
        /**
         * @func [上个兄弟节点]
         */
        prev: function() {
            return jQuery(this[0].previousElementSibling);
        },
        /**
         * @func [查找前面所有的平级兄弟]
         */
        prevAll: function() {
            var a = jQuery();
            var p = this[0].previousSibling;
            while (p) {
                if (p.nodeType == 1) {
                    a.push(p)
                }
                p = p.previousSibling;
            }
            return a;
        },
        /**
         * @func [查找前面所有的平级兄弟]
         */
        prevAll1: function() {
            var a = jQuery();
            var children = this[0].parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i] == this[0]) return a;
                if (children[i].nodeType === 1) {
                    a.push(children[i])
                }
            }
            return a;
        },
        /**
         * @func [查找后面所有的平级兄弟]
         */
        nextAll: function() {
            var a = jQuery();
            var p = this[0].nextSibling;
            while (p) {
                if (p.nodeType == 1) {
                    a.push(p)
                }
                p = p.nextSibling;
            }
            return a;
        },
        /**
         * @param {[设置动画时间]}
         * @func [动画效果隐藏/折叠动画]
         */
        slideUp: function(time) {
            //设置默认参数
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
            }
            //核心控制height慢慢变成0
            this.each(function(i, el) {
                el.style.overflow = 'hidden';
                //获取元素总高度
                var totalH = el.offsetHeight;
                //设置当前高度
                var currentH = totalH;
                //计算减差值（步长值）
                var step = totalH / (time / 10);
                //通过定时器去减高度
                var timer = setInterval(function() {
                    currentH = currentH - step;
                    el.style.height = currentH + 'px';
                    //当前高度为0；清除定时器
                    if (currentH <= 0) {
                        clearInterval(timer);
                        el.style.display = 'none';
                        el.style.height = totalH + 'px';
                    }
                }, 10)
            })
        },
        /**
         * @param {[设置动画时间]}
         * @func [动画效果显示/展开动画]
         */
        slideDown: function(time) {
            //设置默认参数
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
            }
            //核心控制height慢慢变成0
            this.each(function(i, el) {
                //设成显示
                el.style.display = 'block';
                //获取元素总高度
                var totalH = el.offsetHeight;
                //设置当前高度
                el.style.height = 0;
                var currentH = 0;
                //计算减差值（步长值）
                var step = totalH / (time / 10);
                //通过定时器去减高度
                var timer = setInterval(function() {
                    currentH = currentH + step;
                    el.style.height = currentH + 'px';
                    //当前高度为0；清除定时器
                    if (currentH >= totalH) {
                        clearInterval(timer);
                        el.style.height = totalH + 'px';
                    }
                }, 10)
            })
        },
        slideToggle: function(time) {
            this.each(function(i, el) {
                var displayStatus = getComputedStyle(el).display;
                if (displayStatus === 'block') {
                    $(el).slideUp(time);
                } else {
                    $(el).slideDown(time);
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                l = this.length;
            for (var i = 0; i < l; i++) {
                if (this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/[\t\r\n]/g, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false
        },

        toggleClass: function(cName) {
            if (this[0].getAttribute('class').indexOf(cName) > -1) {
                this.removeClass(cName);
            } else {
                this.addClass(cName);
            }
            return this;
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                l = this.length;
            for (var i = 0; i < l; i++) {
                if (this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/[\t\r\n]/g, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        },
        getCss: function(ele, attr) {
            if (typeof getComputedStyle == 'function') {
                return parseFloat(getComputedStyle(ele, null)[attr])
            } else {
                if (attr == 'opacity') {
                    var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                    if (reg.test(attr)) {
                        return RegExp.$1;
                    } else {
                        return 1;
                    }
                } else {
                    return parseFloat(ele.currentStyle(attr));
                }
            }
        },
        setCss: function(ele, attr, val) {
            switch (attr) {
                case 'opacity':
                    ele.style.opacity = val;
                    ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
                case 'top':
                case 'left':
                case 'height':
                case 'width':
                    ele.style[attr] = val + "px";
                case 'float':
                    ele.style.cssStyle = val + "px";
                    ele.style.typeStyle = val + "px";
                default:
                    ele.style[attr] = val;
            }
        },
        animate: function(obj, duration, fnCallback) {
            var that = this;
            var oBegin = {};
            var oChange = {};
            var flag = 0;
            for (var attr in obj) {
                var target = obj[attr];
                var begin = that.getCss(that[0], attr);
                var change = target - begin;
                if (change) {
                    oBegin[attr] = begin;
                    oChange[attr] = change;
                    flag++;
                }
            }
            if (flag == 0) return this;
            var interval = 13;
            var times = 0;
            clearInterval(that[0].timer);

            function step() {
                times += interval;
                if (times >= duration) {
                    for (var attr in obj) {
                        var target = obj[attr];
                        that.setCss(that[0], attr, target);
                    }
                    clearInterval(that[0].timer);
                    that[0].timer = null;
                    if (fnCallback) {
                        fnCallback.call(that[0]);

                    } else {
                        for (var attr in obj) {
                            var begin = oBegin[attr];
                            var change = oChange[attr];
                            var val = times / duration * change + begin;
                            that.setCss(that[0], attr, val)
                        }

                    }
                }
            }
            that[0].timer = setInterval(step, interval)
        },
        remove: function() {
            if (this.length == 0) return this;
            var parent = this[0].parentNode;
            this.each(function(key, value) {
                parent.removeChild(value)
            });
            return this;
        },

        scrollTop: function() {
            var scrollT;
            if (window.pageYOffset) {
                scrollT = window.pageYOffset;
            } else if (document.compatMode) {
                scrollT = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollT = document.body.scrollTop;
            }
            return scrollT;
        },
        offset: function() {
            var l = this[0].offsetLeft;
            var t = this[0].offsetTop;
            var p = this[0].offsetParent;
            while (p) {
                l += p.offsetLeft + p.clientLeft;
                t += p.offsetTop + p.clientTop;
                p = p.offsetParent;
            }
            return { left: l, top: t };
        },
    };

    jQuery.ajax = function(options) {
        var defObj = {
            url: '',
            method: 'get',
            async: true,
            type: 'json',
            data: {
                "name": "aa",
                "age": 20
            },
            success: function() {},
            error: function() {}
        };

        options = this.extend({}, defObj, options);
        var params = this.formParams(options.data);

        //创建xhr对象
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        //建立连接
        if (options.method.toLowerCase() == 'get') { //请求方式为get,get需要请求参数到地址栏
            xhr.open(options.method, options.url + '?' + params, options.async);
            xhr.send(null);
        } else if (options.method.toLowerCase() == 'post') { //请求为post
            xhr.open(options.method, options.url, options.async);
            if (options.type === 'urlencoded') {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            } else if (options.type === 'json') {
                xhr.setRequestHeader('Content-type', 'application/json');
            }
            xhr.send(params);

        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                options.success(xhr.responseText);
            } else {
                options.error();
            }
        }
    };

    jQuery.extend = function() {
        //1.获取目标值ar[0]
        var target = arguments[0];
        //2.遍历传过来的对象，除了ar[0]，ar[i]
        for (var i = 1; i < arguments.length; i++) {
            //3.遍历对象ar[i],获取ar[i]对象里面的内容（url/method）
            for (var key in arguments[i]) {
                //4.把前面属性覆盖掉
                target[key] = arguments[i][key];
            }
        }
        //console.log(target);
        return target;
    };

    //将对象转化为字符串
    jQuery.formParams = function(data) {
        //console.log(data);
        var arr = [];
        for (var key in data) {
            arr.push(key + '=' + data[key]);
        }
        //console.log(arr);
        // console.log(arr.join('&'));
        //实现对象的扩展，后面的覆盖前面的
        return arr.join('&');

    }


    //无new 实例化如何使用jquery函数原型方法
    jQuery.prototype.init.prototype = jQuery.prototype;
    //将jQ局部函数变为全局变量$来使用
    window.jQuery = window.$ = jQuery;
})(window)