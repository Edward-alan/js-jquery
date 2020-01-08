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
			countext = countext.nodeType?countext:countext
			if(!selector){
				return this
			}
			if(typeof selector === "string"){
				if(selector[0] === "<" && selector.length >= 3 && selector[selector.length-1] === '>'){
					var oDiv = document.createElement('div')
					oDiv.innerHTML = selector;
					this[0] = oDiv.firstChild || oDiv.firstElementChild;
					this.length = 1
				}else if(selector[0] === '#' && this.strNum(selector,' ') === 0 && this.strNum(selector,'#'))
			}
		},
	strNum:function(str,chang){
		var count = 0;
		for(var i=0;i<str.length;i++){
			if(str[i] === chang){
				count++;
			}
		}
		return count;
	},
	push:function(chang){
		Array.prototype.push.call(this,chang)
	},
	get:function(index){
		return this[index]
	},
	eq:function(index){
		return jQuery(this.get(index))
	},
	

	};
	jQuert.extend = function(){
		var target = arguments[0];
		for(var i=1;i<arguments.length;i++){
			for(var key in arguments[i]){
				target[key] = arguments[i][key]
			}
		}
		return target
	},
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)