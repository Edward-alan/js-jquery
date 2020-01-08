/**
 * Created by YJJ on 2018/12/12.
 */
/*思路：
* 当前时间  <  开始时间             还未开始
* 开始时间  <  当前时间  <  结束时间    正在进行中
* 结束时间  <  当前时间             已经结束
* */
//插件+构造函数（面向对象）
;(function($){
    //面向对象
    function  CountDown(set){
        this.set=set;
        this.startT=new Date(set.startTime).getTime();
        this.endT=new Date(set.endTime).getTime();
        this.nowT=new Date().getTime();
        this.timer=null;//定时器
        this.init();
        this.auto();
    };
    CountDown.prototype={
        constructor:CountDown,
        init:function(){
            var that=this;
            that.timer=setInterval(function(){
                that.nowT=new Date().getTime();
                that.auto();
            },1000)
        },
        auto:function(){
            var that=this;
            //* 当前时间 < 开始时间 (还未开始)
            if(that.nowT<that.startT)
            {
                $(that.set.daySelector).parent().prev().html("元旦还未开始")
            }
            // * 开始时间  <=  当前时间  <=  结束时间 (正在进行中)
            else if(that.nowT<=that.endT)
            {
                var time=that.endT-that.nowT;
                var day=Math.floor(time/1000/60/60/24);
                var hour=Math.floor(time/1000/60/60%24);
                var min=Math.floor(time/1000/60%60);
                var sec=Math.floor(time/1000%60);
                $(that.set.daySelector).html("距离元旦还有"+that.addZero(day)+"天")
                $(that.set.hourSelector).html(that.addZero(hour)+"天")
                $(that.set.minSelector).html(that.addZero(min)+"分钟")
                $(that.set.secSelector).html(that.addZero(sec)+"秒")
            }
            //* 结束时间  <  当前时间  （已经结束）
            else if(that.endT<that.nowT)
            {
                $(that.set.daySelector.parent().prev().html("结束了"))
            }
        },
        addZero:function(num){
            return num<10?"0"+num:num;
        }
    };
    $.fn.countDown=function(opt){
        //初始化数据：
        var def={
            startTime:"2018/12/12 14:15:00", //开始时间
            endTime:"2019/1/1 00:00:00",   //结束时间
            daySelector:".day_num",         //天
            hourSelector:".hour_num",      //时
            minSelector:".min_num",       //分
            secSelector:".sec_num"       //秒
        }
        //合并数据：
        var set=$.extend(def,opt);
        //new一个构造函数：
        var countdown=new CountDown(set);
    }
})(jQuery);








