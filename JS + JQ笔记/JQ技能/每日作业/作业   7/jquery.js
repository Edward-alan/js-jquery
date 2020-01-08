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
			if(selector[0] === "<" && selector.length >= 3 && selector[selector.length -1] === ">"){
				var oDiv = document.createElement("div")
				oDiv.innerHTML = selector;
				this[0] = oDiv.firstChild || oDiv.firstElementChild;
				this.length = 1
			}else if(selector[0] === "#" && this.strNum(selector," ") === 0 && this.strNum(selector,'#') === 1){
				var dom = document.getElementById(selector.slice(1));
				if(dom){
					this[0] = dom;
					this.length = 1
				}
			}else{
				var ele = countext = querySelectorAll(selector)
				for(var i=0;i<ele.length;i++){
					this.push(ele[i])
				}
			}
		}else if(selector.nodeType){
			this[0] = selector;
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
				count++
			}
		}
		return this;
	},
	push:function(chang){
		Array.prototype.push.call(this,chang)
	},
	get:function(index){
		return this[index]
	},
	eq:function(index){
		return jQuery(this.push(index))
	},
	each:function(fn){
		for(var i=0;i<this.length;i++){
			fn.call(this[i],i,this[i])
		}
	},
	append:function(childNode){
		var child = jQuery(childNode)
		this.each(function(index,item){
			item.appendChild(child.cloneNode(true))
		})
		return this;
	},
	remove:function(){
		if(this.length === 0){
			var parent = this[0].parentNode;
			this.each(function(k,v){
				parent.removeChild(v)
			})
		}
		return this;
	},
	css:function(pName,pValue){
		if(arguments.length === 2){
			this.each(function(index,item){
				item.style[pName] = pValue
			})
		}else if(arguments.length === 1){
			if(typeof pName === 'string'){
				return getComputedStyle(this[0])[pName]
			}else{
				if(typeof pName === 'object'){
					for(var i in pName){
						this.each(function(index,item){
							item.style[i] = pName[i]
						})
					}
				}
			}
			return this;
		}
	},
	on:function(type){
		var that = this;
		var arg = arguments[1];
		if(argument.length === 2){
			this.each(function(index,item){
				item.addEventListener(type,arg,false)
			})
		}else if(typeof arguments[1] === 'string' && arguments.length === 3){
			var bba = arguments[2];
			var eventdom = jQuery(arguments,this[0])
			eventdom.each(function(index,item){
				if(!(typeof item.events === 'object')){
					item.events = {};
				};
				if(!(item.events[type] instanceof Array)){
					item.events[type] = [];
				}
			})
		}
	}
	off:function(type){
		if(type){
			this.each(function(index,item){
				item.events[type] = null
			})
		}else{
			this.each(function(k,v){
				v.events = null
			})
		}
		return this;
	},
};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery
})(window)