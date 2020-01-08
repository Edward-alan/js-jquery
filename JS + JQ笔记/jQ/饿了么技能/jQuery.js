(function(window){
	var jQuery = function(selector,countext){
		return new jQuery.prototype.init(selector,countext)
	}
jQuery.prototype ={
	constructor:jQuery,
	init:function(selector,countext){
		var that = this;
		this.lenght = 0;
		countext = countext||document;
        countext = countext.nodeType?countext:countext[0];
        if(!selector){
            return this;
        }
         if(typeof selector ==="string"){
        if(selector[0] === "<" && selector.length >=3 && selector[selector.length -1] ===">"){
            var oDiv = document.createElement("div")
            oDiv.innerHTML = selector
            this[0] = oDiv.firstChild || oDiv.firstElementChild;
            this.length = 1
        }else if(selector[0] === "#" && this.strNum(selector,' ') === 0 && this.strNum(selector,"#") === 1){
            var dom = document.getElementById(selector.split(1))
            if(dom){
                this[0] = dom;
                this.length = 1;
            }
        }else{
            var ele = document.querySelectorAll(selector)
            for(var i=0;i<ele.length;i++){
                this.push(ele[i])
            }
        }
    }else if(selector.nodeType){
        this[0] = selector;
        this.length = 1;
    }else if(selector instanceof jQuery){
        return selector
    }else{
        return this;
    }
    },
    strNum:function(str,chang){
    	var coun = 0;
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
    		item.appendChild(child.cloneNode(true))
    	})
    },
    prepend:function(childNode){
		var child = jQuery(childNode)
		this.each(function(index,item){
			item.insertBefore(child.cloneNode(true),item.firstChild)
		})
    },
    addClass:function(cName){
    	var that = this
    	cName = cName.split(" ")
    	cName.forEach(function(item,index){
    		that.each(function(k,v){
    			v.classList.add(item)
    		})
    	})
    	return this;
    },
    index:function(){
    var that=this;
    var i;
    var child=Array.from(this[0].parentNode.children);
    child.forEach(function(item,index){
        if(item==that[0]){
            i=index;
        }
    });
    return i;
},
    siblings:function(){
    var that=this;
    var child=Array.from(this[0].parentNode.children);
    var el=jQuery();
    child.forEach(function(item,index){
        if(item!=that[0]){
            el.push(item);
        }
    });
    return el;
},
offset:function(){
    var l=this[0].offsetLeft;//µ±Ç°ÔªËØ¾àÀë¶¨Î»¸¸ÔªËØµÄ¾àÀë
    var t=this[0].offsetTop;//µ±Ç°ÔªËØ¾àÀë¶¨Î»¸¸ÔªËØµÄ¾àÀë
    var p=this[0].offsetParent;//ÕÒµ½¶¨Î»¸¸ÔªËØ
    while(p){//Ò»Ö±ÕÒµ½body£¬bodyµÄoffsetParentÊÇnull;
    l=l+ p.offsetLeft+ p.clientLeft;
    t=t+ p.offsetTop+ p.clientTop;
    p= p.offsetParent;
    }
    return{left:l,top:t};
},
    removeClass:function(cName){
    	var that = this
    	cName = cName.split(" ")
    	cName.forEach(function(item,index){
    		that.each(function(k,v){
    			v.classList.remove(item)
    		})
    	})
    	return this;
    },
remove:function(){
    if(!this.length==0){
        return  this;
    }
    var parent=this[0].parentNode;
    this.each(function(index,item){
        parent.removeChild(item);
    });
    return this;
},
    html:function(count){
    	if(count || typeof count === "string"){
    		this.each(function(index,item){
    			item.innerHTML = count
    		})
    		return this
    	}else{
    		return this[0].innerHTML;
    	}
    },
    value:function(count){
    	if(count || typeof count === "string"){
    		this.each(function(index,item){
    			item.value = count
    		})
    		return this;
    	}else{
    		return this[0].value
    	}
    },
    css:function(pName,pValue){
    if(arguments.length==2){
        this.each(function(index,item){
            item.style[pName]=pValue;
        })
        return this;
    }else if(arguments.length==1){
        if(typeof pName=="string"){
           return getComputedStyle(this[0])[pName];
        }else{ 
            if(typeof pName=="object"){
                for(var i in pName){
                    this.each(function(index,item){
                        item.style[i]=pName[i];
                    })
                }
            }
            return this;
        }
    }
},
    show:function(){
    	this.each(function(index,item){
    		item.style.display = "block"
    	})
    },
    hide:function(){
    	this.each(function(index,item){
    		item.style.display = "none"
    	})
    },
    
    innerWidth:function(){
    	return this[0].clientWidth;
    },
    innerHeight:function(){
    	return this[0].clientHeight;
    },
    on:function(type){
    var that=this;
    var arg1=arguments[1];
    if(arguments.length==2){
        this.each(function(index,item){
            item.addEventListener(type,arg1,false);
        });
    }else if(arguments.length==3&&typeof arguments[1]=="string"){
        var cb=arguments[2];
       var eventDom=$(arguments[1],this[0]);
        eventDom.each(function(index,item){
            item.index=index;
            if(!(typeof item.events=="object")){
                item.events={};
            } if(!(item.events[type] instanceof Array)){
                item.events[type]=[];
            }
           item.events[type].push(cb);
        });
        function rootListener(ev){
            if(ev.target.events){
                ev.target.events[type]&&ev.target.events[type].forEach(function(fn,index){
                    fn.call(ev.target,ev);
                })
            }
        };
        if(!this[0].rootL){
            this[0].addEventListener(type,rootListener,false);
            this[0].rootL=true;
        }
    }
    return this;

},
};
jQuery.extend = function(){
	var target = arguments[0];
	for(var i=0;i<arguments.length;i++){
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
	return arr.join("&")
};
jQuery.ajax = function(obj){
    var ajax = {
        url:"",
        mredod:"get",
        type:"urlencoded",
        async:true,
        data:null,
        success:function(){},
        errer:function(){}
    }
    obj = this.extend(ajax,obj)
    var parms = this.formParms(obj.data)
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new AcitveXObject("Microsoft.XMLHTTP")
    if(obj.mredod === "get" || obj.mredod === "GET"){
        xhr.open("get",obj.url+"?"+parms,obj.async)
        xhr.send(null)
    }else if(obj.mredod === "post" || obj.mredod === "POST"){
        xhr.open("post",obj.url,obj.async)
        if(typeof type ==="urlencoded"){
            xhr.setRequestHeader("Content-type","application/x-www-from-urlencoded")
        }else{
            xhr.setRequestHeader("content-type","application/x-www-from-urlencoded")
        }
        xhr.send(parms)
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            obj.success(JSON.parse(xhr.responseText))
        }else{
            obj.errer()
        }
    }
},
jQuery.prototype.init.prototype = jQuery.prototype;
window.$ = window.jQuery = jQuery;
})(window)