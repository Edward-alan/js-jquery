for (var i = 1; i <= 9; i++) { //乘法表
    for (var j = 1; j <= 9; j++) {
        console.log(`${i}* ${j} = ${i*j}`)
    }
}


//ES6方法: 
let arr = [1, 2, 3, 2, 1, 2, 2, 1, 5, 9]
console.log(arr = Array.from(new Set(arr)))

//封装排重
var arr = [10, 20, 30, 10, 30, 20, 45, 62, 12];
var ipt = [];
for (var i = 0; i < arr.length; i++) {
    if (ipt.indexOf(arr[i]) == -1) {
        ipt.push(arr[i]);
    }
}
console.log(ipt)


//排序
var arra = [10, 20, 30, 50, 40, 70, 60];
arra.sort(
    function(a, b) {
        return b - a;
    }
)
console.log(arra)