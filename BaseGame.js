cc.Class({
    extends: require("TabelPart"),

    properties: {},

    // use this for initialization
    onLoad: function () {

    },
    init: function (obj, roomobj) {
        this._super(obj, roomobj);
        var _arr = this.fawang(obj._PSL, obj._Step);
        return _arr;
    },
    CommonFuncInit: function (p_obj, p_flag, guopai) {
        this.initDropPaiOBJ(p_obj._SNo);
        if (!guopai) {
            this.initCurrentPaiOBJ(p_obj._SNo, false);
        }

        this.initActionBtn(p_obj);
        this.setTabelScore(p_obj._TS);
        if (!p_flag) {
            this.setScore(p_obj, p_obj._SNo);
        }

        this._setCenterNum(p_obj._DNo);
        this.setAllfen(p_obj._APS || []);
    },
    cp: function (p_obj) {
        cc.MJ.common.sound.playSoud("givecard");
        if (p_obj._IsCSNo !== null) {

            var _NoactionS = ["dz", "yd"];
            if (p_obj._C === "dz" || p_obj._C === "yd") {
                cc.MJ.common.sound.playSoud(p_obj._C + (p_obj._Shape[0] % 20));
            } else if (p_obj._C.indexOf("sde") !== -1) {
                cc.MJ.common.sound.playSoud("sded");
            } else if (p_obj._C.indexOf("fj") !== -1) {
                cc.MJ.common.sound.playSoud("fj");
            }
            else {
                cc.MJ.common.sound.playSoud(p_obj._C);
            }
        } else {
            if (p_obj._C.indexOf("fj") !== -1) {
                cc.MJ.common.sound.playSoud("fj");
            } else if (p_obj._C === "zd" || p_obj._C === "wsk" || p_obj._C === "cs") {
                cc.MJ.common.sound.playSoud(p_obj._C);
            } else {
                var _datasound = ["dani0", "dani1", "dani2"];
                this.radomSound(_datasound, 0, 2);
            }

        }

        this.roomObj.game.jiao = false;
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


        this._paiNum["pai" + p_obj._SNo].Drop = p_obj._Shape;
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 3 ? 0 : _sno;
        console.log(_sno);
        this._paiNum["pai" + _sno].Drop = [];
        this.initDropPaiOBJ(_sno);
        this.CommonFuncInit(p_obj);


    },
    guopai: function (p_obj) {
        var _datasound = ["pass0", "pass1", "pass2", "pass3"];
        this.radomSound(_datasound, 0, 3);
        var _sno = parseInt(p_obj._SNo) + 1;
        _sno = _sno > 3 ? 0 : _sno;
        console.log(_sno);
        this._paiNum["pai" + _sno].Drop = [];
        this.initDropPaiOBJ(_sno);
        this.CommonFuncInit(p_obj, false, true);
    },
    note: function (p_obj) {
        this.CommonFuncInit(p_obj);

    }
    ,
    qz: function (p_obj) {
        // p_obj = {
        //     "_Cmd": "qz",
        //     "_Data": {
        //         "_Step": 5,
        //         "_SNo": 0,
        //         "_BankerSeatNo": 1,
        //         "_FriendSeatNo": 3,
        //         "_DNo": 1,
        //         "_Shape": [0],
        //         "_VC": null,
        //         "_TS": 0,
        //         "_C": "qz",
        //         "_APS": [{"_SNo": 1, "_AS": 0, "_PLS": 0, "_PS": 0}, {
        //             "_SNo": 0,
        //             "_AS": 0,
        //             "_PLS": 0,
        //             "_PS": 0
        //         }, {"_SNo": 2, "_AS": 0, "_PLS": 0, "_PS": 0}, {"_SNo": 3, "_AS": 0, "_PLS": 0, "_PS": 0}],
        //         "_WinNo": 0
        //     },
        //     "_NSID": "8079c0a7-2bc6-46bc-8424-aa219cb77bbb",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "71007927"
        // };
        // p_obj= p_obj._Data;

        this.CommonFuncInit(p_obj, true);


        this.setScore(p_obj, p_obj._FriendSeatNo);
        this.setScore(p_obj, p_obj._BankerSeatNo);


    },
    fawang: function (p_obj, p_step) {
        if (p_step === 1) {
            var _temparr = [];
            for (var i = 0; i < p_obj.length; i++) {
                var fawang = p_obj[i]._KS;
                if (fawang !== null && fawang.length > 0) {
                    this._paiNum["pai" + p_obj[i]._SNo].Drop = fawang;
                    this.initDropPaiOBJ(p_obj[i]._SNo);
                    _temparr.push(p_obj[i]._SNo);
                }

            }
            this.scheduleOnce(function () {
                for (var i = 0; i < 4; i++) {
                    this._paiNum["pai" + i].Drop = [];
                    this.initDropPaiOBJ(i);
                }

            }, 10);
            return _temparr;
        }
        return [];

    },
    tsSelectpai: function (p_obj) {
        return this.selectPoker(p_obj._S);
    },
    dj: function (p_obj) {
        this.initZJ_qm(p_obj);
    },
    zj: function (p_obj) {
        this.initZJ_room(p_obj);
    },
    lipai: function (p_selectArr, arr, obj_arr) {
        console.log(p_selectArr);
        console.log(obj_arr);
        var _current = this._paiNum["pai0"].Current;
        //删除原有数组中的元素
        for (var i = 0; i < p_selectArr.length; i++) {
            for (var w = 0; w < p_selectArr[i].length; w++) {
                cc.js.array.remove(_current, p_selectArr[i][w]);

            }
        }
        for (var i = 0; i < p_selectArr.length; i++) {
            this._paiNum["pai0"].Current = cc.js.array.appendObjectsAt(_current, p_selectArr[i], 0);
        }
        // cc.js.array.removeArray(_current, p_selectArr[p_selectArr.length - 1]);
        // this._paiNum["pai0"].Current = cc.js.array.appendObjectsAt(_current, p_selectArr[p_selectArr.length - 1], 0);
        console.log(_current);
        this.initCurrentPaiOBJ(0, false);
        var _index = 0;
        for (var i = p_selectArr.length - 1; i >= 0; i--) {
            // var _index = cc.MJ.common.tool.UITool.getIndexByValue(_current, p_selectArr[i]);
            var _color = arr[i];
            console.log(_color);
            for (var a = 0; a < p_selectArr[i].length; a++) {
                // _index+=(i===p_selectArr.length-1?0:_current.length-p_selectArr[i].length);

                for (var k = _index; k < _current.length; k++) {

                    if (_current[k] === p_selectArr[i][a]) {
                        var pai_data = this.roomObj.game.inpai["inpai0"][k].paibtn;
                        pai_data._color = _color;
                        pai_data._opacity = 255;
                        if (obj_arr[i][a]) {
                            obj_arr[i][a].index = k;
                        }

                        _index++;
                        break;
                    }


                }
            }


        }
    },
    countSort: function (paixu_arr, _temparr) {
        var _arr = [];
        paixu_arr.sort(function (a, b) {
            return b % 20 - a % 20;
        });
        for (var i = 0; i < paixu_arr.length; i++) {

            _arr.push({key: paixu_arr[i] % 20, val: []});


        }
        for (var k = 0; k < _arr.length; k++) {
            for (var i = 0; i < paixu_arr.length; i++) {
                if (_arr[k].key === paixu_arr[i] % 20) {
                    _arr[k].val.push(paixu_arr[i]);
                }
            }
        }

        _arr.sort(function (a, b) {
            if (b.val.length === a.val.length) {
                return b.key - a.key;
            } else {
                return b.val.length - a.val.length;
            }

        });

        var _re = [];
        var flag = true;
        for (var i = 0; i < _arr.length; i++) {
            if (_re.length === 0) {
                _re.push(_arr[i]);
                _temparr.push.apply(_temparr, _arr[i].val);
            }
            for (var k = 0; k < _re.length; k++) {
                if (_arr[i].key === _re[k].key) {
                    flag = false;
                    break;

                } else {
                    flag = true;

                }
            }
            if (flag) {
                _re.push(_arr[i]);
                _temparr.push.apply(_temparr, _arr[i].val);
            }


        }
    },
    normalSort: function (paixu_arr) {

        paixu_arr.sort(function (a, b) {
            return b % 20 - a % 20;
        });
    },
    paixu: function (flag) {
        var _current = this._paiNum["pai0"].Current;
        var paixu_arr = _current.slice(0);
        console.log(_current);
        var _temparr = [];
        if (flag) {
            this.countSort(paixu_arr, _temparr);
            this._paiNum["pai0"].Current = _temparr;
        } else {
            this.normalSort(paixu_arr);
            this._paiNum["pai0"].Current = paixu_arr;
        }
        this.initCurrentPaiOBJ(0, false);
    },
    li510k: function (p_selectArr) {
        var _current=this._paiNum["pai0"].Current;
        var _current_temp=_current.slice(0);
        for (var i = 0; i < p_selectArr.length; i++) {
            for (var w = 0; w < p_selectArr[i].length; w++) {
                cc.js.array.remove(_current_temp, p_selectArr[i][w]);

            }
        }
        var _obj = this._get510k(_current_temp);
        // this.initCurrentPaiOBJ(0, false);
        var arr={
            select:this.selectPoker(_obj),
            objarr:_current
        };
        return arr;
    },
    setready: function (p_obj) {
        this.setreadyShow(p_obj);
    },
    _get510k: function (p_CardList) {
        //  510K牌组
        var m_Result = new Array();
        var m_Is5 = false;
        var m_Is10 = false;
        var m_IsK = false;
        for (var i = 0; i < p_CardList.length; i++) {
            var i_TempCard = p_CardList[i] % 20;
            if (i_TempCard == 5 && !m_Is5) {
                m_Is5 = true;
            } else if (i_TempCard == 10 && !m_Is10) {
                m_Is10 = true;
            } else if (i_TempCard == 13 && !m_IsK) {
                m_IsK = true;
            } else {
                continue;
            }

            m_Result.push(p_CardList[i]);
            if (m_Result.length == 3) {
                break;
            }
        }

        if (m_Result.length != 3) {
            m_Result = null;
        }

        return m_Result
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
