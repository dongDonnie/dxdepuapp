/**
 * Created by hxl on 2017/7/6.
 * 配置文件管理
 */
cc.Class({
    extends: cc.Component,
    properties: {

    },
    ctor: function () {

    },statics:{
        initModule:function () {
            var _GameModule=require("GameModule");
            var _StaticModule=require("StaticModule");
            return {Static:_StaticModule,game:_GameModule};
        }
    }
});