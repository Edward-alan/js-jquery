define([], function() {
    function addCar(opt) {
        this.a = opt.el;
        console.log(this.a)
        this.init()
    }
    addCar.prototype = {
        constructor: addCar,
        init: function() {
            var def = {
                id: "fff",
                name: "ddd"
            }
            var arr = [];
            var ls = localStorage;
            arr.push(def)
            ls.setItem("def", JSON.stringify(arr))
            var rs = JSON.parse(ls.getItem("arr")) ? ls.setItem("def", JSON.stringify(arr)) : []
            console.log(rs)
            '于是爱恨交错人消愁，怕只怕这些苦没来由  于是悲欢离合人静默， 等一等这些伤会自由'
        }
    }
    return addCar;

})