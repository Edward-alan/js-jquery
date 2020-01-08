(function(window){
    var jQuery=function(selector,context){
        return new jQuery.fn.init(selector,context);
    };
    jQuery.fn=jQuery.prototype={
        constructor:jQuery,
        //1.init方法
        init:function(selector,context) {
            var that=this;
            this.length=0;
            //context:范围;//context是否是dom节点,不是也没关系,[0]转一下就好了
            context=context||document;
            context=context.nodeType?context:context[0];
            //selector是空
            if(!selector){return this;}
            //selector是不是字符串
            if(typeof selector=="string"){
                //是不是html标签
                if(selector[0]==="<"&&selector.length>=3&&selector[selector.length-1]===">") {
                    var oDiv=document.createElement("div");
                    oDiv.innerHTML=selector;
                    this[0]=oDiv.firstChild||oDiv.firstElementChild;
                    this.length=1;
                }
                //是不是id名
               else if(selector[0]==="#"&&this.strNum(selector,"#")===1&&this.strNum(selector," ")===0) {
                    var dom=document.getElementById(selector.slice(1));
                    if(dom)
                    {
                        this[0]=dom;
                        this.length=1;
                    }
                }
                //是不是class/类名
                else
                {
                    var eles=context.querySelectorAll(selector)
                    {
                        for(var i=0;i<eles.length;i++)
                        {
                            this.push(eles[i])
                        }
                    }
                }
            }
            //是不是dom
            else if(selector.nodeType) {
                this[0]=selector;
                this.length=1;
            }
            //是不是jQuery
            else if(selector instanceof jQuery){
                return selector
            }
            //其他的
            else{ return this;  }
        },
       //2.一个字符串char在一个字符串str里出现的次数
        strNum:function(str,char){
            var count=0
            for(var i=0;i<str.length;i++)
            {
                if(str[i]==char)
                {
                    count++
                }
            }
            return count;
        },
        //3.利用数组的push方法，向一个对象里添加内容
        push:function(contents){
            Array.prototype.push.call(this,contents);
            return this;
        },
       //4.通过下标找到jQuery 里的dom元素；
        get:function(index){
            return this[index];
        },
       //5.index通过下标找到jQuery的某个对象；
        eq:function(index) {
           return jQuery(this.get(index))
        },
       //6.遍历jQuery对象 fn调用的必须是fn里的item、
        each:function(fn){
            for(var i=0;i<this.length;i++)
            {
                fn.call(this[i],i,this[i]);
            }
        },
       //7.向父元素的后面添加一个新的元素
        append:function(childNode){
            var child=$(childNode)[0];
            this.each(function(index,item){
                //index:下标；item，每一项dom元素；
                item.appendChild(child.cloneNode(true));

            })
            return this;
        },
        //8.向父元素的最前面添加一个新的元素
        prepend:function(childNode){
            var child=jQuery(childNode)[0];
            this.each(function(index,item){
                item.insertBefore(child.cloneNode(true),item.firstChild)
                //父元素.insertBefore(要添加的元素，指定元素前面；)
            })
            return this;
        },
        //9.把匹配元素前置在父元素前面；
        prependTo:function(parent) {
            var that=this;
            var parent=jQuery(parent);
           //.insertBefore(child.cloneNode(true),item.firstChild);
            parent.each(function(index,item){
               item.insertBefore(that[0].cloneNode(true),item.firstChild)
                //父元素.insertBefore(要添加的元素，指定元素前面；)
            })
            return this;
        },
       //10.把匹配元素后置在父元素前面；
        appendTo:function(parent){
            var that=this;
            var parent=jQuery(parent);
            parent.each(function(index,item){
                item.appendChild(that[0].cloneNode(true))
            })
            return this;
        },
        //11.添加类名
        addClass:function(cName) {
            var that=this;
            cName=cName.split(" ");//  "active,hover"转化成["active”，“hover"]
            cName.forEach(function(item,index){
                that.each(function(k,v){
                    v.classList.add(item)
                })
            })
            return this;
        },
       //12.删除类名
        removeClass:function(cName) {
            var that=this;
            cName=cName.split(" ");
           cName.forEach(function(item,index){
               that.each(function(k,v){
                   v.classList.remove(item);
               })
           })
            return this;
        },
        //13.判断有没有某个类名
        hasClass:function(cName){
            if(this[0].className.indexOf(cName)>-1)
            {
                return true;
            }
            return false;
        },
        //14.绑定事件：
        on:function(type) {
            var that=this;
            var arg1=arguments[1];//  "click"后面的函数function(){};
           //判断是直接绑定还是事件委托：根据参数的长度判断：
            if (arguments.length==2)
            {
                //可能有多个绑定事件，对每个点击事件进行遍历；
                this.each(function(index,item){
                    item[type]=arg1
                    item.addEventListener(type,item[type],false)
                })
            }
            else if(typeof arguments[1]==="string"&&arguments.length===3)
            {
                //获取回调函数
                var cb=arguments[2];
                //获取dom元素(有多个li)：init的方法：(selector,context)==(".item",ul范围内)
                var eventDom=$(arguments[1],this[0]);
                /*每个li都添加一个events属性，这个events属性是一个对象，里面能存放很多事件，比如click.mousemove....
                 但是由于每个事件可能绑定多个click事件，
                 所以events里面的属性必须是一个数组:click:[fn1,fn2,fn3.....],
                 即：每一li里都添加一个events[type],里面存放回调函数
                 */
                eventDom.each(function(index,item){
                    if(!(typeof item.events==="object"))
                    {
                        item.events={};
                    }
                    if(!(item.events[type] instanceof Array))
                    {
                            item.events[type]=[];
                    }
                    item.events[type].push(cb);
                });
                function rootListener(ev){
                //想要执行（点击的item)里面绑定的fn函数；
                //首先我们找到fn函数，我们找不到fn函数；
                //但是我们有事件源，（item元素），设置fn和item之间的联系，给item增加属性，属性里面是fn函数
                    if(ev.target.events){
                        ev.target.events[type]&&ev.target.events[type].forEach(function(fn,index){
                            fn.call(ev.target,ev);
                        })
                    }
                };
            //重复绑定this[0].root是随便设置的属性，本身没有是false，
                if(!(this[0].root==type))
                {
                    this[0].addEventListener(type,rootListener,false);
                    this[0].root=type;
                }
            }
        },
        //15.移除绑定事件：
        off:function(type) {
            //移除某个事件
            if(type)
            {
               this.each(function(index,item){
                   if(item.events)
                   {
                       item.events[type]=null;
                   }
                   else
                   {
                       item.removeEventListener(type,item[type],false)
                   }

               })
            }
            //没有写时，移除所有的事件
            else
            {
                this.each(function(index,item){
                    item.events=null;
                })
            }
        },
        //16.设置、获取HTML的内容：
        html:function(content) {
            /*如果有内容，则是设置，这个设置是替换的意思，原来的内容被新的内容替换掉,
            如果什么都没有，则是获取内容*/
            if(content||typeof content==="string")
            {
                this.each(function(index,item){
                    item.innerHTML=content;
                })
                return this;
            }
            else
            {
                return this[0].innerHTML;
            }
        },
        //17.设置，获取input的内容：
        value:function(content) {
            if(content||typeof content=="string")
            {
                this.each(function(index,item){
                    item.value=content;
                })
                return this;
            }
            else
            {
                return this[0].value;
            }
        },
        //18.设置、获取样式 pName:属性名称；pValue:属性值
        css:function(pName,pValue) {
            /*如果只有一个参数，就是获取属性，如果两个参数，一个是属性，一个是属性值
            如果两者都不是，判断是不是一个对象，如果是对象*/
          if(arguments.length==2)
            {
                this.each(function(index,item){
                item.style[pName]=pValue;
                })
                return this;
            }
            else if(arguments.length==1&&typeof pName=="string")
            {
              return  getComputedStyle(this[0])[pName];
            }
            else
            {
                if(typeof pName==="object")
                {
                    for(var i in pName)
                    {
                        this.each(function(index,item){
                            item.style[i]=pName[i]
                        })
                    }
                }
                return this;
            }

        },
        //19.获取某个元素的索引：
        index:function() {
            /*先获取这个元素的所有兄弟元素
            遍历所有的兄弟元素，如果是要找的这个元素，获取下标，返回下标*/
            var that=this;
            var child=Array.from(this[0].parentNode.children);
            var i;
            child.forEach(function(item,index){
                if(item==that[0])
                {
                    i=index;
                }
            })
            return i;
        },
        //20.找除了本身以外的元素
        siblings:function(){
            var that=this;
            var child=Array.from(this[0].parentNode.children);
            var el=jQuery();
            child.forEach(function(item,index){
                if(item!=that[0])
                {
                    el.push(item);
                }
            })
            return  el;
        },
        //21.找到当前元素的父元素，
        parent:function(){
            return jQuery(this[0].parentNode);//当前元素是个jQuery对象，那么找到的父元素也是，
        },
        //22.找的当前元素的父元素，以及父元素的父元素，一直找下去直到document;想取哪个父元素，就传哪个string
        parents:function(string){
            var that=this[0];//取到当前元素的dom值
            var el=jQuery()//由于父元素是多个，所以存起来，但是不知道到底有多少个父元素用while循环
            while (that.parentNode)
            {
                that=that.parentNode;
                if(that.nodeType!=9)//排除document
                {
                    el.push(that);
                }
            }
        //如果想获取某个父元素，进行判断看传入的 string与el里的哪个父元素相等，把相等的拿出来；
            var target=jQuery(string)//由于string是个字符串，先转成jQuery对象，再targat[0]取到dom
            if(typeof string=="string")//如果是字符串，则进行判断
            {
                el.each(function(index,item){
                    if(item.tagName=target[0].tagName)
                    {
                        el=jQuery(item)
                    }
                 })
            }
            return el;
        },
        //23.找到当前元素的所有子元素，想要哪个就传哪个的参数；
        children:function(string){
            var that=this;
            var el=jQuery();
            var els=jQuery();
            that.each(function(index,item)
            {
                while(item.children)
                {
                    item=Array.from(item.children);
                    item.forEach(function(v,k)
                    {
                      if(item.tagName!="SCRIPT")
                      {
                          el.push(v);
                      }
                    })
                }
            })
            if(typeof string=="string")
            {
                el.each(function(index,item)
                {
                    if(jQuery(string)[0]==item)
                    {
                        els.push(item);
                    }
                })
                el=els;
            }
            return el;
        },
        //24.显示
        show:function(){
            this.each(function(index,item){
                item.style.display="block";
            })
            return this;
        },
        //25.隐藏：
        hide:function(){
            this.each(function(index,item){
                item.style.display="none";
            })
            return this;
        },
        //26.如果隐藏则显示，如果显示则隐藏
        toggle:function(){
            this.each(function(index,item){
                var oStyle=getComputedStyle(item).display;
                item.style.display=oStyle=="block"?"none":"block";
            })
        },
        //27.获取width+padding也就是clientWidth,
        innerWidth:function(){
           return  this[0].clientWidth
        },
        //28.获取Height+padding也就是clientHeight;
        innerHeight:function(){
            return this[0].clientHeight;
        },
        //29.获取width+padding+border+margin，Margin是传参数时再加
        outerWidth:function(deep){
            //先获取margin;   getComputedStyle只能获取，不能修改
            var l=parseFloat(getComputedStyle(this[0]).marginLeft);
            var r=parseFloat(getComputedStyle(this[0]).marginRight);
            deep=deep?l+r:0;
            return this[0].offsetWidth+deep;
        },
        //30.获取Height+padding+border+margin，Margin是传参数时再加
        outerHeight:function(deep){
            var t=parseFloat(getComputedStyle(this[0]).marginTop);
            var b=parseFloat(getComputedStyle(this[0]).marginBottom);
            deep=deep?t+b:0;
            return this[0].offsetHeight+deep;
        },
        //31.当前元素的上一个兄弟元素
        prev:function(){
           return  jQuery(this[0].previousElementSibling)
        },
        //32.当前元素的下一个兄弟元素
        next:function() {
            return jQuery(this[0].nextElementSibling)
        },
        //33.获取上面所有的兄弟元素
        prevAll:function() {
            var p=this[0].previousElementSibling;
            var el=jQuery();//用来存放获取到的上面的每一个兄弟元素
            while(p)
            {
                el.push(p)
                p= p.previousElementSibling;
            }
            return el;
        },
        //34.获取下面所有的兄弟元素
        nextAll:function(){
            var p=this[0].nextElementSibling;
            var el=jQuery();
            while(p)
            {
                el.push(p);
                p= p.nextElementSibling
            }
            return el;
        },
        //35.通过改变高度隐藏让隐藏有动画效果
        slideUp:function(time) {
            //如果传参数了，就是传的参数，如果没传参，就是默认的400
            time=time||400;
            //判断传入的可能是字符串，fast(200),slow(600),
            if(typeof time=="string")
            {
                time=time=="fast"?200:time=="slow"?600:400;
            }
            this.each(function(index,item){
                //让ul的高度跟随隐藏
                item.style.overflow="hidden";
                //获取元素的高度；
                var totalH=item.offsetHeight;
                //赋值给变量；
                var currentH=totalH;
                //减的差值（步长）  总距离/总时间*13毫秒=步长
                var step=totalH/time*13;
                var timer=setInterval(function(){
                    currentH-=step;//每隔13秒，减一部分高度；
                    item.style.height=currentH+"px";
                    if(currentH<=0)
                    {
                        clearInterval(timer);
                        timer=null;
                        item.style.display="none";
                        item.style.height=totalH+"px";
                    }
                },13);
            })
            return this;
        },
        //36.通过增加高度，让其缓慢显示，让显示有动画效果
        slideDown:function(time) {
            //如果传参数了，就是传的参数，如果没传参，就是默认的400
            time=time||400;
            //判断传入的可能是字符串，fast(200),slow(600),
            if(typeof time=="string")
            {
                time=time=="fast"?200:time=="slow"?600:400;
            }
            this.each(function(index,item){
                item.style.display="block";
                //获取元素的高度；
                var totalH=item.offsetHeight;
                //变量开始是0；
                var currentH=0;
                //减的差值（步长）
                var step=totalH/time*13;
                var timer=setInterval(function(){
                    currentH+=step;
                    item.style.height=currentH+"px";
                    if(currentH>=totalH)
                    {
                        clearInterval(timer);
                        timer=null;
                        item.style.display="block";
                        item.style.height=totalH+"px";
                    }
                },13);
            })
            return this;
        },
        //37.通过改变高度。如果显示则隐藏，如果隐藏就显示；
        slideToggle:function(time) {
           this.each(function(index,item){
               var dis=getComputedStyle(item).display;
               if(dis=="none")
               {
                   $(item).slideDown(time);
               }
               else
               {
                   $(item).slideUp(time)
               }
           })
            return this;
        },
        //38.移除某个元素，先获取某元素的父元素，通过父元素的removeChild属性移除元素
        remove:function(){
            if(!this.length)
            {
                return this;
            }
            var parent=this[0].parentNode;
            this.each(function(index,item){
                parent.removeChild(item);
            })
            return this;
        },
        //39.寻找所有的后代元素,孩子，以及孩子的孩子,返回的是string
        find:function(){
            var that=this[0];//获取dom元素；
            var el=jQuery();//用来盛取到的后代；
            function addChild(parent)
            {
                if(parent.children.length)
                {
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
        //40.-----自定义属性------两个参数设置，一个参数获取-----
        attr:function(pName,pValue) {
            if(pValue)
            {
                this.each(function(index,item){
                    item.setAttribute(pName,pValue)  //设置属性
                })
                return this;
            }
            else
            {
               return this[0].getAttribute(pName); //获取属性
            }
        },
        //41.设置、获取固有属性，获取的数据类型是布尔值
        prop:function(pName,pValue) {
            if(arguments.length==2)
            {
                this.each(function(index,item){
                    item[pName]=pValue
                })
                return this
            }
            else
            {
                return this[0][pName];
            }
        },
        //42.当前元素距离页面的绝对偏移
        offset:function() {
            var l=this[0].offsetLeft;       //当前元素距离定位父元素左边的距离
            var t=this[0].offsetTop;       //当前元素距离定位父元素上面的距离
            var p=this[0].offsetParent;   //找到定位父元素
            while(p)
            {
                l+= p.offsetLeft+ p.clientLeft;
                t+= p.offsetTop+ p.clientTop;
                p= p.offsetParent;//找到父元素的父元素
            }
            return {left:l,top:t}
        },
        //43.当前元素距离它最近的父元素的距离
        position:function(){
            return {"left":this[0].offsetLeft,"top":this[0].offsetTop}
        },
//做动画的方法：只能设置数字
        //44:获取css样式
        getCss:function(attr){
            if(typeof getComputedStyle=="function")
            {
                return parseFloat(getComputedStyle(this[0],null)[attr]);
            }
            else
            {
                return parseFloat(this[0].currentStyle[attr]);
            }
        },
        //45:设置css样式：
        setCss:function(ele,attr,val){
            switch (attr)
            {
                case "top":
                case "left":
                case "height":
                case  "width":
                    ele.style[attr]=val+"px";
                    break;
                case "float":
                    ele.style.cssFloat=val+"px";
                    ele.style.styleFloat=val+"px";
                    break;
                default:
                    ele.style[attr]=val;
            }
        },
        //46:设置animate动画样式:三个参数：终值样式，时间，回调函数；
        animate:function(obj,duration,fn){
            var that=this;
            var oBegin={};   //初始样式集合
            var oChange={};  //终止样式集合
            var flag=0;
            for(var attr in obj)  //遍历obj，得到每一个终止样式；
            {
                var target=obj[attr];  //每一个终止样式的值
                var begin=that.getCss(attr);  //每一个初始样式的值；
                var change=target-begin; //终止样式-初始样式：
                if(change)   //如果有差值，
                {
                    oBegin[attr]=begin;
                    oChange[attr]=change;
                    flag++
                }
            }
            if(flag==0) {return this};
            var interval=13;
            clearInterval(that[0].timer);
            that[0].timer=null;
            var time=0;
            function step()
            {
                time+=interval;
                if(time>=duration)
                {
                    for(var attr in obj)
                    {
                        that.setCss(that[0],attr,obj[attr]);
                    }
                    clearInterval(that[0].timer);
                    that[0].timer=null;
                    if(fn)
                    {
                        fn.call(that[0]);
                    }
                }
                else
                {
                   for(var attr in obj)
                   {
                       var begin=oBegin[attr];
                       var change=oChange[attr];
                       //var val=已经走的时间/总时间*总距离（已经走了多少距离）
                       var val=time/duration*change+begin;
                       that.setCss(that[0],attr,val);
                   }
                }
            }
        this[0].timer=setInterval(step,interval)
        }
    };
    //47.ajax
    jQuery.ajax=function(options){
        //默认参数：初始值
        var ajax={
            url:"",              //请求地址；
            method:"get",       //请求方式
            async:true,         //是否异步；
            type:"urlencoded",     //请求类型表单类型
            data:"",               //发送数据
            success:function(){},
            error:function(){}
        };
        //对对象的扩展，传入的options,与初始值ajax进行整合覆盖，
           // 新的数据存在options中
        options=this.extend(ajax,options);
        //转成字符串：
        var params=this.formParams(options.data);
        //第一步：建立xhr对象，初始化，readyState==0;
        var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
        //第二步：建立连接
        //第三步：发送数据：
        if(options.method.toLowerCase()=="get")
        {
            xhr.open("get",options.url+"?"+params,options.async);
            xhr.send(null);
        }
        else if(options.method.toLowerCase()=="post")
        {
            xhr.open("post",options.url,options.async);
            if(options.type=="urlencoded")
            {
                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            }
            else
            {
                xhr.setRequestHeader("content-type","application/json")
            }
            xhr.send(params)
        }
        //第四步：获取数据：
        xhr.onreadystatechange=function()
        {
            if(xhr.readyState==4&&xhr.status==200)
            {
                options.success(JSON.parse(xhr.responseText))
            }
            else
            {
                options.error();
            }
        }
    };
    //48:extend:对对象的扩展,后面的对象值，把前面的给覆盖掉
    jQuery.extend=function(){       //传入的参数是对象；
        for(var i=0;i<arguments.length;i++)//遍历每个对象
        {
            for(var key in arguments[i])//遍历当前对象，得到每一个属性 key:name:"",age:"";
            {
                arguments[0][key]=arguments[i][key]  //每一个属性添加属性值
            }
        }
        return arguments[0]
    };
    //49：formParams:将对象转化成字符串：先转成数组，再转成字符串：
    jQuery.formParams=function(data){
        var arr=[];
        for(var key in data)
        {
            arr.push(key+"="+data[key]);
            console.log(data[key]);
        }
        return arr.join("&")
    };
    //50：jsonp:
    jQuery.jsonp=function(options){
        var def={
            uel:"",    //请求地址
            data:null,  //发送的数据
            success:function(){},    //成功的回调
            callback:"callback"     //跟后端约定的回调函数的名字
        };
        var data=+new Date();     //产生时间戳，不重复进行区别
        var options= $.extend(def,options);   //扩展对象
        var params= $.formParams(options.data);   //对象转成字符串
        /*动态创建script标签，给script标签赋值一个src地址，就可以获取跨域的数据；
        （script只能请求js,需要起个名字，格式：XXXX（里面放json）*/
        var script=document.createElement("script")
        script.src=options.url+(/\?/.test(options.url)?"&":"?")+params+"&"+options.callback+"=jsonp"+data;
        //获取所有的script标签
        var scr=document.getElementsByTagName("script")[0];
        //把游离script添加到所有dom中script的最前面；
        scr.parentNode.insertBefore(script,scr);
        //接受返回的函数中的json;
        window["jsonp"+date]=function(res){
            options.success(res);
            script.parentNode.removeChild(script);
        }
    }

//init的原型指向jQuery原型；
   jQuery.prototype.init.prototype=jQuery.prototype;
    window.$=window.jQuery=jQuery;
})(window);