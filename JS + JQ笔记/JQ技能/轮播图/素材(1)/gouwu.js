/*
 * @Author: 胡瑞杰 
 * @Date: 2018-11-23 16:23:28 
 * @Last Modified by: 胡瑞杰
 * @Last Modified time: 2018-11-23 19:00:38
 */
$.ajax({
    url: "data.json", //地址
    success: function(data) {
        data = JSON.parse(data);
        console.log(data)

        render(data); //渲染调用
        xiding(); //吸顶
        returnTop() //返回顶部
    }
});

//第一个功能模块{渲染数据}
function render(data) { //封装渲染函数，传参
    var str = ``; //定义一个空字符串
    for (var i = 0; i < data.length; i++) { //遍历data数据
        str += ` <dl>
        <img src="${data[i].img}">
        <dt>￥${data[i].price}</dt>
        <p>398</p>
        <dd>${data[i].title}</dd>
    </dl>` //拼接字符串
        $(".main").html(str); //把拼好的字符串放进主体盒子里面{渲染成功}
    }
}

//第二个功能模块{吸顶}
function xiding() {
    $(document).on("scroll", function() { //给页面绑定事件
        var scrollT = $(document).scrollTop(); //获取页面到顶部的距离
        var top = $(".head").innerHeight(); //获取顶部的盒子的高度

        if (scrollT >= top) { //当页面到顶部的距离大于最上面的盒子的高度时候
            $(".list").addClass("fd"); //给list盒子添加固定定位{吸顶}
            $(".main").css("margin-top", "40px"); //给下面的主体盒子设置距离顶部的高度
        } else { //否则
            $(".list").removeClass("fd"); //给list盒子删除固定定位{取消吸顶}
            $(".main").css("margin-top", "0"); //下面主体盒子距离上面盒子的高度取消
        }
    })
}

//第三个功能模块{返回顶部}
function returnTop() {
    $(".fxd").on("mousemove", "button", function() {
        $(this).addClass("active");
    })
    $(".fxd").on("mouseout", "button", function() {
        $(this).removeClass("active");
    })
    $(".fxd").on("click", "button", function() {
        var scrollT = $(document).scrollTop(); //获取页面到顶部的距离
        if (scrollT > 800) {
            $("html body").scrollTop = 0;
        }
    })

    $(".fxd").on("mousemove", "p", function() {
        $(this).addClass("active");
    })
    $(".fxd").on("mousemove", ".img01", function() {
        $(this).addClass("active");
    })
    $(".fxd").on("mouseout", "p", function() {
        $(this).removeClass("active");
    })
    $(".fxd").on("mouseout", ".img01", function() {
        $(this).removeClass("active");
    })
    $(".fxd").on("mouseout", ".img02", function() {
        $(this).removeClass("active");
    })
    $(".fxd").on("mouseout", ".img02", function() {
        $(this).removeClass("active");
    })
}

$(".span1").on("click", function() {
    $(this).addClass("active");
    $(".main").css("display", "block");
})
$(".span2").on("click", function() {
    $(this).addClass("active");
    var price = $(".main dl dt").html();
})
$(".span3").on("click", function() {
    $(this).addClass("active");
    $(".main").css("display", "block");
})
$(".span4").on("click", function() {
    $(this).addClass("active");
    $(".main").css("display", "block");
})

$(".main").on("mouseover", "img", function() {
    var str = ``;

})