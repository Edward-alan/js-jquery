/*
 * @Author: 李保垒
 * @Date: 2018-12-02 18:33:23 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-12-02 18:33:23 
 */
(function(window) {
    //通过立即函数模仿块级作用域，达到私有作用域的目的
    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    jQuery.from = function(objectArray) {
        return Array.prototype.slice.call(objectArray);
    };
    jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            /**
             * @param{String}selector,
             * @param{String}context,
             */
            init: function(selector, context) {
                context = context || document;
                context = context.nodeType ? context : context[0];
                this.length = 0;
                if (!selector) {
                    return this;
                }
                //判断selector是不是一个字符串
                if (typeof selector === "string") {
                    //判断传的是不是HTML标签,创建节点并将该节点作实例对象的属性
                    if (selector[0] === "<" && selector.length >= 3 && selector[selector.length - 1] === ">") { //条件
                        var oDiv = document.createElement('div'); //获取
                        oDiv.innerHTML = selector; //添加
                        this[0] = oDiv.firstChild || oDiv.firstElementChild;
                        this.length = 1;
                        //判断传的是不是id名
                    } else if (selector[0] === "#" && this.strNum(selector, "#") === 1 && this.strNum(selector, " ") === 0) { //判断字符串是不是id名
                        var dom = context.getElementById(selector.slice(1)); //获取
                        if (dom) { //判断有没有找到dom节点
                            this[0] = dom; //添加
                            this.length = 1;
                        }
                    } else { //其他选择器，通过querySelectorAll来获取所有元素存入实例对象中
                        var eles = context.querySelectorAll(selector);
                        for (var i = 0; i < eles.length; i++) { //遍历其他选择器
                            this.push(eles[i]); //借助push方法添加
                        }
                    }
                } else if (selector.nodeType) { //将dom节点转为jquery实例对象
                    this[0] = selector; //作为实例对象[0]存储起来
                    this.length = 1; //jq对象.length等于1
                } else if (selector instanceof jQuery) { //判断传入的selector是不是jquery实例对象
                    return selector;
                } else { //其他的所有直接return本身
                    return this;
                }
            },
            //str[检测的字符串]
            //char[检测的字符]
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
             * @param {*} content [添加的内容]
             */
            //利用数组的push方法为对象添加属性
            push: function(content) {
                Array.prototype.push.call(this, content);
            },
            //遍历jQuery对象
            each: function(fn) {
                for (var i = 0; i < this.length; i++) {
                    fn.call(this[i], i, this[i]);
                }
            },
            //将索引指定jQuery对象转为dom节点
            get: function(index) {
                return this[index];
            },
            //根据索引获取指定的jQuery对象
            eq: function(index) {
                return jQuery(this.get(index));
            },
            //操作HTML内容
            html: function(content) {
                if (content) { //有内容的话 设置当前对象HTML内容
                    this.each(function(i, item) {
                        item.innerHTML = content;
                    });
                    return this;
                } else { //没参数 实现获取当前对象HTML内容
                    return this[0].innerHTML;
                }
            },
            //操作css样式
            css: function(pName, pValue) {
                if (pValue) { //两个参数，用于设置
                    this.each(function(i, v) {
                        v.style[pName] = pValue;
                    });
                    return this;
                } else { //没有属性值，用于获取
                    return getComputedStyle(this[0])[pName];
                };
            },
            //给元素添加属性
            attr: function(pName, pValue) {
                if (pValue) { //如果是两个参数，设置HTML属性
                    this.each(function(i, v) {
                        v.setAttribute(pName, pValue);
                    });
                    return this;
                } else { //如果是一个参数，获取HTML属性
                    return this[0].getAttribute(pName);
                }
            },
            /**
             * @func [给元素添加属性]
             */
            prop: function() {
                var arg = arguments;
                if (arg.length > 1) { //如果是两个参数，设置html属性
                    var key = arg[0];
                    var value = arg[1];
                    this.each(function(k, v) {
                        v[key] = value;
                    })
                } else { //如果是一个参数，是获取属性
                    return this[0][arg[0]];
                }
            },
            //添加节点(后)
            append: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                }
                this.each(function(i, item) {
                    if (typeof childNode === "string") {
                        item.innerHTML += childNode;
                    } else {
                        item.appendChild(child.cloneNode(true));
                    }
                });
                return this;
            },
            //前端添加节点（前）
            prepend: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                }
                this.each(function(i, item) {
                    item.insertBefore(child.cloneNode(true), item.firstChild);
                });
                return this;
            },
            //前端添加子节点（前）
            prependTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.insertBefore(that[0].cloneNode(true), item.firstChild);
                });
                return this;
            },
            //前端添加子节点（后）
            appendTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.appendChild(that[0].cloneNode(true));
                });
                return this;
            },
            //添加class样式
            addClass: function(cName) {
                var that = this;
                cName = cName.split(" "); //cName以空格隔开，字符串转数组
                cName.forEach(function(cssName) { //cName遍历
                    that.each(function(i, item) { //调用addClassde的对象遍历
                        item.classList.add(cssName);
                    })
                })
                return this; //链式调用
            },
            //删除class样式
            removeClass: function(cName) {
                this.each(function(i, item) {
                    item.classList.remove(cName)
                })
                return this;
            },
            /**
             * 
             * @func [如果有某个类名，那么删除 ，如果没有就添加] 
             */
            toggleClass: function(cName) {
                // this.each(function(i, item) {
                //         item.classList.toggle(cName);
                //     })
                if (this[0].getAttribute("class").indexOf(cName) > -1) {
                    this.removeClass(cName);
                } else {
                    this.addClass(cName);
                }
                return this;
            },
            remove: function(cName) {
                if (this.length == 0) { //如果元素不在，就不需要删除
                    return this;
                }
                var parent = this[0].parentNode; //找到当前元素的父元素   元素中没有直接删除自身方法  
                this.each(function(k, i) { //对匹配元素进行遍历key代表索引，value代表每一项
                    parent.removeChild(i);
                });
                return this;
            },
            //[on]事件模块方法{重点需要记住方法}！！
            on: function(type) {
                var arg = Array.prototype.slice.call(arguments, 1);
                var str, callback, data;
                arg.forEach(function(item) {
                    typeof item === 'string' ? str = item : typeof item === 'function' ?
                        callback = item : item.toString() === '[object Object]' ? data = item : null;
                });
                //事件处理函数
                function run(e) {
                    e.data = data;
                    //判断事件源是不是str
                    var tar = e.target;
                    if (str) {
                        $(str, this).each(function(i, item) {
                            if (tar === item) {
                                callback && callback.call(tar, e) //回调函数
                                return;
                            };
                        })

                    } else {
                        callback && callback.call(tar, e) //回调函数
                    }
                };
                //通过判断str参数，有该参数以事件委托方式去添加事件
                if (str) {
                    this[0].addEventListener(type, run);
                } else {
                    this.each(function(i, item) {
                        item.addEventListener(type, run);
                    })
                }
                return this;
            },
            //删除
            off: function(type) {
                this.each(function(i, item) {
                    //删除事件
                    item['on' + type] = null;
                });
                return this;
            },
            //DOM尺寸与位置
            innerWidth: function() { //内宽
                //获取元素的offsetWidth-左右边框宽
                var oStyle = getComputedStyle(this[0]);
                var lw = parseFloat(oStyle.borderLeftWidth);
                var rw = parseFloat(oStyle.borderRightWidth);
                return this[0].offsetWidth - lw - rw;
            },
            innerHeight: function() { //内高
                //获取元素的offsetWidth-左右边框宽
                var oStyle = getComputedStyle(this[0]);
                var tw = parseFloat(oStyle.borderTopWidth);
                var bw = parseFloat(oStyle.borderBottomWidth);
                return this[0].offsetHeight - tw - bw;
            },
            outerWidth: function(deep) { //外宽
                var el = this[0],
                    oStyle = getComputedStyle(el),
                    lm = parseFloat(oStyle.marginLeft),
                    rm = parseFloat(oStyle.marginRight),
                    offsetW = el.offsetWidth;
                return deep ? offsetW + (lm + rm) : offsetW;
            },
            outerHeight: function(deep) { //外高
                var el = this[0],
                    oStyle = getComputedStyle(el),
                    tm = parseFloat(oStyle.marginTop),
                    bm = parseFloat(oStyle.marginBottom),
                    offsetH = el.offsetHeight;
                return deep ? offsetH + (tm + bm) : offsetH;
            },
            index: function() {
                var that = this;
                var parent = this[0].parentNode;
                var children = jQuery.from(this[0].parentNode.children);
                var i;
                children.forEach(function(item, index) {
                    if (item === that[0]) {
                        i = index;
                    }
                })
                return i;
            },
            find: function() {
                var that = this[0];
                var el = jQuery();
                Array.from(that.children).forEach(function(item) {
                    el.push(item);
                    if (item.children.length) {
                        Array.from(item.children).forEach(function(val) {
                            el.push(val);
                        })
                    }
                });
                return el;
            },
            parent: function() {
                return jQuery(this[0].parentNode)
            },
            parents: function(string) {
                var targetParent = jQuery(string);
                var that = this[0];
                var el = jQuery();
                while (that.parentNode) {
                    that = that.parentNode;
                    if (that.nodeType !== 9) {
                        el.push(that);
                    }
                };
                if (string) {
                    el.each(function(i, val) {
                        el = jQuery(val);
                    })
                }
                return el;
            },
            siblings: function() {
                var that = this;
                var children = jQuery.from(this[0].parentNode.children);
                var el = jQuery();
                children.map(function(item) {
                    if (item !== that[0]) {
                        el.push(item);
                    }
                });
                return el;
            },
            children: function(string) {
                var targetParent = jQuery(string);
                //var that = this[0];
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
                        })
                    };
                })
                if (string) {
                    el.each(function(i, val) {
                        if (val === targetParent[0]) {
                            el = jQuery(val);
                        }
                    })
                }
                return el;
            },
            //隐藏
            hide: function() {
                this.each(function(index, el) {
                    el.style.display = "none";
                })
            },
            //显示
            show: function() {
                this.each(function(index, el) {
                    el.style.display = "block";
                })
            },
            toggle: function() {
                this.each(function(index, el) {
                    var displayStatus = getComputedStyle(el, null).display;
                    el.style.display = displayStatus === 'block' ? 'none' : 'block';
                });
            },
            next: function() {
                return jQuery(this[0].nextElementSibling);
            },
            prev: function() {
                return jQuery(this[0].previousElementSibling);
            },
            prevAll: function() {
                var arr = [];
                var p = this[0].previousSibling;
                while (p) {
                    if (p.nodeType == 1) {
                        arr.push(jQuery(p));
                    }
                    p = this[0].previousSibling;
                };
                return arr;
            },
            /**
             * @func [当前元素的之前的元素]
             */
            prevAll1: function() {
                var arr = [];
                var children = this[0].parentNode.childNodes;
                for (var i = 0; i < children.length; i++) {
                    if (children[i] == this[0]) {
                        return arr;
                    }
                    if (children.nodeType === 1) {
                        arr.push(jQuery(children[i]));
                    }
                }
            },
            /**
             * @func [当前元素的之后的元素]
             */
            nextAll: function() {
                var arr = [];
                var p = this[0].nextSibling;
                while (p) {
                    if (p.nodeType == 1) {
                        arr.push(jQuery(p));
                    }
                    p = this[0].nextSibling;
                };
                return arr;
            },
            slideUp: function() {
                var time = time || 400;
                if (typeof time === 'string') {
                    time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
                }
                this.each(function(i, el) {
                    el.style.overflow = "hidden";
                    //获取元素总高度
                    var totaH = el.offsetWidth;
                    //设置当前高度
                    var currentH = totaH;
                    //计算减的差值（步长值
                    var step = totaH / (time / 10);
                    //通过定时器去减高度
                    var timer = setInterval(function() {
                        currentH = currentH - step;
                        el.style.height = currentH + "px";
                        if (currentH <= 0) {
                            clearInterval(timer);
                            el.style.display = "none";
                            el.style.height = totaH + "px";
                        }
                    }, 10)
                })

            },
            slideDown: function(time) {
                time = time || 400;
                if (typeof time === 'string') {
                    time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400;
                }
                this.each(function(i, el) {
                    el.style.display = "block";
                    //获取元素总高度
                    var totaH = el.offsetHeight;
                    //设置当前高度
                    el.style.height = 0;
                    var currentH = 0;
                    //计算减的差值（步长值
                    var step = totaH / (time / 10);
                    //通过定时器去减高度
                    var timer = setInterval(function() {
                        currentH = currentH + step;
                        el.style.height = currentH + "px";
                        if (currentH >= totaH) {
                            clearInterval(timer);
                            el.style.height = totaH + "px";
                        }
                    }, 10)
                })
            },
            slideToggle: function(time) {
                this.each(function(i, el) {
                    var displayStatus = getComputedStyle(el).display;
                    if (displayStatus === "block") {
                        $(el).slideUp(time);
                    } else {
                        $(el).slideDown(time);
                    }
                })
            },
            /**
             * 
             * @func [包含]
             */
            hasClass: function(sec) {
                var Name = " " + sec + " ";
                var L = this.length;
                for (var i = 0; i < length; i++) {
                    if (this[i].nodeType == 1 && (" " + this[i].Name + " ").replace(/[\n\t\r]/g, " ").indexOf(Name) > -1) {
                        return true
                    }
                }
                return false;
            },
            scrollTop: function() {
                var scrollT;
                if (window.pageYOffset) { //浏览器滚动的高度
                    scrollT = window.pageYOffset;
                } else if (document.compatMode) { //判断是标准模式还是混杂模式
                    scrollT = document.documentElement.scrollTop; //标准浏览器获得的高度
                } else if (document.body) { //兼容IE
                    scrollT = document.body.scrollTop;
                }
                return scrollT;
            },
            val: function(content) {
                if (typeof content === "string") {
                    return this[0].value = content;
                } else {
                    return this[0].value;
                }
            }
        }
        //无new实例化如何使用jquery函数原型方法
    jQuery.ajax = function(options) {
        var defobj = {
            url: 'data.json',
            method: 'get',
            async: "true",
            type: "json",
            data: {
                "name": "abc",
                "age": "qws"
            },
            success: function() {},
            error: function() {}
        }
        options = this.extend({}, defobj, options);
        var params = this.formsParams(options.data);

        //ajax
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        if (options.method.toLowerCase() == "get") {
            xhr.open(options.method, options.url + "?" + params, options.async);
            xhr.send(null);
        } else if (options.method.toLowerCase() == "post") {
            xhr.open(options.method, options.url, options.async);
            if (options.type == "urlencoded") {
                xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
            } else if (options.type == "json") {
                xhr.setRequestHeader('Content-Type', "application/json");
            }
            xhr.send(params);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readystate === 4 && xhr.statu === 200) {
                options.success(xhr.responseText)
            } else {
                options.error();
            }
        }
    };
    jQuery.formsParams = function(data) {
        var arr = [];
        for (var key in data) {
            arr.push(key + "=" + data[key]);
        }
        return arr.join("&")
    };
    jQuery.extend = function() {
        var arg = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                arg[key] = arguments[i][key];
            }
        }
        return arg;
    }
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)