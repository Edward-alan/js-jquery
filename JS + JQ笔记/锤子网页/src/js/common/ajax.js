/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-26 13:41:52
 * @LastEditTime: 2019-01-02 20:00:10
 * @LastEditors: Please set LastEditors
 */
define(function () {
    return ajax;
})

function ajax(opts) {
    var def = {
        url: '',
        type: 'get',
        async: true,
        data: '',
        success: function () {},
        error: function () {},
    };
    var set = Object.assign({}, def, opts);
    //ajax 四部曲
    //创建
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    //建立响应数据
    xhr.onload = function () {
        //接收数据并返回时候触发load事件
        if (xhr.status >= 200 && xhr.status < 300) {
            set.success && set.success(set.dataType == "json" ? JSON.parse(xhr.responseText) : xhr.responseText);
        } else {
            set.error && set.error();
        }
    }
    var data = typeof set.data === "string" ? set.data : forMat(set.data);
    var url = set.type === "get" ? data !== "" ? set.url + "?" + data : set.url : set.url
    //打开连接
    xhr.open(set.type, url, set.async);
    //发送数据
    xhr.send(typeof set.type === "get" ? null : data);
}

function forMat(obj) {
    var str = '';
    for (item in obj) {
        str += item + "=" + obj[item] + "&"
    }
    return str.slice(0, -1);
}