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
			countext = countext.nodeType?countext:countext
			if(!selector){
				return this
			}
		if(typeof selector === "string"){
			if(selector[0] === "<" && selector.length >= 3 && selector[selector.length -1] === ">"){
				var oDiv = document.createElement('div')
				oDiv.innerHTML = selector;
				this[0] = oDiv.firstChild || oDiv.firstElementChild
				this.length = 1
			}else if(selector[0] === "#" && this.strNum(selector,' ') === 0 && this.strNum(selector,'#') === 1){
				var dom = document.getElementById(selector.slit(1))
				if(dom){
					this[0] = dom;
					this.length = 1
				}
			}else{
				var ele = countext.querySelectorAll(selector)
				for(var i=0;i<ele.length;i++){
					this.push(ele[i])
				}
			}
		}else if(selector.nodeType){
			this[0] = selector
			this.length = 1
		}else if(selector instanceof jQuery){
			return selector
		}else{
			return this;
		}
		},
		strNum:function(str,chang){
			var count = 0;
			for(var i=0;i<str.length;i++){
				if(str[i] === chang){
					count++;
				}
			}
			return count
		},
		get:function(index){
			return this[index]
		},
		push:function(chang){
			Array.prototype.push.call(this.chang)
		},
		eq:function(index){
			return jQuery(this.get[index])
		},
		each:function(fn){
			for(var i=0;i<this.length;i++){
				fn.call(this[i],i,this[i])
			}
		},
		append:function(childNode){
			var child = jQuery(childNode)[0];
			this.each(function(index,item){
				item.appendChild(child.cloneNode(true))
			})
			return this
		},
		remove:function(){
			if(this.length === 0){
				var prepend = this[0].parentNode;
				this.each(function(k,l){
					prepend.removeChild(l)
				})
			}
			return this;
		},
		prepend:function(childNode){
			var child = jQuery(childNode)[0];
			this.each(function(index,item){
				item.insertBefore(child,cloneNode(true),item.firstChild)
			})
			return this
		},
		prependTo:function(parentNode){
			var that = this;
			var fuq = jQuery(parentNode)
			this.each(function(index,item){
				item.insertBefore(child.cloneNode(true),item.firstChild)
			})
			return this;
		},
		off:function(type){
			if(type){
				this.each(function(index,item){
					item.eventer[type] = null;
				})
			}else{
				this.each(function(index,item){
					item.eventer[type] = null
				})
			}
			return this;
		},
		on:function(type){
			var that = this;
			var arg = arguments[1]
			if(arguments.length ===2){
				this.each(function(k,v){
					v.addEventListener(type,arg,false)
				})
			}else if(typeof arguments[1] === 'string' && arguments.length === 3){
				var callback = arguments[2];
				var eventDom = $(arguments[1],this[0])
				eventDom.each(function(k,item){
					if(!(typeof item.eventer === 'object')){
						item.eventer = {};
					}
					if(!(item.eventer[type] instanceof Array)){
						item.eventer = [];
					};
					item.eventer[type].push(callback)
				})
				function run(e){
					if(e.target.eventer){
						e.target.eventer[type] && e.target.eventer.forEach(function(fn,index){
							fn.call(e.target,e)
						})
					}
				};
				if(!this[0].bool){
					this[0].addEventListener(type,run,false)
					this[0].bool = true;
				}
			}
			return this
		},
	};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)