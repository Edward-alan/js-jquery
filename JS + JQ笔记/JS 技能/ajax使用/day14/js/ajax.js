/**
 *
 * @param opt {url:"",method:"",async:true|false,data:"name=zhangsan&age=20",success,error}
 */
function ajax(opt){
    //分四步
    var def = {
        method:"get",
        async:true,
        data:"",
        success:null,
        error:null
    }
    var settings=extend(def,opt);//整合过后的参数
    //console.log(settings);
    /*var a = {
        method:"post",
        async:true,
        data:"",
        url:"js/1.txt",
        success:function(){
            var data = JSON.parse(str);
            data.forEach(function(item){
                //第一种创建图片的方式
                // var img = document.createElement("img");
                // img.src="img/"+item;
                var img = new Image();
                img.src="img/"+item;
                document.body.appendChild(img);
            })
        },
        error:null
    }*/
    //第一步
    var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    //绑定事件，检测readyState状态值得变化
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                settings.success && settings.success(xhr.responseText);
            }else{
                settings.error&&settings.error();
            }
        }
    }
    if(settings.method=="get" || settings.method=="GET"){
        //opt.method.toLowerCase()=="get"
        xhr.open('get',settings.url+"?"+settings.data,settings.async);
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
            //console.log(k+","+arguments[i][k]);
            arguments[0][k] = arguments[i][k];
        }
    }
    return arguments[0];
}