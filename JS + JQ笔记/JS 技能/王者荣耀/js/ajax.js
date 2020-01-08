function ajax(opt) {
    //设置默认参数
    var def = {
        type: 'get',
        url: '',
        async: true,
        success: null,
        error: null
    };
    var settings = extend(def, opt);
    // 将对象型的数据转为键值对的字符串
    // 四大步
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // 请求是否完成
            if (xhr.status === 200) { // 请求是否成功
                // 接收响应数据
                opt.success && opt.success(xhr.responseText);
            } else { // 请求失败
                opt.error && opt.error();
            }
        }
    };
    // 判断请求方式
    if (settings.type === 'get') {
        xhr.open('get', settings.url + '?' + settings.data, settings.async);
        xhr.send();
    } else {
        xhr.open('post', settings.url, settings.async);
        // 请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded,charset=utf-8');
        xhr.send(settings.data);
    };

}
// 合并扩展参数
function extend() {
    // arguments  [{},def,opt]
    for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            arguments[0][k] = arguments[i][k]
        }
    }
    return arguments[0];
}