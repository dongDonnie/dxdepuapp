/**
 * Created by hxl on 2018/3/13.
 */
cc.Class({
    extends: require("gametable"),

    properties: {},
    ctor: function () {
        //位置对象（包含显示玩家所有信息）
        this.seatInfo = {};
        //手牌对象（包含显示出牌）
        this._paiNum = {
            pai0: { Current: [], Drop: [] },
            pai1: { Current: [], Drop: [] },
            pai2: { Current: [], Drop: [] }
        };
        // cc.MJ.common.resources.cacheAtlasByUrl("atlas/poker/poker", "poker");
        this.GameType = { "easy": "三人斗地主 · 初级场", "middle": "三人斗地主 · 中级场", "high": "三人斗地主 · 高级场", "default": "三人斗地主 · 亲友场" };
        cc.log("斗地主加载");
    },
    /**
     * basic function
     */
    /**
     * 初始化加载
     * 包含用户，规则，进入房间等基础信息加载
     */
    init: function (p_data) {
        //初始绑定对象数据
        this._obj = null;
        this.myInfo = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
        this._obj = cc.MJ.common.tool.bindData.getNodeObj(this.node.getChildByName("content")); //获取需要绑定数据的节点数据对象
        // console.log(this._obj);
        var p_data_test = {
            "_Cmd": "room",
            "_Data": {
                "_RNo": "710423", //房间号
                "_TN": 1, //局数
                "_Step": 1, //步数
                "_IsEG": false, //是否结束游戏
                "_IsSG": true, //是否开始游戏
                "_GOM": { //玩法
                    "count": "1",
                    "playtype": "default",
                    "mingold": 100, //最小金币数
                    "maxgold": 500, //最大金币数
                    "totalgold": 500, //总代入
                    "gametime": 30, //游戏时间（单位为分钟）
                    "roomtype": "landlord"
                },
                "_PSL": [{ //重载游戏数据集合
                    "_SNo": 3, //座位号
                    "_CCL": [12, 23, 74, 8, 14, 67, 44, 49, 3, 11, 35, 7, 64, 27, 24, 63, 13], //玩家手牌
                    "_Score": 0, //分数
                    "_VC": null, //有效执行动作
                    "_AC": [{ //玩家可执行动作和可选动作类型
                        "_ActionCode": "qz", //动作编码
                        "_ActionSeatNo": 2, //动作玩家座位号
                        "_PlayerChoseSet": [{ //玩家可选动作牌型
                            "_CardShape": [0, 1, 2, 3] //可抢庄分数
                        }],
                        "_PlayerResolve": null //玩家最终决定牌型
                    }],
                    "_PU": { //玩家信息
                        "_PID": "gavin_test_003",
                        "_Name": "gavin_test_003",
                        "_Gender": "男",
                        "_IUrl": "www.baidu.com"
                    },
                    "_IsN": false, //网络连接
                    "_CCC": 17, //牌数
                    "_DL": [], //出牌集合
                    "_ShapeType": null, //出牌牌型
                    "_IsReady": 1, //是否准备游戏
                    "_IsCC": false, //是否有牌权
                    "_IsCSNo": null, //有牌权玩家座位号
                    "_IsE": null //是有劝人退出
                }, {
                    "_SNo": 0,
                    "_CCL": [65, 53, 64, 5, 45, 25, 46, 72, 9, 6, 7, 4, 27, 15, 43, 47, 66],
                    "_Score": 0,
                    "_VC": null,
                    "_AC": [{ //玩家可执行动作和可选动作类型
                        "_ActionCode": "qz", //动作编码
                        "_ActionSeatNo": 2, //动作玩家座位号
                        "_PlayerChoseSet": [{ //玩家可选动作牌型
                            "_CardShape": [0, 1, 2, 3] //可抢庄分数
                        }],
                        "_PlayerResolve": null //玩家最终决定牌型
                    }],

                    "_PU": {
                        "_PID": "gavin_test_001",
                        "_Name": "gavin_test_001",
                        "_Gender": "男",
                        "_IUrl": "www.baidu.com"
                    },
                    "_IsN": false,
                    "_CCC": 17,
                    "_DL": [12, 23, 74, 8, 14, 67, 44, 49, 3, 11, 35, 7, 64, 27, 24, 63, 13],
                    "_ShapeType": null,
                    "_IsReady": 1,
                    "_IsCC": false,
                    "_IsCSNo": null,
                    "_IsE": null
                }, {
                    "_SNo": 1,
                    "_CCL": [30, 55, 51, 44, 71, 69, 27, 54, 26, 46, 52, 33, 50, 70, 32, 16, 10],
                    "_Score": 0,
                    "_VC": "qz",
                    "_AC": [{ //玩家可执行动作和可选动作类型
                        "_ActionCode": "qz", //动作编码
                        "_ActionSeatNo": 2, //动作玩家座位号
                        "_PlayerChoseSet": [{ //玩家可选动作牌型
                            "_CardShape": [0, 1, 2, 3] //可抢庄分数
                        }],
                        "_PlayerResolve": null //玩家最终决定牌型
                    }],
                    "_PU": {
                        "_PID": "gavin_test_002",
                        "_Name": "gavin_test_002",
                        "_Gender": "男",
                        "_IUrl": "www.baidu.com"
                    },
                    "_IsN": false,
                    "_CCC": 17,
                    "_DL": [],
                    "_ShapeType": null,
                    "_IsReady": 1,
                    "_IsCC": false,
                    "_IsCSNo": null,
                    "_IsE": null
                }],
                "_BankerSeatNo": null, //庄家座位号
                "_IsR": true, //是否准备游戏
                "_TET": null, //房间结束时间
                "_MPSNo": 0, //房主座位号
                "_DSNo": 1, //下一个活动玩家
                "_PSNo": null, // 发起解散玩家座位号
                "_BankerCards": [44, 49, 3],
                "_RSTime": null
            },
            "_NSID": "05af8f05-6107-489e-a83d-4de4a33dd702",
            "_EMsg": null,
            "_IsS": true,
            "_PID": "gavin_test_001"
        };
        // p_data = p_data._Data;
        //数据绑定使用范例
        var _obj = cc.MJ.common.tool.bindData.getNodeObj(this.node); //获取需要绑定数据的节点数据对象
        var _EventList = [{
            _targetObj: this.node, //事件所在节点
            _targetName: "dpGame", //事件所在脚本名称
            _handlerName: "PaiEvent" //事件名
        },]; //事件列表，用户动态绑定
        cc.MJ.common.tool.bindData.bindObjAndNode(this._obj, this.node.getChildByName("content"), _EventList);
        var p_roomType = this.roomrule.roomtype;
        if (!p_roomType && p_data) {
            p_roomType = p_data._GOM.roomtype;
        }
        //绑定后由_obj控制页面内容，使用对象层级为页面布局层级
        this.seatObj = this._obj.gameTypeTable[p_roomType].seat;
        this.paiObj = this._obj.gameTypeTable[p_roomType].pai;
        this.playpaiObj = this._obj.gameTypeTable[p_roomType].playpai;
        this.clockObj = this._obj.gameTypeTable[p_roomType].clock;
        this.gamebtnObj = this._obj.gameTypeTable[p_roomType].gamebtn;
        this.toppaiObj = this._obj.gameTypeTable[p_roomType].toppai_w;
        this.finishObj = this._obj.gameTypeTable[p_roomType].finishdialog;
        this.communal = this._obj.gameTypeTable[p_roomType].communal;
        this.initGameRule();
        //初始绑定对象数据
        this.initBtnStatus(null);

        if (!p_data) {
            return;
        }
        this.initTableBtn(p_data);
        this.isViewer(p_data._WaitList);

        this._BankerSeatNo = p_data._BankerSeatNo;
        this._setDizhu();

        //传递对象处理相关信息
        this._super(p_data);
        this.initFootUserInfo(p_data);
    },

    initFootUserInfo: function (p_data) {
        var foot = this._obj.tablefoot;
        foot.ownData.difen.val_m = p_data._BS;
        foot.ownData.beishu.val_m = p_data._Times;
        foot.header_pic.money_m = "￥" + this.seatObj.seat0.head.money.val_m;
        foot.header_pic.isDizhu = this.seatObj.seat0.head.isDizhu;
        foot.header_pic.name_m = this.myInfo._Name;
        this.myInfo._PU = {};
        this.myInfo._PU._IUrl = this.myInfo._IUrl;
        this.setUserIcon(this.myInfo, foot, true);

    },
    isViewer: function (p_data) {
        var myInfo = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
        var isExist = false;
        for (let i = 0; i < p_data.length; i++) {
            if (myInfo._PID === p_data[i]._PID) {
                isExist = true;
            }
        }
        this._obj.tablefoot._active = !isExist;
    },
    _setDizhu: function () {
        if (this._BankerSeatNo != null) {
            var _dizhu = this.seatObj["seat" + this._BankerSeatNo];
            _dizhu.head.isDizhu = true;
        }
    },
    initMySeat: function (d, num) {
        var myInfo = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
        var myseat = this.seatObj["seat" + d];
        myseat.space = false;
        myseat.head.name_m = myInfo._Name;
        myseat.head._active = true;
        myInfo._PU = {};
        myInfo._PU._IUrl = myInfo._IUrl;
        this.setUserIcon(myInfo, myseat);

        myseat.head.isReady = true;
        myseat.head.isNet = false;
        myseat.head.money.val_m = num;
    },
    /**
     * 初始化用户信息
     * 可通过实例化不同类型游戏对象重写该函数
     */
    // initUser: function () {
    //     this._super();
    // },
    /**
     * 初始化游戏规则
     * 可通过实例化不同类型游戏对象重写该函数
     */
    initGameRule: function () {
        this._super();
        var _roomNo = this.roomrule.playtype === "default" ? "\n房间号：" + this.roomNum : "";
        this._obj.roomTime._active = this.roomrule.playtype === "default";
        this._obj.tableinfo.rule_m = "封顶倍数  " + this.roomrule.maxtimes + "  入场门槛  " + this.roomrule.mingold + "  最小带入  " + this.roomrule.playermingold + _roomNo;
        this._obj.waittime = false;
    },

    initTableBtn: function (data) {
        if (data._GOM.playtype == 'default') {
            if (data._RSTime == null) {
                this._obj.tablebtn._active = true;
                this._obj.tablebtn.takegold_btn = false;
                this._obj.tablebtn.start_btn = true;
                this._obj.tablebtn.cancel_btn = false;
            } else {
                if (data._PSL.length < 3) {
                    this._obj.tablebtn.share_btn = true;
                } else {
                    this._obj.tablebtn.share_btn = false;
                }
                this._obj.tablebtn.takegold_btn = false;
                this._obj.tablebtn.start_btn = false;
                this._obj.tablebtn.cancel_btn = false;
                this._obj.gameTypeTable._active = true;

                if (data._BankerSeatNo != null) {
                    this.seatObj._active = true;
                } else {
                    this.seatObj._active = false;
                }
            }
        }
    },

    /**
     * 初始化按钮当前可用状态
     */
    initBtnStatus: function (p_type) {
        // this._super(p_type);
        //斗地主
        if (cc.sys.localStorage.getItem("status") !== "false") { //亲友场
            this._obj.tablebtn._active = false;
        }
        if (cc.sys.localStorage.getItem("playerpool") !== "false") {
            this._obj.tablebtn._active = true;
            this._obj.tablebtn.cancel_btn = false;
            this._obj.tablebtn.start_btn = true;
            this._obj.tablebtn.share_btn = false;
            this._obj.tablebtn.takegold_btn = true;
            this._obj.tablefoot._active = false;
        }
        if (cc.sys.localStorage.getItem("matchpool") !== "false") {
            this._obj.tablebtn._active = true;
            this._obj.tablebtn.cancel_btn = true;
            this._obj.tablebtn.start_btn = false;
            this._obj.tablebtn.share_btn = false;
            this._obj.tablebtn.takegold_btn = false;
        }
        
        cc.sys.localStorage.removeItem("status");
        cc.sys.localStorage.removeItem("matchpool");
        cc.sys.localStorage.removeItem("playerpool");


        //德州扑克

        //牛牛

    },
    // /**
    //  * 选择位置入座
    //  */
    // joinRoom: function () {
    //     this._super();
    // },
    /**
     * 退出房间
     */
    existRoom: function () {
        this._super();
    },
    /**
     * 带入金币
     */
    addGold: function () {
        this._super();
    },
    /**
     * 战况
     */
    gameResult: function () {
        this._super();
    },
    /**
     * basic function
     */
    CommonFuncInit: function (p_obj, p_flag, guopai) {
        this.initPlayedCard(p_obj._SNo);
        if (!guopai) {
            this.initCurrentPaiOBJ(p_obj._SNo, false);
        }

        this.initSetBtnStatus(p_obj);
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 2 ? 0 : _sno;
        this._setCenterNum(_sno);
    },
    /**
     * main logic
     */
    cp: function (p_obj) {
        cc.MJ.common.sound.playSoud("givecard");
        if (p_obj._IsCSNo !== null) {
            if (p_obj._C === "dz" || p_obj._C === "yd") {
                cc.MJ.common.sound.playSoud(p_obj._C + (p_obj._Shape[0] % 20));
            } else if (p_obj._C) {
                cc.MJ.common.sound.playSoud(p_obj._C);
            }
        } else {
            if (p_obj._C) {
                cc.MJ.common.sound.playSoud(p_obj._C);
            } else {
                var _datasound = ["dani0", "dani1", "dani2"];
                this.radomSound(_datasound, 0, 2);
            }

        }


        var _drop = this._paiNum["pai" + p_obj._SNo].Drop;
        var _current = this._paiNum["pai" + p_obj._SNo].Current;

        if (p_obj._SNo === 0) {
            for (var i = 0; i < p_obj._Shape.length; i++) {
                var index = cc.MJ.common.tool.UITool.getIndexByValue(_current, p_obj._Shape[i]);
                _current.splice(index, 1);
            }
            if (_current.length <= 5) {
                cc.MJ.common.sound.playSoud("sound_alert");
            }

        } else {
            this._paiNum["pai" + p_obj._SNo].Current = _current - p_obj._Shape.length;
            if (_current - p_obj._Shape.length <= 5) {
                cc.MJ.common.sound.playSoud("sound_alert");
            }
        }

        if (p_obj._IsFD) {
            this.gamebtnObj.game.guopai_btn = false;
            this.gamebtnObj.game.tip_btn = false;

        } else {
            this.gamebtnObj.game.guopai_btn = true;
            this.gamebtnObj.game.tip_btn = true;
            
        }

        this._paiNum["pai" + p_obj._SNo].Drop = p_obj._Shape;
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 2 ? 0 : _sno;
        console.log(_sno);
        this._paiNum["pai" + _sno].Drop = [];
        this.initPlayedCard(_sno);
        this.CommonFuncInit(p_obj);
    },


    qz: function (p_obj) {
        this._BankerSeatNo = p_obj._BankerSeatNo;
        this.initSetBtnStatus(p_obj);
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 2 ? 0 : _sno;
        this._setCenterNum(_sno);
        this._setDizhu();

    },
    guopai: function (p_obj) {
        var _datasound = ["pass0", "pass1", "pass2", "pass3"];
        this.radomSound(_datasound, 0, 3);
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 2 ? 0 : _sno;
        console.log(_sno);
        this._paiNum["pai" + _sno].Drop = [];
        this.initPlayedCard(_sno);
        this.CommonFuncInit(p_obj, false, true);
        if (p_obj._IsFD) {
            this.gamebtnObj.game.guopai_btn = false;
            this.gamebtnObj.game.tip_btn = false;

        } else {
            this.gamebtnObj.game.guopai_btn = true;
            this.gamebtnObj.game.tip_btn = true;

        }
    },
    tsSelectpai: function (p_obj) {
        return this.selectPoker(p_obj._S);
    },

    dj: function (p_obj) {
        this.initZJ_qm(p_obj);
    },
    zj: function (p_obj) {
        setTimeout(() => {
            this.finishObj._active = false;
            cc.MJ.data.setLocalStorage_roomNo("");
            cc.director.loadScene("dpHomeScene");

        }, 5000);
    }

    /**
     * main logic
     */
});