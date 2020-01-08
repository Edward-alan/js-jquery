function Sel(obj){
    this.province = document.getElementById(obj.provinceId);//省份的下拉框
    this.city = document.getElementById(obj.cityId);//城市的下拉框
    this.area = document.getElementById(obj.areaId);//区域的下拉框
    this.data = obj.data;
    this.cityData = [];//存储当前省份的所有的城市
    this.init();
}
Sel.prototype = {
    constructor:Sel,
    init:function(){
        this.drawSelect(this.data,this.province);
        this.bindEvent();
    },
    /*drawSelect:function(){
        var that = this;
        that.data.forEach(function(item){
            var option = document.createElement("option");
            option.innerHTML = item.name;
            that.province.appendChild(option);
        })
    },*/
    drawSelect:function(data,select){
        var that = this;
        select.innerHTML = "<option>请选择</option>";
        data.forEach(function(item){
            var option = document.createElement("option");
            option.innerHTML = typeof item=="object"?item.name:item;
            select.appendChild(option);
        })
    },
    /**
     * 绑定事件的
     */
    bindEvent:function(){
        var that = this;
        that.province.onchange = function () {
            //console.log(this.selectedIndex); 省份的下标
            that.cityData=that.data[this.selectedIndex-1].city;
            that.drawSelect(that.cityData,that.city);
        }
        that.city.onchange = function(){
            var selectIndex = this.selectedIndex;//选中城市的下标
            //console.log(that.cityData);
            var areas=that.cityData[selectIndex-1].area;//当前城市的所有的区域
            that.drawSelect(areas,that.area);
        }
    }
}