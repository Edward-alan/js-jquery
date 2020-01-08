/**
 * @param obj {tabId:"",contentsId:""}
 * @constructor
 */
function Tab(obj){
    this.titles = document.getElementById(obj.tabId);
    this.contents = document.getElementById(obj.contentsId);
    this.data = obj.data;//通过Ajax传递过来的数据
    this.currentIndex = 0;//当前选中的选项卡
    this.init();
}
Tab.prototype = {
    constructor:Tab,
    init:function(){
        this.renderHTML();
        this.bindEvent();
    },
    renderHTML:function(){
        var that = this;
        this.data.forEach(function(item,index){
            var span = document.createElement("span");
            span.innerHTML = item.title;
            console.log(span)
            span.setAttribute("index",index);
            var div = document.createElement("div");
            div.innerHTML=item.contents;
            that.titles.appendChild(span);
            that.contents.appendChild(div);
            //默认显示第一个选项卡
            if(index==0){
                span.className = "active";
                div.style.display = "block";
            }
        })
    },
    /**
     * 绑定事件
     */ 
    bindEvent:function(){
        var that = this;
        this.titles.onclick = function(e){
            var ev = e || window.event;
            var target = ev.target || ev.srcElement;
            if(target.tagName=="SPAN"){
                //清空上一次的样式
                that.titles.children[that.currentIndex].className = "";
                that.contents.children[that.currentIndex].style.display = "none";
                target.className = "active";
                that.currentIndex = target.getAttribute("index");
                that.contents.children[that.currentIndex].style.display = "block";
            }
        }
    }
}