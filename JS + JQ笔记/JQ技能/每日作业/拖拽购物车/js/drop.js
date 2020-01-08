var arr = [];
$("figure").on("mousedown", function(e) {
    e.preventDefault();
    var clone = this.cloneNode(true);
    $(clone).addClass("copy");
    $(this).parent().append(clone);
    var left = e.pageX - $(this).position().left;
    var top = e.pageY - $(this).position().top;
    $(document).on("mousemove", function(e) {
        e.preventDefault();
        var l = e.pageX - left;
        var t = e.pageY - top;
        $(".copy").css("left", l + "px");
        $(".copy").css("top", t + "px");
    }).on("mouseup", function() {
        var rightL = $(".right").offset().left;
        var cloneL = $(".copy").offset().left;
        if (cloneL > rightL) {
            var tit = $(".tit", clone).html();
            var price = $(".price", clone).html();

            if (arr.indexOf(tit) == -1) {
                var str = `<tr>
                <td>${tit}</td>
                <td class="count">1</td>
                <td>${price}</td>
            </tr>`;
                $("tbody").append(str);
                arr.push(tit);
            } else {
                var ind = arr.indexOf(tit);
                var count = $(".count", $("tbody tr").eq(ind)).html() * 1 + 1;
                $(".count", $("tbody tr")).eq(ind).html(count);
            }
            $(".copy").remove();
            total();
        } else {
            $(".copy").animate({ "left": 0, "top": 0 }, 1000, function() {
                $(this).remove();
            })
        }
        $(this).off("mousemove");
        $(this).off("mouseup");
    })
});

total();

function total() {
    var sum = 0;
    $("tbody tr").each(function(k, v) {
        var count = $(".count", v).html() * 1;
        var price = $(v).children().eq(2).html() * 1;
        sum += count * price;
    });
    sum = sum == 0 ? "0" : sum;
    $(".sum").html(sum);
};