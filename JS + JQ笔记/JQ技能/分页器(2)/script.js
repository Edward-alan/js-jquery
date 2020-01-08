/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-11-18 14:42:43 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-19 13:40:29
 */
/**
 * ajax获取
 * 渲染table
 * 渲染分页器
 * 下拉框事件
 * 点击右按钮可以跳转
 */
//ajax获取
$.ajax({
        url: "data/data.json",
        success: function(data) {
            data = JSON.parse(data)
            console.log(data)
            var page = $("#pages").val() * 1;
            console.log(page)

            $(".total b").html(data.length)

            initTable(data, page);
            initPages(data);
            selectChange(data);
            rightClick(data);
            leftClick(data);
        }
    })
    //渲染table
function initTable(data, page){
    $(".notFirst").remove()
    var str = ``;
    data.forEach(function(item, key) {
        console.log(item);
        console.log(key)
        if (key >= page) {
            return false;
        }
        str += `<li class="notFirst">
                    <p>${item.title}</p>
                    <p>${item.classify}</p>
                    <p>${item.time}</p>
                    <p>
                        <button type="button">编辑</button>
                        <button type="button">删除</button>
                    </p>
		        </li>`
    })
    $(".list").append(str)
};
//渲染分页器
function initPages(data) {
    var pages = $("#pages").val() * 1;
    var data = data.length;
    var li = Math.ceil(data / pages);
    var str = ``
    for (i = 0; i < li; i++) {
        str += i == 0 ? `<li class="current">${i + 1}</li>` : `<li>${i+1}</li>`
    }
    $(".pageCode").html(str)
}
//渲染下拉框
function selectChange(data) {
    $("#pages").on("change", function() {
        var page = $("#pages").val() * 1;
        initPages(data);
        initTable(data, page)
    })
};
//点击右按钮
function rightClick(data) {
    $(".right").on("click", function() {
        var current = $(".current").index();
        console.log(current);
        current++;
        var liL = $(".pageCode li").length - 1;
        console.log(liL);
        if (current > liL) {
            current = liL;
            return false;
        }
        var page = $("#pages").val() * 1;
        console.log(page);
        var start = current * page;
        console.log(start);
        var datas = data.slice(0).splice(start, page);
        console.log(initTable(data, page));
        initTable(datas, page)
        $(".pageCode li").eq(current).addClass("current").siblings().removeClass("current")
    })
}
//点击左按钮
function leftClick(data) {
    $(".left").on("click", function() {
        var current = $(".current").index();
        current--;
        var page = $("#pages").val() * 1;
        var start = current * page;
        var datas = data.slice(0).splice(start, page);
        initTable(datas, page);
        $(".pageCode li").eq(current).addClass("current").siblings().removeClass("current")
    })
}