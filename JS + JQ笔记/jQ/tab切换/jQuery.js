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
			countext = countext.nodeType ? countext : countext[0];
			if(!selector){
				return this
			}
			if(typeof selector === "string"){
				if(selector[0] === "<" && selector.length >= 3 && selector[selector.length-1] === ">"){
				    var oDiv = document.createElement('div')
					oDiv.innerHTML = selector;
					this[0] = oDiv.firstChild || oDiv.firstElementChild;
					this.length = 1
				}else if(selector[0] === "#" && this.strNum(selector," ") === 0 && this.strNum(selector,'#') === 1){
					var dom = document.getElementById(selector.slice(1))
					if(dom){
						this[0] = dom
						this.length = 1
					}
				}else{
					var ele = document.querySelectorAll(selector);
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
		var count = 0
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
		return jQuery(this.get[index])
	},
	each:function(fn){
		for(var i=0;i<this,length;i++){
			fn.call(this[i],i,this[i])
		}
	},
	append:function(childNode){
		var child = jQuery(childNode)[0];
		this.each(function(index,item){
			item.appendChild(child.cloneNode(true))
		})
		return this;
	},
	prepend:function(childNode){
		var child = jQuery(childNode)[0]
		this.each(function(index,item){
			item.insertBefore(child.cloneNode(true),item.firstElementChild)
		})
		return this;
	},
	index:function(){
        var that=this;
        var child=Array.from(this[0].parentNode.children);
        var i;
        child.forEach(function(item,index){
            if(item==that[0]){
                i=index;
            }
    });
        return i;
	    },
	on:function(type){
		var that = this;
		var age = arguments[1]
		if(arguments.length === 2){
			this.each(function(index,item){
				item[type] = age
				item.removeEventListener(type,item[type],false)
			})
		}else if(typeof arguments[1] === "string" && arguments.length === 3){
			var weq = arguments[2];
			var quert = jQuery(arguments[1],this[0])
			quert.each(function(index,item){
				if(typeof item.events === "object"){
					item.events = {}
				};
				if(item.events[type] instanceof Array){
					item.events[type] = []
				}
				item.events[type] = push(weq)
			})
			function rootLitest(evs){
				if(evs.target.events){
					ev.target.evens[type] && ev.target.evens[type].forEach(function(fn,index){
						fn.call(ev.target,ev)
					})
				}
			}
			if(!this[0].arr){
				this[0].addEventListener(type,rootLitest,false)
				this[0].arr = true;
			}
		}
	},
	off:function(type){
		if(type){
			this.each(function(index,item){
				if(item.events){
					item.events[type] = null;
				}else{
					item.removeEventListener(type,item[type],false)
				}
			})
		}else{
			this.each(function(index,item){
				item.events = null;
			})
		}
	},
	};
	jQuery.extend = function(){
		var target = arguments[0];
		for(var i=1;i<arguments.length;i++){
			for(var key in arguments[i]){
				target[key] = arguments[i][key]
			}
		}
		return target
	},
	jQuery.formParams = function(data){
		var arr = [];
		for(var key in data){
			arr.push(key+"="+data[key])
		}
		return arr.join('&')
	},
	jQuery.ajax = function(obj){
		var ajax = {
			url:"",
			medhod:"get",
			async:"true",
			type:"urlendcoded",
			data:null,
			success:function(){},
			evest:function(){}
		};
		obj = this.extend(ajax,obj)
		var paend = this.formParams(obj.data)
		var xhr = window.XMLHttpRequest?new XMLHttpRequest():ActiveXObject('Microsoft.XMLHTTP')
		if(obj.medhod === "get" || obj.medhod === "GET"){
			xhr.open('get',obj.url+"?"+paend,obj.async)
			xhr.send(null)
		}else if(obj.medhod === "post" || obj.medhod === "POST"){
			xhr.open('post',obj.url,obj.async)
			if(obj.type === 'urlencoded'){
				xhr.setRequestHeader('Content-type','application/x-www-from-urlencoded')
			}else{
			xhr.setRequestHeader('Content-type','application/json')
		}
			xhr.send(paend)	
		}
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				obj.success(JSON.parse(xhr.responseText))
			}else{
				obj.evest()
			}
		}
	};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)