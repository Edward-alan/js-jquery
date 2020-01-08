
(function($) {
    function ShowBigImage(el) {
        this.el = el;
        this.init();
        this.x = 15;
        this.y = 10;
    }
    ShowBigImage.prototype = {
        constructor: ShowBigImage,
        init: function() {
            var that = this;
            $('.list').on('mouseover', 'img', function(e) { //当我的鼠标滑过每张小图片的时候（给小图片绑定事件
                var str = $(this).attr('src'); //获取每张图片的路径
                $(".item").html(`<img src="${str}"/>`); //当我滑过图片的时候，把图片路径添加到下面的大盒子里面
                $('.item').show();
                $('.item').css({
                    left: e.pageX + that.x + 'px',
                    top: e.pageY + that.y + 'px'
                })
            }).on('mouseout', 'img', function() {
                $('.item').hide();
            }).on("mousemove", function(e) {
                $('.item').css({
                    left: e.pageX + that.x + 'px',
                    top: e.pageY + that.y + 'px'
                })
            })
        }
    }
    $.ShowBigImage = function() {
        var showBigImage = new ShowBigImage(this);
    }
})(jQuery)