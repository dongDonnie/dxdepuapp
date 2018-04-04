/**
 * Created by hxl on 2017/7/6.
 * 静态资源配置，图片，声音，聊天固定文案等
 */
var staticModuledata=cc.Class({
    extends: cc.Component,
    properties: {

    },
    ctor: function () {

    },
    statics:{
        seatPai: {
            // bottom: {in: "Image/pai/my/in/p", out: "Image/pai/my/out/p"},
            // left: {in: "Image/pai/back/left", out: "Image/pai/top/p"},
            // right: {in: "Image/pai/back/right", out: "Image/pai/down/p"},
            // top: {in: "Image/pai/back/opposit", out: "Image/pai/my/out/p"}

            bottom: {in: "in/p", out: "out/p"},
            left: {in: "pai_back/left", out: "left/p"},
            right: {in: "pai_back/left", out: "right/p"},
            top: {in: "pai_back/opposit", out: "out/p"}
        },
        touming:"Image/wqtouming",

    }
});