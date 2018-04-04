cc.Class({
    extends: cc.Component,

    properties: {
        //clubMessage
        // clubToggle: {
        //     default: [],
        //     type: cc.Toggle
        // }
    },

    // use this for initialization
    onLoad: function () {
        this.initEvent();
        this.requestQcl();
    },

    //初始化输入框 加入房间
    initNum: function () {
        var roomnum = this.node.getChildByName("createClub").getChildByName("joinClub").getChildByName("inputNum");
        var t = ["", "", "", "", "", ""];
        this.isbegin = true;
        for (var i = 1; i < 7; i++) {
            var num = roomnum.getChildByName("num" + i);
            var label = num.getChildByName("numLabel").getComponent(cc.Label);
            label.string = t[i - 1];
        }
    },
    //输入房间号
    clickNumToText: function (event, customEventData) {
        var roomnum = this.node.getChildByName("createClub").getChildByName("joinClub").getChildByName("inputNum");
        if (this.isbegin) {
            this.clearText();
            this.isbegin = false;
        }
        var roomNo = "";
        for (var i = 1; i < 7; i++) {
            var node = roomnum.getChildByName("num" + i);
            var label = node.getChildByName("numLabel").getComponent(cc.Label);

            if (!label.string) {
                label.string = customEventData;
                roomNo += customEventData.toString() + "-";
                if (i == 6) {
                    cc.MJ.data.setLocalStorage_roomNo(roomNo.replace(/-/g, ""));
                    // this.requestAj(roomNo.replace(/-/g, ""));
                    this.showAlertNode("joinClubMessage");
                }
                break;
            } else {
                roomNo += label.string + "-";
            }
        }
    },
    //清空
    clearText: function () {
        var roomnum = this.node.getChildByName("createClub").getChildByName("joinClub").getChildByName("inputNum");
        for (var i = 1; i < 7; i++) {
            var node = roomnum.getChildByName("num" + i);
            var label = node.getChildByName("numLabel").getComponent(cc.Label);
            label.string = "";
        }
    },
    //删除
    delText: function () {
        var roomnum = this.node.getChildByName("createClub").getChildByName("joinClub").getChildByName("inputNum");
        for (var i = 6; i > 0; i--) {
            var node = roomnum.getChildByName("num" + i);
            var label = node.getChildByName("numLabel").getComponent(cc.Label);
            if (label.string) {
                label.string = "";
                break;
            }
        }
    },
    //加入房间理由
    whyJoinClubChanged: function (text, sender) {
        this.whyJoinClubText = text;
    },
    //确定加入俱乐部
    sureJoinClub: function () {
        this.requestAj(cc.MJ.data.getLocalStorage_roomNo(), this.whyJoinClubText);
        this.closeAlertNode("joinClubMessage");
    },
    //关闭加入俱乐部理由弹框
    closeSureJoinClub: function () {
        this.closeAlertNode("joinClubMessage");
    },
    //使用帮助
    helpEvent: function () {
        var url = "http://106.14.134.149:9003/";
        cc.MJ.common.jsb.openWebViewByUrl(url);
    },

    //查询俱乐部列表Request
    requestQcl: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var getclub = {
            "_Cmd": "qcl",
            "_PID": _PID_temp,
            "_Data": null
        };
        cc.MJ.socket.sendGetRequest(getclub, null, null);
    },
    //创建俱乐部Request
    requestCreateg: function () {
        if (this.clubName && this.clubImage) {
            var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
            var _createClub = {
                "_Cmd": "createg",
                "_PID": _PID_temp,
                "_Data": {
                    "_CName": this.clubName,
                    "_CIcon": this.clubImage,
                    "_CNotice": this.clubNotice ? this.clubNotice : ""
                }

            };
            cc.MJ.socket.sendGetRequest(_createClub, null, null);
        } else {
            cc.MJ.alert.tips_msg("俱乐部名称或会标不能为空");
        }
    },
    //申请加入俱乐部Request
    requestAj: function (cid, text) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _ajData = {
            "_Cmd": "aj",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid,
                "_Msg": text
            }
        };
        cc.MJ.socket.sendGetRequest(_ajData, null, null);
    },

    //注册事件
    initEvent: function () {
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;

        //创建俱乐部
        this.node.on(_eventList.createg.EventName, function (data) {
            if (data.detail._IsS) {
                cc.MJ.alert.tips_msg("创建成功");
                self.updateCreateg(data.detail._Data);
            } else {
                console.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询俱乐部列表
        this.node.on(_eventList.qcl.EventName, function (data) {
            if (data.detail._IsS) {
                self.bindBtnEvent(data.detail._Data);
            } else {
                console.log(data.detail._EMsg);
            }
        });
        //退出俱乐部
        this.node.on(_eventList.ec.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("退出俱乐部回调成功");
            } else {
                console.log(data.detail._EMsg);
            }
        });
        //申请加入俱乐部
        this.node.on(_eventList.aj.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("申请加入俱乐部回调成功");
                if (!data.detail._Data._IsM) {

                    // self.showAlertNode("joinClub");
                    self.refuseJoinClub("加入俱乐部请求发送成功 等待群主确认中...");
                }
            } else {
                console.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //会长审核
        this.node.on(_eventList.raj.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("会长审核回调成功");
                self.sureClub();
            } else {
                // console.log(data.detail._EMsg);
                console.log("拒绝了");
                self.refuseJoinClub(data.detail._EMsg);
            }
        });
        //踢出俱乐部
        this.node.on(_eventList.kc.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("提出俱乐部回调成功");
                self.closeCreateClub();
                self.requestQcl();
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //加入房间回调
        this.node.on(_eventList.sitdown.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("加入房间成功");
                cc.director.loadScene('startScene');
                cc.MJ.common.jsb.clearRoomNumCache();
            } else {
                cc.log(data.detail._EMsg);
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
    },

    //关闭俱乐部
    closeClub: function () {
        cc.MJ.common.sound.playBtnMusic();
        cc.director.loadScene('chooseScene');
    },

    //创建俱乐部
    createClub: function () {
        var createClub = this.node.getChildByName("createClub");
        createClub.getChildByName("backContent").active = false;
        createClub.getChildByName("joinClub").active = false;
        createClub.getChildByName("clubMessage").active = true;
    },
    clubNameChanged: function (text, sender) {
        this.clubName = text;
    },
    clubNoticeChanged: function (text, sender) {
        this.clubNotice = text;
    },
    clubImageClick: function (event, customEventData) {
        var _imageList = this.node.getChildByName("createClub").getChildByName("clubMessage").getChildByName("clubImage").children;
        for (var i = 0; i < _imageList.length; i++) {
            var _tempnode = _imageList[i];
            _tempnode.setScale(1, 1);

        }
        var _node = event.target;

        _node.setScale(1.2, 1.2);
        this.clubImage = customEventData;
    },
    closeCreateClub: function () {
        // var createClub = this.node.getChildByName("createClub");
        // createClub.getChildByName("backContent").active = true;
        // createClub.getChildByName("clubMessage").active = false;
        this.node.getChildByName("createClub").active = false;
        this.node.getChildByName("homePage").active = true;
    },

    //创建俱乐部信息
    createClubMessage: function () {
        console.log("俱乐部创建成功");
        this.requestCreateg();
    },
    closeCreateClubMessage: function () {
        var createClub = this.node.getChildByName("createClub");
        createClub.getChildByName("clubMessage").active = false;
        createClub.getChildByName("backContent").active = true;
    },

    //加入俱乐部
    joinClub: function () {
        var createClub = this.node.getChildByName("createClub");
        createClub.getChildByName("backContent").active = false;
        createClub.getChildByName("clubMessage").active = false;
        createClub.getChildByName("joinClub").active = true;
        this.initNum();
    },
    closeJoinClub: function () {
        var createClub = this.node.getChildByName("createClub");
        createClub.getChildByName("joinClub").active = false;
        createClub.getChildByName("backContent").active = true;
    },


    showAlertNode: function (alertName) {
        this.node.getChildByName("alert").getChildByName("backHUD").active = true;
        this.node.getChildByName("alert").getChildByName(alertName).active = true;
    },
    closeAlertNode: function (alertName) {
        console.log(alertName);
        this.node.getChildByName("alert").getChildByName(alertName).active = false;
        this.node.getChildByName("alert").getChildByName("backHUD").active = false;
    },

    //会长拒绝加入俱乐部
    refuseJoinClub: function (message) {
        var joinClub = this.node.getChildByName("alert").getChildByName("joinClub");
        joinClub.getChildByName("title").getComponent(cc.Label).string = message;
        this.showAlertNode("joinClub");
    },
    //加入俱乐部弹框按钮
    sureClub: function () {
        this.closeAlertNode("joinClub");
        this.closeCreateClub();
        this.requestQcl();
    },


    goclubinfoEvent: function (event, customEventData) {
        console.log("跳转俱乐部事件");
        console.log(customEventData);
        this.homePageBtn(event, customEventData);
    },
    //给三个按钮绑定时间  ary存放麻友群ID
    bindBtnEvent: function (ary) {
        if (ary._CL === null) {
            ary._CL = [];
        }
        var _clubnode = this.node.getChildByName("homePage").getChildByName("group01");
        var _createnode = this.node.getChildByName("homePage").getChildByName("group03");
        // var _clubnode = this.node.getChildByName("homePage").getChildByName("club_cont_bg").getChildByName("group01");
        // var _createnode = this.node.getChildByName("homePage").getChildByName("club_cont_bg").getChildByName("group03");
        var _parent = this.node.getChildByName("homePage").getChildByName("club_cont_bg");
        _parent.removeAllChildren();
        for (var i = 0; i < 3; i++) {

            if (ary._CL.length > i) {
                var _baseinfo = {
                    title: {
                        _son: true, peopleLabel: 0, homeCardNum: 0
                    },
                    bottomLabel: "",
                    content: new cc.SpriteFrame()
                };
                var _node = cc.instantiate(_clubnode);
                _node.parent = _parent;
                _node.active = true;
                cc.MJ.common.tool.bindData.bindObjAndNode(_baseinfo, _node, null);
                _baseinfo.title.peopleLabel = ary._CL[i]._CUse;
                _baseinfo.title.homeCardNum = ary._CL[i]._CRCC;
                _baseinfo.bottomLabel = ary._CL[i]._CName;
                var spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("clubHeader", "header_icon0" + ary._CL[i]._CIcon);
                _baseinfo.content = spriteFrame;
                _node.getComponent(cc.Button).clickEvents[0].customEventData = ary._CL[i]._CID;

            } else {
                var _node = cc.instantiate(_createnode);
                _node.parent = _parent;
                _node.active = true;
                _node.getComponent(cc.Button).clickEvents[0].customEventData = "";
            }
        }
    },
    homePageBtn: function (event, customEventData) {
        // console.log("绑定的data", customEventData);
        this.node.getChildByName("homePage").active = false;
        if (customEventData !== "" && customEventData) {
            console.log("进入群");
            // var clubMessage = this.node.getChildByName("clubMessage");
            // clubMessage.active = true;
            // clubMessage.getChildByName("message").active = true;
            // this.requestQc(customEventData);
            cc.MJ.data.setLocalStorage_clubId(customEventData);
            cc.director.loadScene('clubInfo');

        } else {
            console.log("创建群");
            var createClub = this.node.getChildByName("createClub");
            createClub.active = true;
            createClub.getChildByName("backContent").active = true;
            createClub.getChildByName("joinClub").active = false;
        }
    },


    //俱乐部创建成功回调事件
    updateCreateg: function (data) {
        // this.node.getChildByName("createClub").active = false;
        // var clubMessage = this.node.getChildByName("clubMessage");
        // clubMessage.active = true;
        // clubMessage.getChildByName("message").active = true;
        // this.requestQcl();
        cc.MJ.data.setLocalStorage_clubId(data._CID);
        cc.director.loadScene('clubInfo');
    }
});
