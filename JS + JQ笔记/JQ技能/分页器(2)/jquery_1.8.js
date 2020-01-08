/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 11:54:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-17 15:01:11
 */

(function(window) {
    /**
     * 
     * @param {String} selector 
     * @param {String} context 
     */
    //通过立即函数模仿块级作用域，达到私有作用域母的
    var jQuery = function(selector, context) {
        //return new jQuery.prototype.init();
        //无new实例化
        return new jQuery.fn.init(selector, context);
    }
    jQuery.from = function(objectArray) {
        return Array.prototype.slice.call(objectArray)
    }
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        /**
         **@param {String} selector
         *@param {String} context
         */
        init: function(selector, context) {
            this.length = 0;
            //console.log(selector, context)
            context = context || document; //限制范围查找时，如果没有指定范围便使用全局范围

            context = context.nodeType ? context : context[0] //判断content是否是dom对象，如果不是转为dom对象

            if (!selector) {
                return this;
            }
            //判断selector是不是一个字符串
            if (typeof selector === "string") {
                //判断传的是不是HTML标签，创建节点并将该节点作为实例对象的属性
                if (selector[0] === "<" && selector.length >= 3 && selector[selector.length - 1] === ">") {
                    var oDiv = document.createElement("div"); ///创建容器
                    oDiv.innerHTML = selector; ///容器内放要创建的元素
                    this[0] = oDiv.firstChild || oDiv.firstElementChild; //把创建的元素放在实例对象内

                    this.length = 1;
                    //使用id查找节点
                } else if (selector[0] === "#" && this.strNum(selector, "#") === 1 && this.strNum(selector, " ") === 0) {
                    var dom = document.getElementById(selector.slice(1));
                    if (dom) {
                        this[0] = dom;
                        this.length = 1;
                    }
                } else {
                    var eles = context.querySelectorAll(selector); //查找所有元素
                    //console.log(eles)
                    for (var i = 0; i < eles.length; i++) {
                        this.push(eles[i]) //查找所有元素
                    }
                }
            } else if (selector.nodeType) { //判断是否为dom节点，如果是直接添加，将dom节点转为jq对象

                //将dom节点转为jquery实例对象
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) { //判断selector是否是jQuery对象，如果是直接返回，将实例转为jq对象

                return selector
            }
        },
        val: function(content) {
            if (typeof content == "string") {
                return this[0].value = content
            } else {
                return this[0].value
            }
        },
        /**
         **@param {String} str//检测的字符串
         *@param {String} char//检测的字符
         *@func[用于检测一个字符在字符串中出现的次数]
         */
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] == char) {
                    count++;
                }
            }
            return count;
        },
        /**
         * @param{String} content//添加的内容
         * @func[利用数组的push方法为对象添加属性]
         */
        push: function(content) {
            Array.prototype.push.call(this, content)
        },
        /**
         * @func {取得第一个匹配元素的html内容。这个函数不能用于XML文档。但可以用于XHTML文档。在一个 HTML 文档中, 我们可以使用 .html() 方法来获取任意一个元素的内容。 如果选择器匹配多于一个的元素，那么只有第一个匹配元素的 HTML 内容会被获取。}
         */
        html: function(content) {
            if (content) {
                //有参数时设置当前对象的HTML内容
                this.each(function(i, item) {
                    item.innerHTML = content;
                })
                return this;
            } else {
                //无参数时获取html内容
                return this[0].innerHTML;
            }
        },
        /**
         * @param {pName} 属性名
         * @param {pValue} 属性值
         */
        css: function(pName, pValue) {
            // if (pValue) {
            //     //俩个参数用于设置
            //     this.each(function(i, v) {
            //         v.style[pName] = pValue;
            //     })
            //     return this;
            // } else {
            //     //一个参数时用于获取
            //     return getComputedStyle(this[0])[pName]
            // }
            if (arguments.length === 2) {
                this.each(function(i, v) {
                    v.style[pName] = pValue;
                });
                return this;
            } else {
                if (typeof pName === "string") {
                    return getComputedStyle(this[0])[pName];
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
         * @func {遍历jQuery对象}
         */
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i])
            }
        },
        /**
         * @func {将索引指定jquery对象转为Dom节点}
         */
        get: function(index) {
            return this[index]
        },
        /**
         * @func {根据索引获取指定的jquery对象}
         */
        eq: function(index) {
            return jQuery(this.get(index))
        },
        /**
         * @func {搜索匹配的元素，并返回相应元素的索引值，从0开始计数.如果不给 .index() 方法传递参数，那么返回值就是这个jQuery对象集合中第一个元素相对于其同辈元素的位置。如果参数是一组DOM元素或者jQuery对象，那么返回值就是传递的元素相对于原先集合的位置。如果参数是一个选择器，那么返回值就是原先元素相对于选择器匹配元素中的位置。如果找不到匹配的元素，则返回-1}
         */
        index: function() {
            var that = this;
            //var parent = this[0].parentNode;
            var children = Array.from(this[0].parentNode.children);
            var i;
            children.forEach(function(item, index) {
                if (item == that[0]) {
                    i = index;
                }
            });
            return i;
        },
        /**
         * 
         */
        siblings: function() {
            var that = this; //点击的按钮
            //所有的兄弟节点包括本身
            var children = Array.from(this[0].parentNode.children)
            var el = jQuery();
            children.map(function(item) {
                if (item != that[0]) { //不包括本身的兄弟节点
                    el.push(item)
                }
            });
            return el;
        },
        /**
         * @func {设置或返回被选元素的属性值。}
         */
        attr: function(pName, pValue) {
            if (pValue) {
                this.each(function(i, v) {
                    v.setAttribute(pName, pValue)
                })
                return this;
            } else {
                return this[0].getAttribute(pName)
            }
        },
        /**
         * @func {1:属性名称2:返回属性值的函数,第一个参数为当前元素的索引值，第二个参数为原先的属性值}
         */
        prop: function() {
            var arg = arguments;
            if (arg.length > 1) {
                var key = arg[0];
                var value = arg[1];
                this.each(function(k, v) {
                    v[key] = value;
                })
                return this;
            } else {
                return this[0][arg[0]]
            }
        },
        prop: function() {
            var arg = arguments;
            if (arg.length > 1) {
                var key = arg[0];
                var value = arg[1];
                this.each(function(k, v) {
                    v[key] = value;
                })
                return this;
            } else {
                return this[0][arg[0]]
            }
        },
        prop: function() {
            var arg = arguments;
            if (arg.length > 1) {
                var key = arg[0];
                var value = arg[1];
                this.each(function(k, v) {
                    v[key] = value;
                })
                return this[0][arg[0]]
            }
        },
        remove: function() {
            if (this.length == 0) return this;
            var parent = this[0].parentNode;
            this.each(function(key, value) {
                parent.removeChild(value)
            })
            return this;
        },
        /**
         * 
         */
        find: function() {
            var that = this[0];
            var el = jQuery();
            Array.from(that.children).forEach(function(item) {
                el.push(item);
                if (item.children.length) {
                    Array.from(item.children).forEach(function(val) {
                        el.push(el)
                    })
                }
            })
        },

        /**
         * @func {末端添加节点,向每个匹配的元素内部追加内容。}
         */
        append: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0]
            }

            this.each(function(i, item) {
                if (typeof childNode === "string") {
                    item.innerHTML += childNode;
                } else {
                    item.appendChild(child.cloneNode(true))
                }
            });
            return this;
        },
        /**
         * @func {前面添加节点,向每个匹配的元素内部前置内容。}
         */
        prepend: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0]
            }
            this.each(function(i, item) {
                item.insertBefore(child.cloneNode(true), item.firstChild)
            });
            return this;
        },
        /**
         * @func {实际上，使用这个方法是颠倒了常规的$(A).append(B)的操作，即不是把B追加到A中，而是把A追加到B中。}
         */
        appendTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.appendChild(that[0].cloneNode(true))
            })
            return this;
        },
        /**
         * @func {实际上，使用这个方法是颠倒了常规的$(A).prepend(B)的操作，即不是把B前置到A中，而是把A前置到B中。}
         */
        prependTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.insertBefore(that[0].cloneNode(true), item.firstChild)
            })
            return this;
        },
        /**
         * @param{取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合可以通过可选的表达式来过滤所匹配的子元素。注意：parents()将查找所有祖辈元素，而children()只考虑子元素而不考虑所有后代元素。}
         */
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
                        if (that.nodeType != 9) {
                            el.push(item)
                        }
                    });
                }
            })
            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el = jQuery(val)
                    }
                })
            }
            return el;
        },
        parent: function() {
            return jQuery(this[0].parentNode)
        },
        parents: function(string) {
            var targetParent = jQuery(string)
            var that = this[0];
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
         * @func {为每个匹配的元素添加指定的类名。一个或多个要添加到元素中的CSS类名，请用空格分开}
         */
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

        /**
         * @func {删除回调或回调回调列表的集合。一个函数或函数数组，是从回调列表中删除。}
         */
        removeClass: function(cName) {
            this.each(function(i, item) {
                item.classList.remove(cName)
            })
            return this;
        },
        toggleClass: function(cName) {
            this.each(function(i, item) {
                if (this.getAttribute("class").indexOf(cName) > -1) {
                    this.classList.remove(cName);
                } else {
                    this.classList.add(cName);
                }
            })
            return this;
        },
        /**
         * @func {在选择元素上绑定一个或多个事件的事件处理函数。}
         */
        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            //console.log(arg)
            arg.forEach(function(item) {
                typeof item === "string" ? str = item : typeof item === "function" ? callback = item : item.toString() === "[object Object]" ? data = item : null;
            });
            //console.log(str, callback)
            //事件处理函数
            function run(e) {
                //判断有没有对象这个参数
                if (data) {
                    //将传入的对象挂载到事件对象上，作为事件对象的data属性来使用
                    e.data = data;
                }
                //判断找事件源是不是str
                var tar = e.target;
                if (str) {
                    $(str, this).each(function(i, item) {
                        if (tar === item) {
                            callback && callback.call(tar, e)
                            return
                        }
                    })
                } else {
                    callback && callback.call(tar, e)
                }
            };
            //通过判断str参数，有该参数时用事件委托方式来添加
            if (str) { //需要通过事件委托来添加事件
                //this[0].addEventListener(type, run)
                this[0]["on" + type] = run;
            } else { //直接绑定
                //通过jQuery对象绑定事件
                this.each(function(i, item) {
                    item["on" + type] = run;
                })
            }
            return this;
        },
        /**
         * @func {在选择元素上移除一个或多个事件的事件处理函数。}
         */
        off: function(type) {
            this.each(function(i, item) {
                item["on" + type] = null;
            });
            return this;
        },
        /**
         * @func {获取第一个匹配元素内部区域宽度（包括补白、不包括边框）。}
         */
        innerWidth: function() {
            //获取元素的offsetWidth-左右边框宽 
            var oStyle = getComputedStyle(this[0]);
            //console.log(oStyle)
            var lw = parseFloat(oStyle.borderLeftWidth);
            var rw = parseFloat(oStyle.borderRightWidth);
            return this[0].offsetWidth - lw - rw;
            //console.log(this[0].offsetWidth)
        },
        /**
         * @func {获取第一个匹配元素内部区域高度（包括补白、不包括边框）。}
         */
        innerHeight: function() {
            var oStyle = getComputedStyle(this[0]);
            //console.log(oStyle)
            var tw = parseFloat(oStyle.borderTopWidth);
            var bw = parseFloat(oStyle.borderBottomWidth);
            return this[0].offsetHeight - tw - bw;
        },
        /**
         * @func {获取第一个匹配元素外部宽度（默认包括补白和边框）设置为 true 时，计算边距在内}
         */
        outerWidth: function(deep) {
            var el = this[0];
            var oStyle = getComputedStyle(el);
            var lm = parseFloat(oStyle.marginLeft);
            var rm = parseFloat(oStyle.marginRight);
            var offsetW = el.offsetWidth;
            return deep ? offsetW + (lm + rm) : offsetW;
        },
        /**
         * @func {获取第一个匹配元素外部高度（默认包括补白和边框)设置为 true 时，计算边距在内。}
         */
        outerHeight: function(deep) {
            var el = this[0];
            var oStyle = getComputedStyle(el);
            var tm = parseFloat(oStyle.marginTop);
            var bm = parseFloat(oStyle.marginBottom);
            var offsetH = el.offsetHeight;
            return deep ? offsetH + (tm + bm) : offsetH;
        },
        /**
         * @func {显示隐藏的匹配元素这个就是 'show( speed, [callback] )'无动画的版本,如果选择的元素是可见的，这个方法将不会改变任何东西。无论这个元素是通过hide()方法隐藏的还是在CSS里设置了display:none;这个方法都将有效}
         */
        show: function() {
            this.each(function(index, item) {
                item.style.display = "block";
            })
        },
        /**
         * @func{隐藏显示的元素这个就是'hide(speed,[callback])'的无动画版如果选择的元素是隐藏的，这个方法将不会改变任何东西}
         */
        hide: function() {
            this.each(function(index, item) {
                item.style.display = "none";
            })
        },
        /**
         * @func{用于绑定两个或多个事件处理器函数以响应被选元素的轮流的click事件如果元素是可见的，切换为隐藏的；如果元素是隐藏的切换为可见的}
         */
        toggle: function() {
            this.each(function(index, el) {
                var displayStates = getComputedStyle(el, null).display;
                // if (displayStates === "block") {
                //     el.style.display = "none"
                // } else {
                //     el.style.display = "block"
                // }
                el.style.display = displayStates === "block" ? "none" : "block"
            })
        },
        /**
         *@func{取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合这个函数只返回后面那个紧邻的同辈元素，而不是后面所有的同辈元素（可以使用nextAll）。可以用一个可选的表达式进行筛选}
         */
        next: function() {
            return jQuery(this[0].nextElementSibling);

        },
        /**
         * @param {查找当前元素之后所有的同辈元素。}
         */
        nextAll: function() {
            //查找当前元素的所有兄弟
            var a = jQuery();
            var p = this[0].nextElementSibling;
            while (p) {
                if (p.nodeType == 1) {
                    a.push(jQuery(p))
                }
                p = p.nextElementSibling;
            }
            return a;
        },
        /**
         * 
         */
        nextAll1: function() {
            var a = [];
            var children = this[0].parentNode.childNodes;
            var flag = false;
            for (var i = 0; i < children.length; i++) {
                if (flag == true && children[i].nodeType == 1) {
                    a.push(jQuery(children[i]))
                }
                if (children[i] == this[0]) return true;
            }
            return a
        },
        nextAll2: function() {
            var a = [];
            var children = this[0].parentNode.childNodes;
            var i = children.length - 1;
            while (i >= 0) {
                if (children[i] == this[0]) return a;
                if (children[i].nodeType === 1) {
                    a.push(jQuery(children[i]))
                }
                i--;
            }
            return a
        },
        /**
         *@func{取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合可以用一个可选的表达式进行筛选。只有紧邻的同辈元素会被匹配到，而不是前面所有的同辈元素}
         */
        prev: function() {
            return jQuery(this[0].previousElementSibling)
        },
        /**
         * @param {查找当前元素之前所有的同辈元素}
         */
        prevAll: function() {
            //查找当前元素的所有兄弟
            var a = jQuery() //数组里面存的是当前元素上面所有的兄弟
            var p = this[0].previousElementSibling; //上面兄弟有可能是元素，文本，注释，空白
            while (p) { //循坏p元素
                if (p.nodeType == 1) { //如果说p是一个元素
                    a.push(p) //将该元素放到a数组里面去
                }
                p = p.previousElementSibling; //继续找上一个兄弟
            }
            return a;
        },
        /**
         * 
         */
        prevAll1: function() {
            var a = [];
            var children = this[0].parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i] == this[0]) return a
                if (children[i].nodeType === 1) {
                    a.push(jQuery(children[i]))
                }
            }
        },
        /**
         * @param {number|string} 设置动画时间
         * @func {折叠动画}
         */
        slideUp: function(time) {
            //设置默认参数
            time = time || 400;
            if (typeof time === "string") {
                time = time === "slow" ? 600 : time === "fast" ? 200 : 400;
            }
            //核心控制height慢慢变为0
            this.each(function(i, el) {
                //获取元素总高度
                el.style.overflow = "hidden";
                var totalH = el.offsetHeight;
                //设置当前高度
                var currentH = totalH;
                //计算减的差值
                var step = totalH / (time / 10);
                //通过定时器去减高度
                var timer = setInterval(function() {
                    currentH = currentH - step;
                    el.style.height = currentH + "px";
                    //当高度为0,清除定时器
                    if (currentH <= 0) {
                        clearInterval(timer);
                        el.style.display = "none";
                        el.style.height = totalH + "px";
                    }
                }, 10)
            })
        },
        /**
         * @param{}
         */
        slideDown: function(time) {
            //设置默认参数
            time = time || 400;
            if (typeof time === "string") {
                time = time === "slow" ? 600 : time === "fast" ? 200 : 400;
            }
            this.each(function(i, el) {
                //设为显示
                el.style.display = "block";
                //获取元素总高度
                var totalH = el.offsetHeight;
                //设置当前高度
                el.style.height = 0;
                var currentH = 0;
                //计算减的差值(步长值)
                var step = totalH / (time / 10);
                //通过定时器去减高度
                var timer = setInterval(function() {
                    currentH = currentH + step;
                    el.style.height = currentH + "px";
                    //当高度为0,清除定时器
                    if (currentH >= totalH) {
                        clearInterval(timer);
                        el.style.height = totalH + "px"
                    }
                }, 10)
            })
        },
        slideToggle: function(time) {
            this.each(function(i, el) {
                var displaystates = getComputedStyle(el).display;
                if (displaystates === "block") {
                    $(el).slideUp(time)
                } else {
                    $(el).slideDown(time);
                }
            })
        },
        /**
         * @param {检查当前的元素是否含有某个特定的类，如果有，则返回true。}
         */
        hasClass: function(selector) {
            var className = " " + selector + " ";
            l = this.length;
            for (var i = 0; i < l; i++) {
                if (this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/[\t\r\n]/g, " ").indexOf(className) > -1) {
                    return true
                }
            }
            return false;
        },
        /**
         * @func {游览器距离页面顶部的距离}4
         */
        scrollTop: function() {
            var scrollT;
            console.log(123)
            if (window.pageYOffset) { //pagexOffset=scrollY(游览器滚动的高度)
                scrollT = window.pageYOffset;
            } else if (document.compatMode) { //document.compatMode判断是标准模式还是混杂模式
                scrollT = document.documentElement.scrollTop; //标准游览器获得滚动的高度
            } else if (document.body) { //兼容ie
                scrollT = document.body.scrollTop;
            }
            return scrollT;
        },
        /**
         * @func{获取}
         */
        getCss: function(ele, attr) {
            if (typeof getComputedStyle == "function") {
                return parseFloat(getComputedStyle(ele, null)[attr])
            } else {
                if (attr == "opacity") {
                    var filter = ele.currentStyle.filter;
                    var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                    if (reg.test(filter)) {
                        return parseFloat(RegExp.$1) / 100;
                    } else {
                        return 1;
                    }
                } else {
                    return parseFloat(ele.currentStyle(attr))
                }
            }
        },
        /**
         * @func{设置}
         */
        setCss: function(ele, attr, val) {
            switch (attr) {
                case "opacity":
                    ele.style.opacity = val;
                    ele.style.filter = "alpha(opacity='+val*100+')";
                case "top":
                case "left":
                case "height":
                case "width":
                    ele.style[attr] = val + "px";
                case "float":
                    ele.style.cssStyle = val + "px";
                default:
                    ele.style[attr] = val;
            }
        },
        animated: function(obj, duration, fnCallback) {
            var that = this;
            var oBegain = {}; //起始值
            var oChange = {}; //改变值
            var flag = 0;
            for (var attr in obj) {
                var target = obj[attr];
                var begain = that.getCss(that[0], attr);
                console.log(target, begain)
                var change = target - begain;
                //console.log(change)
                if (change) {
                    oBegain[attr] = begain;
                    oChange[attr] = change;
                    flag++;
                }
            }
            if (flag == 0) {
                return this;
            }
            var interval = 13;
            var times = 0;
            clearInterval(that[0].timer);

            function step() {
                times += interval;
                if (times >= duration) {
                    for (var attr in obj) {
                        var target = obj[attr];
                        that.setCss(that[0], attr, target)
                    }
                    clearInterval(that[0].timer);
                    that[0].timer = null;
                    if (fnCallback) {
                        fnCallback.call(that[0])
                    }
                } else {
                    for (var attr in obj) {
                        var begain = oBegain[attr];
                        var change = oChange[attr];
                        var val = times / duration * change + begain;
                        that.setCss(that[0], attr, val)
                    }
                }
            }
            that[0].timer = setInterval(step)
        }
    }
    jQuery.trim = function(opt) {
            return (opt || "").replace(/(^\s+)|(\s+$)/g, "")
        }
        //ajax请求
    jQuery.ajax = function(options) {
        var defObj = {
            url: "", //请求地址
            method: "get", //请求方式
            data: null, //发送给服务器的数据
            async: true, //是否异步
            type: "urlencoded", //请求类型
            success: function() {}, //成功的回调
            error: function() {} //失败的回调
        };
        options = this.extend({}, defObj, options);
        var params = this.formsParams(options.data);
        //转成字符格式"name"="阳阳"&"age"=18
        //创建xhr对象
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        //建立连接
        //xhr.open(请求方式，请求地址，是否异步)
        if (options.method.toLowerCase() == "get") { //请求方式为get，get需要请求参数放到地址栏
            xhr.open(options.method, options.url + "?" + params, options.async);
            xhr.send(null)
        } else if (options.method.toLowerCase() == "post") { //请求为post
            xhr.open(options.method, options.url, options.async);
            if (options.type === "urlencoded") { //请求
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            } else if (options.type == "json") {
                xhr.setRequestHeader("Content-type", "application/json")
            }
            xhr.send(params)
        }
        //获取ajax返回的数据
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                options.success(xhr.responseText)
            } else {
                options.error()
            }
        };
    };
    //将对象转化为字符串
    jQuery.formsParams = function(data) {
            //console.log(data)
            var arr = [];
            for (var key in data) {
                arr.push(key + "=" + data[key]);
            }
            //console.log(arr);
            //console.log(arr.join("&"));
            return arr.join("&")
        }
        //实现对象的扩展，后面的对象覆盖前面的对象

    jQuery.extend = function() {
            var target = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    target[key] = arguments[i][key]
                }
            }
            return target;
        }
        //无new实例化如何使用jQuery函数原型方法
    jQuery.prototype.init.prototype = jQuery.prototype;
    //将jQuery局部函数变为全局变量$来使用()
    window.jQuery = window.$ = jQuery;
})(window)