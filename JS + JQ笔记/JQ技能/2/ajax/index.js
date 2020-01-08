(function(window) {
    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

    };
    jQuery.ajax = function(options) {
        var defObj = {
            url: '',
            method: 'get',
            async: true,
            type: 'json',
            data: {
                "name": "aa",
                "age": 20
            },
            success: function() {},
            error: function() {}
        };

        options = this.extend({}, defObj, options);
    };

    jQuery.extend = function() {
        //1.获取目标值ar[0]
        var target = arguments[0];
        //2.遍历传过来的对象，除了ar[0]，ar[i]
        for (var i = 1; i < this.arguments.length; i++) {
            //3.遍历对象ar[i],获取ar[i]对象里面的内容（url/method）
            for (var key in arguments[i]) {
                //4.把前面属性覆盖掉
                target[key] = arguments[i][key];
            }
        }
        console.log(target);
        return target;
    }


    jQuery.prototype.init.prototype = jQuery.prototype;
    window.jQuery = window.$ = window.jQuery;
})(window)