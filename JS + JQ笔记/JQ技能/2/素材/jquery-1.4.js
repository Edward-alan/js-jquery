
(function(window) {
    //构造函数
    var jQuery = function(selector, context) {
        //无new实例化
        return new jQuery.fn.init(selector);
    };
    window.jQuery = window.$ = jQuery;
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
                } else if (selector[0] == '#' && this.strNum(selector, '#') == 1 && this.strNum(selector, ' ') == 0) { //判断是不是id选择器
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
        },
        /**
         * @func[操作HTML内容]
         */
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                // console.log(i)
                fn.call(this[i], i, this[i]);
            }
        },
        get: function(index) {
            return this[index];
        },
        index: function() {
            var that = this;
            var children = Array.from(this[0].parentNode.children);
            var i;
            children.forEach(function(item, index) {
                if (item === that[0]) {
                    i = index;
                }
            });
            return i;
        },
        eq: function(index) {
            return jQuery(this.get(index))
        },
        siblings: function() {
            var that = this;
            var childs = Array.from(this[0].parentNode.children);
            var el = jQuery();
            childs.forEach(function(item) {
                if (item !== that[0]) {
                    el.push(item);
                }
            });
            return el;
        },
        parent: function() {
            return jQuery(this[0].parentNode)
        },
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
        children: function(string) {
            var targetParent = jQuery(string);
            var that = this;
            var el = jQuery();
            this.each(function(x, y) {
                that = y;
                while (that.children) {
                    that = Array.from(that.children);
                    that.forEach(function(item) {
                        if (that.nodeType !== 9) {
                            el.push(item);
                        }
                    });
                };
            })

            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el.jQuery(val)
                    }
                })
            }
            return el;
        },
        find: function() {
            var that = this[0];
            var el = jQuery();

            function addChild(parent) {
                if (parent.children.length) {
                    Array.from(that.children).forEach(function(item) {
                        el.push(item);
                        addChild(item);
                    });
                    addChild(that)
                    return this;
                }
            }
        },
        offset:function(){
            var l=this[0].offsetLeft;
            var t=this[0].offsetTop;
            var p=this[0].offsetParent;
            while(p){
            l=l+ p.offsetLeft+ p.clientLeft;
            t=t+ p.offsetTop+ p.clientTop;
            p= p.offsetParent;
            }
            return{left:l,top:t};
        },
        position:function(){
            return{left:this[0].offsetLeft,top:this[0].offsetTop}
        },
        prev: function() {
            return jQuery(this[0].previousElementSibling);
        },
        prevAll: function() {
            var a = jQuery();
            var p = this[0].previousSibling;
            while (p) {
                if (p.nodeType == 1) {
                    a.push(jQuery(p));
                }
                p = p.previousSibling;
            }
            return a;
        },
        prevAll1: function() {
            var a = jQuery();
            var p = this[0].previousSibling.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i] == this[0]) {
                    return a;
                }
                if (children[i].nodeType === 1) {
                    a.push(p)
                }
            }

        },
        next: function() {
            return jQuery(this[0].nextElementSibling);
        },
        nextAll1: function() {
            var a = jQuery();
            var children = this[0].parentNode.childNodes;
            var flag = false;
            for (var i = 0; i < children.length; i++) {
                if (flag == true && children[i].nodeType == 1) {
                    a.push(children[i]);
                }
                if (children[i] == this[0]) flag = true;
            }
            return a
        },
        html: function(content) {
            if (content) { //有参数，设置当前对象HTML内容
                this.each(function(i, item) {
                    item.innerHTML = content;
                })
                return this;
            } else { //没参数：事先获取当前对象的HTML内容
                return this[0].innerHTML;
            }
        },
        css: function(pName, pValue) {
            // console.log(pName, pValue)
            if (arguments.length === 2) {
                this.each(function(i, v) {
                    v.style[pName] = pValue;
                });
                return this;
                // return getComputedStyle(this[0])[pName];

            } else {
                if (typeof pName === 'string') {
                    return getComputedStyle(this[0])[pName]
                } else {
                    for (var key in pName) {
                        this.each(function(i, v) {
                            v.style[key] = pName;
                        });
                    }
                }


            }

        },
        attr: function(pName, pValue) {
            if (pValue) {
                this.each(function(i, v) {
                    v.setAttribute(pName, pValue);
                })
                return this;
            } else {
                return this[0].getAttribute(pName);
            }
        },
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
        append: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                item.appendChild(child.cloneNode(true))
            });
            return this;
        },
        prepend: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                item.insertBefore(child.cloneNode(true), item.firstChild)
            });
            return this;
        },
        prependTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.insertBefore(that[0].cloneNode(true), item.firstChild);
            });
            return this;
        },
        appendTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.appendChild(that[0].cloneNode(true));
            });
            return this;
        },
        addClass: function(cName) {
            var that = this;
            cName = cName.split(" ");
            cName.forEach(function(cssName) {
                that.each(function(i, item) {
                    item.classList.add(cssName)
                })
            })

            return this;
        },
        removeClass: function(cName) {
            this.each(function(i, item) {
                item.classList.remove(cName);

            })
            return this;
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                l = this.length;
            for (var i = 0; i < l; i++) {
                if (this[0].nodeType == 1 && (" " + this[i].className + "").replace(/[\t\r\n]/g, " ").indexOf(className) > -1)
                    return true;
            }
            return false;
        },
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
                this[0]['on' + type] = run;
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
         * @func
         */
        off: function(type) {
            this.each(function(i, item) {
                item['on' + type] = null;
            });
            return this;
        },
        /**
         * @func[宽]
         */
        innerWidth: function() {

            var el = this[0],
                oStyle = getComputedStyle(el),
                lw = parseFloat(oStyle.borderLeftWidth),
                rw = parseFloat(oStyle.borderRightWidth);
            return el.offsetWidth - lw - rw;
        },
        innerHeight: function() {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.borderTopWidth),
                bw = parseFloat(oStyle.borderBottomWidth);
            return el.offsetHeight - tw - bw;
        },
        outerWidth: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.marginLeft),
                bw = parseFloat(oStyle.marginRight);
            offsetW = el.offsetWidth;
            return deep ? offsetW + (lm + rm) : offsetW;
        },
        outerHeight: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.marginTop),
                bw = parseFloat(oStyle.marginBottom);
            offsetH = el.offsetHeight;
            return deep ? offsetH + (tm + bm) : offsetH;
        },
        show: function() {
            this.each(function(index, item) {
                item.style.display = "block";
            });
        },
        hide: function() {
            this.each(function(index, item) {
                item.style.display = "none";
            });
        },
        toggle: function() {
            this.each(function(index, el) {
                var displayStatus = getComputedStyle(el, null).display;
                el.style.display = displayStatus === 'block' ? 'none' : 'block';
            })
        },
        slideUp: function(time) {
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
            }
            this.each(function(i, el) {
                el.style.overflow = 'hidden';
                var totalH = el.offsetHeight;
                var currentH = totalH;
                var step = totalH / (time / 10);
                var timer = setInterval(function() {
                    currentH = currentH - step;
                    el.style.height = currentH + "px";
                    if (cu <= 0) {
                        clearInterval(timer);
                        el.style.display = 'none';
                        el.style.height = totalH + "px";
                    }
                }, 10)
            });
        },
        slideDown: function(time) {
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
            }
            this.each(function(i, el) {
                //el.style.display = 'block';
                var totalH = el.offsetHeight;
                el.style.height = 0;
                var currentH = 0;
                var step = totalH / (time / 10);
                var timer = setInterval(function() {
                    currentH = currentH + step;
                    el.style.height = currentH + "px";
                    if (cu >= totalH) {
                        clearInterval(timer);
                        el.style.height = totalH + "px";
                    }
                }, 10)
            });
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
            return false;
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
            return scrollT
        },

    };
    jQuery.ajax = function(options) {
        var defObj = {
            url: '',
            method: 'get',
            async: true,
            type: 'urlencoded',
            data: null,
            success: function() {},
            error: function() {},
        };
        // options = this.extend({}, defObj, options)
    };
    jQuery.extend = function() {
            var target = arguments[0];
            for (var i = 0; i < this.arguments.length; i++) {
                for (var key in arguments[i]) {
                    target[key] = arguments[i][key];
                }
            }
            return target
        }
        //无new实例化
    jQuery.prototype.init.prototype = jQuery.prototype;
    //将jQuery局部函数变为全局变量$来使用

})(window)