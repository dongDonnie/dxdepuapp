/**
 * Created by hxl on 2017/7/6.
 * 连接地址，功能开关等基础配置
 */
var  _test_url= "ws://106.14.134.149:8088/five_service/websocket";
var  _product_url= "ws://www.jingyeqipai.com:8080/game_service/websocket";
var Config=cc.Class({
    extends: cc.Component,
    properties: {

    },
    statics: {
         Url: _test_url
         //{
        //     get: function () {
        //         return _test_url;
        //     }
        // }

    }
});
