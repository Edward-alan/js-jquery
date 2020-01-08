(function(window){
	var jQuery = function(selector,countext){
		return new jQuery.prototype.init(selector,countext)
	}
	jQuery.prototype = {
		constructor:jQuery,
		init:function(selector,countext){
			var that = this;
			this.length = 0;
			countext = countext || document;
			countext = countext.nodeType?countext:countext;
			if(!selector){
				return this;
			}
		if(typeof selector === "string"){
			if(selector[0] === "<" && selector.length >= 3 && selector[selector.length -1] ===">"){
				var oDiv = document.createElement('div');
			oDiv.innerHTML = selector;
		this[0] = oDiv.firstChild || oDiv.firstElementChild;
		this.length = 1;
		}else if(selector[0] ==="#" &&this.strNum(selector," ") == 0 && this.strNum(selector,'#')===1){
			var dom = document.getElementById(selector.slice(1));
			if(dom){
				this[0] = dom;
				this.length = 1;
			}
		}else {
			var ele = countext.querySelectorAll(selector);
			for(var i=0;i<ele.length;i++){
				this.push(ele[i])
			}
		}
		}else if(selector.nodeType){
			this[0] = selector;
			this.length = 1;
		}else if(selector instanceof jQuery){
			return selector
		}else{
			return this;
		}
		},
		strNum:function(sty,chang){
			var count = 0;
			for(var i=0;i<sty.length;i++){
				if(sty[i] === chang){
					count++;
				}
			}
			return this;
		},
		push:function(chang){  
		Array.prototype.push.call(this,chang)
	},
	get:function(index){   
		return this[index];   
	},
	eq:function(index){   
		return jQuery(this.get[index]);
	},
	each:function(fn){   
		for(var i=0;i<this.length;i++){
			fn.call(this[i],i,this[i]);
		}
	},
	// on:function(type){
	// 	var that = this;
	// 	var are = arguments[1];
	// 	if(arguments.length === 2){
	// 		this.each(function(index,item){
	// 			item[type] = are;
	// 			item.addEventListener(type,item,false)
	// 		})
	// 	}else if(typeof arguments[1] === "string" && arguments.length === 3){
	// 		var cb = arguments[2];
	// 		var eventDom = jQuery(arguments[1],this[0]);
	// 		eventDom.each(function(index,item){
	// 			if(!(typeof item.events === "object")){
	// 				item.events = {};
	// 			}
	// 			if(item.events[type] instanceof Array){
	// 				item.events[type] = []
	// 			}
	// 			item.events[type].push(cb)
	// 		})
	// 		function rootList(ev){
	// 			if(ev.target.events){
	// 				ev.target.events[type] && ev.target.events[type].forEach(function(index,item){
	// 					fn.call(ev.target,ev)
	// 				})
	// 			}
	// 		}
	// 		if(!this[0].arr){
	// 			this[0].addEventListener(type,rootList,false);
	// 			this[0].arr = true;
	// 		}
	// 	}
	// },
	 on: function(type) { //on事件模块的封装
            var arg = arguments; //定义伪数组接受参数
            arg = Array.prototype.slice.call(arguments, 1); //截取数组，去掉事件类型
            var str, //定义变量存储参数
                callback;
            arg.forEach(function(item) { //遍历数组将参数赋值给变量，（判断变量是否是字符串、函数、对象）
                typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : item.toString() === "[object Object]" ?
                    data = item : null;
            })

            function run(e) { //e是事件对象
                if (str) { //判断是否存在事件委托子节点，如果存在遍历实例对象并判断事件源与参数子节点是否相等
                    $(str, this).each(function(i, item) {

                        if (e.target === item) {
                            callback && callback.call(e.target, e);
                            return;
                        }
                    })
                } else { //如果不存在事件委托子节点直接做事件处理，call使this指向实例对象
                    callback && callback.call(this, e)
                }
            }
            if (str) { //判断是否存在事件委托子节点，如果存在直接给父节点绑定事件，如果没有遍历前面的实例对象给每一个绑定事件
                this[0]["on" + type] = run;
            } else {
                this.each(function(i, item) {
                    item["on" + type] = run;
                })
            }
            return this;
        },
	off:function(type){
		if(type){
			this.each(function(index,item){
				if(item.events){
					item.events[type] = null
				}else{
					item.removeEventListener(type,item[type],false)
				}
			})
		}else{
			this.each(function(index,item){
				item.events = null
			})
		}
	},
	offset:function(){
		var l = this[0].offsetLet;
		var t = this[0].offsetTop;
		var p = this[0].offsetParent;
		while(p){
			l += p.offsetLeft + p.clientLeft;
			t += p.offsetTop + p.clientTop;
			p = p.offsetParent;
		}
		return {"left":l,'top':t}
	},
	position:function(){
		return {'left':this[0].offsetLeft,'top':this[0].offsetTop}
	},
	show:function(){
		this.each(function(index,item){
			item.style.display = 'block'
		})
	},
	innerWidth:function(){
        return this[0].clientWidth;
    },
    innerHeight:function(){
        return this[0].clientHeight;
    },
    css:function(pName,pValue){
    	if(arguments.length === 2){
    		this.each(function(index,item){
    			item.style[pName] = pValue;
    		})

    	}else if(arguments.length === 1){
    		if(typeof pName === 'string'){
    			return getComputedStyle(this[0])[pName];
    		}else{
    			if(typeof pName === "object"){
    				for(var i in pName){
    					this.each(function(index,item){
    						item.style[i] = pName[i]
    					})
    				}
    			}
    			return this;
    		}
    	}
    },
	};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery
})(window)