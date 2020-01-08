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
            },
            /**
             *  @func[操作HTML内容]
             */
            html: function(content) {
                if (content) { //有参数，设置当前对象的HTML内容
                    this.each(function(i, item) {
                        item.innerHTML = content;
                    });
                    return this
                } else { //没参数，实现获取当前对象的HTML内容
                    return this[0].innerHTML;
                }
            },
            /**
             * @func[遍历jQuery对象]
             */
            each: function(fn) {
                for (var i = 0; i < this.length; i++) {
                    fn.call(this[i], i, this[i]);
                }
            },
            /**
             * @func[将索引指定jquery对象转为DOM节点]
             */
            get: function(index) {
                return this[index];
            },
            /**
             * @func[将索引指定jquery对象转为jqery对象]
             */
            eq: function(index) {
                return jQuery(this.get(index));
            },
            css: function(pName, pValue) {
                if (pValue) { //两个参数，用于设置
                    this.each(function(i, v) {
                        v.style[pName] = pValue;

                    });
                    return this;
                } else { //没有属性值，用于获取
                    return getComputedStyle(this[0])[pName]

                };

            },
            attr: function(pName, pValue) {
                if (pValue) {
                    this.each(function(i, v) {
                        v.setAttribute(pName, pValue);
                    });
                } else {
                    //如果是一个参数，获取HTML属性
                    return this[0].getAttribute(pName)
                }
            },
            //添加节点
            append: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                    //this[0].appendChild(childNode);
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                    //this[0].appendChild(childNode[0]);
                }
                this.each(function(i, item) {
                    console.log(item)
                    item.appendChild(child.cloneNode(true))
                });

                return this;
            },
            prepend: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                    //this[0].appendChild(childNode);
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                    //this[0].appendChild(childNode[0]);
                }
                this.each(function(i, item) {
                    //console.log(item)
                    item.insertBefore(child.cloneNode(true), item.firstChild)
                });

                return this;
            },

            /**
             * @func[前端添加子节点]
             */
            appendTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.append(that[0].cloneNode(true))


                });
                return this;
            },
            prependTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.insertBefore(that[0].cloneNode(true), item.firstChild)


                });
                return this;
            },
            addclass: function(cName) {
                //cName=cName.split(" ");
                //cName.forEach(function(cssName){
                this.each(function(i, item) {
                    item.clasList.add(cName)
                })
                return this;
                //});
            },
            removeClass: function(cName) {
                this.each(function(i, item) {
                    item.clasList.remove(cName)
                })
                return this;
            }
        }
        //
    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = jQuery;
})(window)