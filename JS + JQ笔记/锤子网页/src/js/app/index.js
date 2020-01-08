/*
 * @Description: 锤子科技
 * @Author: 史志龙
 * @Date: 2019-01-02 11:50:07
 * @LastEditTime: 2019-01-08 16:21:38
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 
 * @param {type} 
 * @return: undenfind
 */
// 定义主模块 
define(["ajax", "text!headerHtml!strip", "swiper", "mock", "addcar"], function(ajax, headHtml, Swiper, Mock, Cart) {
    //定义主对象
    var car = new Cart({
        el: 1
    })
    console.log(car)
    var index = {
            //头部导航模块
            head: {
                // 初始化
                init: function() {
                    //开始渲染数据
                    this.getData();
                    // 开始用户登录功能
                    this.user();
                },
                // 获取数据并写入页面
                getData: function() {
                    var head = document.getElementsByClassName("header")[0];
                    head.innerHTML = headHtml;
                },
                //用户登录功能
                user: function() {
                    //获取Dom元素
                    var user = document.getElementsByClassName("user")[0].parentNode;
                    var userInfo = document.getElementsByClassName("user-info")[0];
                    var username = document.getElementsByClassName("username")[0];
                    var cancle = document.getElementsByClassName("cancle")[0];
                    //添加鼠标进入事件
                    user.onmouseenter = function() {
                        if (localStorage.getItem("user")) {
                            userInfo.style.display = "block";
                            var userData = JSON.parse(localStorage.getItem("user"));
                            username.innerHTML = userData.username;
                        }
                    };
                    //添加鼠标离开事件
                    user.onmouseleave = function() {
                        userInfo.style.display = "none";
                    };
                    //添加鼠标点击退出事件
                    cancle.onclick = function() {
                        localStorage.removeItem("user")
                        userInfo.style.display = "none";

                    }

                }
            },
            //二级导航模块
            nav: {
                //初始化
                init: function() {
                    //开始获取数据
                    this.getData();
                    //开始渲染页面
                    this.search();
                    //开始吸顶功能
                    this.Mounting();
                },
                //定义获取数据方法
                getData: function() {
                    var that = this;
                    ajax({
                        url: "../mock/nav_second.json",
                        dataType: "json",
                        success: function(data) {
                            //开始渲染页面
                            that.rander(data)
                        }
                    })
                },
                //定义渲染方法
                rander: function(data) {
                    var nav = document.querySelector(".nav-container");
                    //遍历数据
                    nav.innerHTML = data.map(function(item) {
                        return `<li><a href=${item.url}>${item.name}</a></li>`;
                    }).join("");
                    var content = nav.getElementsByTagName("li");
                    var div = document.createElement("div");
                    //遍历数据
                    div.innerHTML = data[1].list.map(function(item) {
                        return ` <div>
                                <img src="${item.ali_image}"
                                    alt="">
                                <p>${item.sku_name.split("（")[0]}</p>
                                <p>
                                    <span class="red">￥${item.sell_price}</span> 
                                起</p>
                            </div>`;
                    }).join("");
                    content[1].appendChild(div)
                },
                //定义搜索方法   有问题!!!!!!
                search: function() {
                    var search = document.getElementsByClassName("search")[0];
                    var searchResult = document.getElementsByClassName("search-result")[0];
                    search.onfocus = function(e) {
                        e.preventDefault();
                        searchResult.style.display = "block";
                    };
                    search.onblur = function() {
                        searchResult.style.display = "none";
                    };
                    searchResult.onclick = function(e) {
                        if (e.target.localName == "li") {
                            search.value = e.target.innerHTML;
                            searchResult.style.display = "none";
                        }
                    };
                    // document.onclick = function(){
                    //     searchResult.style.display = "none";
                    // }
                },
                //定义吸顶功能
                Mounting: function() {
                    var nav = document.getElementsByClassName("nav")[0];
                    var banner = document.getElementsByClassName("banner")[0];
                    var navTop = nav.offsetTop;
                    //添加滚动事件
                    window.onscroll = function() {
                        var top = document.documentElement.scrollTop;
                        if (top >= navTop) {
                            nav.classList.add("fixed");
                            banner.style.marginTop = "96px";
                        } else {
                            nav.classList.remove("fixed");
                            banner.style.marginTop = "";
                        }
                    }
                },
            },
            //轮播图模块
            banner: {
                // 初始化
                init: function() {
                    //开始轮播图
                    this.setbanner();
                },
                //定义轮播方法
                setbanner: function() {
                    var mySwiper = new Swiper('.banner-container', {
                        // direction:"vertical",
                        autoplay: {
                            delay: 2000,
                        },
                        loop: true,
                        pagination: {
                            el: ".page",
                            clickable: true,
                        },
                        navigation: {
                            nextEl: ".next",
                            prevEl: ".prev",
                        },
                    });
                    // 开始鼠标进入事件
                    this.addEvent(mySwiper);
                },
                //定义鼠标进入事件
                addEvent: function(mySwiper) {
                    var bannerWrapper = document.getElementsByClassName("banner-wrpper")[0];
                    // 绑定鼠标第一次进入事件
                    bannerWrapper.onmouseenter = function() {
                        mySwiper.autoplay.stop();
                    };
                    // 绑定鼠标第一次离开事件
                    bannerWrapper.onmouseleave = function() {
                        mySwiper.autoplay.start();
                    }
                }
            },
            //热销模块
            bottom: {
                //初始化
                init: function() {
                    this.getData();
                },
                //定义获取数据方法
                getData: function() {
                    var that = this;
                    ajax({
                        url: "../mock/home.json",
                        type: "post",
                        dataType: "json",
                        success: function(data) {
                            var data = data.data.home_hot;
                            //开始渲染页面
                            that.rander(data)
                        }
                    })
                },
                // 定义渲染数据方法
                rander: function(data) {
                    var bottomWrapper = document.getElementsByClassName("bottom-wrapper")[0];
                    //渲染轮播主体 同时调用小图标列表方法和图片列表方法
                    bottomWrapper.innerHTML = data.map(function(item) {
                            return `
                    <div class="swiper-slide bottom-slide">
                        <div class="img-list">
                            ${randerImg(item)}
                        </div>
                        <p class="title">${item.spu.name}</p>
                        <p class="desc">${item.spu.shop_info.spu_mobile_sub_title}</p>
                        <div class="logo">
                            <ul>
                                ${randerList(item)}
                            </ul>
                        </div>
                        <p class="price">￥${item.spu.price}.00</p>
                        <button>加入购物车</button>
                    </div> `;
                        }).join("")
                        //定义获取小图标列表方法
                    function randerList(data) {
                        var data = data.spu.shop_info.spec_v2[0].spec_values;
                        var dataList = data.map(function(item, index) {
                            return `
                            <li data-index=${index}><i style="background:url(${item.image});background-size:100% 100%;"></i></li>
                        `;
                        }).join("");
                        return dataList;
                    }
                    //定义获取图片列表方法
                    function randerImg(data) {
                        data = data.spu.sku_info;
                        var arrData = [];
                        data.map(function(item) {
                            if (arrData.indexOf(item.ali_image) == -1) {
                                arrData.push(item.ali_image)
                            }
                        })
                        return arrData.map(function(item) {
                            return `
                        <img src="${item}"
                        alt="">
                        `;
                        }).join("");
                    }
                    //开始事件
                    this.addEvent();
                },
                // 定义加入事件方法
                addEvent: function() {
                    //实例化轮播图
                    var mySwiper = new Swiper('.bottom-container', {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        navigation: {
                            nextEl: ".bottom-right",
                            prevEl: ".bottom-left",
                        },
                    });
                    var bottomContainer = document.getElementsByClassName("bottom-container")[0];
                    //开始事件委托
                    bottomContainer.onmouseover = function(e) {
                        if (e.target.localName == "li") {
                            var index = e.target.getAttribute("data-index");
                            var nodeList = [...e.target.parentNode.children];
                            var nodePar = [...e.target.parentNode.parentNode.parentNode.querySelector(".img-list").children];
                            var node = e.target.parentNode.parentNode.parentNode.querySelector(".img-list").children[index];
                            nodePar.forEach(function(item) {
                                item.style.display = "none";
                            })
                            nodeList.forEach(function(item) {
                                item.style.border = "2px solid rgba(100, 100, 100, .01)";
                            })
                            node.style.display = "block";
                            e.target.style.border = "2px solid rgba(100, 100, 100, .5)";
                        }
                    }
                },
            },
            //楼层模块
            floor: {
                //初始化
                init: function() {
                    // 开始获取数据
                    this.getData();

                },
                // 获取数据
                getData: function() {
                    var that = this;
                    ajax({
                        url: "../mock/home.json",
                        dataType: "json",
                        type: "post",
                        success: function(data) {
                            //开始渲染数据
                            that.rander(data.data.home_floors)
                        }
                    })
                },
                // 渲染数据
                rander: function(data) {
                    var floor = document.getElementsByClassName("floor")[0];
                    //开始渲染5个模块
                    floor.innerHTML = data.map(function(item) {
                        return `
                    <div class="floor-box">
                    <div class="bottom-top">
                        <span>${item.title}</span>
                    </div>
                    <div class="bottom-container">
                        <div class="bottom-wrapper clear">
                            <div class="big-img">
                                <img src="${item.tabs[0].tab_items[0].image}"
                                    alt="">
                            </div>
                            ${slide(item.tabs[0].tab_items.slice(1))}
                        </div>
                    </div>
                </div>
                    `;
                    }).join("");
                    // 每个slide盒子
                    function slide(data) {
                        return data.map(function(item) {
                            return `
                        <div class="bottom-slide">
                            <div class="img-list">
                                ${randerImg(item)}
                            </div>
                            <p class="title">${item.spu.name}</p>
                            <p class="desc">${item.spu.shop_info.spu_mobile_sub_title}</p>
                            <div class="logo">
                                <ul>
                                   ${randerList(item)}
                                </ul>
                            </div>
                            <p class="price">￥${item.spu.price}.00</p>
                        </div>
                        `;
                        }).join("");
                    };
                    //定义获取小图标列表方法
                    function randerList(data) {
                        var data = data.spu.shop_info.spec_v2[0].spec_values;
                        var dataList = data.map(function(item, index) {
                            if (item.image) {
                                return `
                                <li data-index=${index}><i style="background:url(${item.image});background-size:100% 100%;"></i></li>
                        `;
                            } else {
                                return `
                                <li data-index=${index}><i></i></li>
                            `;
                            };

                        }).join("");
                        return dataList;
                    }
                    //定义获取图片列表方法
                    function randerImg(data) {
                        data = data.spu.sku_info;
                        var arrData = [];
                        data.map(function(item) {
                            if (arrData.indexOf(item.ali_image) == -1) {
                                arrData.push(item.ali_image)
                            }
                        })
                        return arrData.map(function(item) {
                            return `
                        <img src="${item}"
                        alt="">
                        `;
                        }).join("");
                    }

                    // 渲染楼层列表
                    var div = document.createElement("div");
                    div.className = "nav-floor";
                    var html = data.map(function(item, index) {
                        return `<li data-index="${index}">${item.title}</li>`
                    }).join("");
                    html += "<li>回到顶部</li>"
                    div.innerHTML = "<ul>" + html + "</ul>";
                    document.body.insertBefore(div, document.body.firstChild);
                    // 开始添加事件
                    this.addEvent();
                },
                //添加事件
                addEvent: function() {
                    //事件委托
                    var floor = document.getElementsByClassName("floor")[0];
                    var navFloor = document.getElementsByClassName("nav-floor")[0];
                    var liList = [...navFloor.getElementsByTagName("li")];
                    floor.onmouseover = function(e) {
                        if (e.target.localName == "li") {
                            var index = e.target.getAttribute("data-index");
                            var nodeList = [...e.target.parentNode.children];
                            var nodePar = [...e.target.parentNode.parentNode.parentNode.querySelector(".img-list").children];
                            var node = e.target.parentNode.parentNode.parentNode.querySelector(".img-list").children[index];
                            nodePar.forEach(function(item) {
                                item.style.display = "none";
                            })
                            nodeList.forEach(function(item) {
                                item.style.border = "2px solid rgba(100, 100, 100, .01)";
                            })
                            node.style.display = "block";
                            e.target.style.border = "2px solid rgba(100, 100, 100, .5)";
                        }
                    };
                    //添加楼梯滚动效果
                    var arrTop = [];
                    var floorBox = [...document.getElementsByClassName("floor-box")];
                    floorBox.forEach(function(item) {
                        arrTop.push(item.offsetTop - item.offsetHeight);
                    });
                    var arrTopLength = arrTop.length;
                    window.addEventListener("scroll", function() {
                            var scroll = document.documentElement.scrollTop;
                            if (scroll > arrTop[0]) {
                                navFloor.style.display = "block";
                                arrTop.forEach(function(item, index) {
                                    if (index == arrTopLength - 1) {
                                        if (item < scroll) {
                                            var li = navFloor.querySelector(".active");
                                            if (li) {
                                                li.classList.remove("active");
                                            }
                                            liList[index].classList.add("active");
                                        }
                                    } else if (item < scroll && arrTop[index + 1] > scroll) {
                                        var li = navFloor.querySelector(".active");
                                        if (li) {
                                            li.classList.remove("active");
                                        }
                                        liList[index].classList.add("active");
                                    }
                                })
                            } else {
                                navFloor.style.display = "none";
                            }
                        }, true)
                        //添加点击事件
                    navFloor.onclick = function(e) {
                        if (e.target.localName == "li") {
                            alert(e.target.innerHTML)
                            var index = e.target.getAttribute("data-index");
                            document.documentElement.scrollTop = arrTop[index] + 10;
                            var scroll = document.documentElement.scrollTop;
                            if (scroll > arrTop[0]) {
                                navFloor.style.display = "block";
                                arrTop.forEach(function(item, index) {
                                    if (index == arrTopLength - 1) {
                                        if (item < scroll) {
                                            var li = navFloor.querySelector(".active");
                                            if (li) {
                                                li.classList.remove("active");
                                            }
                                            liList[index].classList.add("active");
                                        }
                                    } else if (item < scroll && arrTop[index + 1] > scroll) {
                                        var li = navFloor.querySelector(".active");
                                        if (li) {
                                            li.classList.remove("active");
                                        }
                                        liList[index].classList.add("active");
                                    }
                                })
                            } else {
                                navFloor.style.display = "none";
                            }
                        }
                    }
                },
            },
            //页面懒加载功能
            lazyImg: {
                init: function() {
                    console.log("懒加太简单,不想写！！！！")
                },
            }
        }
        //头部模块开始
    index.head.init();
    //二级模块开始
    index.nav.init();
    //轮播图导航开始
    index.banner.init();
    //热门商品开始
    index.bottom.init();
    //楼层功能开始
    index.floor.init();
    // 懒加载功能开始
    index.lazyImg.init();
})