(function(window) {
    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector);
    };
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context)
            context = context || document;
            context = context.nodeType ? context : context[0];
            //console.log(selector, context);
            this.length = 0;
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {
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
                    var eles = context.querySelectorAll(selector);
                    for (i = 0; i < eles.length; i++) {
                        this.push(eles[i]);
                    }
                }
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) {
                return selector;
            } else {
                return this
            }
        },
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
            return count;
        },
        push: function(context) {
            Array.prototype.push.call(this, context);
        },
        html: function(content) {
            if (content) { 
                this.each(function(i, item) {
                    item.innerHTML = content;
                });
                return this;
            } else {
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
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i])
            }
        },
        get: function(index) {
            return this[index];
        },
        eq: function(index) {
            return jQuery(this.get(index))
        },
        css: function(pName, pValue) {
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
                if (typeof childNode == 'string') {
                    item.innerHTML += childNode;

                } else {
                    item.appendChild(child.cloneNode(true));
                }

            })
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
                item.insertBefore(child.cloneNode(true), item.firstChild);
            })
            return this;
        },
        prependTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.insertBefore(that[0].cloneNode(true), item.firstChild);
            })
            return this;
        },
        appendTo: function(parent) {
            var that = this;
            this.each(function(i, item) {
                parent.appendChild(that[0].cloneNode(true));
            })
            return this;
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
            });
            return this;
        },
        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            arg.forEach(function(item) {
                    typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : null;
                })
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
                    callback && callback.call(tar, e);
                }
            };
            if (str) { 
                this[0]['on' + type] = run
            } else {
                this.each(function(i, item) {
                    item['on' + type] = run;
                })
            }
            return this;
        },
        off: function(type) {
            this.each(function(i, item) {
                item['on' + type] = null;
            });
            return this;
        },
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
                bw = parseFloat(oStyle.marginRight),
                offsetW = el.offsetWidth;
            return deep ? offsetW + (lm + rm) : offsetW;
        },
        outerHeight: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tw = parseFloat(oStyle.marginTop),
                bw = parseFloat(oStyle.marginBottom),
                offsetH = el.offsetHeight;
            return deep ? offsetW + (tm + bm) : offsetH;
        },
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
        siblings: function() {
            var that = this;
            var childs = Array.from(this[0].parentNode.children);
            var el = jQuery();
            childs.map(function(item) {
                if (item !== that[0]) { 
                    el.push(item)
                }
            })
            return el;
        },
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
        show: function() {
            this.each(function(index, el) {
                el.style.display = 'block';
            })
        },
        hide: function() {
            this.each(function(index, el) {
                el.style.display = 'none';
            })
        },
        toggle: function() {
            this.each(function(index, el) {
                var displayStatus = getComputedStyle(el, null).display;
                el.style.display = displayStatus === 'block' ? 'none' : 'block';
            })
        },
        next: function() {
            return jQuery(this[0].nextElementSibling);
        },
        prev: function() {
            return jQuery(this[0].previousElementSibling);
        },
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
                    el.style.height = currentH + 'px';
                    if (currentH <= 0) {
                        clearInterval(timer);
                        el.style.display = 'none';
                        el.style.height = totalH + 'px';
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
                if (times >= duration) {     //总时间
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
        position: function() {
            var l = this[0].offsetLeft;
            var t = this[0].offsetTop;
            return { left: l, top: t }
        }
    };

    jQuery.ajax = function(options) {
        var defObj = {
            url: '',           //请求地址
            method: 'get',     //请求方式
            async: true,       //是否异步
            type: 'json',      //请求类型
            data: {
                "name": "aa",
                "age": 20
            },
            success: function() {},
            error: function() {}
        };

        options = this.extend({}, defObj, options);
        var params = this.formParams(options.data);
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        if (options.method.toLowerCase() == 'get') { 
            xhr.open(options.method, options.url + '?' + params, options.async);
            xhr.send(null);
        } else if (options.method.toLowerCase() == 'post') {
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
        var target = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                target[key] = arguments[i][key];
            }
        }
        return target;
    };
    jQuery.formParams = function(data) {
        var arr = [];
        for (var key in data) {
            arr.push(key + '=' + data[key]);
        }
        return arr.join('&');

    };
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)