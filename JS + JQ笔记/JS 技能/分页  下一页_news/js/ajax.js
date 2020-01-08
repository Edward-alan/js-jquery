function ajax(opts) {
    // 创建对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    // 建立请求
    xhr.open(opts.type, opts.url, opts.async);
    // 接收响应数据
    xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    opts.success && opts.success(xhr.responseText);
                } else {
                    opts.error && opts.error(xhr.status);
                }
            }
        }
        // 发送请求
    xhr.send();
}