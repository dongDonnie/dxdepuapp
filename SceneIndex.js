/**
 * Created by hxl on 2017/7/6.
 */

cc.Class({
    extends: cc.Component,

    properties: {
        //加入房间
        joinHome_pre: {
            default: null,
            type: cc.Prefab
        },
        noticeNode: cc.Node,
        roomcardNode: cc.Node
    },

    initNativeData: function () {
        // 至少调用一次,尽量减少其他调用,初始化位置,后续由原生监听推送
        this.node.getComponent("CommonJSBBack").sendPosition();
        var _ip = cc.sys.localStorage.getItem("_ip");
        if (!_ip) {
            this.node.getComponent("CommonJSBBack").sendIP();
        }
    }, onLoad: function () {
        if (!cc.MJ) {
            cc.MJ.common.ui.loadScene('ConfigScene');
        }
        if (cc.MJ.User) {
            this.setUserData(cc.MJ.User);
        }

        var zj_status = cc.sys.localStorage.getItem("zj_status");
        cc.log(zj_status);
        if (zj_status === "true") {
            this.mjstandings();
            this.showzjRoom();
        }
        cc.sys.localStorage.setItem("zj_status", "false");
        this.initEvent();
        this.requestUser();
        this.requestConfig();
        cc.MJ.common.sound.stopPlay();
        if (cc.MJ.common.sound.getPlayState() !== 1) {
            cc.MJ.common.sound.playbgMusic("music_logo");
        }


        this.initNativeData();
        this.weiChatJoinRoom();
        cc.MJ.alert.show_net_tips();
        cc.MJ.common.jsb.startLocal();
    },

    //用户信息R
    requestUser: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var userData = {
            "_Cmd": "user",
            "_PID": _PID_temp,

        };
        cc.MJ.socket.sendGetRequest(userData, null, this);
    },
    //用户信息R
    requestConfig: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _roomcard = {
            _Cmd: "config",
            _PID: _PID_temp,
            _Data: {_Code: null}
        };
        // var _notice = {
        //     _Cmd: "config",
        //     _PID: _PID_temp,
        //     _Data: {_Code:"notice"}
        // };
        // cc.MJ.socket.sendGetRequest(_notice, null, this);
        cc.MJ.socket.sendGetRequest(_roomcard, null, this);
    },
    //帮助
    mjHelp: function () {
        cc.log("点击了");
        var bz = this.node.getChildByName("GZ");
        this.showPopView(bz);
        cc.MJ.common.sound.playBtnMusic();
    },

    //设置
    mjSetting: function () {
        // cc.MJ.common.ui.popView(this.setting_pre, this.node);
        var setting = this.node.getChildByName("Setting");
        this.showPopView(setting);
        cc.MJ.common.sound.playBtnMusic();
    },

    //创建房间
    mjcreateHome: function () {
        var cj_room = this.node.getChildByName("CJ_room");
        this.showPopView(cj_room);
        cc.MJ.common.sound.playBtnMusic();
    },

    //加入房间
    mjjoinHome: function () {
        // cc.MJ.common.ui.popView(this.joinHome_pre, this.node);
        var join_room = this.node.getChildByName("joinRoom");
        this.showPopView(join_room);
        join_room.getComponent("j_room").initNum();
        cc.MJ.common.sound.playBtnMusic();
    },

    //房卡信息
    mjroomCard: function () {
        cc.MJ.common.sound.playBtnMusic();
        var roomcard = this.node.getChildByName("roomCard");
        roomcard.active = true;
        this.node.getChildByName("backHUD").active = true;
        // cc.MJ.common.jsb.buyGold("gamejiangzongmajiang8668");

        // cc.MJ.common.jsb.showAlert("测试","这是一个弹框","http://www.baidu.com");
    },

    //关闭房卡信息
    closeRoomCard: function () {
        var roomcard = this.node.getChildByName("roomCard");
        this.node.getChildByName("backHUD").active = false;
        roomcard.active = false;
    },

    //分享
    mjshare: function () {
        // cc.MJ.common.ui.popView(this.share_pre, this.node);
        var fx = this.node.getChildByName("FX");
        this.showPopView(fx);
        cc.MJ.common.sound.playBtnMusic();
    },

    //反馈
    mjservice: function () {
        // cc.MJ.common.ui.popView(this.service_pre, this.node);
        var kf = this.node.getChildByName("KF");
        this.showPopView(kf);
        cc.MJ.common.sound.playBtnMusic();
    },

    //福利
    fuli: function () {
        // var fl = this.node.getChildByName("FL");
        // this.showPopView(fl);
        // cc.MJ.common.sound.playBtnMusic();
        cc.MJ.common.ui.loadScene('webScene');
    },

    //战绩
    mjstandings: function () {
        this.requestRpscore();
        var self = this;
        var zhanji_all = this.node.getChildByName("ZJ_all");
        this.showPopView(zhanji_all);
        // zhanji_all.getComponent("zj_all").requestRpscore();
        cc.MJ.common.sound.playBtnMusic();

        zhanji_all.on("showzjroom", function () {
            self.showzjRoom();
            // cc.log("-------收到消息了");
        });

        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
    },

    //任务
    renwu: function () {
        var rw = this.node.getChildByName("RW");
        this.showPopView(rw);
        cc.MJ.common.sound.playBtnMusic();
    }, setUserData: function (obj) {
        var userName = this.node.getChildByName("head").getChildByName("userName");
        userName.getComponent(cc.Label).string = obj._WC._Name;

        var head_pic = this.node.getChildByName("head").getChildByName("head_pic");
        // cc.MJ.common.ui.UrlLoadImage(head_pic, obj._WC._IUrl);
        cc.MJ.common.ui.UrlLoadImageWeiChat(head_pic, obj._WC._IUrl);
        // var _frame = cc.sys.localStorage.getItem("userImg");
        // if(_frame.textureLoaded){
        //     head_pic.getComponent(cc.Sprite).spriteFrame = _frame;
        // }


        var IDCard = this.node.getChildByName("head").getChildByName("IDNumber");
        IDCard.getComponent(cc.Label).string = "ID:" + obj._WC._PID;

        var rommCard = this.node.getChildByName("head").getChildByName("room_card_bg").getChildByName("roomcard");
        rommCard.getComponent(cc.Label).string = obj._RCC;
    },

    //初始化用户信息
    initUserData: function (obj) {

        cc.log("获取用户信息");
        cc.log(obj);

        this.setUserData(obj);

        var dailiBtn = this.node.getChildByName("content").getChildByName("agent_icon");
        dailiBtn.active = obj._IsPU;

        cc.MJ.User = obj;

        if (obj._RNo) {
            cc.MJ.alert.tips_msg("跳转房间中，请稍等...");
            cc.MJ.data.setLocalStorage_roomNo(obj._RNo);
            cc.MJ.data.setLocalStorage_roomType(obj._RT);
            if (obj._IsSG) {
                cc.MJ.common.ui.loadScene('gameScene');
            } else {
                cc.MJ.common.ui.loadScene('startScene');
            }
        }

    },
    onDestroy: function () {
        cc.sys.garbageCollect();
    },
    //红中麻将
    hongzhongMJ: function () {
        cc.MJ.data.setLocalStorage_roomType("huanghuang");
        var cj_room = this.node.getChildByName("CJ_room");
        this.showPopView(cj_room);
        this.node.getChildByName("CJ_room").getComponent("cj_room").initView();
        cc.MJ.common.sound.playBtnMusic();
    },

    //上海敲麻
    qiaoma: function () {
        cc.MJ.data.setLocalStorage_roomType("qiaoma");
        var cj_room = this.node.getChildByName("CJ_room");
        this.showPopView(cj_room);
        this.node.getChildByName("CJ_room").getComponent("cj_room").initView();
        cc.MJ.common.sound.playBtnMusic();
    },

    //疯狂牛牛
    fkniu: function () {
        // cc.MJ.data.setLocalStorage_playType("default");
        // var cj_room = this.node.getChildByName("CJ_room");
        // this.showPopView(cj_room);
        cc.MJ.common.sound.playBtnMusic();
    },

    //更多玩法
    moreWf: function () {
        cc.MJ.data.setLocalStorage_roomType("huanghuang");
        var cj_room = this.node.getChildByName("CJ_room");
        this.showPopView(cj_room);
        this.node.getChildByName("CJ_room").getComponent("cj_room").initView();
        cc.MJ.common.sound.playBtnMusic();
    },

    //活动
    huodong: function () {
        cc.MJ.common.sound.playBtnMusic();
        cc.MJ.alert.tips_msg("此功能暂未开放");
    },

    //公众号
    gzh: function () {
        // cc.MJ.common.sound.playBtnMusic();
        // cc.MJ.alert.tips_msg("此功能暂未开放");
        var _node = this.node.getChildByName("public_bg");
        _node.active = true;
    },
    closePublic: function (event, customEventData) {
        var _node = event.currentTarget.parent;
        _node.active = false;
    },
    fuzhi: function (event, customEventData) {
        cc.MJ.common.jsb.pasteboardByStr(customEventData);
        cc.MJ.alert.tips_msg("复制成功");
    },
    fuzhiwx: function () {
        var _label_str = this.roomcardNode.getComponent(cc.Label).string;
        cc.MJ.common.jsb.pasteboardByStr(_label_str.substr(_label_str.indexOf(":") + 1));
        cc.MJ.alert.tips_msg("复制成功");
    },
    //试玩群
    swq: function () {
        // cc.MJ.common.sound.playBtnMusic();
        // cc.MJ.alert.tips_msg("此功能暂未开放");
        var _node = this.node.getChildByName("shiwan");
        _node.active = true;
    },

    //注册事件
    initEvent: function () {

        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;

        var zhanji_all = this.node.getChildByName("ZJ_all");
        var zhanji_list = this.node.getChildByName("ZJ_list");

        //用户信息回调
        this.node.on(_eventList.user.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("获取用户信息成功");
                self.initUserData(data.detail._Data);
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.UserID = false;
                cc.log("跳转！！！！！");
                cc.MJ.common.ui.loadScene("loginScene");
            }
        });

        //房间玩家分数回调
        this.node.on(_eventList.rpscore.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("房间玩家分数回调成功");
                // self.initialize(data.detail._Data);
                zhanji_all.getComponent("zj_all").initialize(data.detail._Data);
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //房间玩家分数回调
        this.node.on(_eventList.tscore.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("牌局分数回调成功");
                zhanji_list.getComponent("zj_list").initialize(data.detail._Data);
                // self.initialize(data.detail._Data);
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.config.EventName, function (data) {
            if (data.detail._Data) {
                for (var i = 0; i < data.detail._Data._CL.length; i++) {
                    if (data.detail._Data._CL[i]._Code === "notice") {
                        self.noticeNode.getComponent(cc.Label).string = data.detail._Data._CL[i]._Content;
                    } else if (data.detail._Data._CL[i]._Code === "roomcard") {
                        self.roomcardNode.getComponent(cc.Label).string = data.detail._Data._CL[i]._Content;
                    }
                }

            }
        });
        //注销回调
        this.node.on(_eventList.logout.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("注销成功");
                cc.MJ.UserID = false;
                cc.MJ.data.setLocalStorage_LoginName("");
                cc.MJ.common.ui.loadScene("loginScene");
                cc.log("跳转！！！！！");
            } else {
                cc.log(data.detail._EMsg);

            }
        });
        //俱乐部加入房间
        this.node.on(_eventList.csd.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("加入房间回调成功");
                cc.MJ.common.jsb.clearRoomNumCache();
                cc.director.loadScene('startScene');
            } else {
                cc.MJ.common.jsb.clearRoomNumCache();
                cc.MJ.data.setLocalStorage_roomNo("");
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //加入房间回调
        this.node.on(_eventList.sitdown.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("加入房间成功");
                cc.MJ.common.jsb.clearRoomNumCache();
                cc.director.loadScene('startScene');
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.data.setLocalStorage_roomNo("");
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //创建房间回调
        this.node.on(_eventList.createroom.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("创建房间成功");
                cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
                cc.MJ.common.ui.loadScene("startScene");
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //客服建议
        this.node.on(_eventList.suggest.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("客服建议成功");
                self.node.getChildByName("KF").getComponent("kf").closeBtn();
                // self.closeBtn();
                cc.MJ.alert.tips_msg("提交成功");
            } else {
                cc.log(data._EMsg);
            }
        });

    },

    //房间玩家分数R
    requestRpscore: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var rpscoreData = {
            "_Cmd": "rpscore",
            "_PID": _PID_temp,    //  玩家ID
            "_Data": {}
        };
        cc.MJ.socket.sendGetRequest(rpscoreData, null, null);
    },

    //backHUD hidden
    backHUDhidden: function () {
        this.node.getChildByName("backHUD").active = false;
    },

    //展示弹出视图
    showPopView: function (temp_node) {
        var self = this;
        this.node.getChildByName("backHUD").active = true;
        temp_node.active = true;
        temp_node.on('backHUD', function () {
            self.backHUDhidden();
        });
        // temp_node.on("showzjroom", function () {
        //     self.showzjRoom();
        // });
    },

    //注册展示战绩房间
    showzjRoom: function () {
        var self = this;
        this.node.getChildByName("backHUD").active = true;
        var temp_zjlist = this.node.getChildByName("ZJ_list");
        temp_zjlist.active = true;
        temp_zjlist.getComponent("zj_list").requestTscore();
        // temp_zjlist.on('backHUD', function () {
        //     self.backHUDhidden();
        // });
        // var temp_zjlist = this.node.parent.getChildByName("ZJ_list");
        // cc.log(this.node);
        // temp_zjlist.getComponent("zj_list").requestTscore();
    },

    //weiChat 加入房间
    weiChatJoinRoom: function () {
        var roomNum = "";
        roomNum = cc.MJ.common.jsb.weiChatJoinRoom();
        if (roomNum && roomNum !== "") {
            if (parseInt(roomNum.length) > 6) {
                this.clubJoin_RoomNo(roomNum);
            }else {
                this.join_RoomNo(roomNum);
            }
        }
    },

    //俱乐部跳转房间
    clubJoin_RoomNo: function (p_roomNo) {

        // this.initEvent();
        if (cc.MJ.data.getLocalStorage_roomNo() === p_roomNo) {
            return;
        }

        cc.log("房间号是---=-=-=-=" + p_roomNo);
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _csdData = {
            "_Cmd": "csd",
            "_PID": _PID_temp,
            "_Data": {
                "_SNo": -1,    //  指定座位编号（-1表示系统安排）
                "_RNo": p_roomNo    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(_csdData, null, this);
        cc.MJ.data.setLocalStorage_roomNo(p_roomNo);
    },

    //跳转房间
    join_RoomNo: function (p_roomNo) {

        // this.initEvent();
        if (cc.MJ.data.getLocalStorage_roomNo() === p_roomNo) {
            return;
        }

        cc.log("房间号是---=-=-=-=" + p_roomNo);
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var sitdownData = {
            "_Cmd": "sitdown",
            "_PID": _PID_temp,
            "_Data": {
                "_SNo": -1,    //  指定座位编号（-1表示系统安排）
                "_RNo": p_roomNo    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(sitdownData, null, this);
        cc.MJ.data.setLocalStorage_roomNo(p_roomNo);
    },
    dailiEvent: function () {
        cc.MJ.common.sound.playBtnMusic();
        cc.MJ.common.ui.loadScene('dailiScene');

        // var webnode = this.node.getChildByName("clubMessage").getChildByName("manageWebView");
        // var web = webnode.getComponent(cc.WebView);
        // webnode.active = true;
        // webnode.active = false;
        // var webUrl = "http://106.14.134.149:9001/page/data_page1?id=" + cc.MJ.data.getLocalStorage_clubId() + "&uid=" + cc.MJ.data.getLocalStorage_LoginName();
        // console.log(webUrl);
        // web.url = webUrl;
    },
    //俱乐部
    clubEvent: function () {
        cc.MJ.common.sound.playBtnMusic();
        cc.director.loadScene('clubScene');
    }
    // //注册事件
    // initEvent:function () {
    //     require("EventConfig");
    //     var _config = cc.MJ.data;
    //     var _eventList = _config.DataBackMap;
    //     _config.currentHandle = this.node;
    //

    // },
});
