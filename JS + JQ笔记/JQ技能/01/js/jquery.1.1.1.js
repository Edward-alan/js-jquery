(function(window) {
    //构造函数
    var jQuery = function(selector, context) {
        //无new实例化对象
        return new jQuery.prototype.init(selector, context);
    };
    window.$ = window.jQuery = jQuery; //使之全局（自执行函数执行之后自动销毁变量）
    //fn静态属性=prototype
    jQuery.fn = jQuery.prototype = { //fn懒人写法
        init: function(selector, context) {
            var that = this;
            context = context || document; //限制范围查找时，如果没有指定范围便使用全局范围
            context = context.nodeType ? context : context[0]; //判断content是否是dom对象，如果不是转为dom对象
            this.length = 0; //给长度赋初始值
            if (!selector) { //判断selector是否为空
                return this;
            }

            if (typeof selector === "string") { //判断selector是否是字符串
                if (selector[0] === "<" && selector.length >= 3 && selector[selector.length - 1] === ">") { //判断selector是否是HTML元素
                    var oDiv = document.createElement("div"); //创建容器
                    oDiv.innerHTML = selector; //容器内放要创建的元素
                    this[0] = oDiv.firstChild || oDiv.firstElementChild; //把创建的元素放在实例对象内
                    this.length = 1; //手动修改长度
                } else if (selector[0] === "#" && this.strNum(selector, '#') === 1 && this.strNum(selector, " ") === 0) { //使用id查找节点
                    var dom = context.getElementById(selector.slice(1)); //查找节点，slice减掉#

                    if (dom) { //判断dom是否找到了
                        this[0] = dom;
                        this.length = 1;
                    }
                } else {

                    var eles = context.querySelectorAll(selector); //查找所有元素
                    for (var i = 0; i < eles.length; i++) {
                        this.push(eles[i]); //将查找到的元素放进实例对象
                    }
                }

            } else if (selector.nodeType) { //判断是否为dom节点，如果是直接添加，将dom节点转为jq对象
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) { //判断selector是否是jQuery对象，如果是直接返回，将实例转为jq对象
                return selector;
            } else {
                return this;
            }
        },

        push: function(content) { //封装push方法
            Array.prototype.push.call(this, content);
        },
        get: function(index) { //将jQuery对象转换为dom对象
            return this[index];
        },
        eq: function(index) { //根据索引值查找
            return jQuery(this.get(index));
        },
        html: function(content) { //设置或者获取html内容
            if (content) {
                this[0].innerHTML = content;
            } else {
                return this[0].innerHTML;
            }
        },
        each: function(fn) { //循环遍历
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i])
            }
        },
        css: function(proname, provalue) { //获取或者设置css样式
            if (provalue) {
                this.each(function(i, j) {
                    j.style[proname] = provalue;
                });
                return this;
            } else {
                return this[0].getComputedStyle(this.get(0)).css(proname);
            }
        },
        attr: function(proname, provalue) { //设置或者获取HTML属性
            if (provalue) {
                this.each(function(i, j) {
                    j.setAttribute(proname, provalue);
                })
                return this;
            } else {
                return this[0].getAttribute(proname);
            }
        },
        append: function(childNode) { //向队尾添加节点
            var child = null; //定义空对象存储
            if (child.nodeType) { //判断是否是dom节点，如果是直接添加，若不是转换为dom节点添加
                child = childNode;
            } else if (child instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) { //循环遍历实例对象
                item.appendChild(child.cloneNode(true)) //将节点先克隆然后添加进每一个实例对象
            })
            return this;
        },

        prependTo: function(parent) { //向指定节点前添加节点
            var that = this;
            parent.each(function(i, item) { //遍历指定的节点向前添加
                item.insertBefore(that[0].cloneNode(true), item.firstChild);
            });
            return this;
        },
        appendTo: function(parent) { //同理如上
            var that = this;
            parent.each(function(i, item) {
                item.appendChild(that[0].cloneNode(true));
            });
            return this;

        },
        addClass: function(cName) { //向指定实例对象添加类名
            var that = this;
            cName = cName.split(" "); //多个类名要添加以空格分割遍历
            cName.forEach(function(cssName) {
                that.each(function(i, item) { //遍历实例对象向每一个实例对象添加类名
                    item.classList.add(cssName);
                });
            });

            return this;
        },
        removeClass: function(cName) { //给指定的实例对象删除类名
            this.each(function(i, item) { //遍历实例对象删除类名
                item.classList.remove(cName);
            });
            return this;
        },
        on: function(type) {
            var str,
                callback,
                arg = Array.prototype.slice.call(arguments, 1);
            arg.forEach(function(item) {
                typeof item === 'string' ? str = item : typeof item === "function" ? callback = item : null
            });

            function run(e) {
                var tar = e.target;
                if (str) {
                    $(str, this).each(function(i, item) {
                        if (tar === item) {
                            callback && callback.call(tar, e);
                            return;
                        }
                    });
                } else {
                    callback && callback.call(e.target, e);
                };

            };
            if (str) {
                //this[0].addEventListener(type, run)
                this[0]['on' + type] = run;
            } else {
                this.each(function(i, item) {
                    // item.addEventListener(type, run);
                    item['on' + type] = run;
                });
            };
            return this;
        },
        off: function(type) {
            this.each(function(i, item) {
                item['on' + type] = null;
            });
            return this;
        },
        innerwidth: function() {
            var oStyle = getComputedStyle(this[0]);
            var lw = parseFloat(oStyle.borderLeftWidth);
            var rw = parseFloat(oStyle.borderRightWidth);
            return this[0].offsetWidth - lw - rw;

        },
        innerHeight: function() {
            var oStyle = getComputedStyle(this[0]);
            var tw = parseFloat(oStyle.borderTopWidth);
            var bw = parseFloat(oStyle.borderBottomWidth);
            return this[0].offsetWidth - tw - bw;
        },
        outerWidth: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                lm = parseFloat(oStyle.marginLeft),
                rm = parseFloat(oStyle.marginRight),
                offsetW = el.offsetWidth;
            return deep ? offsetW + (lm + rm) : offsetW;
        },
    }
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)