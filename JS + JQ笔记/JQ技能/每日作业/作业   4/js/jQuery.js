(function(window){
  var jQuery = function(selector,cou){
    return new jQuery.prototype.init(selector,cou);
  };
jQuery.prototype = {
  constructor:jQuery,
  init:function(selector,cou){
    var then = this;
    this.length = 0;
    cou = cou || document
    cou = cou.nodeType?cou:cou[0]
    if(!selector){
      return this;
    }
  if(typeof selector === 'string'){   //判断selector是不是字符串
    if(selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>'){
      var oDiv = document.createElement('div');
      oDiv.innerHTML = selector;
    this[0] = oDiv.firstChild || oDiv.firstElementChild;
    this.length = 1;
    }else if(selector[0] ==="#" &&this.strNum(selector," ") == 0 && this.strNum(selector,'#')===1){
      var dom = document.getElementById(selector.slice(1));
      if(dom){
        this[0] = dom;
        this.length = 1;
      }
    }else {
      var ele = cou.querySelectorAll(selector);
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
    var content = 0;
    for(var i=0;i<str.length;i++){
      if(str[i] == chang){
        content++;
      }
    }
    return content
  },
  //向DOM节点添加DOM节点
  push:function(chang){  
    Array.prototype.push.call(this,chang)
  },
  //下标把jQuery 转DOM节点
  get:function(index){   
    return this[index];   
  },
  //遍历下标找到jQuery中的对象
  eq:function(index){   
    return jQuery(this.get[index]);
  },
  //遍历jQuery对象
  each:function(fn){   
    for(var i=0;i<this.length;i++){
      fn.call(this[i],i,this[i]);
    }
  },
  //向匹配的元素后面添加方法
  append:function(childNode){  
    var child = $(childNode)[0];
  this.each(function(index,item){
    item.appendChild(child.cloneNode(true))

  })
  return this;
},
 //向匹配的元素内部前置元素    //向前面添加方法
prepend:function(childNode){  
  var chlid = jQuery(childNode)[0];
  this.each(function(index,item){
    item.insertBefore(child.cloneNode(true),item.firstElementChild)
  })

},
 //把匹配的元素前置到另一个元素内部
prependTO:function(parentNode){  
   var then = this;
   var fuq = jQuery(parentNode);
   fuq.each(function(index,init){
    init.insertBefore(then.cloneNode(true),init.firstChild)
   })
},
//把匹配的元素向后追加
appendTo:function(parentNode){  
 var then = this;
 var fuq = jQuery(parentNode);
fuq.each(function(index,item){
  item.appendChild(then[0].cloneNode(true))
 })
 return this;
},
//添加类名
addClass:function(cName){ 
var that = this;
 cName = cName.split(" ");
 cName.forEach(function(init,index){
  that.each(function(k,v){
    v.classList.add(init)
  })
 })
return this;
},
//删除类名
removeClass:function(cName){
var that = this;
cName = cName.split(' ')
cName.forEach(function(item,index){
  rhat.each(function(k,a){
    a.classList.remove(item)
  })
})
return this;
},
// hasClas:function(cName){   //判断是有类名
//  if(this[0]className.indexof(cName)>-1){
//    return true;
//  }
//  return false
// },
on:function(type){
  var that = this;
  if(arguments.length == 2){
    this.each(function(index,item){
      item.addEventListener(type,arg1,false)
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
  if(!this[0].arr){   //判断事件只绑定一次
      this[0].addEventListener(type,rootList,false)
      this[0].arr = true;
  }
}
},
// off:function(type){
//  if(type){
//    this.each(function(index,item){
//      item.events[type] = null;
//    })
//  }else{
//    this.each(function(index,item){
//      item.events = null
//    })
//  }
// },

html:function(content){
  if(content && typeof content === "string"){
    this.each(function(index,item){
      item.innerHTML = content;
    })
    return this
  }else{
    return this[0].innerHTML
  }
},
value:function(content){
  if(typeof content === 'string'){
    return this[0].value = content;
  }else{
    return this[0].value;
  }
},
css:function(pName,pvalue){
  if(arguments.length === 2){
    this.each(function(index,item){
         item.style[pName] = pvalue;
    });
    return this;
  }else if(arguments.length == 1){
    if(typeof pName === 'string'){
      return getComputedStyle(this[0])[pName];
    }else{
      if(typeof pName === 'object'){
        for(var i in pName){
          this.each(function(index,item){
            item.style[i] = pName[i]
          })
        }
      }
      return this;
    }
  }
},
index:function(){   //获取元素索引号
   var that = this;
   var child = Array.from(this[0].parentNode.children)
   var i;
   child.forEach(function(item,index){
      if(item == that[0]){
        i = index
      }
   })
},
siblings:function(){   //找兄弟元素
  var that = this;
  var ele = jQuery()
  var child = Array.from(this[0].parentNode.children);
  child.forEach(function(item,index){
    if(item != that[0]){
      ele.push(item);
    }
  })
  return ele
},
parent:function(){
  return jquery(this[0].parentNode)
},
parents:function(string){
  var target = jQuery(string);
  var that = this[0];
  var ele = jquery();
  while(that.parentNode){
    that = that.parentNode;
    if(that.nodeType != 9){
      ele.push(that);
    }
  }
  if(typeof string === "string"){
    ele.each(function(index,item){
      if(item == target[0]){
        ele = jQuery(item)
      }
    })
  }
},
children:function(string){
  var that = this;
  var ele = jQuery();
  that.each(function(index,item){
    while(item.children){
      item = Array,from(item,children);
      item.forEach(function(indeat,ket){
          if(value.target != 'SCRIPT'){
            el.push(value)
          }
      })
    }
  });
},
show:function(){     //让元素显示出来
  this.each(function(index,item){
    item.style.display = 'block'
  })
},
hide:function(){   //让元素隐藏
  this.each(function(index,item){
    item.style.display = 'none'
  })
},
taggle:function(){     //如果隐藏让元素显示
  this.each(function(index,item){
    var oTage = getComputedStyle(item).display;
    item.style.display = oTage == 'block'?'none':'block'
  })
}, 
innerheigth:function(){
  return  this[0].clientwidth;2
},
innerHeight:function(){
  return this[0].clientHeight;
},
outWidth:function(){   //获取当前的content+padding+border+margin
  var L = parseFloat(getComputedStyle(this[0]).marginLeft);
  var R = parseFloat(getComputedStyle(this[0]).marginRight);
  deep = deep?l+r:0
  return this[0].offsetWidth + deep;
},
outHeight:function(){    //获取当前元素的content+padding+border+margin
  var L = parseFloat(getComputedStyle(this[0]).marginHeight);
  var R = parseFloat(getComputedStyle(this[0]).marginRight);
  deep = deep?l+r:0
  return this[0].offsetWidth + deep;
},
prevAll:function(){    //获取上一个兄弟元素
  var p = this[0].previousEventSibling;
  var ele = jQuery();
  while(p){
    ele.push(p);
    p = p.previousElementSibling;
  }
  return ele
},
nextAll:function(){   //获取下一个兄弟元素
  var p = this[0].nextElementSibling;
  var ele = jQuery();
  while(p){
    ele.push(p)
    p = p.nextElementSibling;
  }
  return ele;
},

};
  jQuery.prototype.init.prototype = jQuery.prototype;
  window.$ = window.jQuery = jQuery;
})(window)




