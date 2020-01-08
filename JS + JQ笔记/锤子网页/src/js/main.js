requirejs.config({
    baseUrl: "./js/",
    paths: {
        "ajax": "./common/ajax",
        "mock": "./libs/mock",
        "alertt": "./common/alert",
        "rikao1": "./common/rikao1",
        "server": "./common/server",
        "rikao2": "./common/rikao2",
        "tableTurn": "./common/tableTurn",
        "2": "./common/2",
        "getData": "./common/getData",
        "ceshi1": "./app/ceshi1",
        "dialog": "./common/dialog",
        "serverModify": "./common/serverModify",
        "index": "./app/index",
        "text": "./libs/text",
        "headerHtml": "../template/header.html",
        "jquery": "./libs/jquery",
        "css": "./libs/css.min",
        "swiperCss": "../css/swiper.min",
        "swiper": "./libs/swiper.min",
        "login": "./app/login",
        "getData_login": "./common/getData_login",
        "addcar": "./common/addCart"
    },
    shim: {
        "swiper": {
            deps: ["css!swiperCss"],
            exports: "Swiper",
        }
    }
})