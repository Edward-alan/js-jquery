function ajax(opt){
    //创建对象
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    //建立连接
xhr.open("get",opt.url,true);
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        if(xhr.status==200){
            opt.success&&opt.success(xhr.responseText);
        }else{
            opt.error&&opt.error();
        }
    }
}
xhr.send(null);
}


