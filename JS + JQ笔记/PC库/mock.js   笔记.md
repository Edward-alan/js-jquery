## 引入
在我们的生产实际中，后端的接口往往是较晚才会出来，并且还要写接口文档，于是我们的前端的许多开发都要等到接口给我们才能进行，这样对于我们前端来说显得十分的被动，于是有没有可以制造假数据来模拟后端接口呢，答案是肯定的。

应该有人通过编写json文件来模拟后台数据，但是很局限，比如增删改查这些接口怎么实现呢，于是今天我们来介绍一款非常强大的插件Mock.js，可以非常方便的模拟后端的数据，也可以轻松的实现增删改查这些操作。

一个简单的例子：

```
   Mock.mock('http://123.com',{
    'name|3':'fei',//这个定义数据的模板形式下面会介绍
    'age|20-30':25,
})

ajax({
    url:'http://123.com',
    dataType:'json',
    success:function(e){
       console.log(e)
    }
}) 
```
在这个例子中我们截获地址为http://123.com返回的数据是一个拥有name和age的对象，那么ajax返回的数据就是Mock定义的数据，返回的数据格式如下：

```
{
     name:'feifeifei',
     age:26,
}
```
## 介绍如何定义数据
=='name|rule': value==数据模板中的每个属性由 3 部分构成：属性名name、生成规则rule、属性值value：

1.'name|min-max': string   通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max
例子：'lastName|2-5':'jiang', 重复jiang这个字符串 2-5 次

2.'name|count': string   通过重复 string 生成一个字符串，重复次数等于 count
例子：'firstName|3':'fei', 重复fei这个字符串 3 次，打印出来就是'feifeifei'。

3.'name|min-max': number   生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
例子：'age|20-30':25, 生成一个大于等于 20、小于等于 30 的整数，属性值 25 只是用来确定类型

4.'name|+1': number   属性值自动加 1，初始值为 number
例子：'big|+1':0, 属性值自动加 1，初始值为 0，以后每次请求在前面的基础上+1

5.'name|min-max.dmin-dmax': number   生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。
例子：'weight|100-120.2-5':110.24, 生成一个浮点数,整数部分大于等于 100、小于等于 120，小数部分保留 2 到 5 位

6.'name|1': boolean   随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2
例子：'likeMovie|1':Boolean, 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

7.属性值是对象：var obj={'host':'www.baidu','port':'12345','node':'selector'}

　　7-1.'name|count': object  从属性值 object 中随机选取 count 个属性。
　　例子：'life1|2':obj, 从属性值 obj 中随机选取 2 个属性

　　7-2.'name|min-max': object  从属性值 object 中随机选取 min 到 max 个属性
　　例子：'life1|1-2':obj, 从属性值 obj 中随机选取 1 到 2 个属性。

8.属性值是数组：var arr=['momo','yanzi','ziwei']

　　8-1.'name|1': array   从属性值 array 中随机选取 1 个元素，作为最终值
　　例子：'friend1|1':arr, 从数组 arr 中随机选取 1 个元素，作为最终值。

　　8-2.'name|+1': array   从属性值 array 中顺序选取 1 个元素，作为最终值。
　　例子：'friend2|+1':arr, 从属性值 arr 中顺序选取 1 个元素，作为最终值，第一次就是'momo',第二次请求就是'yanzi'

　　8-3.'name|count': array   通过重复属性值 array 生成一个新数组，重复次数为 count。
　　例子：'friend3|2':arr, 重复arr这个数字2次作为这个属性值，得到数据应该是['momo','yanzi','ziwei','momo','yanzi','ziwei']

　　8-4.'name|min-max': array   通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max
　　例子：'friend3|2-3':arr,//通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3
　　
### 实际的ajax请求例子

```
var arr=['momo','yanzi','ziwei']
        var obj={
            'host':'www.baidu',
            'port':'12345',
            'node':'selector'
        }

        Mock.mock('http://www.bai.com',{
            'firstName|3':'fei',//重复fei这个字符串 3 次，打印出来就是'feifeifei'。
            'lastName|2-5':'jiang',//重复jiang这个字符串 2-5 次。
            'big|+1':0, //属性值自动加 1，初始值为 0
            'age|20-30':25,//生成一个大于等于 20、小于等于 30 的整数，属性值 25 只是用来确定类型
            'weight|100-120.2-5':110.24,//生成一个浮点数,整数部分大于等于 100、小于等于 120，小数部分保留 2 到 5 位。
            'likeMovie|1':Boolean,//随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
            'friend1|1':arr,//从数组 arr 中随机选取 1 个元素，作为最终值。
            'friend2|+1':arr,//从属性值 arr 中顺序选取 1 个元素，作为最终值
            'friend3|2-3':arr,//通过重复属性值 arr 生成一个新数组，重复次数大于等于 2，小于等于 3。
            'life1|2':obj,//从属性值 obj 中随机选取 2 个属性
            'life1|1-2':obj,//从属性值 obj 中随机选取 1 到 2 个属性。
            'regexp1':/^[a-z][A-Z][0-9]$/,//生成的符合正则表达式的字符串
            
        })

        $.ajax({
            url:'http://www.bai.com',
            dataType:'json',
            success:function(e){
                console.log(e)
            }
        })
```
### 如何实现数据 增 删 改 查 的模拟数据接口

```
/*模拟删除数据的方式*/
var arr=[
    {name:'fei',age:20,id:1},
    {name:'liang',age:30,id:2},
    {name:'jun',age:40,id:3},
    {name:'ming',age:50,id:4}
]

Mock.mock('http://www.bai.com','delete',function(options){
    var id = parseInt(options.body.split("=")[1])//获取删除的id
    var index;
    for(var i in arr){
        if(arr[i].id===id){//在数组arr里找到这个id
            index=i
            break;
        }
    }
    arr.splice(index,1)//把这个id对应的对象从数组里删除
    return arr;//返回这个数组,也就是返回处理后的假数据
})
$.ajax({
    url:'http://www.bai.com',
    type:"DELETE",
    data:{
        id:1//假设需要删除id=1的数据
    },
    dataType:'json',
    success:function(e){
        console.log(e)
    }
})
```




