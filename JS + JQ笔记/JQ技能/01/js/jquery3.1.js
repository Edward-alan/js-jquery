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
          eq: function(index) {
              return jQuery(this.get(index))
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
              if (pValue) {
                  this.each(function(i, v) {
                      v.style[pName] = pValue;
                  });
                  return this;
              } else {
                  // return getComputedStyle(this[0])[pName];
                  return getComputedStyle(this[0])[pName]
              };
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
              this.each(function(i, item) {
                  item.classList.add(cName);

              })
              return this;
          },
          removeClass: function(cName) {
              this.each(function(i, item) {
                  item.classList.remove(cName);

              })
              return this;
          },
          /**
           * 
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
                      console.log(str)
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

      }

      //无new实例化
      jQuery.prototype.init.prototype = jQuery.prototype;
      //将jQuery局部函数变为全局变量$来使用
      window.jQuery = window.$ = jQuery;
  })(window)