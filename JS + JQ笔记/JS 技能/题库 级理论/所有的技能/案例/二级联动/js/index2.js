function Sel(){
    this.brandId = document.getElementById("s_brand_id");//第一个下拉框的内容容器
    this.s_serie_id = document.getElementById("s_serie_id");//第二个下拉框的内容容器
    this.selects = document.querySelectorAll(".analog-select-text");//两个下拉框
    this.selectsContents = document.querySelectorAll(".analog-select-con");//两个下拉框的内容
    this.selCarBtn = document.getElementById("search_serie");//选车按钮
    this.newArr = [];
    this.init();
    this.bindEvent();
    this.clickSel1();
    this.clickSel2();
}
Sel.prototype = {
    constructor:Sel,
    init:function(){
        for(var i in data){
            //添加标题
            var h4 = document.createElement("h4");
            h4.innerHTML = i;
            this.brandId.appendChild(h4);
            //添加具体的品牌
            var ul = document.createElement("ul");
            for(var j=0;j<data[i].length;j++){
                this.newArr.push(data[i][j]);
                var li = document.createElement("li");
                li.setAttribute("data-type",data[i][j].id);
                li.innerHTML = data[i][j].brand;
                ul.appendChild(li);
            }

            this.brandId.appendChild(ul);
        }
        //console.log(JSON.stringify(this.newArr));
    },
    bindEvent:function(){
        var _this = this;//实例
        this.selects[0].onclick = function(e){
            //this   this.selects[0]
            var ev = e || event;
            //阻止冒泡
            if(ev.stopPropagation){
                ev.stopPropagation();
            }else{
                ev.cancelBubble = true;
            }
            _this.selectsContents[0].style.display = "block";
        }
        document.onclick = function(){
            _this.selectsContents[0].style.display = "none";
        }
    },
    clickSel1:function(){
        var _this = this;
        this.brandId.onclick = function(e){
            //this、currentTarget 不一定和target相等
            var ev = e || event;
            var ele = ev.target || ev.srcElement;//触发该事件最具体的元素
            if(ele.tagName=="LI"){
                _this.selects[0].children[0].innerHTML = ele.innerHTML;//第一下拉框显示的内容
                //更新第二个下拉框对应的车系
                _this.renderCX(ele.innerHTML);

            }
        }
    },
    renderCX:function(brand){
        //this.newArr    [{brand:"阿斯顿·马丁"},{brand:"宝马"},{brand:"奥迪"},{},{}]
        var arr=this.newArr.filter(function(item){
              return item.brand == brand;
        });//
        var contents = arr[0].types;
        this.s_serie_id.innerHTML = "";
        var ul = document.createElement("ul");
        for(var i=0;i<contents.length;i++){
            var li = document.createElement("li");
            li.innerHTML = contents[i].name;
            li.setAttribute("data-type",contents[i].value);
            ul.appendChild(li);
        }
        this.s_serie_id.appendChild(ul);

    },
    clickSel2:function(){
        var _this = this;
        this.selects[1].onclick = function(){
            _this.selectsContents[1].style.display = "block";
        }
        _this.selectsContents[1].onclick = function(e){
            var ev = e || event;
            var ele = ev.target || ev.srcElement;
            if(ele.tagName=="LI"){
                _this.selects[1].children[0].innerHTML = ele.innerHTML;
                this.style.display = "none";
            }
        }
    }


}
