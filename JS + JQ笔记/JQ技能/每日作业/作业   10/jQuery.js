(function(window){
   var jQuery = function(selector,countext){
   		return new jQuery.prototype.init(selector,countext)
   }
jQuery.prototype = {
		constructor:jQuery,
		init:function(selector,countext){
        var that = this
        this.length = 0;
        countext = countext || countext;
        countext = countext.nodeType?countext:countext
        if(!selector){
        	return this
        }
    if(typeof selector ==="string"){
    	if(selector[0] === "<" && selector.length >=3 && selector[selector.length - 1] === ">"){
    		var oDiv = document.createElement('div')
    		oDiv.innerHTML = selector
    		this[0] = oDiv.firstChild || oDiv.firstElementChild;
    		this.length = 1
    	}else if(selector[0] === "#" && this.strNum(selector," ") === 0 && this.strNum(selector,'#') === 1){
    		var dom = document.getElementById(selector.slice(1))
    		if(dom){
    			this[0] = dom;
    			this.length = 1
    		}
    	}else{
    		var ele.countext.querySelectorAll(selector)
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
    	return this
    }
	},
	strNum:function(str,chang){
		var count = 0;
		for(var i=0;i<str.length;i++){
			if(str[i] == chang){
				count++
			}
		}
		return this
	},
	push:function(chang){
		Array.prototype.push.call(this,chang)
	},
	get:function(index){
		return this[index]
	},
	eq:function(index){
		return jQuery(this.get[index]);
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
	},
	prepend:function(childNode){
		var child = jQuery(childNode);
		this.each(function(index,item){
			item.instanceof(child.cloneNode(true),item.firstElementChild)
		})
	},
	addClass:function(cName){
		var that = this;
		cName = cName.split(" ");
		cName.forEach(function(item,index){
   			that.each(function(k,v){
   				v.classList.add(item)
   			})
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
		return this
	},
	removeClass:function(cName){
		var that = this;
		cName = cName.split(" ")
		cName.forEach(function(item,index){
			that.each(function(k,v){
				v.classList(item)
			})
		})
		return this;
	},
	on:function(type){
	var that = this;
	var arg1 = arguments[1]
	if(arguments.length == 2){
		this.each(function(index,item){
			item[type] = arg1
			item.addEventListener(type,item[type],false)
		})
	}else if(typeof arguments[1] === 'string' && arguments.length === 3){
		var cb = arguments[2];
		var eventDom = jQuery(arguments[1],this[0]);
		eventDom.each(function(index,item){
			if(!(typeof item.events === 'object')){
				item.events = {};
			}
			if(!(item.events[type] instanceof Array)){
				item.events[type] = [];
			}
			item.events[type].push(cb)
		})
		function rootList(ev){
			if(ev.target.events){
			ev.target.events[type] && ev.target.events[type].forEach(function(fn,index){
				fn.call(ev.target,ev);
			})
			}
	}
	if(!(this[0].arr)===type){  
	    this[0].addEventListener(type,rootList,false)
	    this[0].arr = type;
	}
}
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
nextAll:function(){
	var p = this[0].nextElementSibling;
	var ele = jQuery();
	while(p){
		ele.push(p)
		p = p.nextElementSibling;
	}
	return ele;
},
slideUp:function(time){
	time = time || 400;
	if(typeof time === "string"){
		time = time == 'slow'?600:time = 'flast'?400:600;
	}
	this.each(function(index,item){
		item.style.overflow = 'hidden';
		var totalH = item.offsetHeight;
		var currentH = totalH;
		var step = totalH/time*13
		var timer = setInterval(function(){
		 	current-=step;
		 	item.style.height = currentH+'px'
		 	if(currentH <= 0){
		 		clearInterval(timer);
		 		timer = null;
		 		item.style.display = "none";
		 		item.style.height = totalH + "px"
		 	}
		},13)
	})
},
slideDown:function(time){
	time = time || 400;
	if(typeof time === 'string'){
		time = time == 'slow'?600:time = 'flast'?400:600
	}
	this.each(function(index,item){
		item.style.display = "block";
		var totalH = item.offsetHeight;
		var currentH = totalH;
		var step = totalH/time*13;
		var time = setInterval(function(){
			currentH += step
		},13)
	})
},
offset:function(){
	var l = this[0].offsetLeft;
	var t = this[0].offsetTop;
	var p = this[0].offsetParent;
	while(p){
		l += p.offsetLeft + p.clientLeft;
		t += p.offsetTop + p.clientTop;
		p = p.offsetParent;
	}
	return {"left"l,"top"t}
},
position:function(){
	return {"left":this[0].offsetLeft,"top":this[0].offsetTop}
},

};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)