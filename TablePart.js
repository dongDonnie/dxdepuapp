/**
 * Created by hxl on 2017/7/9.
 */
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
cc.Class({
    extends: require("RoomPart"),
    properties: {

        _paiNum: null,
        _NumberSprite: cc.SpriteAtlas,
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
            left: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            right: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            top: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            bottom: {Current: [], Drop: [], Action: [], Buh: [], IsT: false}
        };
        this._NDC = [];
        cc.sys.localStorage.setItem("_Step", "0");
        cc.sys.localStorage.setItem("ting", false);
    },
    _tableReset: function () {
        this._paiNum = {
            left: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            right: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            top: {Current: [], Drop: [], Action: [], Buh: [], IsT: false},
            bottom: {Current: [], Drop: [], Action: [], Buh: [], IsT: false}
        };
        this._NDC = [];
        cc.sys.localStorage.setItem("ting", false);
        this.showSelectTips(null);
        this.fapai();
    },
    //初始化table,重写父级function并调用
    init: function (p_obj) {
        this._NDC = [];
        this._gameModule.AHP = null;
        this._loginname = cc.sys.localStorage.getItem('_PID');
        this._roomNo = cc.sys.localStorage.getItem('roomNo');
        cc.sys.localStorage.setItem("jiesan", p_obj._IsSG);
        this._super(p_obj);
        this._gameModule.ZJ_qm._active = false;
        this._gameModule.ZJ_room._active = false;
        cc.MJ.module.game.birdModule.catchbird._active = false;
        cc.MJ.module.game.cangyingModule.cangying._active = false;
        this.IsEndGame = p_obj._IsEG;
        this._tingStatus = false;
        this._NDC = p_obj._NDC;
        // cc.log("游戏是否结束");
        // cc.log(p_obj._IsEG);
        this.InitCenter(p_obj._RC, p_obj._ASNo, p_obj._IsD);

        this._VC = p_obj._VC || null;
        //初始化动作按钮隐藏
        this.initActionBtn(null);
        // this._sendReadyMsg(p_obj._IsR);

        var _mySeat = null;
        //初始化牌面节点对象
        for (var i = 0; i < p_obj._Seats.length; i++) {

            var _seat_obj = p_obj._Seats[i];
            var _seat = this._seat[_seat_obj._SNo];
            var _clist = _seat_obj._CCC || 13;
            var _buhua = _seat_obj._FL;
            if (_seat_obj._SNo === 0) {
                _mySeat = _seat_obj;
                _clist = _seat_obj._CCL;
                _buhua.sort(function (a, b) {
                    return b - a;
                });
                this._gameModule.ready_btn = !_seat_obj._IsReady;
                //设置胡牌提示
                this.setHuList(_seat_obj._ATL);
                //保存可胡牌集合，用于点击牌提示
                // if (_seat_obj._AHP) {
                this._gameModule.AHP = _seat_obj._AHP;
                // }


            }
            var _dlist = _seat_obj._DL || [];
            var _alist = _seat_obj._AL || [];
            var _tempPaiNum = this._paiNum[_seat];


            _tempPaiNum.Drop = _dlist;
            _tempPaiNum.Action = _alist;
            _tempPaiNum.Buh = _buhua;
            _tempPaiNum.IsT = _seat_obj._IsT;

            if ((_clist.length + 1) % 3 !== 0 && _seat_obj._SNo === 0) {
                _clist.sort(function (a, b) {
                    return b - a;
                });
                _clist.splice(0, 0, 0);
            } else {
                if (_clist instanceof Array) {

                    if (_seat_obj._IsT && _seat_obj._SNo === 0) {
                        var _tp = _clist[0];
                        _clist.splice(0, 1);
                        _clist.sort(function (a, b) {
                            return b - a;
                        });
                        _clist.splice(0, 0, _tp);
                    } else {
                        _clist.sort(function (a, b) {
                            return b - a;
                        });
                    }

                }
            }

            _tempPaiNum.Current = _clist;

            // this.initCurrentPaiOBJ(_seat_obj._SNo, p_obj._IsEG);

            // this.initActionPaiOBJ(_seat_obj._SNo);
            // this.initDropPaiOBJ(_seat_obj._SNo);
            if (_seat_obj._SNo === p_obj._DNo) {
                var p_flag_obj = this.node.getChildByName(this._seat[_seat_obj._SNo] + "PlayPaiLayout").children;
                cc.MJ.common.action.flagAction(this._FingerNode, p_flag_obj[_dlist.length - 1]);
            }
            // this._initBuhua(_seat_obj._SNo);

            // if (!_seat_obj._IsT) {
            //     this._baseBottomInit(_seat_obj._SNo,false,[]);
            // }


        }
        if (p_obj._PSNo) {
            // var _seatName = "Player" + p_obj._PSNo;
            this._gameModule.jiesan._active = true;
            this._gameModule.jiesan.confirm = false;
            if (_mySeat._IsE === null) {
                var _seat = cc.MJ.module.game.seatInfo;
                var _seatName = "head_bg_s_" + _seat[p_obj._PSNo];
                this._gameModule.jiesan.agree = true;
                this._gameModule.jiesan.refuse = true;

                this._gameModule.jiesan.content.name = this._gameModule[_seatName].label;
                this._gameModule.jiesan.content.staticlabel = "     请求解散房间";
            } else {

                this._gameModule.jiesan.agree = false;
                this._gameModule.jiesan.refuse = false;
                this._gameModule.jiesan.content.name = "";
                this._gameModule.jiesan.content.staticlabel = "请等待其他玩家选择";
            }

        }


    },
    //执行发牌
    fapai: function () {
        for (var i = 0; i < 4; i++) {
            var _seat = this._seat[i];
            var _tempPaiNum = this._paiNum[_seat];
            this.sethuaNum({_SNo: i, _IsT: _tempPaiNum.IsT, _FL: _tempPaiNum.Buh});
            this.initCurrentPaiOBJ(i, false);
            this._initBuhua(i);
            this.initActionPaiOBJ(i);
            this.initDropPaiOBJ(i);
            if (i === 0) {
                this.showSelectTips(this._gameModule.AHP);
            }

        }
        this.initActionBtn(this._VC);
    },

    setHuList: function (p_data) {
        if (p_data) {
            var _ting = cc.sys.localStorage.getItem("ting");
            if (this._roomType === "qiaoma") {
                this._gameModule.bulb_btn = _ting === "true" ? true : false;
            } else {
                this._gameModule.bulb_btn = true;
            }
            // this._gameModule.hu_popup_bg._active = true;
            for (var i = 0; i < 16; i++) {
                var _model = this._gameModule.hu_popup_bg["hu_cont_bg" + (i + 1)];
                if (p_data.length > i) {
                    var _data = p_data[i];
                    _model.pai = cc.MJ.common.resources.getSpriteFrameByName("out", "p" + _data._Card);
                    _model.num = _data._CRC + "张";
                    _model._active = true;
                } else {
                    _model._active = false;
                    _model.pai = new cc.SpriteFrame();
                }
            }
            if (p_data.length > 8) {
                this._gameModule.hu_popup_bg.cell = true;
            } else {
                this._gameModule.hu_popup_bg.cell = false;
            }
            var _layout = this.node.getChildByName("hu_popup_bg").getComponent(cc.Layout);
            cc.log(_layout);
            if (p_data.length === 0) {
                this._gameModule.hu_popup_bg.tips = true;
                // this._gameModule.bulb_btn = true;
                this.node.getChildByName("hu_popup_bg").width = 475;
            } else {
                this._gameModule.hu_popup_bg.tips = false;
                // this._gameModule.bulb_btn = false;
                var _width = 200 + p_data.length * 130;
                this.node.getChildByName("hu_popup_bg").width = _width > 1300 ? 1300 : _width;
            }
            // cc.log(this.node.getChildByName("hu_popup_bg").width);
            // cc.log(this._gameModule.hu_popup_bg.cell);
            // _layout._updateLayout();
        } else {
            this._gameModule.hu_popup_bg._active = false;
            this._gameModule.bulb_btn = false;
        }
    },
    showSelectTips: function (p_data) {
        var _selecttips = this._gameModule.huselecttips;
        if (p_data) {
            var _cclist = this._paiNum[this._seat[0]].Current;

            for (var i = 0; i < _selecttips.length; i++) {
                var _tipsobj = _selecttips[i].tips;
                if (_cclist.length > i) {
                    _tipsobj._opacity = 0;
                    for (var k = 0; k < p_data.length; k++) {
                        if (p_data[k]._DCard === _cclist[i]) {
                            _tipsobj._opacity = 255;
                            break;
                        }
                    }
                } else {
                    _tipsobj._opacity = 0;
                }
            }
        } else {
            for (var i = 0; i < _selecttips.length; i++) {
                var _tipsobj = _selecttips[i].tips;

                _tipsobj._opacity = 0;

            }
        }
    },
    setreadyShow: function (p_obj) {
        var __ret = this._CommonGetHeadObj(p_obj._SNo);
        var _seat_Data = __ret._seat_Data;
        var _seatName = __ret._seatName;
        _seat_Data[_seatName].ready_icon = p_obj._IsReady;
        if (p_obj._SNo === 0) {
            this._gameModule.ready_btn = !p_obj._IsReady;
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
    InitCenter: function (p_num, p_seatNo, p_IsD) {
        this._setCenterPaiNum(p_num);
        this._initCenter(p_seatNo, p_IsD);
    },
    _setCenterPaiNum: function (p_num) {
        this._gameModule.sieve_plate.allPaiNumber = "x" + p_num;
    },
    _setCenterNum: function () {
        if(this.callback){
            cc.director.getScheduler().unschedule(this.callback, this);
        }
        this.hasSecond = 30;

        this.callback = function () {
            if (this.hasSecond < 0) {
                // 在最后一次执行回调时取消这个计时器
                //weiChat.phoneShake();
                //  this.unschedule(this.callback);
                cc.director.getScheduler().unschedule(this.callback, this);
                this._flag = true;
            } else {
                this._flag = false;
                this._TimerOfPlay(this.hasSecond);
                this.hasSecond--;
            }

        };

        cc.director.getScheduler().schedule(this.callback, this, 1, cc.macro.REPEAT_FOREVER, 0, false);
        // this.schedule(this.callback, 1);


    },
    _initCenter: function (p_seatNo, p_IsD) {
        if (this._ActivePlayer !== p_seatNo) {
            this._setCenterNum();
        }
        this._setCenterNum();
        this._ActivePlayer = p_seatNo;
        var _center = this._gameModule.sieve_plate;
        var _zhuangOBJ = _center.zhuang[this._seat[p_seatNo] + "zhuang"];
        var _light = "Image/" + this._seat[p_seatNo] + "zhuanglight";

        cc.MJ.common.tool.UITool.buttonLoadImage(null, _light, _zhuangOBJ);
        if (p_seatNo === 0) {
            cc.sys.localStorage.setItem("table_zhuang", p_IsD);
        } else {
            cc.sys.localStorage.setItem("table_zhuang", false);
        }

        for (var i = 0; i < this._seat.length; i++) {
            if (this._seat[p_seatNo] !== this._seat[i]) {
                var _tempOBJ = _center.zhuang[this._seat[i] + "zhuang"];
                var _dark = "Image/" + this._seat[i] + "zhuang";

                cc.MJ.common.tool.UITool.buttonLoadImage(null, _dark, _tempOBJ);
            }
        }
    },
    _TimerOfPlay: function (second) {
        var left_value = "", right_value = "";
        if (second >= 10) {
            left_value = second.toString().split("")[0];
            right_value = second.toString().split("")[1];
        } else {
            left_value = 0;
            right_value = second.toString().split("")[0];

        }
        this._setSecond(left_value, right_value);
    },
    _setSecond: function (left_value, right_value) {
        var _center = this._gameModule.sieve_plate;

        var left_url = "Image/" + left_value;
        var right_url = "Image/" + right_value;
        cc.loader.loadRes(left_url, cc.SpriteFrame, function (err, spriteFrame) {
            _center.Second.leftNumber = spriteFrame;
        });
        cc.loader.loadRes(right_url, cc.SpriteFrame, function (err, spriteFrame) {
            _center.Second.rightNumber = spriteFrame;
        });

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
    _getNumberSpriteFrame: function (p_num) {
        if (this._NumberSprite) {
            return atlas.getSpriteFrame(p_num);
        }
        return null;
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
            var _tstatus = cc.sys.localStorage.getItem("ting");

            if (_tstatus === "true" || this._tingStatus) {
                this._baseBottomInit(p_seat, false, [], true);
            } else {
                this._bottomInit(p_seat, p_endflag);
            }
        } else {
            this._commonInit(p_seat, p_endflag);
        }
        // } else {
        //     this._EndCurrentInit(p_seat, p_endflag);
        // }

    },
    /**
     * 获取到VC数据时（m,b），按钮绑定事件
     * */
    _baseBottomInit: function (p_SeatNo, p_endflag, p_tingobj, p_init) {
        var __ret = this._getBaseInitParam(p_SeatNo, p_endflag);
        var p_seat = __ret.p_seat;
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        var _imgurl = __ret._imgurl;
        for (var i = 0; i < p_obj.length; i++) {
            var _obj = null;
            if (i == 0) {
                _obj = p_obj[i].top.temp1;
            } else {
                _obj = p_obj[i].temp1;
            }

            if (_list.length > i) {
                if (p_tingobj) {
                    if (p_tingobj.length > 0 && p_tingobj[i].length > 1 && p_tingobj[i][0] === _list[i]) {
                        var _param = {Code: "t", arr: p_tingobj[i]};
                        _obj._opacity = 255;
                        _obj._button = {_EventData: _param, _EventID: 0}//todo :事件ID需要更改
                    } else {
                        if (p_init && i === 0) {
                            _obj._opacity = 255;
                            _obj._button = {_EventData: _list[i], _EventID: 0};

                        } else {
                            _obj._opacity = 100;
                            _obj._button = {_EventData: _list[i], _EventID: -1};
                        }
                    }

                } else {
                    _obj._opacity = 255;
                    _obj._button = {_EventData: _list[i], _EventID: 0};
                }


                if (_list[i] === 0) {
                    _obj._active = false;
                } else {
                    var _tempAry = _imgurl.split("/");
                    _obj._sprite = cc.MJ.common.resources.getSpriteFrameByName(_tempAry[0], _tempAry[1] + _list[i]);
                    // cc.MJ.common.tool.UITool.buttonLoadImage(null, _imgurl + _list[i], _obj);
                    _obj._active = true;
                }
                continue;
            }
            _obj._active = false;

        }
    },
    //初始化本家手牌
    _bottomInit: function (p_SeatNo, p_endflag) {

        var __ret = this._getBaseInitParam(p_SeatNo, p_endflag);
        var p_seat = __ret.p_seat;
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        var _imgurl = __ret._imgurl;
        for (var i = 0; i < p_obj.length; i++) {
            var _obj = null;
            if (i == 0) {
                _obj = p_obj[i].top.temp1;
            } else {
                _obj = p_obj[i].temp1;
            }

            if (_list.length > i) {
                _obj._opacity = 255;
                _obj._button = {_EventData: _list[i], _EventID: 0};
                for (var k = 0; k < this._NDC.length; k++) {
                    if (this._NDC[k] === _list[i]) {
                        _obj._opacity = 100;
                        _obj._button = {_EventData: _list[i], _EventID: -1};
                    }
                }

                if (_list[i] === 0) {
                    _obj._active = false;
                    //_obj._button = {_EventData: _list[i], _EventID: -1};
                    _obj._sprite = new cc.SpriteFrame();
                } else {

                    _obj._active = true;

                    var _tempAry = _imgurl.split("/");
                    // cc.log(_tempAry);
                    // cc.log(_list[i]);
                    _obj._sprite = cc.MJ.common.resources.getSpriteFrameByName(_tempAry[0], _tempAry[1] + _list[i]);

                    // cc.MJ.common.tool.UITool.buttonLoadImage(null, _imgurl + _list[i], _obj);

                }
                continue;
            }
            _obj._active = false;
            _obj._sprite = new cc.SpriteFrame();

        }
    }
    ,
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
    }
    ,
    _getBaseInitParam: function (p_SeatNo, p_endflag) {
        var p_seat = this._seat[p_SeatNo];
        var _obj_flag = "playGame";

        //this._showScene(this._gameModule[_obj_flag], !p_endflag ? "endGame" : "playGame")
        var p_obj = this._gameModule[_obj_flag][p_seat + "_pai"];
        var _list = this._paiNum[p_seat].Current;
        var _imgurl = this._getSeatPaiUrl(p_seat);
        return {p_seat: p_seat, p_obj: p_obj, _list: _list, _imgurl: _imgurl};
    }
    ,
    _showScene: function (obj, p_else) {

        obj._active = true;
        this._gameModule[p_else]._active = false;
    }
    ,
    //初始化其他位置用户的手牌
    _commonInit: function (p_SeatNo, p_endflag) {
        var __ret = this._getBaseInitParam(p_SeatNo, p_endflag);
        var p_seat = __ret.p_seat;
        var p_obj = __ret.p_obj;
        var _list = __ret._list;
        var _forlength = p_obj.length - _list;

        for (var i = 0; i < p_obj.length; i++) {
            if (i < _forlength) {
                // cc.log("false");
                p_obj[i][p_seat] = false;
            } else {
                // cc.log("true");
                p_obj[i][p_seat] = true;
            }


        }
    }
    ,
    /**
     * 初始化手牌
     *
     * */


    //初始化补花
    _initBuhua: function (p_SeatNo) {

        var bh_p = cc.MJ.module.game.RoomModule[this._seat[p_SeatNo] + "Hua"];
        var p_seat = this._seat[p_SeatNo];
        var _imgurl = this._getSeatPaiUrl(p_seat, true);
        // cc.log("这个牌组是什么");
        // cc.log(bh_p);
        // var _imgurl = this._getSeatPaiUrl(p_seat, true);
        for (var i = 0; i < bh_p.length; i++) {

            if (i < this._paiNum[this._seat[p_SeatNo]].Buh.length) {
                bh_p[i].hua._active = true;
                // if (p_SeatNo === 0) {
                var _tempAry = _imgurl.split("/");
                bh_p[i].hua._sprite = cc.MJ.common.resources.getSpriteFrameByName(_tempAry[0], _tempAry[1] + this._paiNum[this._seat[p_SeatNo]].Buh[i]);

                // cc.MJ.common.tool.UITool.buttonLoadImage(null, _imgurl + this._paiNum[this._seat[p_SeatNo]].Buh[i], bh_p[i].hua);
                // }
            } else {
                bh_p[i].hua._active = false;
            }
        }
    }
    ,


    /**
     * 初始化弃牌
     *
     * */
    //初始化当前位置用户的弃牌
    initDropPaiOBJ: function (p_SeatNo) {
        var p_seat = this._seat[p_SeatNo];
        var _list = this._paiNum[p_seat].Drop;
        var _imgurl = this._getSeatPaiUrl(p_seat, true);

        var p_obj = this._gameModule[p_seat + "PlayPaiLayout"];

        var _param = {p_obj: p_obj, p_list: _list, p_imgurl: _imgurl, p_seat: p_seat};
        this._DropInit(_param);
    }
    ,
    //初始化弃牌
    _DropInit: function (p_obj) {
        for (var i = 0; i < p_obj.p_obj.length; i++) {
            var _tempobj = null;
            for (var key in p_obj.p_obj[i]) {
                _tempobj = p_obj.p_obj[i][key];
                break;
            }

            if (p_obj.p_list.length > i) {

                var _tempurl = p_obj.p_imgurl + p_obj.p_list[i];
                _tempobj._active = true;
                // _tempobj._opacity = 255;
                _tempobj._color = new cc.Color(255, 255, 255);
                var _tempAry = _tempurl.split("/");
                _tempobj._sprite = cc.MJ.common.resources.getSpriteFrameByName(_tempAry[0], _tempAry[1]);
                // cc.MJ.common.tool.UITool.buttonLoadImage(null, _tempurl, _tempobj);
            } else {
                _tempobj._active = false;
            }
        }
    }
    ,
    /**
     * 初始化弃牌
     *
     * */

    selectPlayedPai: function (p_selectID, p_selectStatus) {



        //循环查找吃碰杠中的牌
        for (var i = 0; i < 4; i++) {
            var p_seat = this._seat[i];
            var _action_obj = this._gameModule[p_seat + "_action"];
            var _play_obj = this._gameModule[p_seat + "PlayPaiLayout"];
            for (var k = 0; k < this._paiNum[p_seat].Action.length; k++) {
                var _obj = this._paiNum[p_seat].Action[k]._CS;
                var _model = _action_obj[k].gang_pai;
                var _left = _model.pai_left;
                var _center = _model.pai_center;
                var _right = _model.pai_right;
                var _top = _model.pai_top;
                var temp_arr = [];
                temp_arr.push(_left, _center, _right, _top);
                for (var b = 0; b < _obj.length; b++) {
                    if (p_selectID === _obj[b] && p_selectStatus) {
                        // temp_arr[b]._opacity = 100;
                        temp_arr[b]._color = new cc.Color(148, 147, 140);
                        // temp_arr[b]._opacity = 200;

                    } else {
                        // temp_arr[b]._opacity = 255;
                        temp_arr[b]._color = new cc.Color(255, 255, 255);
                    }

                }
            }
            for (var k = 0; k < this._paiNum[p_seat].Drop.length; k++) {
                var _obj = this._paiNum[p_seat].Drop[k];
                var _model = null;
                for (var key in _play_obj[k]) {
                    _model = _play_obj[k][key];
                    break;
                }
                if (p_selectID === _obj && p_selectStatus) {
                    // _model._opacity = 200;
                    _model._color = new cc.Color(148, 147, 140);
                } else {
                    // _model._opacity = 255;
                    _model._color = new cc.Color(255, 255, 255);
                }

            }

        }
    },

    /**
     * 初始化吃，碰，杠牌
     *
     * */
    //初始化当前位置用户的吃，碰，杠牌
    initActionPaiOBJ: function (p_SeatNo) {
        var p_seat = this._seat[p_SeatNo];

        var _list = this._paiNum[p_seat].Action;
        var _imgurl = cc.MJ.module.Static.seatPai.bottom.out;
        cc.log(this._paiNum);
        var p_obj = this._gameModule[p_seat + "_action"];

        var _param = {p_obj: p_obj, p_list: _list, p_imgurl: _imgurl, p_SeatNo: p_SeatNo};

        return this._ActionInit(_param);
    }
    ,
    //初始化吃，碰，杠牌
    _ActionInit: function (p_obj) {

        for (var i = 0; i < p_obj.p_obj.length; i++) {
            var _tempObj = p_obj.p_obj[i].gang_pai;
            if (i < p_obj.p_list.length) {
                if (p_obj.p_list.length === 0) {
                    break;
                }
                _tempObj._active = true;
                var _left = _tempObj.pai_left;
                var _center = _tempObj.pai_center;
                var _right = _tempObj.pai_right;
                var _top = _tempObj.pai_top;
                var temp_arr = [];
                temp_arr.push(_left, _center, _right, _top);

                var _flag = false;
                for (var b = 0; b < temp_arr.length; b++) {
                    if (p_obj.p_list[i]._CS.length > b) {
                        cc.log(temp_arr[b]);
                        var _tempurl = p_obj.p_imgurl + p_obj.p_list[i]._CS[b];
                        temp_arr[b]._active = true;
                        // temp_arr[b]._opacity = 255;
                        temp_arr[b]._color = new cc.Color(255, 255, 255);
                        var _tempAry = _tempurl.split("/");
                        temp_arr[b]._sprite = cc.MJ.common.resources.getSpriteFrameByName(_tempAry[0], _tempAry[1]);

                        temp_arr[b].jt._active = false;
                        // temp_arr[b].jt._sprite = new cc.SpriteFrame();

                        if (p_obj.p_list[i]._tgSNo !== null && p_obj.p_list[i]._tgCard !== null && !_flag) {
                            var _tipsurl = "arrow_";
                            if (parseInt(p_obj.p_SeatNo) === 0) {
                                if (parseInt(p_obj.p_list[i]._tgSNo) === parseInt(p_obj.p_SeatNo)) {
                                    _tipsurl = "";
                                    _flag = true;
                                } else {
                                    var p_seat = this._seat[p_obj.p_list[i]._tgSNo];
                                    _tipsurl += p_seat;
                                }

                            } else {
                                if (parseInt(p_obj.p_list[i]._tgSNo) === parseInt(p_obj.p_SeatNo)) {
                                    _tipsurl = "";
                                    _flag = true;
                                } else {
                                    _tipsurl = this._getTipsLogo(parseInt(p_obj.p_SeatNo), p_obj.p_list[i]._tgSNo);
                                }

                            }
                            if (p_obj.p_list[i]._CS[b] === p_obj.p_list[i]._tgCard && !_flag) {
                                cc.log("进来设置了");
                                _flag = true;
                                cc.log("Image/" + _tipsurl);
                                cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/" + _tipsurl, temp_arr[b].jt);
                                temp_arr[b].jt._active = true;
                            } else {
                                temp_arr[b].jt._active = false;
                                // temp_arr[b].jt._sprite = new cc.SpriteFrame();
                            }

                        }


                        // cc.MJ.common.tool.UITool.buttonLoadImage(null, _tempurl, temp_arr[b]);
                    } else {
                        temp_arr[b]._active = false;
                        // temp_arr[b]._sprite =new cc.SpriteFrame();
                    }

                }

                continue;
            }
            _tempObj._active = false;
        }
    }
    ,
    _getTipsLogo: function (p_ccr, p_target) {
        var _add = "arrow_";
        if (p_ccr === 1) {

            if (p_ccr + 1 === p_target) {
                _add += "top";
            } else if (p_ccr - 1 === p_target) {
                _add += "bottom";
            } else {
                _add += "left";
            }
            return _add;
        } else if (p_ccr === 2) {
            if (p_ccr + 1 === p_target) {
                _add += "left";
            } else if (p_ccr - 1 === p_target) {
                _add += "right";
            } else {
                _add += "bottom";
            }
            return _add;
        }
        else if (p_ccr === 3) {
            if (p_target === 0) {
                _add += "bottom";
            } else if (p_ccr - 1 === p_target) {
                _add += "top";
            } else {
                _add += "right";
            }
            return _add;
        }
    }
    ,
    /**
     * 初始化吃，碰，杠牌
     *
     * */


    /**
     * 初始化碰，杠，吃取消等按钮
     * */
    initActionBtn: function (p_obj) {
        var _actionbtn = this._gameModule.pengLayout;
        // cc.log("有没有按钮");
        // cc.log(p_obj);
        if (!p_obj) {
            _actionbtn._active = false;
            return;
        }
        _actionbtn._active = true;
        for (var i in _actionbtn.actionType) {
            if (i.indexOf("Btn") !== -1) {
                _actionbtn.actionType[i]._active = false;
            }
        }
        var _layout = this._gameModule.pengLayout;
        for (var i = 0; i < 3; i++) {
            _layout.chitype[i].pai._active = false;
        }
        var _gang_arr = [];
        var _gType = 0;
        for (var i = 0; i < p_obj.length; i++) {
            if (p_obj[i]._C === "lg" || p_obj[i]._C === "dg" || p_obj[i]._C === "fg") {
                _gType++;
                _gang_arr.push.apply(_gang_arr, p_obj[i]._S);
            }
        }
        cc.log("-----------------------");
        cc.log(_gang_arr);
        for (var i = 0; i < p_obj.length; i++) {
            // cc.log("进来了");
            var _tempobj = this._getActionType(p_obj[i]._C);
            var _btnEvent = _tempobj._button;
            var _param = {Code: p_obj[i]._C, arr: p_obj[i]._S};
            if (p_obj[i]._C.indexOf("g") !== -1 && _gType > 1) {
                _param.arr = _gang_arr;

            }
            _btnEvent._EventData = JSON.stringify(_param);
            // cc.log(_tempobj);
            _tempobj._button = _btnEvent;

            _tempobj._active = true;

            var playType = cc.MJ.data.getLocalStorage_playType();
            if (playType === "qiaoma" && p_obj[i]._C === "h") {
                this.scheduleOnce(function () {
                    this.node.getComponent("aSceneGame").autoHu(JSON.stringify(_param));
                }, 2);
            }
        }

    }
    ,
    _getActionType: function (p_actionCode) {
        var _actionbtn = this._gameModule.pengLayout.actionType;

        switch (p_actionCode) {
            case "e":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.chiBtn;
                break;
            case "p":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.pengBtn;
                break;
            case "lg":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.gangBtn;
                break;
            case "fg":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.gangBtn;
                break;
            case "dg":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.gangBtn;
                break;
            case "h":
                var playType = cc.MJ.data.getLocalStorage_playType();
                if (playType === "qiaoma") {
                    _actionbtn.cancelbtn._active = false;
                    cc.sys.localStorage.setItem("table_zhuang", false);
                    // this.scheduleOnce(function () {
                    //     this.node.getComponent("aSceneGame").autoHu(_target);
                    // }, 2);
                } else {
                    _actionbtn.cancelbtn._active = true;
                }
                return _actionbtn.huBtn;

            case "t":
                _actionbtn.cancelbtn._active = true;
                return _actionbtn.tingBtn;//todo:待添加听按钮model
                break;


        }
    }
    ,
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
    }
    ,
    /**
     * 单局结算
     * */
    _LoadDanjuJiesuan: function (obj, p_node) {

        var _seat_Data = this._gameModule;
        if (obj._IsNC) {

            this._gameModule.liuju = true;
        }
        for (var i = 0; i < obj._PSL.length; i++) {
            var _seat = cc.MJ.module.game.seatInfo;
            var _seatName = "head_bg_s_" + _seat[obj._PSL[i]._SNo];

            var _name = _seat_Data[_seatName].label;
            var _head = _seat_Data[_seatName].head_pic_s;
            var _user = {
                name: _name,
                head: _head
            };
            obj._PSL[i].user = _user;
        }

        this.scheduleOnce(function () {
            this._reset();
            this._gameModule.liuju = false;
            cc.MJ.module.game.birdModule.catchbird._active = false;
            cc.MJ.module.game.cangyingModule.cangying._active = false;

            var jiesuan = cc.instantiate(p_node);
            jiesuan.parent = this.node;
            jiesuan.getComponent('danju').updateWanjiaItem(obj, true, this._gameModule.RoomInfoLabel);
            this.scheduleOnce(function () {
                jiesuan.destroy();
                // cc.log("发牌");
                var _obj =
                    {
                        _Cmd: "readyg",
                        _PID: this._loginname, //玩家ID
                        _Data: {
                            _RNo: this._roomNo
                        }
                    }
                cc.MJ.socket.sendGetRequest(_obj, null, null);

            }, 6);
        }, 6);


    }
    ,
    /**
     * 总结算
     * */
    _LoadzongJiesuan: function (obj, p_node) {

        var _seat_Data = this._gameModule;
        if (obj._IsNC) {

            this._gameModule.liuju = true;
        }
        var _seat = cc.MJ.module.game.seatInfo;
        for (var i = 0; i < obj._SL.length; i++) {

            var _seatName = "head_bg_s_" + _seat[obj._SL[i]._SNo];

            var _name = _seat_Data[_seatName].label;
            var _head = _seat_Data[_seatName].head_pic_s;
            var _user = {
                name: _name,
                head: _head,
                sNo: obj._SL[i]._SNo
            };
            obj._SL[i].user = _user;

        }

        this.scheduleOnce(function () {
            this._reset();
            cc.MJ.module.game.birdModule.catchbird._active = false;
            cc.MJ.module.game.cangyingModule.cangying._active = false;
            this._gameModule.liuju = false;

            // var jiesuan = cc.instantiate(p_node);
            // jiesuan.parent = this.node;
            p_node.active = true;

            p_node.getComponent('zongfen').updateWanjiaItem(obj, this.node, this._gameModule.RoomInfoLabel);
            cc.sys.localStorage.setItem("sceneName", "chooseScene");
        }, 6);


    }
    ,

    initZJ_qm: function (obj, p_typeScore, p_scoreName) {
        // obj = {
        //     "_Cmd": "te",
        //     "_Data": {
        //         "_IsNC": false,
        //         "_TN": 1,
        //         "_Step": 93,
        //         "_TET": "2017-11-23 13:52:49",
        //         "_HC": 24,
        //         "_HSNo": [3],
        //         "_BHSNo": 1,
        //         "_GOM": {
        //             "roomtype": "qiaoma",
        //             "playtype": "qiaoma",
        //             "count": "4",
        //             "minflower": "1",
        //             "maxtimes": "10",
        //             "fly": "1",
        //             "score": "2"
        //         },
        //         "_PSL": [{
        //             "_SNo": 0,
        //             "_CYA": 0,
        //             "_HA": 0,
        //             "_TS": 0,
        //             "_CCL": [24, 23, 22, 21, 21, 17, 17, 16, 7, 6, 5, 2, 2],
        //             "_BH": 3,
        //             "_SH": 0,
        //             "_ShapeStr": [],
        //             "_AL": null
        //         }, {
        //             "_SNo": 1,
        //             "_CYA": -9,
        //             "_HA": -4,
        //             "_TS": -13,
        //             "_CCL": [29, 19, 18, 17],
        //             "_BH": 2,
        //             "_SH": 1,
        //             "_ShapeStr": [],
        //             "_AL": [["9", "9", "9"], ["32", "32", "32"], ["14", "15", "16"]]
        //         }, {
        //             "_SNo": 2,
        //             "_CYA": 0,
        //             "_HA": 0,
        //             "_TS": 0,
        //             "_CCL": [23, 22, 21, 14, 14, 12, 11],
        //             "_BH": 5,
        //             "_SH": 1,
        //             "_ShapeStr": [],
        //             "_AL": [["31", "31", "31"], ["26", "26", "26"]]
        //         }, {
        //             "_SNo": 3,
        //             "_CYA": 9,
        //             "_HA": 4,
        //             "_TS": 13,
        //             "_CCL": [24, 16, 15, 14],
        //             "_BH": 3,
        //             "_SH": 0,
        //             "_ShapeStr": ["苍蝇"],
        //             "_AL": [["5", "6", "7"], ["27", "28", "29"], ["4", "5", "6"]]
        //         }]
        //     },
        //     "_NSID": "53790e07-f6bc-4d2b-9373-a3f5280047b9",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "55002375"
        // };
        // obj = obj._Data;
        if (obj._IsNC) {
            this._gameModule.liuju = true;
        }
        var zjqm = this._gameModule.ZJ_qm;

        this.scheduleOnce(function () {
            // this._reset();
            this._tableReset();
            cc.director.getScheduler().unschedule(this.callback, this);
            cc.MJ.module.game.birdModule.catchbird._active = false;
            cc.MJ.module.game.cangyingModule.cangying._active = false;
            this._gameModule.liuju = false;
            this._gameModule.jiesan._active = false;
            zjqm._active = true;
            this._gameModule.ready_btn = true;
            zjqm.time_label = obj._TET;
            zjqm.room_label = this._gameModule.RoomInfoLabel;
            var _fz = cc.sys.localStorage.getItem("FZ_ID");

            var _tabelTitle = p_typeScore.split("-");


            zjqm.roomright_label.label1 = _tabelTitle[0];
            zjqm.roomright_label.label2 = _tabelTitle[1];
            zjqm.roomright_label.label3 = _tabelTitle[2];
            zjqm.roomright_label.label4 = _tabelTitle[3];
            // cc.log(obj._PSL.length);
            for (var i = 0; i < obj._PSL.length; i++) {
                var data = obj._PSL[i];
                var item = zjqm.content["item" + (i + 1)];
                var _seatName = "head_bg_s_" + this._seat[data._SNo];
                var _name = this._gameModule[_seatName].label;
                var _head = this._gameModule[_seatName].head_pic_s;
                // cc.log(data._SNo);
                // cc.log(item);
                item.head_sprite._sprite = _head;
                item.head_sprite.name = _name;
                if (data._SNo === _fz) {
                    item.head_sprite.zhuang_sprite = true;
                } else {
                    item.head_sprite.zhuang_sprite = false;
                }

                if (data._BH !== undefined) {
                    var itemlabelstr = "补花x" + data._BH + "   手花x" + data._SH + "   底花x" + obj._GOM.minflower + "   ";

                    if (data._ShapeStr !== null) {
                        itemlabelstr += data._ShapeStr.join("   ");
                    }

                    // cc.log(itemlabelstr);
                    item.item_label = itemlabelstr;
                } else {
                    item.item_label = "";
                }

                data._CCL.sort(function (a, b) {
                    return b - a;
                });
                for (var w = 0; w < 14; w++) {
                    if (w < data._CCL.length) {
                        item.pailayout.listlayout[w].paiItem._active = true;

                        cc.log(item.pailayout.listlayout[w].paiItem);
                        item.pailayout.listlayout[w].paiItem._sprite = cc.MJ.common.resources.getSpriteFrameByName("out", "p" + data._CCL[w]);
                        // cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + data._CCL[w], item.pailayout.listlayout[w].paiItem);

                    } else {
                        item.pailayout.listlayout[w].paiItem._active = false;
                        item.pailayout.listlayout[w].paiItem._sprite = new cc.SpriteFrame();
                    }
                }

                if (data._AL) {
                    for (var c = 0; c < 4; c++) {
                        if (c < data._AL.length) {
                            var _tempObj = item.pailayout.actionglayout[c].gang_pai;
                            _tempObj._active = true;
                            var _left = _tempObj.pai_left;
                            var _center = _tempObj.pai_center;
                            var _right = _tempObj.pai_right;
                            var _top = _tempObj.pai_top;
                            var temp_arr = [];
                            temp_arr.push(_left, _center, _right, _top);

                            for (var b = 0; b < temp_arr.length; b++) {
                                if (data._AL[c].length > b) {
                                    temp_arr[b]._active = true;
                                    temp_arr[b]._sprite = cc.MJ.common.resources.getSpriteFrameByName("out", "p" + data._AL[c][b]);
                                    // cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + data._AL[c][b], temp_arr[b]);
                                } else {
                                    temp_arr[b]._active = false;
                                }
                            }
                            continue;
                        }
                        item.pailayout.actionglayout[c].gang_pai._active = false;

                    }
                } else {
                    for (var c = 0; c < 4; c++) {
                        var _tempObj = item.pailayout.actionglayout[c].gang_pai;
                        _tempObj._active = false;


                    }
                }
                item.typelabel.zimo = false;
                item.typelabel.hupai = false;
                item.typelabel.dianpao = false;
                item.pai._active = false;
                for (var q = 0; q < obj._HSNo.length; q++) {
                    if (obj._HSNo[q] === data._SNo) {

                        item.pai._active = true;
                        item.pai._sprite = cc.MJ.common.resources.getSpriteFrameByName("out", "p" + obj._HC);
                        // cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + obj._HC, item.pai);
                        // item.typelabel = obj._BHSNo === obj._HSNo[q] ? "自摸" : "胡牌";
                        if (obj._BHSNo === obj._HSNo[q]) {
                            item.typelabel.zimo = true;
                            item.typelabel.hupai = false;
                            item.typelabel.dianpao = false;
                        } else {
                            item.typelabel.zimo = false;
                            item.typelabel.hupai = true;
                            item.typelabel.dianpao = false;
                        }
                        break;

                    } else {
                        item.pai._active = false;
                        // item.typelabel = "";
                        item.typelabel.zimo = false;
                        item.typelabel.hupai = false;
                        item.typelabel.dianpao = false;
                        if (obj._BHSNo === data._SNo) {
                            // item.typelabel = "点炮";
                            item.typelabel.zimo = false;
                            item.typelabel.hupai = false;
                            item.typelabel.dianpao = true;
                        }

                    }
                }


                item.cyf_label = data[p_scoreName[0]];
                item.hlzf_label = data[p_scoreName[1]];
                item.gf_label = p_scoreName[2] ? data[p_scoreName[2]] : "-";
                item.ff_label = data[p_scoreName[3]];
            }
            this._gameModule.hu_popup_bg._active = false;
            this._gameModule.bulb_btn = false;
            this.scheduleOnce(function () {
                // if (obj._TN.toString() !== obj._GOM.count.toString()) {
                //     // this._sendReadyMsg(false);
                // }
                // this._gameModule.ZJ_room

                zjqm._active = false;

            }, 10);

        }, 3);

    }
    ,
    initZJ_room: function (obj) {
        // obj = {
        //     "_Cmd": "re",
        //     "_Data": {
        //         "_RNo": "289299",
        //         "_RET": "2017-08-15 17:05:23",
        //         "_AN": [{"_SNo": 2, "_ZM": 0, "_JP": 0, "_DP": 2, "_LZ": 0, "_TS": 0}, {
        //             "_SNo": 1,
        //             "_ZM": 0,
        //             "_JP": 0,
        //             "_DP": 0,
        //             "_LZ": 0,
        //             "_TS": 100
        //         }, {"_SNo": 0, "_ZM": 0, "_JP": 0, "_DP": 0, "_LZ": 0, "_TS": 0}, {
        //             "_SNo": 3,
        //             "_ZM": 2,
        //             "_JP": 2,
        //             "_DP": 5,
        //             "_LZ": 0,
        //             "_TS": 40
        //         }],
        //         "_GOM": {
        //             "playtype": "qiaoma",
        //             "count": "4",
        //             "minflower": "1",
        //             "maxtimes": "20",
        //             "fly": "1",
        //             "score": "2"
        //         },
        //         "_Step": 6
        //     },
        //     "_NSID": "f4cecf3f-f442-4aa7-a473-12e8ca98d0e9",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "h85376"
        // };
        // obj = obj._Data;
        obj._AN.sort(function (a, b) {
            return b._DP - a._DP;
        });
        var _dparr_sno = obj._AN[0]._SNo;

        obj._AN.sort(function (a, b) {
            return b._TS - a._TS;
        });
        var _tsarr_sno = obj._AN[0]._SNo;
        if (obj._RNo === this._roomNo) {
            this.scheduleOnce(function () {
                cc.log("进来zongjiesuan");
                this._reset();
                cc.MJ.module.game.birdModule.catchbird._active = false;
                cc.MJ.module.game.cangyingModule.cangying._active = false;
                this._gameModule.liuju = false;
                var zjroom = this._gameModule.ZJ_room;
                // this._gameModule.ZJ_qm._active = false;
                zjroom.time_label = obj._RET;
                zjroom._active = true;
                var _fz = cc.sys.localStorage.getItem("FZ_ID");

                zjroom.room_label = this._gameModule.RoomInfoLabel;

                for (var i = 0; i < 4; i++) {
                    var data = obj._AN[i];
                    var _seatName = "head_bg_s_" + this._seat[data._SNo];
                    var _name = this._gameModule[_seatName].label;
                    var _head = this._gameModule[_seatName].head_pic_s;
                    var roomItem = zjroom["roomItem" + (1 + i)];


                    // cc.log(roomItem);
                    roomItem.head_sprite._sprite = _head;
                    roomItem.head_label1 = _name;
                    roomItem.left_label.left_label1.label1 = data._ZM;
                    roomItem.left_label.left_label2.label2 = data._JP;
                    roomItem.left_label.left_label3.label3 = data._DP;
                    roomItem.left_label.left_label4.label4 = data._LZ;
                    roomItem.left_label.left_label5.label5 = "";
                    if (data._SNo === _fz) {
                        roomItem.head_sprite.fz_sprite = true;
                    } else {
                        roomItem.head_sprite.fz_sprite = false;
                    }
                    if (_dparr_sno === data._SNo) {
                        roomItem.zjps_sprite = true;
                    } else {
                        roomItem.zjps_sprite = false;
                    }

                    if (_tsarr_sno === data._SNo) {
                        var _dayingjiaAction = this.node.getChildByName("ZJ_room").getChildByName("roomItem" + (1 + i)).getChildByName("dyj_sprite").getChildByName("winner").getComponent(cc.Animation);
                        _dayingjiaAction.play("dayingjiastartAnimationClip");
                        _dayingjiaAction.on("finished", function () {
                            _dayingjiaAction.play("dayingjialoopAnimationClip");
                        }, this);

                        roomItem.dyj_sprite = true;
                    } else {
                        roomItem.dyj_sprite = false;
                    }
                    roomItem.num_label._string = data._TS;
                    var color = new cc.Color();
                    if (data._TS > 0) {
                        roomItem.num_label._string = "+" + data._TS;
                        roomItem.num_label._color = color.fromHEX("#591B04");
                    } else {
                        roomItem.num_label._color = color.fromHEX("#d83232");
                    }
                }
                this.scheduleOnce(function () {
                    // cc.director.loadScene("chooseScene");

                    if (parseInt(cc.MJ.data.getLocalStorage_roomNo().length) > 6) {
                        cc.sys.localStorage.setItem("backclubFlag","1");
                        cc.MJ.common.ui.loadScene("clubInfo");
                    }else {
                        cc.MJ.common.ui.loadScene("chooseScene");
                    }
                }, 20);

            }, 4);
        }

    }

});