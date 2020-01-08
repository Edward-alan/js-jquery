$(function() {

    $('.render li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    })

    $.ajax({
        url: 'data/format.json',
        success: function(data) {
            render(data);
        }
    });

    var arr = [];

    function render(data) {
        $.each(data.Data, function(k, v) {
            if (arr.indexOf(v.PrefixEName) == -1) {
                arr.push(v.PrefixEName);
            }
        });

        arr.sort();

        console.log(arr);
    }
})