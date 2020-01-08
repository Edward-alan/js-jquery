var ndata;
$.ajax({
    url: "data/data.json",
}).done(function(data) {
    ndata = data;
    var page = $("#pages").val();
    $(".total b").html(data.length);
    inittable(data, page); //渲染table
    initpage(data); //渲染分页
    select(data) //下拉框
    right(); //点击右按钮
    left(); //点击左按钮
    liclick();
    go();
});
//点击左右按钮
function right() {
    $(".right").click(function() {
        var ind = $('.current').index();
        ++ind;
        if (ind >= $(".pageCode li").size()) {
            return false;
        }
        $(".pageCode li").eq(ind).addClass('current').siblings().removeClass("current");
        var page = $("#pages").val();
        var start = ind * page;
        var end = start + page;
        var dataN = ndata.slice(start, end);

        inittable(dataN, page);
    })
}

function left() {
    $(".left").click(function() {
        var ind = $(".current").index();
        --ind;
        if (ind < 0) {
            return false;
        }
        $(".pageCode li").eq(ind).addClass('current').siblings().removeClass("current");
        var page = $("#pages").val();
        var start = ind * page;
        var end = start + page;
        var dataN = ndata.slice(start, end);
        inittable(dataN, page);
    })
}

function liclick() {
    $(".pageCode li").click(function() {
        var ind = $(this).index();
        $(".pageCode li").eq(ind).addClass("current").siblings().removeClass("current")
        var page = $("#pages").val();
        var start = ind * page;
        var end = start + page;

        var dataN = ndata.slice(start, end);
        inittable(dataN, page);
    })
}

function go() {
    $(".go").on('click', function() {
        var gotext = $(".goText").val();
        if (gotext < 1 || gotext > $(".pageCode li").length) {
            alert("没有");
        }
        var page = $("#pages").val();
        var ind = gotext - 1;
        $(".pageCode li").eq(ind).addClass("current").siblings().removeClass("current");
        var start = ind * page;
        var end = start + page;
        var dataN = ndata.slice(start, end);

    })
}
//下拉框
function select(data) {
    $("#pages").change(function() {
        var page = $(this).val();
        inittable(data, page); //渲染table
        initpage(data, page); //渲染分页
    })
}
//渲染分页
function initpage(data) {
    var dataL = data.length;
    var page = $("#pages").val();
    var num = Math.ceil(dataL / page);

    var str = "";
    for (var i = 0; i < num; i++) {
        str += i == 0 ? `<li class="current">${i+1}</li>` : `<li>${i+1}</li>`;
    }
    $(".pageCode").html(str);


}
//渲染table
function inittable(data, page) {
    //清除table里边的除第一个孩子以外的其他孩子
    $(".list").children().not(":first").remove();
    var str = "";
    $.each(data, function(k, v) {
        if (k >= page) {
            return false;
        }
        str += `<li>
			<p>${v.title}接口文档删除接口</p>
			<p>${v.classify}</p>
			<p>${v.time}</p>
			<p>
				<button type="button">编辑</button>
				<button type="button">删除</button>
			</p>
		</li>`
    })
    $(str).appendTo('.list');
}