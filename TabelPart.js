/**
 * Created by hxl on 2017/7/9.
 */
cc.Class({
    extends: require("RoomPart"),
    properties: {

        _paiNum: null,
        _ActivePlayer: 0,
        _tingStatus: false
    },
    ctor: function () {
        // cc.loader.loadRes("Image/altas/Number", cc.SpriteAtlas, function (err, atlas) {
        //     this._NumberSprite = atlas;
        // });

        this._reset();

    },
    _reset: function () {
        this._paiNum = {
            pai0: {Current: [], Drop: []},
            pai1: {Current: [], Drop: []},
            pai2: {Current: [], Drop: []},
            pai3: {Current: [], Drop: []}
        };
        cc.sys.localStorage.setItem("_Step", "0");

    },
    //初始化table,重写父级function并调用
    init: function (p_obj, roomobj) {
        this._loginname = cc.sys.localStorage.getItem('_PID');
        this._roomNo = cc.sys.localStorage.getItem('roomNo');
        this._super(p_obj, roomobj);
        // this._gameModule.ZJ_qm._active = false;
        // this._gameModule.ZJ_room._active = false;
        this.roomObj.jiesan._active = false;
        this.roomObj.alert.end._active = false;
        this.roomObj.alert.dj._active = false;
        this.roomObj.game.tanlayout._active = false;


        // console.log("游戏是否结束");
        // console.log(p_obj._IsEG);
        //this.InitCenter(p_obj._RC, p_obj._ASNo);
        //初始化牌面节点对象
        var _hasseat = [];
        if (p_obj._IsSG) {
            this.roomObj.setBtnNode.surrenderBtn = false;
            // this.roomObj.setBtnNode.startBtn = false;
            this.roomObj.setBtnNode.jiesan = true;
            this.roomObj.setBtnNode.invitebtn = false;


        } else {

            this.roomObj.setBtnNode.surrenderBtn = true;
            this.roomObj.setBtnNode.jiesan = false;


        }
        if (p_obj._PSL.length === 4) {
            this.roomObj.setBtnNode.invitebtn = false;
        }

        var _mySeat = null;
        for (var i = 0; i < p_obj._PSL.length; i++) {

            var _seat_obj = p_obj._PSL[i];


            var isfangzhu = false;
            if (p_obj._MPSNo === _seat_obj._SNo) {
                isfangzhu = true;
            }
            _hasseat.push(_seat_obj._SNo);
            this.setPlayerModel(_seat_obj, isfangzhu, p_obj);
            if (_seat_obj._SNo === 0) {
                _mySeat = _seat_obj;
                this.roomObj.setBtnNode.readybtn = _seat_obj._IsReady === 0 ? true : false;

            }
            if (p_obj._IsSG) {
                this.roomObj.readylayout["ready" + _seat_obj._SNo] = _seat_obj._IsReady === 0 ? true : false;

                this.roomObj.gameMessage.tableScore._active = true;
                // this.roomObj.game.time._active=true;
                var _clist = _seat_obj._CCC;

                if (_seat_obj._SNo === 0) {
                    _clist = _seat_obj._CCL;

                    this.initActionBtn(_seat_obj);
                    this._sendReadyMsg(_seat_obj._IsReady === 1);
                }
                if (_seat_obj._VC) {
                    //this._initCenter(_seat_obj);
                    this._setCenterNum(_seat_obj._SNo);
                }
                var _dlist = _seat_obj._DL || [];
                var _tempPaiNum = this._paiNum["pai" + _seat_obj._SNo];


                _tempPaiNum.Drop = _dlist;
                if (_seat_obj._SNo === 0) {
                    _clist.sort(function (a, b) {
                        return b % 20 - a % 20;
                    });
                    // console.log(_clist);
                }

                _tempPaiNum.Current = _clist;
                this.initCurrentPaiOBJ(_seat_obj._SNo, p_obj._IsEG);
                this.setTabelScore(p_obj._TS);
                this.initDropPaiOBJ(_seat_obj._SNo);

            } else {
                this.roomObj.gameMessage.tableScore._active = false;
                this.roomObj.readylayout["ready" + _seat_obj._SNo] = _seat_obj._IsReady === 0 ? false : true;

            }


        }
        if (p_obj._PSNo) {
            var _seatName = "Player" + p_obj._PSNo;
            this.roomObj.jiesan._active = true;
            this.roomObj.jiesan.confirm = false;
            if (_mySeat._IsE === null) {

                this.roomObj.jiesan.agree = true;
                this.roomObj.jiesan.refuse = true;

                this.roomObj.jiesan.content.name = this.roomObj.players[_seatName].name;
                this.roomObj.jiesan.content.staticlabel = "     请求解散房间";
            } else {

                this.roomObj.jiesan.agree = false;
                this.roomObj.jiesan.refuse = false;
                this.roomObj.jiesan.content.name = "";
                this.roomObj.jiesan.content.staticlabel = "请等待其他玩家选择";
            }

        }

        var _hasseat_str = _hasseat.join("_");
        for (var i = 0; i < 4; i++) {
            if (_hasseat_str.indexOf(i) === -1) {
                var playerModel = this.roomObj.players["Player" + i];
                playerModel._active = false;
                this.roomObj.readylayout["ready" + i] = false;
            }

        }


    },
    _sendReadyMsg: function (p_flag) {
        if (!p_flag) {
            var _obj =
                {
                    _Cmd: "readyg",
                    _PID: this._loginname, //玩家ID
                    _Data: {
                        _RNo: this._roomNo
                    }
                }
            cc.MJ.socket.sendGetRequest(_obj, null, null);
        }
    },


    /**
     * 初始化桌面中心数据
     * */
    InitCenter: function (p_num, p_seatNo) {

        this._initCenter(p_seatNo);
    },
    setTabelScore: function (score) {
        // console.log(score);
        this.roomObj.gameMessage.tableScore.score = score;
    },
    _setCenterNum: function (p_sNo) {
        this.roomObj.game.time._active = true;
        cc.director.getScheduler().unschedule(this.callback, this);
        this.hasSecond = 30;
        for (var i = 0; i < 4; i++) {
            this.roomObj.game.time["time" + i]._active = false;
            this.roomObj.game.time["time" + i].label = 30;
        }
        var timer = this.roomObj.game.time["time" + p_sNo];
        timer._active = true;
        timer.label = 30;
        this.callback = function () {
            if (this.hasSecond < 0) {
                // 在最后一次执行回调时取消这个计时器
                //weiChat.phoneShake();
                //  this.unschedule(this.callback);
                cc.director.getScheduler().unschedule(this.callback, this);
                this._flag = true;
            } else {
                this._flag = false;
                timer.label = this.hasSecond;
                this.hasSecond--;

            }

        };

        cc.director.getScheduler().schedule(this.callback, this, 1, cc.macro.REPEAT_FOREVER, 0, false);
        // this.schedule(this.callback, 1);


    },
    _initCenter: function (p_obj) {

        this._setCenterNum(p_obj);
    },

    /**
     * 初始化桌面中心数据
     * */


    /**
     * Common Function
     *
     * */
    //根据位置获取对应的牌面图片url[游戏结束未结束为两种牌面]
    _getSeatPaiUrl: function (p_seat, flag) {
        var _seat = cc.MJ.module.Static.seatPai[p_seat];
        var _imgurl = this.IsEndGame ? _seat.in : _seat.in;
        if (flag) {
            return _seat.out;
        } else {
            return _imgurl;
        }

    },
    //清除桌面所有元素
    clearTable: function () {

        this._paiNode = {};
        this._paiNum = {};

        var temp_bird_layout = this.node.getChildByName("catchbird");
        if (cc.isValid(temp_bird_layout)) {
            temp_bird_layout.destroy();
        }

    },

    /**
     * Common Function
     *
     * */

    /**
     * 初始化手牌
     *
     * */
    //初始化当前位置用户的手牌
    initCurrentPaiOBJ: function (p_seat, p_endflag) {
        // if (!p_endflag) {
        if (p_seat === 0) {

            this._bottomInit(p_seat, p_endflag);


        } else {
            this._commonInit(p_seat, p_endflag);
        }

    },

    //初始化本家手牌
    _bottomInit: function (p_SeatNo, p_endflag) {

        var __ret = this._getBaseInitParam(p_SeatNo);
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        // console.log(p_obj);
        // console.log(_list);
        for (var i = 0; i < p_obj.length; i++) {
            var _obj = p_obj[i].paibtn;
            _obj._y = 0;
            if (_list.length > i) {
                _obj._active = true;
                _obj._button = {_EventData: _list[i], _EventID: 0};
                // console.log("进来加载牌");
                // console.log(_list[i]);
                _obj._color = cc.Color.WHITE;
                _obj._sprite = cc.MJ.common.resources.getSpriteFrameByName("poker", "p" + _list[i]);
                continue;
            }
            _obj._button = {_EventData: "0", _EventID: 0};
            _obj._active = false;
            _obj._sprite = new cc.SpriteFrame();

        }
        var _Widget = this.node.getChildByName("game").getChildByName("inpai").getChildByName("inpai0").getComponent(cc.Widget);
        // _Widget.isAlignHorizontalCenter=true;
        console.log(_Widget);
        // _Widget.horizontalCenter = -10;
        this.node.getChildByName("game").getChildByName("inpai").getChildByName("inpai0").width = _list.length * 42 + 64;
        _Widget.updateAlignment();
        console.log(_Widget);

    }, selectPoker: function (p_select_list) {
        var __ret = this._getBaseInitParam("0");
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        var _temp = [];
        var _index = 0;
        if (p_select_list) {

            for (var i = 0; i < _list.length; i++) {
                var _obj = p_obj[i].paibtn;
                _obj._y = 0;
                for (var k = 0; k < p_select_list.length; k++) {
                    if (p_select_list[k] === _list[i]) {
                        //console.log(p_select_list[k]);
                        _temp.push(p_select_list[k]);
                        _obj._y = 30;
                        _index = k + 1;
                        p_select_list.splice(k, 1);
                        break;
                    }else {}


                }


            }
        }
        return _temp;
    },
    //初始化本家手牌
    _EndCurrentInit: function (p_SeatNo, p_endflag) {
        var __ret = this._getBaseInitParam(p_SeatNo, p_endflag);
        var p_seat = __ret.p_seat;
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        var _imgurl = __ret._imgurl;
        for (var i = 0; i < p_obj.length; i++) {
            var _obj = null;
            if (p_SeatNo === 0) {
                if (i == 0) {
                    _obj = p_obj[i].top.temp1;
                } else {
                    _obj = p_obj[i].temp1;
                }

            } else {
                _obj = p_obj[i][this._seat[p_SeatNo]];
            }
            if (_list.length >= i) {

                // _obj._button = {_EventData: _list[i], _EventID: -1};


                if (_list[i] === 0) {
                    _obj._active = false;
                } else {
                    _obj._active = true;

                    var _tempAry = _imgurl.split("/");
                    _obj._sprite = cc.MJ.common.resources.getSpriteFrameByName(_imgurl[0], _imgurl[1] + _list[i]);

                    // cc.MJ.common.tool.UITool.buttonLoadImage(null, _imgurl + _list[i], _obj);
                }
                continue;
            }
            _obj._active = false;

        }
    },
    _getBaseInitParam: function (p_SeatNo) {
        var p_obj = this.roomObj.game.inpai["inpai" + p_SeatNo];
        var _list = this._paiNum["pai" + p_SeatNo].Current;
        return {p_obj: p_obj, _list: _list};
    },
    _showScene: function (obj, p_else) {

        obj._active = true;
        this._gameModule[p_else]._active = false;
    },
    //初始化其他位置用户的手牌
    _commonInit: function (p_SeatNo, p_endflag) {
        var __ret = this._getBaseInitParam(p_SeatNo, p_endflag);
        var p_obj = __ret.p_obj;
        var _list = __ret._list;

        //p_obj.label = _list > 10 ? "10+" : _list;
        p_obj.label = _list <= 5 ? _list : "";
    },
    /**
     * 初始化手牌
     *
     * */





    /**
     * 初始化弃牌
     *
     * */
    //初始化当前位置用户的弃牌
    initDropPaiOBJ: function (p_SeatNo) {
        this.roomObj.game.outpai._active = true;
        var _list = this._paiNum["pai" + p_SeatNo].Drop;


        var p_obj = this.roomObj.game.outpai["outpai" + p_SeatNo];

        var _param = {p_obj: p_obj, p_list: _list};
        this._DropInit(_param);
    },
    //初始化弃牌
    _DropInit: function (p_obj) {
        for (var i = 0; i < p_obj.p_obj.length; i++) {
            var _tempobj = p_obj.p_obj[i].pai;


            if (p_obj.p_list.length > i) {

                // console.log(p_obj.p_list);
                _tempobj._active = true;


                _tempobj._sprite = cc.MJ.common.resources.getSpriteFrameByName("poker", "p" + p_obj.p_list[i]);
            } else {
                _tempobj._active = false;
            }
        }
    },
    /**
     * 初始化弃牌
     *
     * */



    /**
     * 初始化吃，碰，杠牌
     *
     * */


    /**
     * 初始化碰，杠，吃取消等按钮
     * */
    initActionBtn: function (p_obj) {

        // console.log("有没有按钮");
        // console.log(p_obj);
        console.log(p_obj);
        if (p_obj._VC === null) {
            this.roomObj.game.jiao = false;
            this.roomObj.game.btnlayout._active = false;
            return;
        }

        if (p_obj._VC === "qz") {
            this.roomObj.game.jiao = true;
            this.roomObj.game.btnlayout._active = false;
        } else if (p_obj._VC === "cp") {
            this.roomObj.game.btnlayout._active = true;

            this.roomObj.game.jiao = false;
        }
        if (p_obj._IsCC) {
            this.roomObj.game.btnlayout.passBtn = false;
        } else {
            this.roomObj.game.btnlayout.passBtn = true;
        }

    },

    /**
     * 初始化碰，杠，吃取消等按钮
     * */
    /**
     * 游戏结束，摊牌
     * */
    InitEndGame: function () {
        this.IsEndGame = true;
        // for (var i in this._paiNum) {
        //     var _index = cc.MJ.common.tool.UITool.getIndexByValue(this._seat, i);
        //     this._EndCurrentInit(_index, false);
        // }
    },
    setreadyShow: function (p_obj) {
        this.roomObj.readylayout["ready" + p_obj._SNo] = p_obj._IsReady;
        if (p_obj._SNo === 0) {
            this.roomObj.setBtnNode.readybtn = !p_obj._IsReady;
        }
    },

    initZJ_qm: function (obj) {
        // obj = {
        //     "_Cmd": "te",
        //     "_Data": {
        //         "_RNo": "469451",
        //         "_PSL": [{
        //             "_SNo": 0,
        //             "_Score": -4,
        //             "_IsWin": false,
        //             "_WinNo": 0,
        //             "_AwardScore": 0,
        //             "_PlayerScore": 0,
        //             "_PenaltyScore": 0,
        //             "_TS": -4,
        //             "_BSC": null
        //         }, {
        //             "_SNo": 3,
        //             "_Score": -4,
        //             "_IsWin": false,
        //             "_WinNo": 0,
        //             "_AwardScore": 0,
        //             "_PlayerScore": 0,
        //             "_PenaltyScore": 0,
        //             "_TS": -4,
        //             "_BSC": null
        //         }, {
        //             "_SNo": 2,
        //             "_Score": 12,
        //             "_IsWin": false,
        //             "_WinNo": 1,
        //             "_AwardScore": 0,
        //             "_PlayerScore": 0,
        //             "_PenaltyScore": 0,
        //             "_TS": 12,
        //             "_BSC": null
        //         }, {
        //             "_SNo": 1,
        //             "_Score": -4,
        //             "_IsWin": false,
        //             "_WinNo": 0,
        //             "_AwardScore": 0,
        //             "_PlayerScore": 0,
        //             "_PenaltyScore": 0,
        //             "_TS": -4,
        //             "_BSC": null
        //         }],
        //         "_TET": "2017-09-27 23:42:59",
        //         "_BankerSNo": 2,
        //         "_MPSNo": 0,
        //         "_Step": 4,
        //         "_TN": 1
        //     },
        //     "_NSID": "04518b8a-ffd9-4256-8b17-2ea232957317",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "43001287"
        // };
        // obj = obj._Data;
        this.roomObj.game.time._active = false;
        this.roomObj.setBtnNode.jiesan = false;
        this.scheduleOnce(function () {
            this.roomObj.game.outpai._active = false;
            // tanlayout
            var gameTan = this.roomObj.game.tanlayout;
            gameTan._active = true;
            for (var i = 0; i < obj._PSL.length; i++) {
                var data = obj._PSL[i];
                if (data._SNo !== 0) {
                    data._CCL.sort(function (a, b) {
                        return b % 20 - a % 20;
                    });
                    var ccl_obj = gameTan["outpai" + data._SNo];
                    for (var k = 0; k < ccl_obj.length; k++) {
                        if (data._CCL.length > k) {
                            ccl_obj[k].pai._active = true;
                            ccl_obj[k].pai._sprite = cc.MJ.common.resources.getSpriteFrameByName("poker", "p" + data._CCL[k]);
                        } else {
                            ccl_obj[k]._active = false;
                        }
                    }
                }


            }
            var djObj = this.roomObj.alert.dj;
            var _player = this.roomObj.players;
            // this.roomObj.alert.end._active = false;
            this.scheduleOnce(function () {
                // this._reset();
                djObj._active = true;
                djObj.titleNode.timeLabel = obj._TET;
                djObj.titleNode.roomLabel = this.roomObj.gameMessage.tableMessage.roomLabel + "   " + this.roomObj.gameMessage.tableMessage.inningLabel;
                djObj.titleNode.playtypeLabel = this.roomObj.gameMessage.tableMessage.playTypeLabel;

                console.log(djObj);
                // console.log(obj._PSL.length);
                for (var i = 0; i < obj._PSL.length; i++) {
                    var data = obj._PSL[i];
                    var item = djObj.ScrollView.view.content[i].item;
                    var _user = _player["Player" + data._SNo];

                    item.headImage._sprite = _user.headImage;
                    item.headImage.nameLabel = _user.name;
                    item.headImage.zhuang = _user.zhuang;
                    item.headImage.you._sprite = _user.turn._sprite;
                    item.headImage.you._active = _user.turn._active;
                    item.headImage.win = data._IsWin;
                    item.score1 = data._PlayerScore;
                    item.score2 = data._Score;
                    item.score3 = data._AwardScore;
                    item.score4 = data._PenaltyScore;
                    item.score5 = data._TS;


                    for (var k = 0; k < item.zhaLayout.length; k++) {
                        if (data._BSC && data._BSC.length > k) {
                            item.zhaLayout[k].pai._active = true;
                            item.zhaLayout[k].pai.numLabel = "X" + data._BSC[k]._BombCount;
                            item.zhaLayout[k].pai._sprite = cc.MJ.common.resources.getSpriteFrameByName("poker", "p" + data._BSC[k]._BombShape);

                        } else {
                            item.zhaLayout[k].pai._active = false;
                        }
                    }

                }
                // this.scheduleOnce(function () {
                //     if (obj._TN.toString() !== this.roomCount) {
                //         this._sendReadyMsg(false);
                //     }
                //
                //
                // }, 10);

            }, 10);
        }, 3)

    },
    initZJ_room: function (obj) {
        // obj = {
        //     "_Cmd": "re",
        //     "_Data": {
        //         "_RNo": "641853",
        //         "_SL": [{"_SNo": 2, "_TS": -4, "_AwardCount": 0, "_BombCount": 0}, {
        //             "_SNo": 1,
        //             "_TS": 12,
        //             "_AwardCount": 0,
        //             "_BombCount": 0
        //         }, {"_SNo": 3, "_TS": -4, "_AwardCount": 0, "_BombCount": 0}, {
        //             "_SNo": 0,
        //             "_TS": -4,
        //             "_AwardCount": 0,
        //             "_BombCount": 0
        //         }],
        //         "_RET": "2017-09-27 23:46:00",
        //         "_BankerSNo": 1,
        //         "_MPSNo": 0,
        //         "_Step": 5
        //     },
        //     "_NSID": "7ff6cb93-01ff-47b7-a52f-59db167a278a",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "43001287"
        // };
        // obj = obj._Data;


        if (obj._RNo === this._roomNo) {
            var endObj = this.roomObj.alert.end;
            var _player = this.roomObj.players;

            this.scheduleOnce(function () {
                console.log("进来zongjiesuan");
                this._reset();
                endObj._active = true;
                endObj.titleNode.timeLabel = obj._RET;
                // this.roomObj.alert.dj._active = false;
                endObj.titleNode.roomLabel = this.roomObj.gameMessage.tableMessage.roomLabel + "   " + this.roomObj.gameMessage.tableMessage.inningLabel;

                obj._SL.sort(function (a, b) {
                    return b._TS - a._TS;
                })
                for (var i = 0; i < obj._SL.length; i++) {
                    var data = obj._SL[i];
                    var item = endObj.playerLayout["player" + data._SNo];
                    var _user = _player["Player" + data._SNo];
                    item.headImage = _user.headImage;
                    item.name = _user.name;
                    item.fangzhu = _user.fangzhu;
                    if (i === 0) {
                        item.win = true;
                    } else {
                        item.win = false;
                    }


                    item.ringhtLabel1 = data._AwardCount;
                    item.ringhtLabel2 = data._BombCount;
                    item.ringhtLabel3 = data._TS;


                }
                // this.scheduleOnce(function () {
                //     this.roomObj.alert.end._active = false;
                //     cc.director.loadScene("indexScene");
                //
                // }, 15);

            }, 13);
        }

    }

});