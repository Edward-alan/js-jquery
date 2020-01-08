/**
 * Created by YJJ on 2018/12/19.
 */
/*
//3.正确使用ajax请求数据（10分）
//4.随着页面的滚动导航有个吸顶的效果（10分）。
// 5.点击价格，正确实现价格的排序（10分）
// 6.点击销量，根据给数据中的字段，进行排序（10分）。
// 7.点击仅看有货，根据给数据中的字段，实现正确的排序（10分）
 8.封装倒计时插件（10分）
 9.点击返回顶部，正确实现返回顶部功能（10分）
 10.滑过右侧导航，正确实现动画。（10分）
 *
 */
$.ajax({
    url:"data.json",
    success:function(data){
        render(data);
    }
})

function render(data){
    var str=``;
    data.forEach(function(item,index){
        str=`<li>
        <p><img src="${item.img}" alt=""/></p>
            <b>￥${item.price}</b>
            <p>${item.title}</p>
             <strong>销量${item.sales}</strong>
            </li>`;
        $(".content").append(str);
    })
}
//吸顶：
$(document).on("scroll",function(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
    var heightT=$(".top").innerHeight();
    if(scrollT>heightT)
    {
        $(".nav").addClass("fix");
        $(".content").css("margin-top","30px")
    }
    else
    {
        $(".nav").removeClass("fix");
        $(".content").css("margin-top","0px")
    }
})

//点击价格，正确实现价格的排序
var flag=-1;
$(".price").on("click",function(){
    flag*=-1;
    //1.获取到所有的元素
    var li=$(".content").children();
    //2.转成数组
    var arr=Array.from(li);
    //3.排序：
    arr.sort(function(x,y){
       return $("b",x).html().replace(/[^0-9]/g," ")*flag-$("b",y).html().replace(/[^0-9]/g," ")*flag;
    })
    //4.清空Dom中的元素
    li.remove();
    //5.将排好序的dom放进去
    arr.forEach(function(item,index){
        $(".content").append(item);
    })
})

//点击销量，正确实现排序
$(".sales").on("click",function(){
    flag*=-1
    //1.获取dom元素：
    var li=$(".content li");
    //2.转数组：
    var arr=Array.from(li);
    //3.排重：
    arr.sort(function(x,y){
       return  $("strong", x).html().replace(/[^0-9]/g," ")*
       flag-$("strong", y).html().replace(/[^0-9]/g," ")*flag;
    })
    //4.清除所有的dom：
    li.remove();
    //5.把arr添加到content里：
    arr.forEach(function(item,index){
        $(".content").append(item)
    })
})

//点击仅看有货，把有货的显示出来：
















