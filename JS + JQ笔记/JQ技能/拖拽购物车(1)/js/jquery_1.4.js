/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 11:27:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-20 07:10:08
 * @fun [jquery show,hide,toggle,slideDown,slideUp,next,prev]
 */


(function(window) {
    // ͨ����������ģ�¿鼶�����򣬴ﵽ˽���������Ŀ��

    var jQuery = function(selector, context) {
        // ��new ʵ����
        return new jQuery.fn.init(selector, context);
    };
    /**
     * @param {objtectArray} objtectArray [������]
     */
        // fn��̬���� = prototype
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        /**
         * @param {String} selector [ѡ����]
         * @param {String} context [���ڵ㣬�ò�����ʡ��]
         */
        init: function(selector, context) {
            var that = this;
            // ��context����Ĭ��document
            context = context || document;
            // �ж�context�ǲ���ʵ��
            context = context.nodeType ? context : context[0];
            this.length = 0;
            if (!selector) {
                return this;
            }
            //  �ж�selector�ǲ���һ���ַ���, �ַ������ڴ����ڵ����ҽڵ�
            if (typeof selector === 'string') {
                // �жϴ����ǲ���HTML��ǩ,�����ڵ㲢���ýڵ���ʵ�����������
                if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                    var oDiv = document.createElement('div');
                    oDiv.innerHTML = selector;
                    this[0] = oDiv.firstChild || oDiv.firstElementChild;
                    this.length = 1;
                } else if (selector[0] === '#' && this.strNum(selector, '#') === 1 && this.strNum(selector, ' ') === 0) { // �ж��ǲ���ID��
                    var dom = document.getElementById(selector.slice(1));
                    if (dom) {
                        this[0] = dom;
                        this.length = 1;
                    }
                } else { // ����ѡ������ͨ��querySelectorAll����ȡ���е�Ԫ�ش���ʵ��������
                    var eles = context.querySelectorAll(selector);
                    for (var i = 0; i < eles.length; i++) {
                        this.push(eles[i]);
                    }
                }
            } else if (selector.nodeType) {
                // ��DOM�ڵ�תΪjqueryʵ������
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) { // �жϴ����selector�ǲ���jqueryʵ������
                return selector;
            } else {
                return this;
            }
        },
        /**
         * @param {String} str  [�����ַ���]
         * @param {String} char [�����ַ�]
         * @func [���ڼ��һ���ַ����ַ����г��ֵĴ���]
         */
        strNum: function(str, char) {
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
            return count;
        },
        /**
         * @param {String} content  [��ӵ�����]
         * @func [���������push����Ϊ�����������]
         */
        push: function(content) {
            Array.prototype.push.call(this, content);
        },
        /**
         * @func [����jquery����]
         */
        each: function(fn) {
            for (var i = 0; i < this.length; i++) {
                fn.call(this[i], i, this[i]);
            }
            return this;
        },
        /**
         * @func [������ָ��jquery����תΪdom�ڵ�]
         */
        get: function(index) {
            return this[index];
        },
        /**
         * [��ȡ�±�]
         *
         * @return  {[number]}
         */
        index: function() {
            var that = this;
            var children = Array.from(this[0].parentNode.children);
            var i;
            children.forEach(function(item, index) {
                if (item === that[0]) {
                    i = index;
                }
            });
            return i;
        },
        /**
         * @func [����������ȡָ����jquery����]
         */
        eq: function(index) {
            return jQuery(this.get(index));
        },
        /**
         * [siblings description]
         *
         * @return  {init} initʵ������
         */
        siblings: function() {
            var that = this;
            // console.log(that[0]);
            var childs = Array.from(this[0].parentNode.children); //��������������нڵ�
            var el = jQuery();
            childs.forEach(function(item) {
                if (item !== that[0]) {
                    el.push(item);
                }
            });
            return el;
        },
        /**
         * @return  {init} initʵ������
         */
        parent: function() {
            return jQuery(this[0].parentNode);
        },
        /**
         * [parents ������Ԫ��]
         *
         * @param   {[string]}  string  [��Ԫ�ص��������ǩ����id��]
         *
         * @return  {[type]}
         */
        parents: function(string) {
            var targetParent = jQuery(string);
            var that = this[0];
            var el = jQuery();
            while (that.parentNode) {
                that = that.parentNode;
                if (that.nodeType !== 9) {
                    el.push(that);
                }
            };
            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el = jQuery(val);
                    }
                })
            }
            return el;
        },
        children: function(string) {
            var targetParent = jQuery(string);
            //var that = this[0];
            var that = this;
            var el = jQuery();
            this.each(function(x, y){                           //����children�����Ķ�������ж��
                that = y;
                while (that.children) {
                    that = Array.from(that.children);
                    that.forEach(function(item){                //children�����ж��
                        if (that.nodeType !== 9) {
                            el.push(item);
                        }
                    });
                }
            })

            if (string) {
                el.each(function(i, val) {
                    if (val === targetParent[0]) {
                        el = jQuery(val)
                    }
                })
            }
            return el;
        },
        /**
         * [find ��������Ԫ��]
         */
        find: function() {
            var that = this[0];
            var el = jQuery();

            function addChild(parent) {
                if (parent.children.length) {
                    Array.from(parent.children).forEach(function(item) {
                        el.push(item);
                        addChild(item);
                    })
                }
            }
            addChild(that);
            return el;
        },
        /**
         * func [��ȡ��һ���ֵ�]
         */
        next: function() {
            return jQuery(this[0].nextElementSibling);
        },
        /**
         * func [ǰһ���ֵ�]
         */
        prev: function() {
            return jQuery(this[0].previousElementSibling);
        },
        prevAll: function(){
            //���ҵ�ǰԪ��ǰ��������ֵ�
            var a = jQuery();
            var p = this[0].previousSibling;
            while(p){
                if(p.nodeType == 1){
                    a.push(p);
                }

                p = p.previousSibling;
            }
            return a;
        },
        prevAll1: function(){
            var a = jQuery();
            var children = this[0].parentNode.childNodes;

            for(var i = 0; i < children.length; i++){
                if(children[i] == this[0]) return a;
                if(children[i].nodeType === 1) {
                    a.push(children[i]);
                }
            }
            return a;
        },
        nextAll: function(){
            //���ҵ�ǰԪ������������ֵ�
            var a = jQuery();
            var p = this[0].nextSibling;
            while(p){
                if(p.nodeType == 1){
                    a.push(p);
                }

                p = p.nextSibling;
            }
            return a;
        },
        nextAll1: function(){
            var a = jQuery()
            var children = this[0].parentNode.childNodes;
            var flag = false;

            for(var i = 0; i < children.length; i++){
                if(flag == true && children[i].nodeType == 1){
                    a.push(children[i]);
                }

                if(children[i] == this[0]) flag = true;         //��ǰԪ��ǰ���ѭ����һ���˷�
            }

            return a;
        },
        nextAll2: function(){
            var a = jQuery()
            var children = this[0].parentNode.childNodes;
            var i = children.length - 1;

            while(i >= 0){
                if(children[i] == this[0]) return a;
                if(children[i].nodeType === 1) {
                    a.push(children[i]);
                }

                i--;
            }

            return a;
        },
        /**
         * @func [����HTML����]
         */
        html: function(content) {
            if (content || typeof content == 'string') { // �в��������õ�ǰ����HTML����
                this.each(function(i, item) {
                    item.innerHTML = content;
                });
                //  Ϊ��ʵ����ʽ����
                return this;
            } else { //  û������ʵ�ֻ�ȡ��ǰ�����HTML����
                return this[0].innerHTML;
            }
        },
        /**
         * @func [����HTML����]
         */
        val: function(content){
            if(typeof content == 'string'){
                return this[0].value =  content;
            }else{
                return this[0].value;
            }
        },
        /**
         * @func [����css��ʽ]
         */
        css: function(pName, pValue) {
            if (arguments.length === 2) {
                this.each(function(i, v) {
                    v.style[pName] = pValue;
                });
                return this;
            } else {
                if (typeof pName === 'string') {
                    return getComputedStyle(this[0])[pName]
                } else {
                    for (var key in pName) {
                        this.each(function(i, v) {
                            v.style[key] = pName[key];
                        });
                    }
                    return this;
                }
            }
        },
        /**
         * @func [����html����]
         */
        attr: function(pName, pValue) {
            if (pValue) { // �������������������HTML����
                this.each(function(i, v) {
                    v.setAttribute(pName, pValue);
                });
                return this;
            } else {
                // �����1����������ȡHTML����
                return this[0].getAttribute(pName);
            }
        },
        /**
         * @func [����html����]
         */
        prop: function(){
            var arg = arguments;

            if(arg.length == 2){         //�������������������html����
                var key = arg[0];
                var value = arg[1];
                this.each(function(k, v){
                    v[key] = value;
                });
                return this;
            }else{
                // �����1����������ȡHTML����
                return this[0][arg[0]];
            }
        },
        /**
         * @func [ĩ������ӽڵ�]
         */
        append: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                if(typeof childNode == 'string'){
                    item.innerHTML += childNode;
                }else{
                    item.appendChild(child.cloneNode(true));
                }
            });
            return this;
        },
        /**
         * @func [ǰ������ӽڵ�]
         */
        prepend: function(childNode) {
            var child = null;
            if (childNode.nodeType) {
                child = childNode;
            } else if (childNode instanceof jQuery) {
                child = childNode[0];
            }
            this.each(function(i, item) {
                item.insertBefore(child.cloneNode(true), item.firstChild);
            });
            return this;
        },
        /**
         * @func [ǰ������ӽڵ�]
         */
        prependTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.insertBefore(that[0].cloneNode(true), item.firstChild);

            });
            return this;
        },
        /**
         * @func [ǰ������ӽڵ�]
         */
        appendTo: function(parent) {
            var that = this;
            parent.each(function(i, item) {
                item.appendChild(that[0].cloneNode(true));

            });
            return this;
        },
        addClass: function(cName) {
            var that = this;
            cName = cName.split(" ");
            cName.forEach(function(cssName) {
                that.each(function(i, item) {
                    item.classList.add(cssName)
                })
            })
            return this;
        },
        removeClass: function(cName) {
            this.each(function(i, item) {
                item.classList.remove(cName)
            })
            return this;
        },
        hasClass: function(selector){
            var className = " " + selector + " ",
                l = this.length;


            for(var i = 0; i < l; i++){
                if(this[i].nodeType == 1 && (" " + this[i].className + " ").replace(/[\t\r\n]/g, " ").indexOf(className) > -1){
                    return true;
                }
            }

            return false;
        },
        /**
         * @func [�¼�ģ��]
         */
        on: function(type) {
            var str,
                callback,
                data,
                arg = Array.prototype.slice.call(arguments, 1);
            arg.forEach(function(item) {
                typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : item.toString() === "[object Object]" ? data = item : null;
            });
            //  �¼�������
            function run(e) {
                // �ж���û�ж����������
                if (data) {
                    // ������Ķ�����ص��¼������ϣ���Ϊ�¼������data������ʹ��
                    e.data = data;
                }
                // �ж����¼�Դ�ǲ���  strָ����ί���ӽڵ�
                var tar = e.target;
                if (str) {
                    // ͨ��str����ί�е��ӽڵ�
                    $(str, this).each(function(i, item) {
                        if (tar === item) { // �¼�Դ��ί���ӽڵ���ͬ�ڵ�
                            callback && callback.call(tar, e); // �ص�����
                            return;
                        };
                    })


                } else {
                    callback && callback.call(this, e); // �ص�����
                }
            };
            // ͨ���ж�str�������иò������¼�ί�з�ʽȥ����¼�
            if (str) { // ��Ҫͨ���¼�ί�а��¼�
                //this[0].addEventListener(type, run);
                this[0]['on' + type] = run;
            } else { // ֱ�Ӱ�
                // ����jquery������¼�
                this.each(function(i, item) {
                    //item.addEventListener(type, run);
                    item['on' + type] = run;
                })
            }
            return this;
        },
        /**
         * @func
         */
        off: function(type) {
            this.each(function(i, item) {
                // ɾ���¼�
                item['on' + type] = null;
            });
            return this;
        },
        // DOM�ߴ���λ��
        /**
         * @func [�ڿ� = padding + width]
         * @return {Number} [�ڲ����]
         */
        innerWidth: function() {
            // ��ȡԪ�ص�offsetWidth - ���ұ߿��
            var oStyle = getComputedStyle(this[0]);
            var lw = parseFloat(oStyle.borderLeftWidth);
            var rw = parseFloat(oStyle.borderRightWidth);
            return this[0].offsetWidth - lw - rw;
        },
        innerHeight: function() {
            // ��ȡԪ�ص�offsetWidth - ���ұ߿��
            var oStyle = getComputedStyle(this[0]);
            var tw = parseFloat(oStyle.borderTopWidth);
            var bw = parseFloat(oStyle.borderBottomWidth);
            return this[0].offsetHeight - tw - bw;
        },
        /**
         * @func [�ⲿ��ȣ��в���true = padding + width + border + margin ,�޲��� ����maring]
         * @return {Number} [�ⲿ���]
         */
        outerWidth: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                lm = parseFloat(oStyle.marginLeft),
                rm = parseFloat(oStyle.marginRight),
                offsetW = el.offsetWidth;
            return offsetW += deep ? (lm + rm) : 0;
        },
        outerHeight: function(deep) {
            var el = this[0],
                oStyle = getComputedStyle(el),
                tm = parseFloat(oStyle.marginTop),
                bm = parseFloat(oStyle.marginBottom),
                offsetH = el.offsetHeight;
            return offsetH += deep ? +(tm + bm) : 0;
        },
        /**
         * @func [����]
         */
        hide: function() {
            this.each(function(index, el) {
                el.style.display = 'none';
            })
        },
        show: function() {
            this.each(function(index, el) {
                el.style.display = 'block';
            })
        },
        toggle: function() {
            this.each(function(index, el) {
                // ����Ԫ�ص�ǰ��ʾ״ִ̬���෴����������ʾִ������
                var displayStatus = getComputedStyle(el, null).display;
                el.style.display = displayStatus === 'block' ? 'none' : 'block';
            })
        },
        /**
         * @param {number|string} [���ö���ʱ��]
         * @func [�۵�����]
         */
        slideUp: function(time) {
            // ����ʱ������Ĭ�ϲ���
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400
            }
            // ���Ŀ���height������Ϊ0
            this.each(function(i, el) {
                el.style.overflow = 'hidden';
                // ��ȡԪ���ܸ߶�
                var totalH = el.offsetHeight;
                // ���õ�ǰ�߶�
                var currentH = totalH;
                // ������Ĳ�ֵ������ֵ��
                var step = totalH / (time / 10);
                // ͨ����ʱ��ȥ���߶�
                var timer = setInterval(function() {
                    currentH = currentH - step;
                    el.style.height = currentH + 'px';
                    // ���߶�Ϊ0�������ʱ��
                    if (currentH <= 0) {
                        clearInterval(timer);
                        el.style.display = 'none';
                        el.style.height = totalH + 'px';
                    }
                }, 10)
            })
        },
        /**
         * @param {number|string} [���ö���ʱ��]
         * @func [�۵�����]
         */
        slideDown: function(time) {
            // ����ʱ������Ĭ�ϲ���
            time = time || 400;
            if (typeof time === 'string') {
                time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400
            }
            // ���Ŀ���height������Ϊ0
            this.each(function(i, el) {
                // ��Ϊ��ʾ
                el.style.display = 'block';
                // ��ȡԪ���ܸ߶�
                var totalH = el.offsetHeight;
                // ���õ�ǰ�߶�
                el.style.height = 0;
                var currentH = 0;
                // // ������Ĳ�ֵ������ֵ��
                var step = totalH / (time / 10);
                // // ͨ����ʱ��ȥ���߶�
                var timer = setInterval(function() {
                    currentH = currentH + step;
                    el.style.height = currentH + 'px';
                    // ���߶�Ϊ0�������ʱ��
                    if (currentH >= totalH) {
                        clearInterval(timer);
                        el.style.height = totalH + 'px';
                    }
                }, 10)
            })
        },
        slideToggle: function(time) {
            this.each(function(i, el) {
                var displaystatus = getComputedStyle(el).display;
                if (displaystatus === 'block') {
                    $(el).slideUp(time);
                } else {
                    $(el).slideDown(time);
                }
            })
        },
        /**
         * @param {number|string} [��ȡcss��ʽ]
         * @func [��ȡcss��ʽ]
         */
        getCss: function(ele, attr){
            if(typeof getComputedStyle == 'function'){
                return parseFloat(getComputedStyle(ele, null)[attr]);
            }else{
                if(attr == 'opacity'){
                    var filter = ele.currentStyle.filter;
                    var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                    if(reg.test(filter)){
                        return parseFloat(RegExp.$1)/100;
                    }else{
                        return 1;
                    }
                }else{
                    return parseFloat(ele.currentStyle(attr));
                }
            }
        },
        /**
         * @param {number|string} [����css��ʽ]
         * @func [����css��ʽ]
         */
        setCss: function(ele, attr, val){
            switch(attr){
                case 'opacity':
                    ele.style.opacity = val;
                    ele.style.filter = 'alpha(opacity='+val*100+')';
                case 'top':
                case 'left':
                case 'height':
                case 'width':
                    ele.style[attr] = val + 'px';
                case 'float':
                    ele.style.cssStyle = val + 'px';
                    ele.style.styleStyle = val + 'px';
                default:
                    ele.style[attr] = val;
            }
        },
        animate: function(obj, duration, fnCallback){
            var that = this;
            var oBegin = {};        //��ʼֵ����
            var oChange = {};       //�ı�ֵ����
            var flag = 0;           //����

            for(var attr in obj){
                var target = obj[attr];     //Ŀ��ֵ
                var begin = that.getCss(that[0], attr);
                var change = target - begin;

                if(change){
                    oBegin[attr] = begin;
                    oChange[attr] = change;
                    flag++;
                }
            }

            if(flag == 0) return this;

            var interval = 13;      //��ʱ��ʱ��
            var times = 0;          //�Ѿ����˵�ʱ��

            clearInterval(that[0].timer);

            function step(){
                times += interval;

                if(times >= duration){//�����
                    for(var attr in obj){
                        var target = obj[attr];
                        that.setCss(that[0], attr, target);
                    }

                    clearInterval(that[0].timer);
                    that[0].timer = null;

                    if(fnCallback){
                        fnCallback.call(that[0])
                    }
                }else{//�����
                    for(var attr in obj){
                        var change = oChange[attr];
                        var begin = oBegin[attr];
                        var val = times/duration*change + begin;
                        that.setCss(that[0], attr, val);
                    }
                }
            }

            that[0].timer = setInterval(step, interval)

        },
        remove: function(){
            if(this.length == 0) return this;   //���Ԫ�ز����ڣ��Ͳ���Ҫɾ��
            var parent = this[0].parentNode;    //�ҵ���ǰԪ�صĸ�Ԫ��-Ԫ����û��ֱ��ɾ������ķ�����ֻ���ҵ���Ԫ��ɾ��Ԫ��

            this.each(function(key, value){     //��ƥ��Ԫ�ؽ��б��� key���������� value����ÿһ��
                parent.removeChild(value);       //ɾ��ÿһ��
            });

            return this;
        },
        /*��ȡ����������ҳ�涥���ľ���*/
        scrollTop: function(){
            var scrollT;
            if(window.pageYOffset){  //pageYOffset = scrollY(����������ĸ߶�)
                scrollT = window.pageYOffset;
            }else if(document.compatMode){           //document.compatMode  �ж��Ǳ�׼ģʽ���ǻ���ģʽ
                scrollT = document.documentElement.scrollTop;           //��׼�������ù����ĸ߶�
            }else if(document.body){                                    //����ie
                scrollT = document.body.scrollTop;
            }
            return scrollT;
        },
        offset: function(){//����ele���Ԫ�ؾ������������ƫ����
            var l = this[0].offsetLeft;
            var t = this[0].offsetTop;
            var p = this[0].offsetParent;
            while(p){//����ʱ����Բ���IE8
                l += p.offsetLeft + p.clientLeft;
                t += p.offsetTop + p.clientTop;

                p = p.offsetParent;
            }
            return {left: l, top: t};
        },
        position:function(){
             var l = this[0].offsetLeft;
            var t = this[0].offsetTop;
            return {left: l, top: t}
        }
    };

    //ajax����
    jQuery.ajax = function(options){
        var def = {
            url: '',
            method: 'get',
            async: true,
            data: null,
            type: 'urlencoded',
            success: function(){},
            error: function(){}
        };

        options = this.extend({}, def, options);
        var params = this.fromParams(options.data);

        //��������
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //��������
            if(options.method.toLowerCase() == 'get'){
                xhr.open(options.method, options.url + '?'+ params, options.async);
                xhr.send(null);
            }else if(options.method.toLowerCase() == 'post'){
                xhr.open(options.method, options.url, options.async);

                if(options.type == 'urlencoded'){
                    xhr.setRequestHeader('Content-type', 'application/x-www-from-urlencoded');
                }else if(options.type == 'json'){
                    xhr.setRequestHeader('Content-type', 'application/json');
                }

                xhr.send(params);
            }

    //    ����ajax
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                options.success(xhr.responseText);
            }else{
                options.error();
            }
        }

    };

    //����ת�ַ���
    jQuery.fromParams = function(data){
        var arr = [];

        for(var key in data){
            arr.push(key + '=' + data[key]);
        }

        return arr.join('&');
    };

    //�������չ������Ķ��󸲸�ǰ��Ķ���
    jQuery.extend = function(){
        var target = arguments[0];          //�����ǵĶ���

        //console.log(arguments.length)
        for(var i = 1; i < arguments.length; i++){
            for(var key in arguments[i]){
                target[key] =  arguments[i][key];
            }
        }

        return target;
    };

    // ��new ʵ�������ʹ��jquery����ԭ�ͷ���
    jQuery.prototype.init.prototype = jQuery.prototype;
    // ��jQuery�ֲ�������Ϊȫ�ֱ���$��ʹ��
    window.jQuery = window.$ = jQuery;
})(window);