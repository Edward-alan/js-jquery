(function(window){
	var jQuery = function(selector,countext){
		return new jQuery.prototype.init(selector,countext)
	};
jQuery.prototype = {
	constructor:jQuery,
	init:function(selector,countext){
		var that = this;
		this.length = 0;
		countext = countext || document
		countext = countext.nodeType?countext:countext[0]
		if(!selector){
			return this;
		}if(typeof selector === "string"){
			if(selector[0] === "<" && selector.length >= 3 && selector[selector.length -1] === '>'){
				var oDiv = document.createElement('div')
				oDiv.innerHTML = selector;
				this[0] = oDiv.firstChild || oDiv.firstElementChild;
				this.length = 1; 
			}else if(selector[0] === "#" && this.strNum(selector,' ') === 0 && this.strNum(selector,'#') === 1){
				var Dom = document.getElementById(selector.slice(1))
				if(Dom){
					this[0] = Dom;
					this.length = 1
				}
			}else{
				var ele = document.querySelectorAll(selector)
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
		return jQuery(this.get(index));
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
	prepend:function(childNode){
		var child = jQuery(childNode)
		this.each(function(k,v){
			v.insertBefore(child.cloneNode(true),v.firstChild);
		})
		return this
	},
	prependTo:function(parentNode){
		var that = this;
		var parent = jQuery(parentNode)
		parent.each(function(k,v){
			v.insertBefore(that[0].cloneNode(true),v.firstChild)
		})
		return this;
	},
	appendTo:function(parentNode){
   		var that = this;
   		var parent = jQuery(parentNode)
   		parent.each(function(k,v){
   			v.appendChild(that[0].cloneNode(true))
   		})
   		return this
	},
	remove:function(){
		if(this.length === 0){
			var parent = this[0].parentNode
			this.each(function(k,v){
				parrent.removeChild(v)
			})
			return this
		}
	},
	removeClass:function(){
		var that = this;
		cName = cName.aplit(' ')
		cName.forEach(function(item){
			that.each(function(k,y){
				y.classList.remove(item)
			})
		})
		return this;
	},
	hasClass:function(){
		if(this[0].className.indexof(cName)>-1){
			return true
		}
		return false
	},
	val:function(contents){
		if(typeof contents === "string"){
			return this[0].value = contents;
		}else{
			return this[0].value
		}
		return this
	},
	 on:function(type) {
        var arg = Array.prototype.slice.call(arguments, 1);
        var str, callback, data;
        arg.forEach(function(item) {
            typeof item === 'string' ? str = item : typeof item === 'function' ?
                callback = item : item.toString() === '[object Object]' ? data = item : null;
        });  //事件处理函数
        function run(e) {
            e.data = data;
            var tar = e.target;
            if (str) {
                $(str, this).each(function(i, item) {
                    if (tar === item) {
                        callback && callback.call(tar, e)
                        return;
                    };
                })

            } else {
                callback && callback.call(tar, e) 
            }
        };
        if (str) {
            this[0].addEventListener(type, run);
        } else {
            this.each(function(i, item) {
                item.addEventListener(type, run);
            })
        }
        return this;
    },
	off:function(type){
		if(type){
			this.each(function(k,v){
				v.evenTer[type] = null
			})
		}else{
			this.each(function(k,v){
				v.evenTer = null;
			})
		}
		return this;
	}
};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)