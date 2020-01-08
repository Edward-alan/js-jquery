# HTML5本地存储Localstorage



## 什么是localstorage
通过本地存储（Local Storage），web 应用程序能够在用户浏览器中对数据进行本地的存储。

在 HTML5 之前，应用程序数据只能存储在 cookie 中，包括每个服务器请求。本地存储则更安全，并且可在不影响网站性能的前提下将大量数据存储于本地。

与 cookie 不同，存储限制要大得多（至少5MB），并且信息不会被传输到服务器。

本地存储经由起源地（origin）（经由域和协议）。所有页面，从起源地，能够存储和访问相同的数据。
## localstorage的使用
### 两种localstorage存储对象
- **window.localStorage** - 存储没有截止日期的数据
- **window.sessionStorage**- 针对一个 session 来存储数据（当关闭浏览器标签页时数据会丢失）
### localstorage的API
#### 存储数据
- localStorage.setItem("name","caibin") //存储名字为name值为caibin的变量
- localStorage.name = "caibin"; // 等价于上面的命令
#### 读取数据
- localStorage.getItem("name") //caibin,读取保存在localStorage对象里名为name的变量的值
- localStorage.name // "caibin"
- localStorage.valueOf() //读取存储在localStorage上的所有数据
- localStorage.key(0) // 读取第一条数据的变量名(键值)

```
//遍历并输出localStorage里存储的名字和值
for(var i=0; i<localStorage.length;i++){
  console.log('localStorage里存储的第'+i+'条数据的名字为：'+localStorage.key(i)+',值为：'+localStorage.getItem(localStorage.key(i)));
}
```
#### 删除某个变量
- localStorage.removeItem("name"); //undefined
#### 清空localStorage
- localStorage.clear()
#### 检查localStorage里是否保存某个变量
- localStorage.hasOwnProperty('name') 
```
//将JSON存储到localStorage里
var students = {
  xiaomin: {
    name: "xiaoming",
    grade: 1
  },
  teemo: {
    name: "teemo",
    grade: 3
  }
}
  
students = JSON.stringify(students); //将JSON转为字符串存到变量里
console.log(students);
localStorage.setItem("students",students);//将变量存到localStorage里
  
var newStudents = localStorage.getItem("students");
newStudents = JSON.parse(students); //转为JSON
console.log(newStudents); // 打印出原先对象
```

