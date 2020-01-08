(function(window) {
    var jQuery = function(selector, context) {
        return new jQuery.fn.each(selector, context);
    }
    window.$ = window.jQuery = jQuery;
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i]);
            }
        },
        // on: function(type) {
        //     var str,
        //         callback,
        //         data,
        //         arg = Array.prototype.slice.call(arguments, 1);
        //     //console.log(arg);
        //     arg.forEach(function(item) {
        //             typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : null;
        //         })
        //         //console.log(str, callback);

        //     //事件处理函数
        //     function run(e) {
        //         if (data) {
        //             e.data = data;
        //         }
        //         var tar = e.target;
        //         if (str) {
        //             console.log(str)
        //             $(str, this).each(function(i, item) {
        //                 if (tar === item) {
        //                     callback && callback.call(tar, e); //回调函数
        //                     return;
        //                 }
        //             })

        //         } else {
        //             callback && callback.call(tar, e); //回调函数
        //         }
        //     };
        //     //判断判断str参数。又该参数以事件委托方式去添加事件
        //     if (str) { //需要事件委托绑定事件
        //         //this[0].addEventListener(type, run);
        //         //console.log(this[0]);
        //         this[0]['on' + type] = run;
        //     } else { //直接绑定
        //         //遍历jQ
        //         this.each(function(i, item) {
        //             //item.addEventListener(type, run)
        //             item['on' + type] = run;
        //         })
        //     }
        //     return this;
        // },

        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            //console.log(arg);
            arg.forEach(function(item) {
                    typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : null;
                })
                //console.log(str, callback);

            //事件处理函数
            function run(e) {
                if (data) {
                    e.data = data;
                }
                var tar = e.target;
                if (str) {
                    $(str, this).each(function(i, item) {
                        if (tar === item) {
                            callback && callback.call(tar, e); //回调函数
                            return;
                        }
                    })

                } else {
                    callback && callback.call(tar, e); //回调函数
                }
            };
            //判断判断str参数。又该参数以事件委托方式去添加事件
            if (str) { //需要事件委托绑定事件
                // this[0].addEventListener(type, run);
                //console.log(this[0]);
                this[0]['on' + type] = run;
            } else { //直接绑定
                //遍历jQ
                this.each(function(i, item) {
                    //item.addEventListener(type, run)
                    item['on' + type] = run;
                })
            }
            return this;
        },

        prop: function() {
            var arg = arguments;
            if (arg.length == 2) {
                var key = arg[0];
                var value = arg[1];
                this.each(function(k, v) {
                    v[key] = value;
                })
                return this;
            } else {
                return this[0][arg[0]];
            }
        }

    }
    jQuery.prototype.each.prototype = jQuery.prototype;

})(window)