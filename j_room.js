cc.Class({
    extends: cc.Component,

    properties: {
        isbegin: null
    },

    // use this for initialization
    onLoad: function () {
        this.initEvent();
        this.isbegin = true;
    },

    closeBtn: function () {
        cc.MJ.common.sound.playBtnMusic();
        this.node.active = false;
        this.node.emit('backHUD');
    },

    initNum:function () {
        var t = ["请","输","入","房","间","号"];
        this.isbegin = true;
        for(var i=1;i<7;i++){
            var node=this.node.getChildByName("num"+i);
            var label=node.getComponent(cc.Label);
            label.string =t[i-1];
        }
    },

    //输入房间号
    clickNumToText:function(event,customEventData){
        cc.MJ.common.sound.playBtnMusic();
        if (this.isbegin) {
            this.clearText();
            this.isbegin = false;
        }
        var roomNo="";
        for(var i=1;i<7;i++){
            var node=this.node.getChildByName("num"+i);
            var label=node.getComponent(cc.Label);

            if (!label.string) {
                label.string =customEventData;
                roomNo+=customEventData.toString()+"-";
                if(i==6){
                    cc.MJ.data.setLocalStorage_roomNo(roomNo.replace(/-/g,""));
                    this.requestSitDown(roomNo.replace(/-/g,""));
                }
                break;
            }else {
                roomNo+=label.string+"-";
            }
        }
    },

    //清空
    clearText:function(){
        for(var i=1;i<7;i++){
            var node=this.node.getChildByName("num"+i);
            var label=node.getComponent(cc.Label);
            label.string ="";
        }
        cc.MJ.common.sound.playBtnMusic();
    },

    //删除
    delText:function(){
        for(var i=6;i>0;i--){
            var node=this.node.getChildByName("num"+i);
            var label=node.getComponent(cc.Label);
            if (label.string) {
                label.string ="";
                break;
            }
        }
        cc.MJ.common.sound.playBtnMusic();

    },

    //加入房间R
    requestSitDown:function (_rNO) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var sitdownData = {
            "_Cmd": "sitdown",
            "_PID": _PID_temp,
            "_Data": {
                "_SNo": -1,    //  指定座位编号（-1表示系统安排）
                "_RNo": _rNO    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(sitdownData,null,this);
    },

    //注册事件
    initEvent:function () {
        // require("EventConfig");
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;
        //
        // //加入房间回调
        // this.node.on(_eventList.sitdown.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("加入房间成功");
        //         cc.director.loadScene('startScene');
        //     }else {
        //         cc.log(data.detail._EMsg);
        //         cc.MJ.alert.tips_msg(data.detail._EMsg);
        //     }
        // });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
