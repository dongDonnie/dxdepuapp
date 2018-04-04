cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.updateTime();
        this.dianlaing = cc.MJ.common.jsb.getBattery();
        this.updateBattery(this.dianlaing);
        cc.MJ.common.jsb.notificationNetType();
        this.getCurrentNet();
        // this.signalStrengthTimer();
    },

    getCurrentNet: function () {
        var t = cc.MJ.common.jsb.getCurrentNet();
        this.updateWangluo(t);
    },

    updateTime: function () {
        var timer = function () {
            var t = cc.MJ.common.jsb.getCurrentTime();
            // cc.log(t.slice(0,5));
            var time = "";
            if (!t) {
                var testDate = new Date();

                time = testDate.toLocaleTimeString().slice(0, 5);     //获取当前时间
            } else {
                time = t.slice(0, 5);
            }

            this.node.getChildByName("navi").getChildByName("timeLabel").getComponent(cc.Label).string = time;
        };
        this.schedule(timer, 1);
    },

    updateBattery: function (t) {
        var battery = this.node.getChildByName("navi").getChildByName("electricity");
        var imageName = "electricity_4";
        if (t > 0 && t <= 0.25) {
            imageName = "electricity_1";
        } else if (t > 0.25 && t <= 0.5) {
            imageName = "electricity_2";
        } else if (t > 0.5 && t <= 0.95) {
            imageName = "electricity_3";
        } else if (t > 0.95 && t <= 1) {
            imageName = "electricity_4";
        }
        cc.MJ.common.tool.UITool.buttonLoadImage(battery, "new/" + imageName);
        // battery.getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("navi", imageName);
    },

    updateWangluo: function (status) {
        cc.log(status);
        if (status === "ReachableViaWiFi") {
            //无线网络
            var t = cc.MJ.common.jsb.getSignalStrength();
            this.isWiFi(t);
        } else if (status === "ReachableViaWWAN") {
            //数字网络
            var t = cc.MJ.common.jsb.getSignalStrengthReachableViaWWAN();
            this.isNet(t);
        } else if (status === "NotReachable") {
            //网络连接已断开
            this.getCurrentNet();
        }
    },

    isWiFi: function (t) {
        var wifi = this.node.getChildByName("navi").getChildByName("wifi");
        var imageName = "wifi_1";
        // if (t === 1) {
        //     imageName = "wifi01";
        // } else
        cc.log("wifi信号" + t)
        if (t === 0) {
            imageName = "wifi_1";
        } else if (t === 1 || t === 2) {
            imageName = "wifi_2";
        } else if (t === 3 || t === 4) {
            imageName = "wifi_3";
        } else if (t === 5) {
            imageName = "wifi_4";
        }
        cc.MJ.common.tool.UITool.buttonLoadImage(wifi, "new/" + imageName);
        // wifi.getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("navi", imageName);
    },

    isNet: function (t) {
        // var h = Math.abs(t)
        var wifi = this.node.getChildByName("navi").getChildByName("wifi");
        var imageName = "signal_1";
        if (t === 0) {
            imageName = "signal";
        } else if (t === 1) {
            imageName = "signal_1";
        } else if (t === 2) {
            imageName = "signal_2";
        } else if (t === 3) {
            imageName = "signal_3";
        } else if (t === 4) {
            imageName = "signal_4";
        }
        cc.MJ.common.tool.UITool.buttonLoadImage(wifi, "new/" + imageName);
        // wifi.getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("navi", imageName);
    },

    signalStrengthTimer: function () {
        var timer = function () {
            this.getCurrentNet();
        };
        this.schedule(timer, 10);
    },


    updatePingNum: function (pingNum) {
        var _ping = this.node.getChildByName("navi").getChildByName("wifi").getChildByName("ping");
        var _pinglabel = _ping.getComponent(cc.Label);
        pingNum = pingNum * 2;
        _pinglabel.string = pingNum + "ms";
        if (pingNum <= 80) {
            _ping.color = new cc.Color(48, 117, 66);
        } else if (pingNum > 80 && pingNum <= 200) {
            _ping.color = cc.Color.ORANGE;
        } else {
            _ping.color = cc.Color.RED;
        }
    }

    // getSignalStrength:function () {
    //     var t = cc.MJ.common.jsb.getSignalStrength();
    //     this.isWiFi(t);
    // }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
