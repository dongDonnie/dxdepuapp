cc.Class({
    extends: cc.Component,

    properties: {
        //局数Btn
        inningButton: {
            default: [],
            type: cc.Toggle
        },

        //勒子Btn
        leziBtn: {
            default: [],
            type: cc.Toggle
        },

        //玩法Btn
        hhplayButton: {
            default: [],
            type: cc.Toggle
        },
        //鸟数
        birldNumButton: {
            default: [],
            type: cc.Toggle
        },

        leftChooseButton: {
            default: [],
            type: cc.Toggle
        },

        //创建房间数据
        Check_obj_list:null
    },

    // use this for initialization
    onLoad: function () {
        //默认数据
        // this.Check_obj_list = {minflower:1,count:4,playtype:"default",maxtimes:10,score:2,fly:1};
        this.Check_obj_list = {minflower:1,count:4,playtype:"",roomtype:"",maxtimes:10,score:2,fly:1};
        this.initEvent();
    },

    initView:function () {
        if (cc.MJ.data.getLocalStorage_roomType() === "qiaoma") {
            this.Check_obj_list.roomtype="qiaoma";
            this.Check_obj_list.playtype = "qiaoma";
            this.leftChooseButton[1].isChecked = true;
            this.leftChooseButton[0].isChecked = false;
            this.node.getChildByName("xzLayout").getChildByName("dh_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("jsxz_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("wfxz_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("lz_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("wf_hh_all").active = false;
            this.node.getChildByName("xzLayout").getChildByName("niao").active = false;
        } else if (cc.MJ.data.getLocalStorage_roomType() === "huanghuang") {
            this.Check_obj_list.roomtype = "huanghuang";
            this.Check_obj_list.playtype = "default";
            this.leftChooseButton[0].isChecked = true;
            this.leftChooseButton[1].isChecked = false;
            this.node.getChildByName("xzLayout").getChildByName("dh_all").active = false;
            this.node.getChildByName("xzLayout").getChildByName("jsxz_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("wfxz_all").active = false;
            this.node.getChildByName("xzLayout").getChildByName("lz_all").active = false;
            this.node.getChildByName("xzLayout").getChildByName("wf_hh_all").active = true;
            this.node.getChildByName("xzLayout").getChildByName("niao").active = true;
        }
    },

    //底花
    dihua:function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        if (toggle.isChecked) {
            this.Check_obj_list.minflower = 1;
        } else {
            this.Check_obj_list.minflower = 1;
        }
    },

    //玩法选择
    wfxz:function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        if (toggle.isChecked) {
            this.Check_obj_list.fly = 1;
        } else {
            this.Check_obj_list.fly = 0;
        }
    },

    //勒子
    lezi:function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index = this.leziBtn.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.maxtimes = 10;
                break;
            case 1:
                this.Check_obj_list.maxtimes = 20;
                break;
            default:
                break;
        }
    },

    //局数
    inningButtonClicked: function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index= this.inningButton.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.count = 4;
                break;
            case 1:
                this.Check_obj_list.count = 8;
                break;
            case 2:
                this.Check_obj_list.count = 12;
                break;
            default:
                break;
        }
    },

    //玩法
    playButtonClicked:function (toggle)  {
        cc.MJ.common.sound.playBtnMusic();
        var index= this.hhplayButton.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.playtype = "default";
                break;
            case 1:
                this.Check_obj_list.playtype = "zhong";
                break;
            default:
                break;
        }
    },

    //抓鸟
    birldNumButtonClicked:function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index= this.birldNumButton.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.score = 2;
                break;
            case 1:
                this.Check_obj_list.score = 4;
                break;
            case 2:
                this.Check_obj_list.score = 6;
                break;
            case 3:
                this.Check_obj_list.score = 8;
            default:
                break;
        }
    },

    //创建
    clickCreateBtn:function (event) {
        cc.log(this.Check_obj_list);
        this.requestCreateRoom(this.Check_obj_list);
        var node=event.target;
        node.getComponent(cc.Button).enabled=false;
        this.scheduleOnce(function () {
            node.getComponent(cc.Button).enabled=true;
        },3);

       // this.node.active=false;
    },

    //创建房间Request
    requestCcroom: function () {
        var obj = this.Check_obj_list;
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _ccroomData = {
            "_Cmd": "ccroom",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid,
                "_GOM": {
                    "roomtype":obj.roomtype,
                    "playtype": obj.playtype,       //  玩法（default, zhong,qiaoma）
                    "count": obj.count,             //  局数
                    //"count": 1,
                    "minflower":obj.minflower,      //底花（minflower：1）
                    "maxtimes":obj.maxtimes,        // 勒子（maxtimes：10倍底花，20倍底花）
                    "fly":obj.fly,                  //苍蝇（fly：1/0）
                    "score": obj.score              //  摸鸟数
                }
            }
        };
        cc.MJ.socket.sendGetRequest(_ccroomData, null, null);
    },

    closeBtn: function () {
        cc.MJ.common.sound.playBtnMusic();
        this.node.active = false;
        this.node.emit('backHUD');
    },

    chooseButtonClicked:function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index= this.leftChooseButton.indexOf(toggle);
        switch (index) {
            case 0:
                cc.MJ.data.setLocalStorage_roomType("huanghuang");
                this.Check_obj_list.roomtype="huanghuang";
                this.initView();
                break;
            case 1:
                cc.MJ.data.setLocalStorage_roomType("qiaoma");
                this.Check_obj_list.roomtype="qiaoma";
                this.initView();
                break;
            default:
                break;
        }
    },

    //创建房间R
    requestCreateRoom:function (obj) {
        cc.MJ.common.sound.playBtnMusic();
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var createRoomData = {
            "_Cmd": "createroom",
            "_PID": _PID_temp,
            "_Data": {
                "_GOM": {
                    "roomtype":obj.roomtype,
                    "playtype": obj.playtype,       //  玩法（default, zhong,qiaoma）
                    "count": obj.count,             //  局数
                    //"count": 1,
                    "minflower":obj.minflower,      //底花（minflower：1）
                    "maxtimes":obj.maxtimes,        // 勒子（maxtimes：10倍底花，20倍底花）
                    "fly":obj.fly,                  //苍蝇（fly：1/0）
                    "score": obj.score              //  摸鸟数
                }
            }
        };
        cc.MJ.socket.sendGetRequest(createRoomData,null,this);
        cc.MJ.data.setLocalStorage_playType(obj.roomtype);
    },

    //注册事件
    initEvent:function () {
        // require("EventConfig");
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;
        // var self = this;
        //
        // //创建房间回调
        // this.node.on(_eventList.createroom.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("创建房间成功");
        //         cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
        //         cc.MJ.common.ui.loadScene("startScene");
        //     } else {
        //         cc.log(data.detail._EMsg);
        //         cc.MJ.alert.tips_msg(data.detail._EMsg);
        //     }
        // });
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
