(function(window){
	var jQuery = function(selector,countext){
		return new jQuery.prototype.init(selector,countext)
	};
jQuery.prototype = {
	constructor:jQuery,
	init:function(selector,countext){
		var that = this;
		this.length = 0;
		countext = countext || document;
		countext = countext.nodeType?countext:countext[0];
	if(!selector){
		return this;
	}
	if(typeof selector === "string"){
		if(selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>'){
			var oDiv = document.createElement("div")
			oDiv.innerHTML = selector;
		this[0] = oDiv.firstChild || oDiv.firstElementChild;
		this.length = 1;
		}else if(selector[i] === "#" && this.strNum(selector," ") == 0 && this.strNum(selector,'#') === 1){
			var dom = document.getElementById(selector.slice(1))
			if(dom){
				this[0] = dom;
				this.length = 1;
			}
		}else{
			var ele = countext.querySelectorAll(selector);
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
		if(str[i] == chang){
			count++
		}
	}
	return count
},
//向DOM节点添加DOM
push:function(chang){
	Array.prototype.push.call(this,chang)
},
//遍历jQuery对象
each:function(fn){
	for(var i=0;i<this.length;i++){
		fn.call(this[i],i,this[i])
	}
},
//下标jQuery 转DOM
get:function(index){
	return this[index];
},
//遍历下标找jQuery
eq:function(index){
	return jQuery(this.get(index));
},
//向后面添加
 append:function(childNode){
 	var child = jQuery(childNode)[0];
 	this.each(function(index,item){
 		item.appendChild(child)
 	})
 	return this
 },
prepent:function(childNode){
	var child = jQuery(childNode)[0];
	this.each(function(index,item){
		item.insertBefore(child.cloneNode(true),item.firstChild)
	})
	return this;
}
}
jQuery.prototype.init.prototype = jQuery.prototype
window.$ = window.jQuery = jQuery
})(window)