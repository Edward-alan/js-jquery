function ajax(opt){
    var def = {
        method:"get",
        async:true,
        success:null,
        error:null,
        data:""
    }
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    var settings = extend(def,opt);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                settings.success && settings.success(xhr.responseText);
            }else{
                settings.error && settings.error();
            }
        }
    }
    if(settings.method.toLowerCase()=="get"){
        xhr.open("get",settings.url+"?"+settings.data,settings.async);
        xhr.send(null);
    }else{
        xhr.open("post",settings.url,settings.async);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(settings.data);
    }
}

function extend(){
    for(var i=1;i<arguments.length;i++){
        for(var k in arguments[i]){
            arguments[0][k] = arguments[i][k];
        }
    }
    return arguments[0];
}