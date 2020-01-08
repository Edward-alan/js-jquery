(function(window) {
    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector);
    };
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context) {
            context = context || document;
            context = context.nodeType ? context : context[0];
            this.length = 0;
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {
                if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                    var oDiv = document.createElement('div');
                    oDiv.innerHTML = selector;
                    this[0] = oDiv.firstChild;
                    this.length = 1;
                } else if (selector[0] === '#' && this.strNum(selector, "#") == 1) {
                    var dom = context.getElementById(selector.slice(1));
                    if (dom) {
                        this[0] = dom;
                        this.length = 1
                    }
                } else {
                    var eles = context.querySelectorAll(selector);
                    for (var i = 0; i < eles.length; i++) {
                        this.push(eles[i])
                    }
                }
            } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1
            } else if (selector instanceof jQuery) {
                return selector;
            } else {
                return this;
            }
        },
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == char) {
                    count++;
                }
            }
            return this;
        },
        push: function(context) {
            Array.prototype.push.call(this, context)

        },
        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            arguments.forEach(function(item) {
                typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : null;
            })

            function run(e) {
                if (data) {
                    e.data = data
                }
                var tar = e.target;
                if (str) {
                    $(str, this.each(function(i, item) {
                        if (str === item) {
                            callback && callback.call(tar, e);
                            return;
                        }
                    }))
                } else {
                    callback && callback.call(tar, e);
                }
            };
            if (str) {
                this[0]['on' + type] = run;
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
        addClass: function(cName) {
            var that = this;
            var cName = cName.split(" ");
            that.forEach(function(cssName) {
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
        index: function() {
            var that = this;
            var parent = this[0].parentNode;
            var children = Array.from(this[0].parentNode.children)
            var i;
            children.forEach(function(item, index) {
                if (item === that[0]) {
                    i = index;
                }
            });
            return i;
        },
        siblings: function() {
            var that = this;
            var children = Array.from(this[0].parentNode.children);
            var el = jQuery();
            children.map(function(item) {
                if (!item === that[0]) {
                    el.push(item)
                }
            })
            return el;
        },
        animate: function() {

        },
        getCss: function(ele, attr) {
            if (typeof getComputedStyle == 'function') {

            }
        },
        setCss: function(ele, attr, val) {

        },
    };
    jQuery.ajax = function(opt) {
        var defObj = {
            url: "",
            method: 'get',
            async: true,
            type: 'json',
            data: {
                name: 112
            },
            success: function() {

            },
            error: function() {}

        };
        options = this.extend({}, defObj, options)
        var params = this.formparams(options.data);
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        if (options.method.toLowerCase() == 'get') {
            xhr.open(options.method, options.url + "?" + params, options.async);
            xhr.send(null);
        } else if (options.method.toLowerCase() == 'post') {
            xhr.open(options.method, options.url, options.async);
            if (options.type === 'urlencoded') {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            } else if (options.type === 'json') {
                xhr.setRequestHeader('Content-type', 'application/json');
            }
            xhr.send(params)
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                options.success(xhr.responseText)
            } else {
                options.error();
            }
        }
    };
    jQuery.extend = function() {
        var target = arguments[0];
        for (var i = 0; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                target[key] = arguments[i][key]
            }
        }
        return target
    };
    jQuery.formparams = function(data) {
        var arr = [];
        for (var key in data) {
            arr.push(key + "=" + data[key])
        }
        return arr.join("&")
    };
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)