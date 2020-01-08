
(function(){
var jQuery=function(selector,content){
return new jQuery.prototype.init(selector,content);
};
jQuery.prototype={
constructor:jQuery,
init:function(selector,content){
    var that=this;
    this.length=0;
    //ÅÐ¶ÏcontentÊÇ·ñ´æÔÚ
    content=content||document;
    content=content.nodeType?content:content[0];
    if(!selector){
        return this;
    }
    if(typeof selector=="string"){
        //ÅÐ¶ÏÊÇ²»ÊÇhtml±êÇ©
       if(selector[0]==="<"&&selector.length>=3&&selector[selector.length-1]==">"){
           var oDiv=document.createElement("div");
           oDiv.innerHTML=selector;
           this[0]=oDiv.firstChild||oDiv.firstElementChild;
           this.length=1;
           //ÅÐ¶ÏÊÇ²»ÊÇid±êÇ©
       }else if(selector[0]==="#" &&this.strNum(selector,"#")===1&&this.strNum(selector," ")===0){
           var dom=document.getElementById(selector.slice(1));
           if(dom){
               this[0]=dom;
               this.length=1;
           }
       }else{
           //»ñÈ¡ÀàÃû
           var eles=document.querySelectorAll(selector);
           for(var i=0;i<eles.length;i++){
               this.push(eles[i]);
           }
       }

    }else if(selector.nodeType){
        this[0]=selector;
        this.length=1;
    }else if(selector instanceof  jQuery){
        return selector;
    }else{
        return this;
    }

},
//²éÕÒ×Ö·û³öÏÖµÄ´ÎÊý
strNum:function(str,char){
    var count=0;
    for(var i=0;i<str.length;i++){
        if(str[i]==char){
            count++;
        }
    }
    count++;

},
/**
 * ÀûÓÃÊý×éµÄ·½·¨Ïò¶ÔÏóÖÐ·ÅÖÃÄÚÈÝ
 * @param content
 */
push:function(content){
    Array.prototype.push.call(this,content);
},


/**
 * ±éÀújquery¶ÔÏó
 * @param fn
 */
each:function(fn){
    for(var i=0;i<this.length;i++){
        fn.call(this[i],i,this[i]);
    }
},
//·µ»ØµÄÊÇdom ÔªËØ
get:function(index){
    return this[index];
},
//Í¨¹ýÏÂ±êÕÒµ½jQuery¶ÔÏó
eq:function(index){
    return jQuery(this.get(index));
},
append:function(childNode){
    var child=$(childNode)[0];
    this.each(function(index,item){
        item.appendChild(child.cloneNode(true));
    })
},
/* $("#ul").appendChild("div");*/

prepend:function(childNode){
    var child=$(childNode)[0];
    this.each(function(index,item){
        item.insertBefore(child.cloneNode(true),item.firstChild);
    })

},
appendTo:function(parent){
    var that=this;
    var parent=jQuery(parent);
    parent.each(function(index,item){
        item.appendChild(that[0].cloneNode(true));
    })

},
    prependTo:function(parent){
        var that=this;
        var parent=jQuery(parent);
        parent.each(function(index,item){
            item.insertBefore(that[0].cloneNode(true),parent[index].firstChild);
        })
},
    addClass:function(cName){
        var that=this;
        cName=cName.split(" ");
        cName.forEach(function(item,index){
        that.each(function(k,v){
            v.classList.add(item);
        });
    });
    return this;
},

/* $("#div").addClass("active  ul");*/

removeClass:function(cName){
    var that=this;
    cName=cName.split(" ");
    cName.forEach(function(item,index){
        that.each(function(k,v){
            v.classList.remove(item);
        })
    })
    return this;

},
//ÅÐ¶ÏÊÇ·ñÓÐÕâ¸öÀàÃû
hasClass:function(cName){
    if(this[0].className.indexOf(cName)>-1){
        return true;
    }else{
        return false;
    }

},
//html »ñÈ¡ºÍÉèÖÃinnerHTMLÄÚÈÝ

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

//»ñÈ¡ÉèÖÃinputµÄvalueÖµ
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

//ÉèÖÃcssÑùÊ½ºÍ»ñÈ¡cssÑùÊ½
css:function(pName,pValue){
    if(arguments.length==2){
        this.each(function(index,item){
            item.style[pName]=pValue;
        })
        return this;
        //Èç¹û´«¹ýÀ´µÄ²ÎÊýÊÇÒ»¸ö
    }else if(arguments.length==1){
        if(typeof pName=="string"){
           return getComputedStyle(this[0])[pName];//»ñÈ¡Öµ
        }else{
            //ÉèÖÃ¶à¸öÑùÊ½
            //ÅÐ¶ÏÈç¹ûÓÐÒ»¸ö²ÎÊý²¢ÇÒ²ÎÊýµÄÀàÐÍÎª¶ÔÏó{"background":"red,"color" :black}
            if(typeof pName=="object"){
                for(var i in pName){//i:background   pName:red;
                    this.each(function(index,item){
                        item.style[i]=pName[i];
                    })
                }
            }
            return this;
        }

    }
},
//»ñÈ¡µ±Ç°ÔªËØµÄÏÂ±ê
index:function(){
    var that=this;
    var i;
   /* var child1=this[0].parentNode.children;//»ñÈ¡µÄÊÇÎ±Êý×é  HTMLCollection(5)?[li.item.aaa, li.item, li.item, li.item, li.item]*/
    var child=Array.from(this[0].parentNode.children);//?×ª»»³É[li.item.aaa, li.item, li.item, li.item, li.item]
    child.forEach(function(item,index){
        if(item==that[0]){
            i=index;
        }
    });
    return i;
},

//»ñÈ¡µ±Ç°³ýÁË±¾ÉíÒÔÍâµÄËùÓÐµÄÐÖµÜÔªËØ
siblings:function(){      //除了本身以外的其他兄弟元素
    var that=this;
    var child=Array.from(this[0].parentNode.children);
    var el=[];
    child.forEach(function(item,index){
        if(item!=that[0]){
            el.push(item);
        }
    });
    return el;
},

//»ñÈ¡µ±Ç°ÔªËØµÄ¸¸ÔªËØ
parent:function(){
    console.log(this[0].parentNode);//»ñÈ¡µ±Ç°ÔªËØµÄ¸¸ÔªËØ
    return jQuery(this[0].parentNode);//°Ñ»ñÈ¡µ½µÄµ±Ç°ÔªËØµÄ¸¸ÔªËØ×ª»»³ÉjQuery¶ÔÏó
},

/*   $(".div")[0].style.background="red";*/


//²éÕÒËùÓÐµÄ¸¸ÔªËØ

parents:function(string){
    var target=jQuery(string);
    var that=this[0];
    var el=jQuery();
    while(that.parentNode){
         that=that.parentNode;
        if(that.nodeType!=9){
            el.push(that);
        }
    }
    if(typeof string=="string"){
        el.each(function(index,item){
            if(item.tagName==target[0].tagName){
               el=jQuery(item);
            }
        })
    }
    return el;
},
/* $(.item).parents(body);*/

//ÕÒµ½ËùÓÐµÄ×ÓÔªËØ
children:function(string){
    var target=jQuery(string);
   var that=this;
    var el=jQuery();
    var els=jQuery();
    this.each(function(index,item){
        while(item.children){
            item=Array.from(item.children);
            item.forEach(function(value,key){
                if(value.tagName!="SCRIPT"){
                    el.push(value);

                }
            })
        }
    });
    if(typeof string=="string"){
        el.each(function(index,item){
            target.each(function(k,y){
               if(item==target[k]){
                   els.push(item);
               }
            })
        })
        el=els;
    }
    return el;
},

/*$(".box").children(".aaa");*/
//ÏÔÊ¾
show:function(){
    this.each(function(index,item){
        item.style.display="block";
    })
},
//Òþ²Ø
hide:function(){
    this.each(function(index,item){
        item.style.display="none";
    })
},
toggle:function(){
    this.each(function(index,item){
        var ostyle=getComputedStyle(item).display;
        item.style.display=ostyle=="block"?"none":"block";
    })
},

//»ñÈ¡ clientWidth  content+padding;
innerWidth:function(){
    return this[0].clientWidth;
},
/* $("#ul").innerWidth();*/
//»ñÈ¡clientHeight  content+padding;
innerHeight:function(){
    return this[0].clientHeight;
},
/**
*  offsetWidth=content+padding+border;
*  outerWidth=offsetWidth+marginleft+marginright;
*/

outerWidth:function(deep){
    var l=parseFloat(getComputedStyle(this[0]).marginLeft);
    var r=parseFloat(getComputedStyle(this[0]).marginRight);
    deep=deep?l+r:"0";
   return this[0].offsetWidth+deep;
},
/**
 * offsetWidth=content+padding+border;
 * outerHeiight:offsetWidth+margintop+marginbottom;
 * @param deep
 * @returns {*}
 */

outerHeight:function(deep){
    var t=parseFloat(getComputedStyle(this[0]).marginTop);
    var b=parseFloat(getComputedStyle(this[0]).marginBottom);
    deep=deep?t+b:"0";
    return this[0].offsetHeight+deep;

},

//ÕÒµ½ÉÏÒ»¸öÐÖµÜ½Úµã
pre:function(){
    return jQuery(this[0].previousElementSibling);

},
//ÕÒµ½ÏÂÒ»¸öÐÖµÜ½Úµã
next:function(){
    return jQuery(this[0].nextElementSibling);
},


//ÕÒµ½ÉÏÃæËùÓÐµÄÐÖµÜ½Úµã
preAll:function(){
    var p=this[0].previousElementSibling;
    var el=jQuery();
    while(p){
        el.push(p);
        p= p.previousElementSibling;
    }
    return el;

},
/*$(".aaa").preAll();*/

//ÕÒµ½ÏÂÃæËùÓÐµÄÐÖµÜ½Úµã
nextAll:function(){
    var p=this[0].nextElementSibling;
    var el=jQuery();
    while(p){
        el.push(p);
        p=p.nextElementSibling;
    }
    return el;

},

/*  $(".aaa").pre();*/
on:function(type){
    var that=this;
    var arg1=arguments[1];
    //Ö±½Ó°ó¶¨
    if(arguments.length==2){
        this.each(function(index,item){
            item.addEventListener(type,arg1,false);
        });

    }else if(arguments.length==3&&typeof arguments[1]=="string"){

        /**
         * 1.ÏÈ¸ø¸¸ÔªËØ°ó¶¨ÊÂ¼þ
         * 2.ÉùÃ÷Ò»¸öº¯Êý
         * 3.»ñÈ¡»Øµ÷º¯Êý
         * 4.»ñÈ¡ul ÀïÃæµÄli
         * 5.Ñ­»·±éÀúli
         */
        //»ñÈ¡»Øµ÷º¯Êý
        var cb=arguments[2];
        //ÔÚulÀïÃæ»ñÈ¡li
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
off:function(type){
    if(type){
        this.each(function(index,item){
            item.events[type]=null;
        })
    }else{
        this.each(function(index,item){
            item.events=null;
        })
    }
},
/* $("ul").slideUp();*/
slideUp:function(time){
    time=time||400;
    if(typeof time=="string"){
       time= time=="slow"?600:time=="fast"?200:400;
    }
    this.each(function(index,item){
        item.style.overflow="hidden";
        var totalH=item.offsetHeight;
        var currentH=totalH;
        var step=currentH/time*13;
        var timer=setInterval(function(){
            currentH=currentH-step;
            item.style.height=currentH+"px";
            if(currentH<=0){
                clearInterval(timer);
                timer=null;
                item.style.display="none";
                item.style.height=totalH+"px";

            }

        },13)
    });
    return this;
},
/*  $("#ul").slideDown();*/
slideDown:function(time){
    time=time||400;
    if(typeof time==="string"){
      time=time=="slow"?600:time=="fast"?200:400;
    }
    this.each(function(index,item){
        item.style.display="block";
            var totalH=item.offsetHeight;
            var currentH=0;
            var step=totalH/time*13;
        var timer=setInterval(function(){
            currentH=currentH+step;
            item.style.height=currentH+"px";
            if(currentH>=totalH){
                clearInterval(timer);
                timer=null;
                item.style.display="block";
                item.style.height=totalH+"px";
            }
        },13)
    })
    return this;
},
/**
 *
 */
/*$("ul").slidetiggle();*/
slideToggle:function(time){
    this.each(function(index,item){
       var dis=getComputedStyle(item).display;
        if(dis=="none"){
            $(item).slideDown(time);
        }else{
            $(item).slideUp(time);
        }

    })
},

/**
 * É¾³ýÔªËØ
 */
/*  $("li").remove();*/
remove:function(){
    if(this.length==0){//
        return  this;
    };
    var parent=this[0].parentNode;
    this.each(function(index,item){
        parent.removeChild(item);
    });
    return this;
},
find:function(){
    var that=this[0];
    var el=jQuery();
    function addChild(parent){
        if(parent.children.length){
            var child=Array.from(parent.children);
            child.forEach(function(item,index){
                el.push(item);
                addChild(item);
            })

        }

    }
    addChild(that);
    return el;
},
//ÉèÖÃ×Ô¶¨ÒåÊôÐÔ  $("ul").setAttribute("self","value")
attr:function(pName,pValue){
    if(pValue){
        this.each(function(index,item){
            item.setAttribute(pName,pValue);

        })
    }else{
        return this[0].getAttribute(pName);
    }

},
//ÉèÖÃ¹ÌÓÐÊôÐÔ
//$("ul").prop("src","img-1")
prop:function(pName,pValue){
    if(arguments.length==2){
        this.each(function(index,item){
            item[pName]=pValue;
        });
        return this;
    }else{
        return this[0][pName];
    }
},
//动画效果
animate: function(obj, duration, fnCallback) {
var that = this;
var oBegin = {};
var oChange = {};
var flag = 0;
for (var attr in obj) {
var target = obj[attr];
var begin = that.getCss(that[0], attr);
var change = target - begin;
if (change) {
    oBegin[attr] = begin;
    oChange[attr] = change;
    flag++;
}
}
if (flag == 0) return this;
var interval = 13;
var times = 0;
clearInterval(that[0].timer);
function step() {
times += interval;
if (times >= duration) {
    for (var attr in obj) {
        var target = obj[attr];
        that.setCss(that[0], attr, target);
    }
    clearInterval(that[0].timer);
    that[0].timer = null;
    if (fnCallback) {
        fnCallback.call(that[0]);

    } else {
        for (var attr in obj) {
            var begin = oBegin[attr];
            var change = oChange[attr];
            var val = times / duration * change + begin;
            that.setCss(that[0], attr, val)
        }
    }
}
}
that[0].timer = setInterval(step, interval)
},
getCss:function(ele,attr,val){
if(typeof getComputedStyle == "function"){
    return parseFloat(getComputedStyle(this[0],null)[attr])
}else{
    return parseFloat(this[0].currentScript[attr])
}
return this
},
setCss:function(ele,attr,val){
    switch(attr){
    case "top":
    case "left":
    case "height":
    case "width":
ele.style[attr] = val+'px';
    break;
    case "float" :
ele.style.cssFloat = val + 'px';
ele.style.cssFloat = val + "px";
    break;
    default:
ele.style[attr] = val
}
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
position:function(){
    return{left:this[0].offsetLeft,top:this[0].offsetTop}
},

};
jQuery.extend=function(){
var target=arguments[0];
for(var i=1;i<arguments.length;i++){
    for(var key in arguments[i]){
        target[key]=arguments[i][key];
    }
}
return target;
};

//ÉýÐòÅÅÐò
jQuery.merge=function(arr){
var tmp=arr.length;
for(var i=0;i<tmp;i++){
    if(arr[i]>arr[i+1]){
        var temp=arr[i];
        arr[i]=arr[i+1];
        arr[i+1]=temp;
    }
    if(i==tmp-1){
        i=-1;
        tmp--;
    }
}
return arr;

};
//½«¶ÔÏó×ª»»³É×Ö·û´®
/* var a1={"name":"ÀîÃ÷","age":"21"};*/
jQuery.formParams=function(data){
var arr=[];
for(var key in data){
    arr.push(key+"="+data[key]);
}
return arr.join("&");
/*   return arr.join("&");*/
};
jQuery.ajax=function(options){
//ÉèÖÃÄ¬ÈÏÖµ
var def={
    url:"",//ÇëÇóµØÖ·
    method:"get",//ÇëÇó·½Ê½
    async:true,//ÊÇ·ñÒì²½£¬Ä¬ÈÏtrueÒì²½
    type:"urlencoded",//ÇëÇóÀàÐÍ
    data:null,//·¢ËÍÊý¾Ý
    success:function(){},//³É¹¦µÄ»Øµ÷
    error:function(){}//Ê§°ÜµÄ»Øµ÷
};
options=this.extend(def,options);
var params=this.formParams(options.data);
//½¨Á¢xhr¶ÔÏó
var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if(options.method.toUpperCase()=="GET"){//GET
    //½¨Á¢Á¬½Ó
    xhr.open(options.method,options.url+"?"+params,options.async);
    //·¢ËÍÊý¾Ý
    xhr.send(null);
}else if(options.method.toLowerCase()=="post"){
    xhr.open(options.method,options.url,options.async);
    if(options.type=="urlencoded"){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    }else{
        xhr.setRequestHeader("content-type","application/json");
    }
    xhr.send(params);
}
xhr.onreadystatechange=function(){
    if(xhr.readyState===4&&xhr.status===200){
        options.success(JSON.parse(xhr.responseText));
    }else{
        options.error();

    }
}
};
jQuery.prototype.init.prototype=jQuery.prototype;
window.$=window.jQuery=jQuery;

})(window)
