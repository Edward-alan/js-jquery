;
(function($) {
    function CountDown(el, set) {
        this.el = el;
        this.set = set;

        this.startTime = new Date(set.startTime).getTime();
        this.endTime = new Date(set.endTime).getTime();
        this.nowTime = new Date().getTime();
        this.timer;

        this.init();
    }

    CountDown.prototype = {
        constructor: CountDown,
        init: function() {
            var that = this;

            this.timer = setInterval(function() {
                that.nowTime = new Date().getTime();

                if (that.startTime > that.nowTime) {
                    $(that.set.daySelector).parent().prev().html("还没有到活动哦！");
                } else if (that.endTime > that.nowTime) {
                    that.interval();
                } else {
                    clearInterval(that.timer);
                    that.timer = null;
                    $(that.set.daySelector).parent().prev().html("活动已结束")
                }
            }, 1000)
        },
        interval: function() {
            var that = this;
            var time = that.endTime - that.nowTime;

            var day = Math.floor(time / 1000 / 60 / 60 / 24);
            var hour = Math.floor(time / 1000 / 60 / 60 % 24);
            var min = Math.floor(time / 1000 / 60 % 60);
            var sec = Math.floor(time / 1000 % 60);

            $(that.set.daySelector).html("距离活动结束还有：" + day + "天");
            $(that.set.hourSelector).html(that.addZero(hour) + '小时');
            $(that.set.minSelector).html(that.addZero(min) + '分钟');
            $(that.set.secSelector).html(that.addZero(sec) + '秒');
        },
        addZero: function(num) {
            return num < 10 ? '0' + num : num;
        }
    };

    $.fn.countDown = function(opt) {
        var def = {
            startTime: '2018/12/29 20:00:00', //开始时间
            endTime: "2019/1/1 00:00:00", //结束时间
            daySelector: ".day_num", //天
            hourSelector: ".hour_num", //小时
            minSelector: ".min_num", //分
            secSelector: ".sec_num" //秒
        };
        var set = $.extend({}, def, opt);
        var countdown = new CountDown(this, set);
    }

})(jQuery)