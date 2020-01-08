(function(window){
var zepto = function(selector,countext){
	return new zepto.prototype.init(selector,countext)
};
zepto.prototype = {
	constructor:zepto,
	init:function(selector,countext){
	    var that = this;
	    this.length = 0;
	    countext = countext || document
	    countext = countext.nodeType?countext:countext[0]
	    if(!selector){
	    	return this;
	    }
if(typeof selector === 'string'){
	if(selector[0] === "<" && selector.length >= 3 && selector[selector.length-1] === 0){
		var oDiv = document.getElementById('div');
		oDiv.innerHTML = selector;
		this[0] = oDiv.firstChild || oDiv.firstElementChild;
		this.length = 1
	}else if(selector[0] === '#' &&  this.strNum(selector," ") === 0 && this.strNum(selector,'#') === 1){
		var dom = document.querySelectorAll(selector.slice(1))
		if(dom){
			this[0] = dom;
			this.length = 1;
		}else{
			var ele = countext.querySelectorAll(selector)
			for(var i=0;i<ele.length;i++){
				this.push(ele[i])
			}
		}
	}else if(selector.nodeType){
		this[0] = selector;
		this[0].length = 1;
	}else if(selector instanceof jQuery){
		return selector
	}else{
		return this
	}
	}
	},
	strNum:function(str,chang){
  		var count = 0
  		for(var i=0;i<str.length;i++){
  			if(str[i] == chang){
  				count++
  			}
  		}
  		return count
	},
	push:function(chang){
		Array.prototype.push.call(this.chang)
	},
 get:function(index){
 	return this[index]
 },
 eq:function( index){
 	return jQuery(this.get(index))
 },
 each:function(fn){
 	for(var i=0;i<this.length;i++){
 		fn.call(this[i],i,this[i])
 	}
 },
 append:function(childNode){
 	var child = jQuery(childNode)[0];
 	this.each(function(index,item){
 		item.appendChild(child.cloneNode)
 	})
 	return this
 },
prepend:function(childNode){
	var that = this;
	var fuq = jQuery(prepend);
	fuq.each(function(index,init){
		init.insertBefore(that.cloneNode(true),init.firstChild)
	})
},
prepend:function(prependNode){
	var that = this;
	var fuq = jQuery(prepend);
	fuq.each(function(index,item){
		item.appendChild(that[0].cloneNode(true))
	})
	return this;
}
};
zepto.prototype.init.prototype = zepto.prototype;
window.$ = window.zepto = zepto;
})(window)