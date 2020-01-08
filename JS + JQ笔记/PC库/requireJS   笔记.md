## 什么是require.js?
RequireJS是一个非常小巧的JavaScript模块载入框架，遵循AMD规范。
## 为什么用require.js?
最早的时候，所有Javascript代码都写在一个文件里面，只要加载这一个文件就够了。后来，代码越来越多，一个文件不够了，必须分成多个文件，依次加载。下面的网页代码，相信很多人都见过。

```
    <script src="1.js"></script>
　　<script src="2.js"></script>
　　<script src="3.js"></script>
　　<script src="4.js"></script>
　　<script src="5.js"></script>
　　<script src="6.js"></script>
```
段代码依次加载多个js文件。

这样的写法有很大的缺点。首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的1.js要在2.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

require.js的诞生，就是为了解决这两个问题：

(1)现js文件的异步加载，避免网页失去响应；

(2)管理模块之间的依赖性，便于代码的编写和维护。
## 使用require.js
### 加载 JavaScript 文件

```
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```
data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

###载入模块：require()函数

```
require(['moduleA', 'moduleB'], function (moduleA, moduleB){

　　　　// some code here

});
```
参数说明：
- 第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB']，即主模块依赖这三个模块； 
- 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。
## 定义模块：define()函数 

```
define(['moduleA', 'moduleB']，function (moduleA, moduleB){
    some code here // 模块的成员
    return {成员属性} // return 模块
});
```
参数说明：
- 第一个参数是一个数组，表示所依赖的模块,可省略
- 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

### 配置模块：config()函数

RequireJS以一个相对于baseUrl的地址来加载所有的代码。

##### 默认的baseUrl:

-有属性data-main，baseUrl默认与入口文件相同目录

-没有属性data-main，baseUrl默认是加载require.js的HTML文件相同目录

**baseUrl亦可通过RequireJS config手动设置。**


```
requirejs.config({
  baseUrl: 'js/lib',
  paths: {
        app: '../app'
    }
});

```
==模块加载时按照"baseUrl + paths"配置来解析路径== 

##### 如何避开这种解析方式呢？
- 以 ".js" 结束.
- 以 "/" 开始.
- 包含 URL 协议, 如 "http:" or "https:"


