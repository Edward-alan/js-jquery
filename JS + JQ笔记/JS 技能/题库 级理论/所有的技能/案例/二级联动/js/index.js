
var brandId = document.getElementById("s_brand_id");//显示品牌的地方
var selects = document.querySelectorAll(".analog-select-text");//两个下拉框
var selectsContents = document.querySelectorAll(".analog-select-con");//两个下拉框的内容
init();
bindEvent();

function bindEvent(){
    selects[0].onclick = function(e){
        var ev = e || event;
        //阻止冒泡
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancelBubble = true;
        }
        selectsContents[0].style.display = "block";
    }
    document.onclick = function(){
        selectsContents[0].style.display = "none";
    }
}

/**
 * 初始化数据，给第一个下拉框添加数据
 */
function init(){
    for(var i in data){
        //添加标题
        var h4 = document.createElement("h4");
        h4.innerHTML = i;
        brandId.appendChild(h4);
        //添加具体的品牌
        var ul = document.createElement("ul");
        for(var j=0;j<data[i].length;j++){
            var li = document.createElement("li");
            li.innerHTML = data[i][j].brand;
            ul.appendChild(li);
        }
        brandId.appendChild(ul);
    }
}