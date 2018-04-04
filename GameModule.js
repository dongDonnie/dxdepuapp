/**
 * Created by hxl on 2017/7/6.
 * 用于游戏界面数据的基础配置,页面元素名称配置
 */
//此处的spriteframe对象无法使用，必须在cc class中使用
var Global_CommonModule = function (p_btn, p_show, p_Sprite, p_opacity) {
    this._son = true;
    if (!p_Sprite) {
        this._sprite = new cc.SpriteFrame();
    }


    this._active = p_show || false;

    var _btn = {_EventData: "0", _EventID: 0};
    this._button = p_btn || _btn;
    if (p_opacity) {
        this._opacity = 255;
    }
    return this;
};
var GameModuledata = cc.Class({
    extends: cc.Component,
    properties: {},
    ctor: function () {


    },
    // Global_CommonModules: function (p_btn, p_show, p_Sprite, p_opacity) {
    //     var _obj = {};
    //     _obj._son = true;
    //     if (!p_Sprite) {
    //         this._sprite = new cc.SpriteFrame();
    //     }
    //
    //
    //     _obj._active = p_show || false;
    //
    //     var _btn = {_EventData: "0", _EventID: 0};
    //     _obj._button = p_btn || _btn;
    //     if (p_opacity) {
    //         _obj._opacity = 255;
    //     }
    //     return _obj;
    // },

    statics: {
         seatInfo: ["bottom", "right", "top", "left"],
        // action: ["m", "b", "lg", "dg", "fg", "h", "j", "d", "p", "e"],
        // ActionButton: {layout: "pengLayout", btn: "_btn"},
        // contentBase: ["Current", "Drop", "Action"],


        RoomModule: {

            players: {
                _son: true,
                Player0: {
                    _son: true,
                    _active:false,
                    zhuang: false,
                    headImage: new cc.SpriteFrame(),
                    fangzhu: false,
                    name: "等待入座",
                    turn: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                    score: 0,
                    jiang: {_son: true, jianglabel: 0},
                    jian: {_son: true, jianLabel: 0},
                    partner: false,
                    dozen: false
                },
                Player1: {
                    _son: true,
                    _active:false,
                    zhuang: false,
                    headImage: new cc.SpriteFrame(),
                    fangzhu: false,
                    name: "等待入座",
                    turn: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                    score: 0,
                    jiang: {_son: true, jianglabel: 0},
                    jian: {_son: true, jianLabel: 0},
                    partner: false,
                    dozen: false
                },
                Player2: {
                    _son: true,
                    _active:false,
                    zhuang: false,
                    headImage: new cc.SpriteFrame(),
                    fangzhu: false,
                    name: "等待入座",
                    turn: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                    score: 0,
                    jiang: {_son: true, jianglabel: 0},
                    jian: {_son: true, jianLabel: 0},
                    partner: false,
                    dozen: false
                },
                Player3: {
                    _son: true,
                    _active:false,
                    zhuang: false,
                    headImage: new cc.SpriteFrame(),
                    fangzhu: false,
                    name: "等待入座",
                    turn: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                    score: 0,
                    jiang: {_son: true, jianglabel: 0},
                    jian: {_son: true, jianLabel: 0},
                    partner: false,
                    dozen: false
                }

            },
            setBtnNode: {
                _son: true,
                startBtn: false,
                surrenderBtn: false,
                jiesan:false,
                readybtn:true,
                invitebtn:false
            },
            game: {
                _son: true,
                _active: false,
                inpai: {
                    _son: true,
                    _active: true,
                    inpai0: [
                        {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        }, {
                            paibtn: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _button: {_EventData: "0", _EventID: 0},
                                _active: true,
                                _y: 0,
                                _color:cc.Color.WHITE,
                                _opacity:255
                            }
                        },
                    ],
                    inpai1: {
                        _son: true,
                        label: "10+",
                        _active: true
                    }, inpai2: {
                        _son: true,
                        label: "10+",
                        _active: true
                    }, inpai3: {
                        _son: true,
                        label: "10+",
                        _active: true
                    },
                },
                outpai: {
                    _son: true,
                    _active: true,
                    outpai0: [
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }],
                    outpai1: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                    outpai2: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                    outpai3: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                },
                time: {
                    _son: true,
                    _active: true,
                    time0: {_son: true, _active: false, label: 60},
                    time1: {_son: true, _active: false, label: 60},
                    time2: {_son: true, _active: false, label: 60},
                    time3: {_son: true, _active: false, label: 60}
                },
                btnlayout: {
                    _son:true,
                    _active:false,
                    passBtn:true
                },
                jiao: true,
                tanlayout:{
                    _son:true,
                    _active:true,
                    outpai1: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                    outpai2: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                    outpai3: [
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        },
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}},
                        {pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}},
                        {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }, {
                            pai: {_son: true, _active: true, _sprite: new cc.SpriteFrame()}
                        }
                    ],
                }
            },
            gameMessage: {
                _son: true,
                tableMessage: {
                    _son: true,
                    roomLabel: "",
                    inningLabel: "",
                    playTypeLabel: ""
                },

                tableScore: {
                    _son: true,
                    _active:false,
                    score: "0"
                }
            },
            alert: {
                _son: true,
                dj: {
                    _son: true,
                    _active: false,
                    titleNode: {
                        _son: true,
                        roomLabel: "",
                        timeLabel: "",
                        playtypeLabel: ""
                    },
                    ScrollView: {
                        _son: true,
                        _active: true,
                        view: {
                            _son: true,
                            _active: true,
                            content: [
                                {
                                    item: {
                                        _son: true,
                                        _active: true,
                                        headImage: {
                                            _son: true,
                                            _sprite: new cc.SpriteFrame(),
                                            you: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                            zhuang: true,
                                            nameLabel: "",
                                            win: true

                                        },
                                        score1: "+10",
                                        score2: "+10",
                                        score3: "+10",
                                        score4: "+10",
                                        score5: "+10",
                                        zhaLayout: [
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            }
                                        ]
                                    }
                                }, {
                                    item: {
                                        _son: true,
                                        _active: true,
                                        headImage: {
                                            _son: true,
                                            _sprite: new cc.SpriteFrame(),
                                            you: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                            zhuang: true,
                                            nameLabel: "",
                                            win: true

                                        },
                                        score1: "+10",
                                        score2: "+10",
                                        score3: "+10",
                                        score4: "+10",
                                        score5: "+10",
                                        zhaLayout: [
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            }
                                        ]
                                    }
                                }, {
                                    item: {
                                        _son: true,
                                        _active: true,
                                        score1: "+10",
                                        score2: "+10",
                                        score3: "+10",
                                        score4: "+10",
                                        score5: "+10",
                                        headImage: {
                                            _son: true,
                                            _sprite: new cc.SpriteFrame(),
                                            you: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                            zhuang: true,
                                            nameLabel: "",
                                            win: true

                                        },

                                        zhaLayout: [
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            }
                                        ]
                                    }
                                }, {
                                    item: {
                                        _son: true,
                                        _active: true,
                                        headImage: {
                                            _son: true,
                                            _sprite: new cc.SpriteFrame(),
                                            you: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                            zhuang: true,
                                            nameLabel: "",
                                            win: true

                                        },
                                        score1: "+10",
                                        score2: "+10",
                                        score3: "+10",
                                        score4: "+10",
                                        score5: "+10",
                                        zhaLayout: [
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            },
                                            {
                                                pai: {
                                                    _son: true,
                                                    _sprite: new cc.SpriteFrame(),
                                                    _active: true,
                                                    numLabel: "X4"
                                                }
                                            }
                                        ]
                                    }
                                },
                            ]
                        }
                    },
                },
                end: {
                    _son: true,
                    _active: false,
                    titleNode: {
                        _son: true,
                        roomLabel: "",
                        timeLabel: "",
                    },
                    playerLayout: {
                        _son: true,
                        player0: {
                            _son: true,
                            headImage: new cc.SpriteFrame(),
                            name: "",
                            ID: "",
                            ringhtLabel1: "",
                            ringhtLabel2: "",
                            ringhtLabel3: "",
                            win: true,
                            fangzhu: true
                        }, player1: {
                            _son: true,
                            headImage: new cc.SpriteFrame(),
                            name: "",
                            ID: "",
                            ringhtLabel1: "",
                            ringhtLabel2: "",
                            ringhtLabel3: "",
                            win: true,
                            fangzhu: true
                        }, player2: {
                            _son: true,
                            headImage: new cc.SpriteFrame(),
                            name: "",
                            ID: "",
                            ringhtLabel1: "",
                            ringhtLabel2: "",
                            ringhtLabel3: "",
                            win: true,
                            fangzhu: true
                        }, player3: {
                            _son: true,
                            headImage: new cc.SpriteFrame(),
                            name: "",
                            ID: "",
                            ringhtLabel1: "",
                            ringhtLabel2: "",
                            ringhtLabel3: "",
                            win: true,
                            fangzhu: true
                        }
                    }
                }
            },
            jiesan: {
                _son: true,
                _active:false,
                refuse: true,
                agree: true,
                confirm: false,
                content: {
                    _son: true,
                    name: "",
                    staticlabel: ""
                }
            },
            readylayout:{
                _son:true,
                _active:true,
                ready0:false,
                ready1:false,
                ready2:false,
                ready3:false,
            }

        },


    }
});