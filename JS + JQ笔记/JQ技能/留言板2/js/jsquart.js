window.onload = function(){
    //封装getElementById
    /*function $( idName ){
        return document.querySelector(idName);
    }*/
    //获取输入用户名的文本框
    var user=document.querySelector("#user");
    //获取输入评论内容的文本框
    var content=document.querySelector("#content");
    //获取所有图片
    var imgs=document.querySelectorAll("#box img");
    //获取广播按钮
    var btn=document.getElementById("btn");
    //获取控制数字的p标签
    var num=document.getElementById("num");
    //获取用来保存新建节点的大容器
    var cenBox=document.querySelector("#cenBox");
    //定义空变量用来保存图片路径
    var iSrc="";
    //给图片绑定单击事件
    for(var i=0;i<imgs.length;i++){
        //请每张图片自定义属性index 记录下标
        imgs[i].index=i;
        //Dom 0级
        imgs[i].onclick=function(){
        //排他思想==>先让所有图片的透明度一致
        for(var j=0;j<imgs.length;j++){
            imgs[j].style.opacity=0.2;
                                       }
        //使点击的图片完全显示
        imgs[this.index].style.opacity=1;
        //将当前图片路径保存在变量中
        iSrc=this.src;
                                  }
                                  }
    //给广播按钮绑定事件
    btn.onclick=function(){
    //判断用户名框内容框是否为空或者图片未选中
    if(user.value==""||content.value==""||iSrc==""){
        alert("文本框、文本域中没有内容或图片未选中");
                                                   }
    else{
        //创建span元素
        var nSpan=document.createElement("span");
        //将用户名、用户内容、头像、当前时间写入到新建span中
        nSpan.innerHTML=`<img src=${iSrc}><p>${user.value} ${content.value}</p><h2>${new Date().toLocaleString()}</h2><p class="bacolor"><b>删除</b></p>`;
        //将span元素插入到容器的头部
        cenBox.insertBefore(nSpan,cenBox.firstChild);
        //让每个span的'删除'默认隐藏
        nSpan.lastChild.style.display="none";
        //移入span时 显示最后一个子节点
        nSpan.onmouseover=function(){
            nSpan.lastChild.style.display="block";
                                    }
        //移出span时 隐藏最后一个子节点
        nSpan.onmouseout=function(){
            nSpan.lastChild.style.display="none";
                                   }
        //删除当前的nSpan
        nSpan.lastElementChild.onclick=function(){
            cenBox.removeChild(nSpan);
                   }
        //广播之后清空用户、文本、图片
        user.value="";
        content.value="";
        for(var i=0;i<imgs.length;i++){
            imgs[i].style.opacity=0.3;
                                     }
        }
                          }
        //给文本域绑定键盘事件
        content.onkeydown=function(){
            //判断num中的长度是否大于0
            if(num.innerHTML>0){
                num.innerHTML-=1;
                }
            //始终使num的文本内容为0
            else{
                num.innerHTML=0;
                }
            }44E
};