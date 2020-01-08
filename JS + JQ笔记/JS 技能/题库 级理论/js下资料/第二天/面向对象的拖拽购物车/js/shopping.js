function Shopping(){
    this.leftBox = document.querySelector(".left");
    this.dls = document.querySelectorAll(".left dl");
    this.rightBox = document.querySelector(".right");
    this.shop = [];
    this.tbody = document.querySelector("#tBody");
    this.drag();
}
Shopping.prototype = {
    constructor:Shopping,
    drag:function(){
        var _this = this;
        for(var i=0;i<this.dls.length;i++){
            this.dls[i].onmousedown = function(e){
                var ev = e || event;
                var dl = this.cloneNode(true);
                dl.style.position = "absolute";
                dl.style.margin = 0;
                dl.style.left = this.offsetLeft+"px";
                dl.style.top = this.offsetTop+"px";

                _this.leftBox.appendChild(dl);
                var pos = {
                    x:ev.offsetX,
                    y:ev.offsetY
                }
                document.onmousemove = function(e){
                    var ev = e || event;
                    dl.style.left = ev.clientX-pos.x+"px";
                    dl.style.top = ev.clientY-pos.y+"px";
                }
                dl.onmouseup = function(){
                    if(this.offsetLeft>=_this.rightBox.offsetLeft){
                        _this.addProduct(this.children);
                    }
                    document.onmousemove = null;
                    _this.leftBox.removeChild(dl);
                    _this.price();
                }

            }
        }
    },
    price:function(){
        var trs = this.tbody.children;
        var sum = 0;
        for(var i=1;i<trs.length;i++){
            sum+=+trs[i].children[2].innerHTML;
        }
        document.getElementById("priceN").innerHTML = sum;
    },
    addProduct:function(dd){
        var index = this.shop.indexOf(dd[1].innerHTML);
        if(index==-1){
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>"+dd[1].innerHTML+"</td><td>1</td>" +
                "<td>"+dd[2].children[0].innerHTML+"</td>";
            this.tbody.appendChild(tr);
            this.shop.push(dd[1].innerHTML);
        }else{
            this.tbody.children[index+1].children[1].innerHTML=+this.tbody.children[index+1].children[1].innerHTML+1;
            this.tbody.children[index+1].children[2].innerHTML=this.tbody.children[index+1].children[1].innerHTML*dd[2].children[0].innerHTML;
        }
    }
}