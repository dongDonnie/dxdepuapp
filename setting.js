cc.Class({
    extends: cc.Component,

    properties: {
        vSlider: cc.Slider,
        vProgressBar: cc.ProgressBar,
        YProgressBar: cc.ProgressBar,
        YSlider: cc.Slider
    },

    // use this for initialization
    onLoad: function () {
        this.initEvent();
        this.vSlider.progress = cc.MJ.data.getLocalStorage_yl();
        this.vProgressBar.progress = cc.MJ.data.getLocalStorage_yl();

        this.YSlider.progress = cc.MJ.data.getLocalStorage_yx();
        this.YProgressBar.progress = cc.MJ.data.getLocalStorage_yx();
    },

    //注销R
    requestLogout: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var logoutData = {
            "_Cmd": "logout",
            "_PID": _PID_temp,
            "_Data": {}
        };
        cc.MJ.socket.sendGetRequest(logoutData, null, this);
    },

    //调节音量
    onSliderVolumeEvent: function (sender, eventType) {
        this.vProgressBar.progress = sender.progress;
        cc.MJ.data.setLocalStorage_yl(sender.progress);
        cc.MJ.common.sound.setPlayVolume(sender.progress);
    },

    //调节音效
    onSliderSoundEffectEvent: function (sender, eventType) {
        // cc.sys.localStorage.setItem("_soundVal",sender.progress);
        this.YProgressBar.progress = sender.progress;
        cc.MJ.data.setLocalStorage_yx(sender.progress);
    },

    closeBtn: function () {
        this.node.active = false;
        this.node.emit('backHUD');
    },
    closegameBtn: function () {
        // this.node.active = false;
        // this.node.setPosition(p);
        var moveto_action = cc.moveTo(0.2, cc.p(1080, 0));
        this.node.runAction(moveto_action);
        // this.node.emit('backHUD');
    },
    //注册事件
    initEvent: function () {
        // require("EventConfig");
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;

        // //注销回调
        // this.node.on(_eventList.logout.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("注销成功");
        //         cc.MJ.data.setLocalStorage_LoginName("");
        //         cc.MJ.common.ui.loadScene("loginScene");
        //     }else {
        //         cc.log(data.detail._EMsg);
        //     }
        // });
    },

    //登出
    loginOut: function () {
        this.requestLogout();
        cc.MJ.common.sound.stopPlay();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
