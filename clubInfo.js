cc.Class({
    extends: cc.Component,

    properties: {
        //clubMessage

        //创建房间数据
        Check_obj_list: null,

        //局数Btn
        countToggle: {
            default: [],
            type: cc.Toggle
        },
        //playType
        playTypeToggle: {
            default: [],
            type: cc.Toggle
        },

        clubToggle: {
            default: [],
            type: cc.Toggle
        },
        ruhuiitemDemo: cc.Node,
        ruhuiitemParent: cc.Node,

        pidArray: null,
        rt:{
            "zhong":"",
            "default":"",
            "qiaoma":""
        }
    },

    // use this for initialization
    onLoad: function () {
        this.rt = {
            "zhong":"红中麻将",
            "default":"晃晃麻将",
            "qiaoma":"上海敲麻"
        };
        this.Check_obj_list = {count: 8, playtype: "default", minscore: 1};

        this.RoomTypeLabel = {zhong: "红中麻将", default: "红中麻将", qiaoma: "上海敲麻"};

        this.initEvent();

        this.requestQc();
        this.requestQcul();

        if (cc.MJ.data.getLocalStorage_huifangClub() === "true") {
            var toggle = this.node.getChildByName("clubMessage").getChildByName("leftToggleGroup").children;
            toggle[2].getComponent(cc.Toggle).check();
            cc.MJ.data.setLocalStorage_huifangClub("false");
        }

    },

    //打开微信
    openWeiChat: function () {
        cc.MJ.common.jsb.openWeiChat();
    },

    //踢人
    tiBtnEvent: function (event, customEventData) {
        this.showAlertNode("tichu");
        this.tiren = customEventData;
        this.node.getChildByName("alert").getChildByName("tichu").getChildByName("title").getComponent(cc.Label).string = "是否将玩家踢出俱乐部"
    },
    //同意或不同意踢出玩家
    agreenTiren: function (event, customEventData) {
        if (customEventData) {
            console.log("同意");
            this.requestKc(this.tiren);
        } else {
            console.log("不同意");
            this.closeAlertNode("tichu");
        }
    },
    //同意或不同意解散俱乐部
    agreenJiesanClub: function (event, customEventData) {
        if (customEventData) {
            console.log("同意");
            this.requestBg();
        } else {
            console.log("不同意");
            this.closeJiesan();
        }
    },
    //同意或不同意退出俱乐部
    agreenTuichuClub: function (event, customEventData) {
        if (customEventData) {
            console.log("同意");
            this.requestEc();
        } else {
            console.log("不同意");
            this.closeJiesan();
        }
    },
    //局数
    countToggleEvent: function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index = this.countToggle.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.count = 8;
                break;
            case 1:
                this.Check_obj_list.count = 16;
                break;
            case 2:
                this.Check_obj_list.count = 24;
                break;
            default:
                break;
        }
        console.log(this.Check_obj_list);
    },
    //玩法
    playTypeEvent: function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index = this.playTypeToggle.indexOf(toggle);
        switch (index) {
            case 0:
                this.Check_obj_list.minscore = "1";
                break;
            case 1:
                this.Check_obj_list.minscore = "2";
                break;
            default:
                break;
        }
    },
    //可胡七对
    // khqidui: function (event) {
    //     var btnNode = event.target;
    //     var tog = btnNode.getComponent(cc.Toggle);
    //     if (tog.isChecked) {
    //         console.log("可胡七对");
    //     } else {
    //         console.log("不可胡区队");
    //     }
    // },
    //红中癞子
    // hzlz: function (event) {
    //
    // },
    //创建房间Event
    createRoom: function () {
        this.requestCcroom();
    },

    //查询俱乐部信息列表Request
    requestQc: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _qcData = {
            "_Cmd": "qc",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_qcData, null, null);
    },
    //查询俱乐部成员列表Request
    requestQcul: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _qculData = {
            "_Cmd": "qcul",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_qculData, null, null);
    },
    //解散俱乐部Request
    requestBg: function () {
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _bgData = {
            "_Cmd": "bg",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_bgData, null, null);
    },
    //退出俱乐部Request
    requestEc: function () {
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _ecData = {
            "_Cmd": "ec",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_ecData, null, null);
    },
    //查询牌局信息Request
    requestQcrl: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _qcrlData = {
            "_Cmd": "qcrl",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_qcrlData, null, null);
    },
    //查询玩家申请入会列表信息Request
    requestQal: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _qalData = {
            "_Cmd": "qal",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid
            }
        };
        cc.MJ.socket.sendGetRequest(_qalData, null, null);
    },
    //会长审核Request
    requestRaj: function (isjoin, tgpid) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _rajData = {
            "_Cmd": "raj",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid,
                "_IsJoin": isjoin,
                "_TgPID": tgpid
            }
        };
        cc.MJ.socket.sendGetRequest(_rajData, null, null);
    },
    //创建房间Request
    requestCcroom: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _ccroomData = {
            "_Cmd": "ccroom",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid,
                "_GOM": {
                    "playtype": this.Check_obj_list.playtype,
                    "count": this.Check_obj_list.count
                }
            }
        };
        cc.MJ.socket.sendGetRequest(_ccroomData, null, null);
    },
    //加入房间Request
    requestCsd: function (rno) {
        cc.MJ.data.setLocalStorage_roomNo(rno);
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _csdData = {
            "_Cmd": "csd",
            "_PID": _PID_temp,
            "_Data": {
                "_SNo": -1,    //  指定座位编号（-1表示系统安排）
                "_RNo": rno    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(_csdData, null, this);
    },
    //踢出俱乐部Request
    requestKc: function (wanjiaPid) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var cid = cc.MJ.data.getLocalStorage_clubId();
        var _kcData = {
            "_Cmd": "kc",
            "_PID": _PID_temp,
            "_Data": {
                "_CID": cid,
                "_TgPID": wanjiaPid
            }
        };
        cc.MJ.socket.sendGetRequest(_kcData, null, this);
    },
    //查询玩家战绩
    requestQcrp: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var clubID = cc.MJ.data.getLocalStorage_clubId();
        var _qcrpData = {
            "_Cmd": "qcrp",
            "_PID": _PID_temp,
            "_Data": {
                "ClubID": clubID
            }
        };
        cc.MJ.socket.sendGetRequest(_qcrpData, null, this);
    },
    //查询战绩详情
    requestQcts: function (rid) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _qctsData = {
            "_Cmd": "qcts",
            "_PID": _PID_temp,
            "_Data": {
                "_RID": rid
            }
        };
        cc.MJ.socket.sendGetRequest(_qctsData, null, this);
    },


    //注册事件
    initEvent: function () {
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;

        //查询俱乐部信息列表
        this.node.on(_eventList.qc.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("查询俱乐部信息列表回调成功");
                self.initClubInfo(data.detail._Data);
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询俱乐部信息列表
        this.node.on(_eventList.updateg.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("查询俱乐部信息列表回调成功");
                self.closeEditor();
                self.initClubInfo(data.detail._Data);
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询俱乐部成员列表
        this.node.on(_eventList.qcul.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("查询俱乐部成员回调成功");
                self.initClubmemberino(data.detail._Data);
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询牌局信息
        this.node.on(_eventList.qcrl.EventName, function (data) {
            var _fathernode = self.node.getChildByName("clubMessage").getChildByName("paiju");
            var _label = _fathernode.getChildByName("noticelabel");
            if (data.detail._IsS) {
                _label.active = false;
                cc.log("查询牌局信息回调成功");
                self.initpaiju(data.detail._Data);
            } else {

                var _parentnode = _fathernode.getChildByName("scrollView").getChildByName("view").getChildByName("content");
                //此处后续需优化为  initruhui 中的获取节点的方式
                _parentnode.removeAllChildren();//加载前清除原有数据

                _label.active = true;
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询玩家入会申请列表
        this.node.on(_eventList.qal.EventName, function (data) {
            var _label = self.ruhuiitemParent.parent.parent.parent.getChildByName("noticelabel");
            if (data.detail._IsS) {
                _label.active = false;
                cc.log("查询玩家入会申请回调成功");
                self.initruhui(data.detail._Data);
            } else {
                self.ruhuiitemParent.removeAllChildren();//加载前清除原有数据
                _label.active = true;
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //申请加入俱乐部
        this.node.on(_eventList.aj.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("申请加入俱乐部回调成功");
                self.ruhuiEvent();
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //会长审核
        this.node.on(_eventList.raj.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("会长审核回调成功");
                if (cc.isValid(self.ruhuiBtn)) {
                    self.ruhuiBtn.active = false;
                }
            } else {
                self.ruhuiBtn.active = false;
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
            // self.requestQal();
        });
        //解散俱乐部
        this.node.on(_eventList.bg.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("解散俱乐部回调成功");
                self.closeClubMessage();
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //踢出俱乐部
        this.node.on(_eventList.kc.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("提出俱乐部回调成功");
                if (!data.detail._Data._IsM) {
                    cc.director.loadScene('clubScene');
                } else {
                    self.requestQc();
                    self.requestQcul();
                }

            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        // //邀请加入俱乐部
        // this.node.on(_eventList.invite.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("邀请加入俱乐部回调成功");
        //     } else {
        //         console.log(data.detail._EMsg);
        //     }
        // });
        //退出俱乐部
        this.node.on(_eventList.ec.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("退出俱乐部回调成功");
                if (data.detail._Data._IsM) {
                    self.requestQc();
                    self.requestQcul();
                } else {
                    self.closeClubMessage();
                }

            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //创建房间
        this.node.on(_eventList.ccroom.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("创建房间回调成功");
                cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
                cc.director.loadScene('startScene');
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //加入房间
        this.node.on(_eventList.csd.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("加入房间回调成功");
                // cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
                cc.director.loadScene('startScene');
            } else {
                cc.MJ.data.setLocalStorage_roomNo("");
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //踢出俱乐部
        this.node.on(_eventList.kc.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("踢出俱乐部回调成功");
                // cc.MJ.data.setLocalStorage_roomNo(data.detail._Data._RNo);
                self.closeAlertNode("tichu");
                self.requestQcul();
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询玩家战绩
        this.node.on(_eventList.qcrp.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("查询玩家战绩回调成功");
                self.addZJRoomItem(data.detail._Data);
            } else {
                self.node.getChildByName("clubMessage").getChildByName("zhanji").getChildByName("noticelabel").active = true;
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        //查询战绩详情
        this.node.on(_eventList.qcts.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("查询战绩详情回调成功");
                self.zjDetailData(data.detail);
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

    //初始化俱乐部基本信息
    initClubInfo: function (p_data) {

        this.node.getChildByName("createRoom").getChildByName("head").getChildByName("club_title").getComponent(cc.Label).string = this.club_name = p_data._CName;

        var yuan = this.node.getChildByName("clubMessage").getChildByName("message").getChildByName("ruhui").getChildByName("yuan");
        if (p_data._ALC === 0 || p_data._ALC === null) {
            yuan.active = false;
        } else {
            yuan.active = true;
        }
        yuan.getChildByName("label").getComponent(cc.Label).string = p_data._ALC;
        this.node.getChildByName("clubMessage").getChildByName("head").getChildByName("roomCard").getChildByName("label").getComponent(cc.Label).string = p_data._CRCC;
        this.roomCardText = p_data._CRCC;
        var _clubNode = this.node.getChildByName("clubMessage").getChildByName("message").getChildByName("clubLeft");
        var clubinfo = {
            image: new cc.SpriteFrame(),
            clubNum: {_son: true, rightLabel: ""},
            peopleNum: {_son: true, rightLabel: ""},
            club_name: "",
            gonggaoTitle: {
                _son: true,
                gonggaoBack: {_son: true, scrollView: {_son: true, view: {_son: true, content: {_son: true, item: ""}}}}
            },
            jiesanBtn: true,
            editorBtn: true,
            quitBtn: false
        };//如需在别处使用修改，则变为全局变量
        this.clubData = p_data;
        cc.MJ.common.tool.bindData.bindObjAndNode(clubinfo, _clubNode, null);
        clubinfo.clubNum.rightLabel = p_data._CID;
        clubinfo.club_name = p_data._CName;
        this.node.getChildByName("club_name").getComponent(cc.Label).string = p_data._CName;
        clubinfo.peopleNum.rightLabel = p_data._CUse + "/" + p_data._CMax;
        clubinfo.gonggaoTitle.gonggaoBack.scrollView.view.content.item = p_data._CNotice;
        clubinfo.image = cc.MJ.common.resources.getSpriteFrameByName("clubHeader", "header_icon0" + p_data._CIcon);
        //图标未设置

        //是否会长，决定是否显示编辑与解散按钮
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _huiflag = _PID_temp === p_data._WC._PID ? true : false;
        clubinfo.jiesanBtn = _huiflag;
        clubinfo.editorBtn = _huiflag;
        clubinfo.quitBtn = !_huiflag;
        this.node.getChildByName("clubMessage").getChildByName("message").getChildByName("ruhui").active = _huiflag;
        this.node.getChildByName("clubMessage").getChildByName("leftToggleGroup").getChildByName("toggle4").active = _huiflag;
        var backclubFlag = cc.sys.localStorage.getItem("backclubFlag");
        if (backclubFlag === "1") {
            var toggle = this.node.getChildByName("clubMessage").getChildByName("leftToggleGroup").children;
            console.log(toggle);
            toggle[1].getComponent(cc.Toggle).check();
            toggle[1].getComponent(cc.Toggle).isChecked=true;
        }
        if (backclubFlag === "2") {
            var toggle = this.node.getChildByName("clubMessage").getChildByName("leftToggleGroup").children;
            console.log(toggle);
            toggle[2].getComponent(cc.Toggle).check();
            toggle[2].getComponent(cc.Toggle).isChecked=true;
        }
        cc.sys.localStorage.setItem("backclubFlag", "0");
    },
    initClubmemberino: function (p_data) {
        var _clubNode = this.node.getChildByName("clubMessage").getChildByName("message").getChildByName("scrollView").getChildByName("view").getChildByName("content");
        var _copynode;
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        if (p_data._WC._PID === _PID_temp) {
            _copynode = _clubNode.getChildByName("itemHuiZhang");
        } else {
            _copynode = _clubNode.getChildByName("itemHuiYuan");
        }
        _clubNode.removeAllChildren();//加载前清除原有数据
        _clubNode.height = p_data._CUL.length * 101;
        for (var i = 0; i < p_data._CUL.length; i++) {
            var _node = cc.instantiate(_copynode);
            _node.parent = _clubNode;
            _node.active = true;
            var clubmemberinfo = {
                image: new cc.SpriteFrame(),
                nameLabel: "",
                huizhang: true,
                jushuNum: "",
                btn: true
            };//如需在别处使用修改，则变为全局变量

            cc.MJ.common.tool.bindData.bindObjAndNode(clubmemberinfo, _node, null);
            //图片未设置
            // clubmemberinfo.image = cc.MJ.common.resources.getSpriteFrameByName("zhanjiClub", "member_pic");
            // clubmemberinfo.image = this.urlLoadImage(p_data._CUL[i]._WC._IUrl);
            cc.MJ.common.ui.UrlLoadImage(_node.getChildByName("image"), p_data._CUL[i]._WC._IUrl);
            var _huiflag = p_data._CUL[i]._WC._PID === p_data._WC._PID ? true : false;
            clubmemberinfo.nameLabel = p_data._CUL[i]._WC._Name;
            clubmemberinfo.huizhang = _huiflag;
            clubmemberinfo.jushuNum = "已玩" + p_data._CUL[i]._PC + "局";
            if (p_data._WC._PID === _PID_temp) {
                clubmemberinfo.btn = !_huiflag;
                console.log(_node.getChildByName("btn"));
                _node.getChildByName("btn").getComponent(cc.Button).clickEvents[0].customEventData = p_data._CUL[i]._WC._PID;
            } else {
                clubmemberinfo.btn = false;
            }

            // if (_huiflag) {
            //     clubmemberinfo.btn.clickEvents[0].customEventData = p_data._CUL[i]._WC._PID;
            // }
        }
    },
    initruhui: function (p_data) {
        p_data._ALS = p_data._ALS !== null ? p_data._ALS : [];
        console.log(p_data._ALS);
        var _copyNode = this.ruhuiitemDemo;
        var _parent = this.ruhuiitemParent;
        _parent.removeAllChildren();//加载前清除原有数据
        _parent.height = p_data._ALS.length * 94;
        for (var i = 0; i < p_data._ALS.length; i++) {
            var _dataModel = p_data._ALS[i];
            var _tempNode = cc.instantiate(_copyNode);
            _tempNode.parent = _parent;
            _tempNode.active = true;
            var _ruhuiModel = {
                headImage: new cc.SpriteFrame(),//此处需放默认无头像的spriteframe,先获取好对象，统一设置
                name: "",
                id: "ID:",
                remark: ""
            };
            cc.MJ.common.tool.bindData.bindObjAndNode(_ruhuiModel, _tempNode, null);
            _ruhuiModel.name = _dataModel._Name;
            _ruhuiModel.id += _dataModel._PID;
            _ruhuiModel.remark = _dataModel._Msg;
            // _ruhuiModel.headImage=_dataModel._Icon;//未设置头像

            //事件可复制，保证ui中绑定事件正常
            var _refuseBtn = _tempNode.getChildByName("btn1");
            _refuseBtn.getComponent(cc.Button).clickEvents[0].customEventData = _dataModel._PID;

            var _agreeBtn = _tempNode.getChildByName("btn2");
            _agreeBtn.getComponent(cc.Button).clickEvents[0].customEventData = _dataModel._PID;

        }
    },
    ruhuishenhe: function (event, customEventData, value) {
        this.ruhuiBtn = event.target.parent;
        console.log(customEventData);
        this.requestRaj(value, customEventData);
    },
    refusejoinclubEvent: function (event, customEventData) {
        this.ruhuiBtn = event.target.parent;
        console.log(customEventData);
        this.ruhuishenhe(event, customEventData, 0);
    },
    agreejoinclubEvent: function (event, customEventData) {
        this.ruhuiBtn = event.target.parent;
        this.ruhuishenhe(event, customEventData, 1);
    },
    joinRoomEvent: function (event, customEventData) {
        console.log(customEventData);
        //处理加入房间的请求
        this.requestCsd(customEventData);
    },
    initpaiju: function (p_data) {

        //此处后续需优化为  initruhui 中的获取节点的方式
        var _fathernode = this.node.getChildByName("clubMessage").getChildByName("paiju");
        var _copynode = _fathernode.getChildByName("item");
        var _parentnode = _fathernode.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        //此处后续需优化为  initruhui 中的获取节点的方式
        _parentnode.removeAllChildren();//加载前清除原有数据
        var _data = p_data._RSL;
        var _pageNum = _data.length % 4 === 0 ? _data.length / 4 : (parseInt(_data.length / 4) + 1);
        _parentnode.height = _pageNum * 470;
        console.log(_parentnode.width);
        for (var i = 0; i < _pageNum; i++) {
            var _tempNode = cc.instantiate(_copynode);
            _tempNode.parent = _parentnode;
            _tempNode.active = true;
            _tempNode.y = -5;
            var _pagedataindex = i * 4;
            var _pagedatalength = _data.length - _pagedataindex >= 4 ? _pagedataindex + 4 : _data.length;
            for (var k = 0; k < 4; k++) {

                if (_pagedataindex < _pagedatalength) {
                    var _model = _data[_pagedataindex];
                    _pagedataindex++;

                    var _dataModel = {
                        titleLabel: "",
                        headImage: {
                            _son: true,
                            head1: cc.MJ.common.resources.getSpriteFrameByName("zhanjiClub", "header_pic_game"),//此处需放默认无头像的spriteframe,先获取好对象，统一设置
                            head2: cc.MJ.common.resources.getSpriteFrameByName("zhanjiClub", "header_pic_game"),//此处需放默认无头像的spriteframe,先获取好对象，统一设置
                            head3: cc.MJ.common.resources.getSpriteFrameByName("zhanjiClub", "header_pic_game"),//此处需放默认无头像的spriteframe,先获取好对象，统一设置
                            head4: cc.MJ.common.resources.getSpriteFrameByName("zhanjiClub", "header_pic_game"),//此处需放默认无头像的spriteframe,先获取好对象，统一设置
                        },
                        joinBtn: false,
                        HUD: {
                            _son: true,
                            _active: false,
                            Label1: "局数：",
                            Label2: "玩法：",
                            Label3: "",

                        }
                    };
                    _tempNode.children[k].active = true;
                    cc.MJ.common.tool.bindData.bindObjAndNode(_dataModel, _tempNode.children[k], null);

                    var _joinBtn = _tempNode.children[k].getChildByName("joinBtn");
                    _joinBtn.getComponent(cc.Button).clickEvents[0].customEventData = _model._RNo;

                    var _bindNode = _tempNode.children[k].getChildByName("btn");
                    console.log("绑定了");
                    console.log(_bindNode);
                    _bindNode.on(cc.Node.EventType.TOUCH_START, function (event1) {
                        var _node = event1.target;
                        var _temp = _node.parent.getChildByName("HUD");
                        _temp.active = true;
                    });
                    _bindNode.on(cc.Node.EventType.TOUCH_CANCEL, function (event1) {
                        var _node = event1.target;
                        var _temp = _node.parent.getChildByName("HUD");
                        _temp.active = false;

                    });
                    _bindNode.on(cc.Node.EventType.TOUCH_END, function (event1) {
                        var _node = event1.target;
                        var _temp = _node.parent.getChildByName("HUD");
                        _temp.active = false;

                    });

                    _dataModel.titleLabel = _model._TN + "桌  " + this.RoomTypeLabel[_model._RT] + "   " + _model._TC + "局";
                    _dataModel.HUD.Label1 += _model._TC + "局";

                    //此处需沟通，不同麻将的显示字段
                    _dataModel.HUD.Label2 += this.RoomTypeLabel[_model._RT];

                    if (_model._GOM.playtype === "qiaoma") {
                        _dataModel.HUD.Label3 += "勒子: " + _model._GOM.maxtimes + "倍底花";
                    }else {
                        _dataModel.HUD.Label3 += "鸟数: 抓" + _model._GOM.score + "鸟";
                    }

                    //此处需沟通，不同麻将的显示字段

                    //此处需处理已开始，显示其他按钮（场景中增加按钮），数据绑定对象中增加按钮，控制显示隐藏
                    _dataModel.joinBtn = !_model._IsG;

                    //设置玩家头像
                    for (var a = 0; a < 4; a++) {
                        if (_model._PL.length > a) {
                            //设置用户头像
                            // _dataModel.headImage["head"+(a+1)]
                            var head = _tempNode.children[k].getChildByName("headImage").getChildByName("head" + (a + 1));
                            console.log(_model._PL[a]._IUrl);
                            cc.MJ.common.ui.UrlLoadImage(head, _model._PL[a]._IUrl);
                        } else {
                            //默认空头像，如数据绑定对象中已绑定默认头像，则此处无需处理
                        }
                    }
                } else {
                    console.log("隐藏item");
                    _tempNode.children[k].active = false;
                }


            }
        }

        //加载完对象后，需给所有item设置touchmove事件，，用于显示玩法
    },
    //刷新牌局
    refreshpaiju: function (event) {
        this.requestQcrl();
    },
    clubNameChanged: function (text, sender) {
        this.clubName = text;
    },
    clubNoticeChanged: function (text, sender) {
        this.clubNotice = text;
    },
    //该事件，在editorEvent中有模拟调用，如需【修改，增加】，检查后再处理
    clubImageClick: function (event, customEventData) {
        var _imageList = this.node.getChildByName("alert").getChildByName("editorClubMessage").getChildByName("clubImage").children;
        for (var i = 0; i < _imageList.length; i++) {
            var _tempnode = _imageList[i];
            _tempnode.setScale(1, 1);

        }
        var _node = event.target;

        _node.setScale(1.2, 1.2);
        this.clubImage = customEventData;
    },
    updateClubEvent: function () {
        this.requestupdateg();
    },
    //创建俱乐部Request
    requestupdateg: function () {
        if (this.clubName && this.clubImage) {
            var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
            var _cid = cc.MJ.data.getLocalStorage_clubId();
            var _createClub = {
                "_Cmd": "updateg",
                "_PID": _PID_temp,
                "_Data": {
                    "_CID": _cid, //俱乐部号
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
    closeClubMessage: function () {
        cc.director.loadScene('clubScene');
    },

    clubMessageToggleEvent: function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index = this.clubToggle.indexOf(toggle);
        switch (index) {
            case 0:
                this.clubMessageShow("message");
                this.requestQc();
                break;
            case 1:
                this.clubMessageShow("paiju");
                this.requestQcrl();
                break;
            case 2:
                this.clubMessageShow("zhanji");
                this.requestQcrp();
                break;
            case 3:
                var webnode = this.node.getChildByName("clubMessage").getChildByName("manageWebView");
                var web = webnode.getComponent(cc.WebView);
                webnode.active = true;
                // webnode.active = false;
                var webUrl = "http://106.14.117.76:9001/page/data_page1?id=" + cc.MJ.data.getLocalStorage_clubId() + "&uid=" + cc.MJ.data.getLocalStorage_LoginName();
                console.log(webUrl);
                web.url = webUrl;
                break;
            default:
                break;
        }
        // console.log(this.Check_obj_list);
    },
    //
    onWebFinished:function (webview, event, customEventData) {
        var HUD = this.node.getChildByName("alert").getChildByName("backHUD");
        switch (event) {
            case cc.WebView.EventType.LOADED:
                // console.log("=========网页加载完成");
                // HUD.active = false;
                this.clubMessageShow("manageWebView");
                cc.MJ.common.jsb.closeBtn();
                break;
            case cc.WebView.EventType.LOADING:
                // var clubMessage = this.node.getChildByName("clubMessage");
                // clubMessage.getChildByName("manageWebView").active = false;
                // console.log("=========网页加载中");
                // HUD.active = true;
                // cc.MJ.alert.tips_msg("网页加载中....");
                break;
            case cc.WebView.EventType.ERROR:
                // HUD.active = false;
                // cc.MJ.alert.tips_msg("网页加载出错....");
                // console.log("=========网页加载出错");
                break;
            default:
                break;
        }

    },
    
    clubMessageShow: function (nodeName) {
        var clubMessage = this.node.getChildByName("clubMessage");
        clubMessage.getChildByName("message").active = false;
        clubMessage.getChildByName("paiju").active = false;
        clubMessage.getChildByName("zhanji").active = false;
        clubMessage.getChildByName("zhanjiDetail").active = false;
        clubMessage.getChildByName("manageWebView").active = false;
        this.node.getChildByName("clubMessage").getChildByName("head").getChildByName("closebtn").active = true;
        clubMessage.getChildByName(nodeName).active = true;
    },

    //创建游戏
    createGame: function () {
        this.node.getChildByName("clubMessage").active = false;
        this.node.getChildByName("createRoom").active = true;
        this.node.getChildByName("createRoom").getChildByName("head").getChildByName("roomCard").getChildByName("label").getComponent(cc.Label).string = this.roomCardText;
        this.node.getChildByName("createRoom").getComponent("cj_room").initView();
    },
    //backCreateGame
    backCreateGame: function () {
        this.node.getChildByName("createRoom").active = false;
        this.node.getChildByName("clubMessage").active = true;
    },
    //编辑
    editorEvent: function () {
        this.showAlertNode("editorClubMessage");

        var _parentEditor = this.node.getChildByName("alert").getChildByName("editorClubMessage");
        var _edit = _parentEditor.getChildByName("clubNameBack").getChildByName("clubNameEditBox").getComponent(cc.EditBox);
        var _image = _parentEditor.getChildByName("clubImage").children;

        var _notice = _parentEditor.getChildByName("clubGonggaoBack").getChildByName("clubGongEditBox").getComponent(cc.EditBox);

        var _event = {target: _image[this.clubData._CIcon - 1]};
        this.clubImageClick(_event, this.clubData._CIcon);

        _edit.string = this.clubData._CName;
        _notice.string = this.clubData._CNotice;

        this.clubName = this.clubData._CName;
        this.clubNotice = this.clubData._CNotice;
    },
    closeEditor: function () {
        this.closeAlertNode("editorClubMessage");
    },
    //解散
    jiesanEvent: function () {
        this.showAlertNode("jiesan")
    },
    closeJiesan: function () {
        this.closeAlertNode("jiesan");
    },
    //退出
    quitEvent: function () {
        this.showAlertNode("tuichu");
    },
    closeQuit: function () {
        this.closeAlertNode("tuichu");
    },
    //复制俱乐部号
    inviteUser: function (event, customEventData) {
        var cid = cc.MJ.data.getLocalStorage_clubId();
        cid = "【打开大众麻将,输入" + cid + "俱乐部号,一起游戏吧!】"
        cc.MJ.common.jsb.pasteboardByStr(cid);
        this.showAlertEvent(event, customEventData);
    },
    closeinvite: function () {
        this.closeAlertNode("weChat");
    },

    //关闭与打开弹框优化方案
    showAlertEvent: function (event, customEventData) {
        this.showAlertNode(customEventData);
    },
    closeAlertEvent: function (event, customEventData) {
        this.closeAlertNode(customEventData);
    },


    //入会申请
    ruhuiEvent: function () {
        this.showAlertNode("ruhui");
        this.requestQal();
    },
    closeRuhui: function () {
        this.closeAlertNode("ruhui");
        this.requestQc();
        this.requestQcul();
    },

    showAlertNode: function (alertName) {
        this.node.getChildByName("alert").getChildByName("backHUD").active = true;
        this.node.getChildByName("alert").getChildByName(alertName).active = true;
    },
    closeAlertNode: function (alertName) {
        console.log(alertName);
        this.node.getChildByName("alert").getChildByName("backHUD").active = false;
        this.node.getChildByName("alert").getChildByName(alertName).active = false;
    },

    //关闭网页
    closeWebView: function () {
        var toggle = this.node.getChildByName("clubMessage").getChildByName("leftToggleGroup").children;
        toggle[0].getComponent(cc.Toggle).check();

        // this.clubMessageShow("message");
    },

    //战绩
    addZJRoomItem: function (data) {
        var zjBack = this.node.getChildByName("clubMessage").getChildByName("zhanji").getChildByName("zjBack");
        var content = zjBack.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        content.removeAllChildren();
        var item = zjBack.getChildByName("item");
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tempItem = cc.instantiate(item);
            content.addChild(tempItem);
            var resultimage = "victory_icon";
            if (parseInt(itemData._Score) <= 0) {
                resultimage = "fail_icon";
            }
            tempItem.getChildByName("result").getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("zj", resultimage);
            tempItem.getChildByName("timeLabel").getComponent(cc.Label).string = itemData._RST;
            tempItem.getChildByName("hometype").getComponent(cc.Label).string = this.rt[itemData._RT];
            tempItem.getChildByName("jushu").getComponent(cc.Label).string = itemData._TC + "局";
            tempItem.getChildByName("score").getComponent(cc.Label).string = itemData._Score > 0 ? "+" + itemData._Score : itemData._Score;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "clubInfo";//这个是代码文件名
            clickEventHandler.handler = "detailCallBack";
            clickEventHandler.customEventData = itemData._RID;

            var button = tempItem.getChildByName("btn").getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    },
    detailCallBack: function (event, customEventData) {
        // console.log("绑定的data", customEventData);
        this.showZjDetail(customEventData);
    },
    showZjDetail: function (customEventData) {
        this.clubMessageShow("zhanjiDetail");
        this.node.getChildByName("clubMessage").getChildByName("head").getChildByName("closebtn").active = false;
        this.requestQcts(customEventData);
    },
    backZhanjiEvent: function () {
        this.node.getChildByName("clubMessage").getChildByName("head").getChildByName("closebtn").active = true;
        this.clubMessageShow("zhanji");
    },

    //战绩详情
    zjDetailData: function (obj) {
        // console.log("更新战绩详情");
        this.pidArray = [];
        var zjDetail = this.node.getChildByName("clubMessage").getChildByName("zhanjiDetail").getChildByName("zjBack");
        var titleLabel = zjDetail.getChildByName("title");
        var bottomLabel = zjDetail.getChildByName("bottomItem");
        for (var i = 0; i < obj._Data._TSL.length; i++) {
            var tslData = obj._Data._TSL[i];
            titleLabel.getChildByName("wanjia" + (i + 1)).getComponent(cc.Label).string = tslData._WC._Name;
            bottomLabel.getChildByName("allLabel" + (i + 1)).getComponent(cc.Label).string = tslData._Score;
            this.pidArray.push(tslData._PID);
        }
        for (var t = obj._Data._TSL.length; t < 4; t++) {
            titleLabel.getChildByName("player" + (1 + t)).getComponent(cc.Label).string = "";
            bottomLabel.getChildByName("allLabel" + (1 + t)).getComponent(cc.Label).string = "";
        }
        this.addZJDetailItem(obj._Data._RTSL);
    },
    addZJDetailItem: function (data) {
        var zjDetail = this.node.getChildByName("clubMessage").getChildByName("zhanjiDetail").getChildByName("zjBack");
        var content = zjDetail.getChildByName("scrollView").getChildByName("view").getChildByName("content");
        content.removeAllChildren();
        var item = zjDetail.getChildByName("item");
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tempItem = cc.instantiate(item);
            content.addChild(tempItem);
            tempItem.getChildByName("jushuLabel").getComponent(cc.Label).string = itemData._TN;
            var tslArray = ["", "", "", "", ""];
            for (var t = 0; t < this.pidArray.length; t++) {
                for (var j = 0; j < itemData._TSL.length; j++) {
                    if (itemData._TSL[j]._PID === this.pidArray[t]) {
                        tslArray.splice(t, 1, itemData._TSL[j]._TS);
                    }
                }
            }

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.handler = "huifang";
            clickEventHandler.component = "clubInfo";
            clickEventHandler.customEventData = data[i]._TID;
            var button = tempItem.getChildByName("btn").getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);

            this.updateZJDetailScore(tslArray, tempItem);
        }
    },
    updateZJDetailScore: function (scoreAry, item) {
        // console.log("更新每局的分数");
        // console.log(scoreAry);
        for (var i = 0; i < 4; i++) {
            item.getChildByName("wanjia" + (i + 1)).getComponent(cc.Label).string = scoreAry[i];
        }
    },
    huifang: function (event, costomEventData) {
        var tableNo = cc.sys.localStorage.setItem("table_ID", costomEventData);
        cc.MJ.common.ui.loadScene("gamehuifangScene");
        cc.MJ.data.setLocalStorage_huifangClub("true");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
