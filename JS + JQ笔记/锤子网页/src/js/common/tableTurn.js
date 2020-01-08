/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-28 09:32:13
 * @LastEditTime: 2018-12-28 10:34:01
 * @LastEditors: Please set LastEditors
 */
define(["mock", "ajax"], function (Mock, ajax) {
    var context = document.getElementsByClassName("context")[0],
        title = document.getElementsByClassName("title")[0],
        container = document.getElementsByClassName("container")[0];


    Mock.mock("api/interFace", {
        "result|3": [{
            "title|+1": ["国内", "国外", "社会"],
            "lists|1": [{
                "name": "@cname",
                "title": "@ctitle"
            }]
        }]
    })

    ajax({
        url: "api/interFace",
        success: function (data) {
            var data = JSON.parse(data)
            rander(data)
            addEvent();
        }
    })

    function addEvent() {
        container.onclick = function (e) {
            // var ad = document.getElementsByClassName("ad");
            // var list = document.getElementsByClassName("list");
            if (e.target.className === "ad") {
                var index = e.target.getAttribute("data-index");
                for (var i = 0; i < 3; i++) {
                    ad[i].classList.remove("active");
                    list[i].style.display = "none";
                }
                ad[index].classList.add("active");
                list[index].style.display = "block";
            }
        }
    }
    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    function rander(data) {
        var html = ``,
            html1 = ``;
        data.result.forEach(function (item, index) {
            html += `<span class=ad data-index=${index}>${item.title}</span>`;
            html1 += `
            <ul class=list>
                <li>${item.lists.name}</li>
                <li>${item.lists.title}</li>
            </ul>
            `
        })

        title.innerHTML = html;
        context.innerHTML = html1;

        ad = document.getElementsByClassName("ad");
        list = document.getElementsByClassName("list");
        ad[0].classList.add("active");
        list[0].style.display = "block";
    }



})