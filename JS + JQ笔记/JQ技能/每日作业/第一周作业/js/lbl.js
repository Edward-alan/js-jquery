var Add = 0;
$(".add").on("click", function() {
        var user = $(".user").val();
        var age = $(".age").val();
        if (!user) {
            alert("请输入用户名!")
            return false;
        }
        if (!age) {
            alert("请输入年龄!")
            return false;
        }
        var str = `  <tr>
                    <td>${++Add}</td>
                    <td>${user}</td>
                    <td>${age}</td>
                    <td><button class="delone">删除</button></td>
                </tr>`;
        $("tbody").append(str);
        //删除全部
        $(".delone").on("click", function() {
            $(this).parent().parent().remove();
            $(".user").val("");
            $(".age").val("");
        })
    })
    //重置
$(".res").on("click", function() {
        $(".user").val("");
        $(".age").val("");
    })
    //单个删
$(".del").on("click", function() {
    $("tbody").children().remove();
    $(".user").val("");
    $(".age").val("");
})