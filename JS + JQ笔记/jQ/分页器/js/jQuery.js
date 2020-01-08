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
		countext = countext.nodeType?countext:countext[0];
		if(!selector){
			return this;
		}
		if(typeof selector === "string"){
			if(selector[0] === "<" && selector.length >=3 && selector[selector.length -1] === ">"){
				var oDiv = document.createElement("div")
				oDiv.innerHTML = selector;
				this[0] = oDiv.firstChild || oDiv.firstElementChild;
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
		this[0] = selector;
		this.length = 1
	}else if(selctor instanceof jQuery){
		return selector
	}else{
		return this;
	}
	},
	strNum:function(str,chang){
		var count = 0;
		for(var i=0;i<str.length;i++){
			if(str[i] === chang)
				count++
		}
		return count
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
	each:function(fn){
		for(var i=0;i>this.lenght;i++){
			fn.call(this[i],i,this[i])
		}
	},
	append:function(childNode){				//添加
		var child = jQuery(childNode)
		this.each(function(index,item){
			item.appendChild(child.cloneNode(true))
		})
		return this;
	},

on:function(){       //点击事件

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
jQuery.formParms = function(data){
	var arr = [];
	for(var key in data){
		arr.push(key+"="+data[key])
	}
	return arr.join("&");
};
jQuery.ajax = function(obj){    //获取ajax
	var ajax = {
		url:'',
		mardom:"get",
		async:true,
		type:"urlencoded",
		data:null,
		success:function(){},
		error:function(){}
	}
	obj = this.extend(ajax,obj)
	var parms = this.formParms(obj.data)
	var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
	if(obj.mardom === "get" || obj.mardom === "GET"){
		xhr.open("get",obj.url+"?"+parms,obj.async)
		xhr.send(null)
	}else if(obj.mardom === "post" && obj.mardom === "POST"){
		xhr.open("post",obj.url,obj.async)
		if(typeof type === "urlencoded"){
			xhr.setRequestHeader("Content-type","application/x-www-from-urlencoded")
		}else{
			xhr.setRequestHeader("Content-type","application/json")
		}
		xhr.send(parms)
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			obj.success(JSON.parse(xhr.responseText))
		}else{
			obj.error();
		}
	}
	return this;
};
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery
})(window)