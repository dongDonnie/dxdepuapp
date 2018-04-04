/**
 * Created by hxl on 2017/7/6.
 */
var module = require("GameModule");

cc.Class({
    extends: cc.Component,

    properties: {
        palyerNum: null,
        fangzhu_set: false,
        _model: null,

        weiChatShareMessage: null,
        settingNew: {
            default: null,
            type: cc.Node
        },
        wanfaNew: {
            default: null,
            type: cc.Node
        },

        GZNew: {
            default: null,
            type: cc.Node
        }
    },
    onDestroy: function () {
        cc.sys.garbageCollect();
    },
    onLoad: function () {
        //cc.MJ.alert=cc.find("tips").getComponent("tipsManager");
        // var initManager = require("InitManager");
        // initManager.init();

        cc.MJ.common.sound.stopPlay();
        if (cc.MJ.common.sound.getPlayState() !== 1) {
            cc.MJ.common.sound.playbgMusic("gaming");
        }
        this._model = cc.MJ.common.tool.bindData.deepCopy(module.ReadyModule);
        this.playNum = 0;
        this.initEvent();
        cc.MJ.common.tool.bindData.bindObjAndNode(this._model, this.node);
        var self = this;
        cc.loader.loadRes("Image/head_pic_s", cc.SpriteFrame, function (err, spriteFrame) {
            self._model.head_bg_s_top.head_pic_s = spriteFrame;
            self._model.head_bg_s_left.head_pic_s = spriteFrame;
            self._model.head_bg_s_bottom.head_pic_s = spriteFrame;
            self._model.head_bg_s_right.head_pic_s = spriteFrame;
        });

        this.requestSeat();
        cc.MJ.alert.show_net_tips();
        cc.MJ.common.jsb.startPing();

    },
    //游戏规则
    _initStr: function (p_gameOption) {
        var _model = {
            play_popup_bg: {
                _son: true,
                roomtypeLabel: "",
                qiaoma: {
                    _son: true,
                    _active: false,
                    dihua: {_son: true, selected: false, unselected: false},
                    wanfa: {_son: true, selected: false, unselected: false},
                    lezi: {
                        _son: true,
                        ten: {_son: true, selected: false, unselected: false},
                        twenty: {_son: true, selected: false, unselected: false}
                    }
                },
                huanghuang: {
                    _son: true,
                    _active: false,
                    wanfa: {
                        _son: true,
                        zimo: {_son: true, selected: false, unselected: false},
                        hongzhong: {_son: true, selected: false, unselected: false}
                    },
                    niao: {
                        _son: true,
                        two: {_son: true, selected: false, unselected: false},
                        four: {_son: true, selected: false, unselected: false},
                        six: {_son: true, selected: false, unselected: false},
                        eight: {_son: true, selected: false, unselected: false}
                    }
                }
            }
        };
        cc.MJ.common.tool.bindData.bindObjAndNode(_model, this.node);
        var str = "";
        cc.log(_model);
        this._model.mahjong_page_bg.wanfalabel = "房间号：" + p_gameOption._RNo + "   " + p_gameOption._GOM.count + "局   ";
        var _huanghuang = _model.play_popup_bg.huanghuang;
        var _qiaoma = _model.play_popup_bg.qiaoma;
        if (p_gameOption._GOM.roomtype === "qiaoma") {
            _model.play_popup_bg.roomtypeLabel = "上海敲麻";
            _qiaoma._active = true;
            _huanghuang._active = false;

            var _model = {
                wanfa: p_gameOption._GOM.fly === "1",
                dihua: true,
                lezi: {ten: p_gameOption._GOM.maxtimes === "10", twenty: p_gameOption._GOM.maxtimes === "20"}
            };
            this._setSelect(_qiaoma.dihua, _model.dihua);
            this._setSelect(_qiaoma.wanfa, _model.wanfa);
            this._setSelect(_qiaoma.lezi.ten, _model.lezi.ten);
            this._setSelect(_qiaoma.lezi.twenty, _model.lezi.twenty);
        } else {
            _model.play_popup_bg.roomtypeLabel = "晃晃麻将";
            _qiaoma._active = false;
            _huanghuang._active = true;

            var _model = {
                wanfa: {
                    zimo: p_gameOption._GOM.playtype === "default",
                    hongzhong: p_gameOption._GOM.playtype === "zhong"
                },
                niao: {
                    two: p_gameOption._GOM.score === "2",
                    four: p_gameOption._GOM.score === "4",
                    six: p_gameOption._GOM.score === "6",
                    eight: p_gameOption._GOM.score === "8"
                }
            };
            this._setSelect(_huanghuang.wanfa.zimo, _model.wanfa.zimo);
            this._setSelect(_huanghuang.wanfa.hongzhong, _model.wanfa.hongzhong);
            this._setSelect(_huanghuang.niao.two, _model.niao.two);
            this._setSelect(_huanghuang.niao.four, _model.niao.four);
            this._setSelect(_huanghuang.niao.six, _model.niao.six);
            this._setSelect(_huanghuang.niao.eight, _model.niao.eight);
        }

    },
    _setSelect: function (p_obj, p_val) {
        p_obj.selected = p_val;
        p_obj.unselected = !p_val;
    },
    //玩家入座
    requestSeat: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = cc.MJ.data.getLocalStorage_roomNo();
        var seatData = {
            "_Cmd": "seat",
            "_PID": _PID_temp,
            "_Data": {
                "_SNo": -1,    //  指定座位编号（-1表示系统安排）
                "_RNo": _RoomNO_temp    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(seatData, null, this);
    },

    //退出房间R
    requestExit: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = cc.MJ.data.getLocalStorage_roomNo();
        var exitData = {
            "_Cmd": "exit",
            "_PID": _PID_temp,
            "_Data": {
                "_RNo": _RoomNO_temp    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(exitData, null, this);
    },

    //开始游戏R
    requestStart: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = cc.MJ.data.getLocalStorage_roomNo();
        var startData = {
            "_Cmd": "start",
            "_PID": _PID_temp,
            "_Data": {
                "_RNo": _RoomNO_temp    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(startData, null, this);
    },

    //注册事件
    initEvent: function () {
        require("EventConfig");
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;

        //玩家入座
        this.node.on(_eventList.seat.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("玩家入座成功");
                self.personInfo(data.detail);
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
                cc.log(data.detail._EMsg);
            }
        });
        //退出房间回调
        this.node.on(_eventList.exit.EventName, function (data) {
            if (data.detail._IsS) {
                cc.MJ.common.jsb.stopPing();
                cc.log("退出房间成功");
                // cc.MJ.common.ui.loadScene("chooseScene");
                if (parseInt(cc.MJ.data.getLocalStorage_roomNo().length) > 6) {
                    cc.MJ.data.setLocalStorage_roomNo("");
                    cc.sys.localStorage.setItem("backclubFlag","1");
                    cc.MJ.common.ui.loadScene("clubInfo");

                }else {
                    cc.MJ.data.setLocalStorage_roomNo("");
                    cc.MJ.common.ui.loadScene("chooseScene");
                }
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
                cc.log(data.detail._EMsg);
            }
        });
        //开始游戏回调
        this.node.on(_eventList.start.EventName, function (data) {
            if (data.detail._IsS) {
                cc.MJ.common.jsb.stopPing();
                cc.log("开始游戏成功");
                cc.MJ.common.ui.loadScene('gameScene');
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
                cc.log(data.detail._EMsg);
            }
        });
        //房间增减量
        this.node.on(_eventList.pseat.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("房间增减量成功");
                self.pseatData(data.detail);
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
                cc.log(data.detail._EMsg);
            }
        });
    },

    //分发玩家信息
    personInfo: function (data) {
        if (data._Data._IsSG) {
            cc.MJ.common.ui.loadScene('gameScene');
        }
        var obj = data._Data._WCL;
        this.playNum += obj.length;
        this._initStr(data._Data);
        var count = "玩法:  " + data._Data._GOM.count + "局  ";

        var score = "抓" + data._Data._GOM.score + "鸟";
        var dihua = "底花:" + data._Data._GOM.minflower;
        var lezi = "  勒子:" + data._Data._GOM.maxtimes + "倍底花";
        var cj = data._Data._GOM.fly === "1" ? "  飞苍蝇" : "";

        var playtype = "";
        var roomtype = "";
        if (data._Data._GOM.roomtype === "huanghuang") {
            roomtype = "晃晃麻将  ";
            if (data._Data._GOM.playtype === "zhong") {
                playtype = "红中自摸胡  ";
            } else if (data._Data._GOM.playtype === "default") {
                playtype = "自摸胡  ";
            }

            this.weiChatShareMessage = roomtype + "," + count + "," + playtype + "," + score + ",";
        } else if (data._Data._GOM.roomtype === "qiaoma") {
            roomtype = "敲麻  ";
            playtype = "敲麻  ";
            this.weiChatShareMessage = playtype + "," + count + "," + dihua + "," + lezi + "," + cj + ",";
        }


        cc.MJ.data.setLocalStorage_playType(data._Data._GOM.playtype);
        cc.MJ.data.setLocalStorage_roomType(data._Data._GOM.roomtype);
        for (var i = 0; i < obj.length; i++) {

            var _tempData = {
                _wc: obj[i]._WC,
                _sno: obj[i]._SNo
            };
            this.showPersonData(_tempData);
        }

        var head_bg_s = "head_bg_s_" + module.seatInfo[data._Data._MPSNo];
        this._model[head_bg_s].fangzhu = true;
        if (data._Data._MPSNo === 0) {
            this.fangzhu_set = true;

            if (this.playNum === 4) {
                this.node.getChildByName("startGameBtn").active = true;
            } else {
                this.node.getChildByName("startGameBtn").active = false;
            }

        }
    },

    // 显示玩家信息
    showPersonData: function (data) {
        var head_bg_s = "head_bg_s_" + module.seatInfo[data._sno];
        var self = this;
        if (data._wc._IUrl.indexOf(".jpg") === data._wc._IUrl.length - 4) {

            cc.loader.load(data._wc._IUrl, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                // cc.log("jpg图片加载");
                // cc.log(frame);
                self._model[head_bg_s].head_pic_s = frame;
                // cc.log(self._model[head_bg_s]);
            });
        } else {


            cc.loader.load({url: data._wc._IUrl, type: "png"}, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                // cc.log("url图片加载");
                // cc.log(frame);
                self._model[head_bg_s].head_pic_s = frame;
                // cc.log(self._model[head_bg_s]);
            });
        }

        this._model[head_bg_s].label = data._wc._Name;
        // module.ReadyModule[head_bg_s].font_ready_t = false;
        // module.ReadyModule[head_bg_s].net = false;
        // module.ReadyModule[head_bg_s].fangzhu = false;
    },

    //房间增量
    pseatData: function (data) {
        var self = this;
        if (data._Data._Fg) {
            var _tempData = {
                _wc: data._Data._WC,
                _sno: data._Data._SNo
            };
            this.showPersonData(_tempData);
            this.playNum += 1;
        } else {
            var head_bg_s = "head_bg_s_" + module.seatInfo[data._Data._SNo];

            cc.loader.loadRes("Image/head_pic_s", cc.SpriteFrame, function (err, spriteFrame) {
                self._model[head_bg_s].head_pic_s = spriteFrame;
            });
            this._model[head_bg_s].label = "空位";
            this.playNum -= 1;
            if (this._model[head_bg_s].fangzhu) {
                // cc.MJ.common.ui.loadScene("chooseScene");
                if (parseInt(cc.MJ.data.getLocalStorage_roomNo().length) > 6) {
                    cc.sys.localStorage.setItem("backclubFlag","1");
                    cc.MJ.common.ui.loadScene("clubInfo");
                }else {
                    cc.MJ.common.ui.loadScene("chooseScene");
                }
            }
        }

        if (this.fangzhu_set) {
            if (this.playNum === 4) {
                this.node.getChildByName("startGameBtn").active = true;
            } else {
                this.node.getChildByName("startGameBtn").active = false;
            }
        }
    },

    //退出房间
    exitClick: function () {
        this.requestExit();
    },

    //邀请好友
    inviteFriend: function () {
        var roomNo = cc.sys.localStorage.getItem('roomNo');
        cc.MJ.common.jsb.weiChatShareWebViewWXSceneSession(roomNo, this.weiChatShareMessage);
    },

    //开始游戏
    starGame: function (event) {
        this.requestStart();
        var node = event.target;
        node.getComponent(cc.Button).enabled = false;
        this.scheduleOnce(function () {
            node.getComponent(cc.Button).enabled = true;
        }, 3);
    },

    //显示开始按钮
    showStartBtn: function (obj) {
        this.node.getChildByName("startGameBtn").active = true;
    },
    openSetting: function (event) {
        var moveto_action = cc.moveTo(0.2, cc.p(264.5, 0));
        this.settingNew.runAction(moveto_action);
    },
    //打开玩法弹框
    openWanfa: function (event, CustomEventData) {
        cc.log(CustomEventData);
        var _p = CustomEventData === "true" ? cc.p(0, 0) : cc.p(0, 750);
        var moveto_action = cc.moveTo(0.2, _p);
        this.wanfaNew.runAction(moveto_action);
    },

    //打开游戏规则
    setGZOpenStatus: function (event, CustomEventData) {
        var moveto_action = cc.moveTo(0.2, cc.p(1080, 0));
        this.settingNew.runAction(moveto_action);
        var _p = CustomEventData === "true" ? cc.p(0, 0) : cc.p(-1334, 0);
        var moveto_action = cc.moveTo(0.2, _p);
        this.GZNew.runAction(moveto_action);

    }

});