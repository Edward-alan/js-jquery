define(["mock"], function (Mock) {
    Mock.mock("api/interFace", function (a) {
        var modleData = [{
                username: "王超",
                password: "很帅",
            },
            {
                username: "123",
                password: "123",
            },
        ]

        var data = JSON.parse('{"' + a.body.replace(/=/g, '":"').replace(/&/g, '","') + '"}')

        var flag = modleData.some(function (item) {
            return item.username == data.username && item.password == data.password;
        })
        if (flag) {
            return {
                message: "成功",
                status: 1,
                username: data.username,
            }
        } else {
            return {
                message: "失败",
                status: 0,
            }
        }
    })
})