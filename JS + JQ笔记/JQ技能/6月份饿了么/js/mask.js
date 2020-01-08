/**
 * 
 */
;
(function($) {
    function Mask(el, set) {
        this.el = el;
        this.set = set;
        this.init();
    }
    Mask.prototype = {
        constructor: Mask,
        init: function() {
            var that = this;
            var str = $(`<div class="mask">
			<div class="box">
				<span>X</span>
				<div class="imgs">
					<img src="${that.set.src}" alt="">
				</div>
				<div class="fons">
					<h4>${that.set.title}</h4>
					<p><b>${that.set.price}</b><span>加入购物车</span></p>
				</div>
			</div>
        </div>`);
            $('body').append(str);
            $('.mask').show();
            $('.mask').on('click', 'span', function() {
                $(this).parent().parent().remove();
            })
        }
    }
    $.fn.mask = function(opt) {
        // console.log(opt)
        var def = {};
        var set = $.extend({}, def, opt);
        var mask = new Mask(this, set);
        console.log(set)
    }
})(jQuery);