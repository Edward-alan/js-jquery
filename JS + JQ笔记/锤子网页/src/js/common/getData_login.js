define(["mock"], function (Mock) {
    var login = [{
        username: "史志龙",
        password: "13171996138",
    },{
        username:"1",
        password:"2",
    }]
    Mock.mock("api/loginFace", function (par) {
        // var data = JSON.parse('{"' + par.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        var data = JSON.parse('{"' + par.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        // console.log(data);
        // var data=(par.body+'"}')
        var result = login.filter(function (item) {
            return item.username == data.username && item.password == data.password;
        })

        console.log(result)

        if (result.length) {
            return {
                status: 1,
                img: "图片路径",
                username: result[0].username,
            };
        } else {
            return {
                status: 0,
            }
        }
    })


})