cc.Class({
    extends: cc.Component,

    properties: {
        RCSlider: cc.Slider,
        RCProgressBar: cc.ProgressBar,

        fdbeishuLabel: cc.Label,
        menkanLabel: cc.Label,
        basebeishuLabel: cc.Label,
        fdLabel: cc.Label,

        TimeProgressBar: cc.ProgressBar,
        TimeSlider: cc.Slider,


    },

    // LIFE-CYCLE CALLBACKS:
    initEvent: function () {
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;
        // var self = this;


        // //创建房间回调
        // this.node.on(_eventList.createroom.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("创建房间成功");
        //         cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
        //         cc.director.loadScene("dpgameScene");
        //     } else {
        //         cc.log(data.detail._EMsg);

        //     }
        // });
    },
    start:function () {
        cc.sys.localStorage.setItem("matchGold",false);
        this.onLoad();
    },
    onLoad: function () {
        // this.RCArrData=[
        //     {beishu:1,FD:16,menkan:100,minGold:200},
        //     {beishu:2,FD:16,menkan:200,minGold:400},
        //     {beishu:3,FD:16,menkan:300,minGold:600},
        //     {beishu:4,FD:16,menkan:400,minGold:800},
        //     {beishu:5,FD:16,menkan:500,minGold:1000},
        //     {beishu:8,FD:16,menkan:800,minGold:1600},
        //     {beishu:10,FD:32,menkan:2000,minGold:4000},
        //     {beishu:15,FD:32,menkan:3000,minGold:6000},
        //     {beishu:25,FD:32,menkan:5000,minGold:10000},
        //     {beishu:50,FD:32,menkan:10000,minGold:20000},
        //     {beishu:125,FD:32,menkan:25000,minGold:50000},
        // ];
        this.RoomData = {
            "roomtype": "landlord",//房间类型（landlord：斗地主，niuniu：牛牛，dezhou：德州扑克）
            "playtype": "default", //玩法（default：亲友场，easy：初级场，middle：中级场，high：高级场）
            "mingold": 100, //门槛

            "gametime": 30, //游戏时间（单位为分钟）
            "playermingold": 200, //玩家最小带入金额（金币场使用）
            "mintimes": 1,
            "maxtimes": 16
        };
        this.TimeData=[30,60,90,120,180,240,300];
        var self = this;
        cc.loader.loadRes('Data/heroes', function (err, data) {
            if (err) {
                cc.error(err);
            } else {
                self.RCArrData = data;
            }
        });

    },

    onEnable:function(){
        this.initEvent();
    },

    Event_createRoom: function () {
        cc.MJ.common.sound.playBtnMusic();
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var createRoomData = {
            "_Cmd": "createroom",
            "_PID": _PID_temp,
            "_Data": {
                "_GOM": this.RoomData
            }
        };
        cc.MJ.socket.sendGetRequest(createRoomData,null,this);
        cc.MJ.data.setLocalStorage_playType(this.roomtype);
        cc.MJ.data.setLocalStorage_roomRule(JSON.stringify(this.RoomData));
    },
    Event_ruchang: function (sender, eventType) {
        var _arrval = sender.progress / (1 / (this.RCArrData.length - 1));

        var _data = this.RCArrData[Math.floor(_arrval)];
        this.fdbeishuLabel.string = _data.beishu * _data.FD;
        this.menkanLabel.string = _data.menkan + "/" + _data.minGold;
        this.basebeishuLabel.string = _data.beishu;
        this.fdLabel.string = _data.FD;

        sender.progress = Math.floor(_arrval) / 10;
        this.RCProgressBar.progress = Math.floor(_arrval) / 10;

        this.RoomData.mingold = _data.menkan;
        this.RoomData.playermingold = _data.minGold;
        this.RoomData.maxtimes = _data.FD;
        this.RoomData.mintimes = _data.beishu;
    },
    Event_time: function (sender, eventType) {
        var _arrval = sender.progress / (1 / 6);

        sender.progress = Math.floor(_arrval) * (1 / 6);
        this.TimeProgressBar.progress = Math.floor(_arrval) * (1 / 6);

        this.RoomData.gametime=this.TimeData[Math.floor(_arrval)];
    },
    Event_RoomClick:function (event,customEventData) {
        cc.director.loadScene(customEventData);
    }

});
