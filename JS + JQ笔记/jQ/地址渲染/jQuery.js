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
		countext = countext.nodeType?countext:countext[0]
		if(!selector){
			return this;
		}
	if(typeof selector === "string"){
		if(selector[0] === "<" && selector.length >=3 && selector[selector.length-1] === ">"){
			var oDiv = document.createElement("div")
			oDiv.innerHTML = selector;
			this[0] = oDiv.firstChild || oDiv.firstElementChild
			this.length = 1
		}else if(selector[0] === "#" && this.strNum(selector," ") === 0 && this.strNum(selector,"#") === 1){
			var dom = document.getElementById(selector.split(1))
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
 			if(str[i]===chang){
 				count++;
 			}
 		}
 		return count
 	},
 	get:function(index){
 		return this[index]
 	},
 	eq:function(index){
 		return jQuery(this.get[index])
 	},
 	push:function(chang){
 		Array.prototype.push.call(this,chang)
 	},
 	each:function(fn){
 		for(var i=0;i<this.length;i++){
 			fn.call(this[i],i,this[i])
 		}
 	},
 	html:function(content){
        if(content||typeof content=="string"){
            this.each(function(index,item){
                item.innerHTML=content;
            })
            return this;
        }else{
            return this[0].innerHTML;
        }
    },
    show:function(){
        this.each(function(index,item){
            item.style.display="block";
        })

    },
    hide:function(){
        this.each(function(index,item){
            item.style.display="none";
        })
    },
     value:function(content){
        if(content ||typeof content=="string"){
            this.each(function(index,item){
                item.value=content;
            });
            return this;
        }else{
            return this[0].value;
        }
    },
 	append:function(childNodes){
 		var child = jQuery(childNodes)[0]
 		this.each(function(index,item){
 			item.appendChild(child.cloneNode(true))
 		})
 	},
 	prepend:function(childNode){
 		var child = jQuery(childNode)
 		this.each(function(index,item){
 			item.insertBefore(child.cloneNode(true),item.firstChild)
 		})
 	},
 	prevAll:function(){
 		var arr = jQuery()
 		var child = jQuery(this)[0].previousElementSibling;
 		while (child) {
 			arr.push(child);
 			child = child.previousElementSibling;
 		}
 		return arr;
 	},
	on:function(type){
		var that = this;
		var age = arguments[1]
		if(arguments.length == 2){
			this.each(function(index,item){
				item.addEventListener(type,age,false);
			})
		}else if(arguments.length == 3 && typeof arguments[1] === "string"){
			var cb = arguments[2];
			var eventdom = jQuery(arguments[1],this[0])
			eventdom.each(function(index,item){
				item.index = index;
				if(!(typeof item.events === "object")){
					item.events = {}
				};
				if(!(item.events[type] instanceof Array)){
					item.events[type] = []
				}
				item.events[type].push(cb)
			})
			function roopand(ev){
				if(ev.target.events){
					ev.target.events[type] && ev.target.events[type].forEach(function(item,index){
						fn.call(ev.target,ev)
					})
				}
			}
			if(!this[0].rootL){
				this[0].addEventListener(type,roopand,false)
				this[0].rootL = true;
			}
		}
		return this;
	},
	off:function(type){
		if(type){
			this.each(function(index,item){
				item.events[type] = null;
			})
		}else{
			this.each(function(index,item){
				item.events = null;
			})
		}
	},
	innerHeight:function(){
		return this[0].clientHeight;
	},

};
jQuery.extend = function(){
	var target = arguments[0];
	for(var i=1;i<arguments.length;i++){
		for(var key in arguments[i]){
			target[key] = arguments[i][key]
		}
	}
	return target;
};
jQuery.formParams = function(data){
	var arr = [];
	for(var key in data){
		arr.push(key+"="+data[key]);
	}
	return arr.join("&")
};
jQuery.ajax = function(obj){
	var ajax = {
		url:"",
		margn:"get",
		async:true,
		type:"urlencoded",
		data:null,
		sccess:function(){},
		error:function(){}
	}
	obj=this.extend(ajax,obj);
    var elest=this.formParams(obj.data);
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():ActiveXObject("Microsoft.XMLHTTP")
   	if(obj.margn === "get" || obj.margn ==="GET"){
   		xhr.open("get",obj.url+"?"+elest,obj.async)
   		xhr.send(null)
   	}else if(obj.margn ==="post" || obj.margn === "POST"){
   		xhr.open('post',obj.url,obj.async)
   		if(obj.type === "urlencoded"){
   			xhr.setRequestHeader("Content-type","application/x-www-from-urlencoded")
   		}else{
   			xhr.setRequestHeader("Content-type","application/json")
   		}
   		xhr.send(elest)
   	}
   	xhr.onreadystatechange = function(){
   		if(xhr.readyState === 4 && xhr.status === 200){
   			obj.sccess(JSON.parse(xhr.responseText))
   		}else{
   			obj.error()
   		}
   	}
};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)