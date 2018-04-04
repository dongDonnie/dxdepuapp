/**
 * Created by hxl on 2017/7/6.
 * game鍦烘櫙榛樿鍔犺浇js
 */



// var musicModule = require("MusciModule");
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
var game_class = cc.Class({
    extends: cc.Component,

    properties: {
        Painum: cc.Label,
        niao_layout: {
            default: null,
            type: cc.Prefab
        },
        cangying_layout: {
            default: null,
            type: cc.Prefab
        }
    },

    // __ctor__: function () {
    //
    // },
    ctor: function () {
        this.RoomModel = {
            head_bg_s_top: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "等待加载",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }
            },
            head_bg_s_left: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "等待加载",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }
            },
            head_bg_s_right: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "等待加载",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }
            },
            head_bg_s_bottom: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "等待加载",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }
            },
            RoomInfoLabel: "",
            sieve_plate: {
                _son: true,
                Second: {
                    _son: true, leftNumber: new cc.SpriteFrame(), rightNumber: new cc.SpriteFrame()
                },
                zhuang: {
                    _son: true,
                    leftzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    topzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    rightzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    bottomzhuang: {_son: true, _sprite: new cc.SpriteFrame()}
                },
                allPaiNumber: "X0"
            },
            voice: {
                _son: true,
                rightVoice: {_son: true, timelabel: 60, _active: false},
                leftVoice: {_son: true, timelabel: 60, _active: false},
                topVoice: {_son: true, timelabel: 60, _active: false},
                bottomVoice: {_son: true, timelabel: 60, _active: false},
            },
            textMessage: {
                _son: true,
                leftmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                rightmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                topmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                bottommsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
            },
            pengLayout: {
                _son: true,
                _active: false,
                actionType: {
                    _son: true,
                    pengBtn: new Global_CommonModule({_EventData: "0", _EventID: 3}, false, true),
                    gangBtn: new Global_CommonModule({_EventData: "0", _EventID: 1}, false, true),
                    huBtn: new Global_CommonModule({_EventData: "0", _EventID: 4}, false, true),
                    cancelbtn: new Global_CommonModule({_EventData: "0", _EventID: 5}, true, true),
                    chiBtn: new Global_CommonModule({_EventData: "0", _EventID: 6}, false, true),
                    tingBtn: new Global_CommonModule({_EventData: "0", _EventID: 9}, false, true)
                },

                chitype: [
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    },
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    },
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    }
                ],
                gangtype: [
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})},
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})},
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})}
                ],

            },
            playGame: {
                _son: true,
                _active: false,
                left_pai: [
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false}],
                bottom_pai: [{
                    top: {
                        _son: true,
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    }
                },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    }],
                right_pai: [{right: false}, {right: false}, {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},],
                top_pai: [
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false}
                ]
            },
            endGame: {
                _son: true,
                _active: false,
                left_pai: [
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }],
                bottom_pai: [
                    {
                        top: {
                            _son: true,
                            temp1: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _opacity: 255,
                                _active: true
                            }
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }],
                right_pai: [{
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                }, {
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                }, {
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },],
                top_pai: [
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }
                ]
            },
            left_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                    }
                },
            ],
            right_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            bottom_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            top_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            leftPlayPaiLayout: [
                {
                    left: new Global_CommonModule()
                },
                {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                },
            ],
            rightPlayPaiLayout: [
                {
                    right: new Global_CommonModule()
                },
                {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    right: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                },
            ],
            bottomPlayPaiLayout: [
                {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }

            ],
            topPlayPaiLayout: [
                {
                    top: new Global_CommonModule()
                },
                {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }
            ],
            bottomHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            leftHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            topHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            rightHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            leftShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            rightShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            topShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            bottomShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            liuju: false,
            ZJ_qm: {
                _son: true,
                _active: false,
                time_label: "时间",
                room_label: "房间规则",
                roomright_label: {
                    _son: true,
                    label1: "杠",
                    label2: "鸟",
                    label3: "胡",
                    label4: "分数",
                },
                content: {
                    _son: true,
                    item1: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: "",
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item2: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        }, pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: "",
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item3: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            head_sprite: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                zhuang_sprite: false,
                                name: ""
                            },
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: "",
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item4: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: "",
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                }
            },
            ZJ_room: {
                _son: true,
                _active: false,
                time_label: "",
                room_label: "",
                roomitem: "",
                roomItem1: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem2: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem3: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem4: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },


            },
            jiesan: {
                _son: true,
                _active: false,
                refuse: true,
                agree: true,
                confirm: false,
                content: {
                    _son: true,
                    name: "",
                    staticlabel: ""
                }
            }, buhuaShow: false
        };
    },
    onLoad: function () {
        var tableNo = cc.sys.localStorage.getItem("table_ID");
        var loginname = cc.sys.localStorage.getItem("_PID");
        this.node.getChildByName("return_icon").zIndex = 100;
        this.node.getChildByName("play_bg").zIndex = 100;

        var fapai = {
            _Cmd: "actionlog",
            _PID: loginname,
            _Data: {_TID: tableNo}
        };

        this._play_Status = true;
        this.play_length = 0;
        // this.RoomModel = {};
        // var getnewobj= function (obj) {
        //      this.room=obj;
        //      return this;
        //  }
        //  this.RoomModel=huifangRoomModule;
        //  cc.js.mixin(this.RoomModel, cc.MJ.module.game.RoomModule);
        //  var _str=JSON.stringify(cc.MJ.module.game.RoomModule);
        //  this.RoomModel=JSON.parse(_str);
        // this.RoomModel= cc.MJ.common.tool.bindData.deepCopy(cc.MJ.module.game.huifangRoomModule);
        // cc.log(this.RoomModel);

        /* var huanghuang = require("huanghuang");
         this.gameService = new huanghuang();*/

        if (cc.MJ.data.getLocalStorage_huifangClub() === "true"){

        }else {
            cc.director.preloadScene('chooseScene', function () {
                cc.sys.localStorage.setItem("zj_status","true");
            });
        }

        this.initEvent();
        cc.MJ.common.tool.bindData.bindObjAndNode(this.RoomModel, this.node, null);
        cc.MJ.socket.sendGetRequest(fapai, null, null);

    },
    backRoom: function () {
        // cc.MJ.common.ui.loadScene("chooseScene");

        // if (cc.MJ.data.getLocalStorage_huifangZj() === "true") {
        //     cc.MJ.common.ui.loadScene("chooseScene");
        // }else

        if (cc.MJ.data.getLocalStorage_huifangClub() === "true"){
            cc.MJ.data.setLocalStorage_huifangClub("false");
            cc.sys.localStorage.setItem("backclubFlag","2");
            cc.MJ.common.ui.loadScene("clubInfo");
        }else {
            cc.MJ.common.ui.loadScene("chooseScene");
        }
    },
    initEvent: function () {

        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        // cc.log(_config);
        var self = this;

        this.node.on(_eventList.actionlog.EventName, function (data) {

            if (data.detail._Data) {
                // cc.log(data.detail._Data);
                self.loadBaseinfo(data.detail._Data);
            }else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }

        });


    },
    setParamToBeginPlay: function () {
        // if (this._play_Status) {
        var obj = this.TempPlayData;
        // 浠ョ涓哄崟浣嶇殑鏃堕棿闂撮殧
        var interval = this.timeS;
        // 閲嶅娆℃暟
        var repeat = obj._ActionLog.length - 1;

        // 寮�濮嬪欢鏃�
        var delay = 1;
        var length = this.play_length;

        this.callback = function () {
            // 杩欓噷鐨� this 鎸囧悜 component

            if (!this._play_Status) {
                this.setPlay_Data_For_stop(length, obj);
                this.unschedule(this.callback);
                return;
            }
            if (length < obj._ActionLog.length) {
                this.loadstep(obj._ActionLog[length]);
                length++;
                this.play_length = length;
                this.node.getChildByName("play_bg").getChildByName("suspend").getComponent(cc.Button).interactable = true;
                this.node.getChildByName("play_bg").getChildByName("next").getComponent(cc.Button).interactable = true;
            }else {
                this._play_Status=false;
                this.unschedule(this.callback);
            }

        }
        this.schedule(this.callback, interval, repeat, delay);
        // }
    },
    replayAction: function (event) {
        var node = event.target;
        //node.interactable=false;
        this.DateTime_flag = Date.now();
        var suspend = this.node.getChildByName("play_bg").getChildByName("suspend").getComponent(cc.Button);
        // suspend.interactable = false;
        this._play_Status = !this._play_Status;
        cc.MJ.common.tool.UITool.buttonLoadImage(node, this._play_Status ? "new/suspend" : "new/play");
        this.unschedule(this.callback);
        this.setParamToBeginPlay();

        node.interactable = true;
    },
    jiasu: function (event) {
        if (this._play_Status) {
            var node = event.target;
            var suspend = this.node.getChildByName("play_bg").getChildByName("suspend").getComponent(cc.Button);
            var next = this.node.getChildByName("play_bg").getChildByName("next").getComponent(cc.Button);
            suspend.interactable = false;
            next.interactable = false;
            var sudu = this.node.getChildByName("play_bg").getChildByName("sudu").getComponent(cc.Label);
            if (this.timeS === 5) {
                this.timeS = 3;
                sudu.string = "X2";
            } else if (this.timeS === 3) {
                this.timeS = 1;
                sudu.string = "X4";
            } else if (this.timeS === 1) {
                this.timeS = 5;
                sudu.string = "X1";
            }
            this.unschedule(this.callback);
            this.setParamToBeginPlay();
        }


    },
    setPlay_Data_For_stop: function (count, obj) {
        this.play_length = count;
        this.TempPlayData = obj;
    },
    loadhuifang: function (obj) {

        this.timeS = 5;
        this.Painum.string = "x" + obj._BI._RC;
        this.RC = obj._BI._RC;
        this.TempPlayData = obj;
        // 浠ョ涓哄崟浣嶇殑鏃堕棿闂撮殧
        var interval = this.timeS;
        // 閲嶅娆℃暟
        var repeat = obj._ActionLog.length;
        //var repeat = this.timeS;
        // 寮�濮嬪欢鏃�
        var delay = 0;
        var length = 0;
        this.callback = function () {
            // 杩欓噷鐨� this 鎸囧悜 component

            if (!this._play_Status) {
                this.setPlay_Data_For_stop(length, obj);
                this.unschedule(this.callback);
                return;
            }
            if (length < obj._ActionLog.length) {
                this.loadstep(obj._ActionLog[length]);
                length++;
                this.play_length = length;
            }
        }
        this.schedule(this.callback, interval, repeat, delay);


    },
    loadBaseinfo: function (p_baseobj) {
        // cc.log(p_baseobj);

        var playType = p_baseobj._BI._GOM.playtype;
        if (playType === "qiaoma") {
            this._specialLayout=this.cangying_layout;
            cc.sys.localStorage.setItem("playType", "qiaoma");
            this.gameService = this.node.addComponent("qm");
        } else {
            this._specialLayout=this.niao_layout;
            cc.sys.localStorage.setItem("playType", "huanghuang");
            this.gameService = this.node.addComponent("hh");
        }
        this.gameService._FingerNode = this.node.getChildByName("finger");
        this.gameService.init(p_baseobj._BI, this.RoomModel);
        this.loadhuifang(p_baseobj);

    },
    loadstep: function (p_stepObj) {
        p_stepObj._PA._RC = parseInt(this.RC);
        switch (p_stepObj._PA._Code) {
            case "p":
                this.gameService.peng(p_stepObj._PA);
                break;
            case "m":
                p_stepObj._PA._RC = parseInt(this.RC) - 1;
                this.gameService.mo(p_stepObj._PA);
                break;
            case "b":
                p_stepObj._PA._RC = parseInt(this.RC) - 1;
                this.gameService.mo(p_stepObj._PA, true);
                break;
            case "lg":
                this.gameService.gang(p_stepObj._PA,"lg");
                break;
            case "dg":
                this.gameService.gang(p_stepObj._PA,"dg");
                break;
            case "fg":
                this.gameService.gang(p_stepObj._PA,"fg");
                break;
            case "h":
                this.gameService.hu(p_stepObj._PA);
                var _hunode = this.node.getChildByName("hunode");
                var hu_node = _hunode.getChildByName("hu" + p_stepObj._PA._SNo);
                _hunode.active = true;
                hu_node.active = true;
                break;
            case "e":
                this.gameService.chi(p_stepObj._PA);
                break;
            case "d":
                this.gameService.drop(p_stepObj._PA);
                break;
            case "f":
                this.gameService.buhua(p_stepObj._PA);
                break;
            case "j":
                p_stepObj._PA._RC = parseInt(this.RC) - p_stepObj._PA._Shape.length;
                this.gameService.birdshow(p_stepObj._PA, this._specialLayout);
                break;
            case "t":
                this.gameService.t(p_stepObj._PA);
                break;

            default:
                break;
        }
        if (p_stepObj && p_stepObj._PI.length > 0) {
            this.gameService.setgenvs(p_stepObj._PI);
        }
        this.RC = p_stepObj._PA._RC;

    }

});
