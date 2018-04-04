/**
 * Created by hxl on 2017/7/6.
 * 继承于basegame
 */
cc.Class({
    extends: require("BaseGame"),
    properties: {},
    ctor: function () {

    },

    init: function (obj) {
        this._super(obj);
    },
    //苍蝇
    birdshow: function (obj, birdNode) {
        // obj = {
        //     "_Cmd": "j",
        //     "_Data": {
        //         "_Step": 51,
        //         "_SNo": 2,
        //         "_DNo": null,
        //         "_Shape": [26],
        //         "_VC": null,
        //         "_RC": 70,
        //         "_tgCard": null,
        //         "_tgSNo": 2,
        //         "_IsD": false,
        //         "_FC": 1
        //     },
        //     "_NSID": "a8ec8ad6-8e64-492c-bda0-6e836bc56081",
        //     "_EMsg": null,
        //     "_IsS": true,
        //     "_PID": "55002375"
        // };
        // obj=obj._Data;
        this.loadzhuaNiao(obj._Shape, birdNode);
        this._setCenterPaiNum(obj._RC);
    },
    loadzhuaNiao: function (collection, birdNode) {
        var temp_niao=this.node.getChildByName("cangying");
        if(!cc.isValid(temp_niao)) {
            temp_niao = cc.instantiate(birdNode);
            temp_niao.parent = this.node;
            cc.MJ.common.tool.bindData.bindObjAndNode(cc.MJ.module.game.cangyingModule, this.node);
        }

        var _birdOBJ = cc.MJ.module.game.cangyingModule.cangying;
        _birdOBJ._active = true;
       var _paiaction= temp_niao.getChildByName("niaoshuLayout").getChildByName("birdPai").getChildByName("flyaction").getComponent(cc.Animation);
        var _fontaction= temp_niao.getChildByName("CatchBirdImage").getComponent(cc.Animation);
        _paiaction.node.active=true;
        cc.MJ.common.sound.playSoud("cangying");
        _paiaction.play();
        _fontaction.play();


        cc.log(temp_niao);
        cc.log(collection);
        // var _tempobj=null;
        for (var i = 0; i < _birdOBJ.niaoshuLayout.length; i++) {
            var _tempobj = _birdOBJ.niaoshuLayout[i].birdPai;
            _tempobj.bottompai=new cc.SpriteFrame();
            if (collection.length > i) {
                _tempobj._active = true;
                // cc.log("进来 了");
                var _url = "Image/pai/my/out/p" + collection[i];
                this._getImage(_url, _tempobj);

                continue;
            }
            _tempobj._active = false;
        }
        _paiaction.on("finished", function () {
            _paiaction.node.active=false;
        },this);

    },
    _getImage: function (p_url, obj) {
        cc.loader.loadRes(p_url, cc.SpriteFrame, function (err, spriteFrame) {
            obj.bottompai = spriteFrame;
        });
    },
    chi: function (p_obj) {
        cc.MJ.common.sound.playSoud("chi");
        this._showAction("chi", this._seatMap[p_obj._SNo]);
        var _Action = this._paiNum[this._seatMap[p_obj._SNo]].Action;
        var _list = this._paiNum[this._seatMap[p_obj._SNo]].Current;
        // this._NDC=p_obj._NDC;
        this._setBuhua(p_obj._SNo, p_obj._F);
        if (p_obj._SNo === 0) {
            for (var a = 0; a < 3; a++) {

                for (var i = 0; i < _list.length; i++) {
                    if (p_obj._Shape[a] === _list[i] && _list[i] != p_obj._tgCard) {
                        _list.splice(i, 1);
                        break;
                    }
                }
            }
            _list.sort(function (a, b) {
                return b - a;
            });
            cc.log("打印牌面");
            cc.log(_list);
        } else {
            this._paiNum[this._seatMap[p_obj._SNo]].Current = _list - 2;
        }
        var _Drop = this._paiNum[this._seatMap[p_obj._tgSNo]].Drop;
        _Drop.splice(_Drop.length - 1, 1);
        _Action.push({_CS:p_obj._Shape,_tgSNo:parseInt(p_obj._tgSNo),_tgCard:p_obj._tgCard});

        this._CommonUpdate(p_obj);
        this.showSelectTips(p_obj._AHP);
    },


    danju: function (p_obj, p_node) {
        this._super(p_obj, "苍蝇-花/勒子-番数-分数", ["_CYA", "_HA", "", "_TS"]);
    },
    zongfen: function (p_obj, p_node) {
        this._super(p_obj);
    },
    buhua: function (p_obj) {

        var _list = this._paiNum[this._seatMap[p_obj._SNo]].Current;
        var _hua = this._paiNum[this._seatMap[p_obj._SNo]].Buh;

        _hua.push(p_obj._Shape[0]);
        for (var i = 0; i < _list.length; i++) {
            if (p_obj._Shape[0] === _list[i]) {
                _list.splice(i, 1);
            }
        }
        if (p_obj._SNo === 0) {
            // this.scheduleOnce(function () {
            cc.MJ.common.sound.playSoud("buhua");
            this._gameModule.buhuaShow = true;
            this.scheduleOnce(function () {
                this._gameModule.buhuaShow = false;
            }, 3);
            this._CommonUpdate(p_obj, true, true);
            this._setBuhua(p_obj._SNo, p_obj._F);
            // }, 3);
        } else {
            cc.MJ.common.sound.playSoud("buhua");
            _list--;
            this._paiNum[this._seatMap[p_obj._SNo]].Current = _list;
            this._CommonUpdate(p_obj, true);
            this._setBuhua(p_obj._SNo, p_obj._F);
        }


    },

    /**
     * 用于点击听按钮时调用
     *
     * 参数：_vc的_s完整数据【【1，2】【1，2】【1，2】】
     * */
    ting: function (p_obj) {
        //cc.MJ.common.sound.playSoud("ting");

        var _list = this._paiNum[this._seatMap[0]].Current;
        var _arr = [];
        for (var i = 0; i < _list.length; i++) {
            _arr.push([]);
        }
        // for (var a = 0; a < p_obj.arr.length; a++) {
        //     var _index = cc.MJ.common.tool.UITool.getIndexByValue(_list, p_obj.arr[a][0]);
        //     if (_index !== -1) {
        //         _arr[_index] = p_obj.arr[a];
        //     }
        // }
        for(var i=0;i<_list.length;i++){
            for (var a = 0; a < p_obj.arr.length; a++) {
                // var _index = cc.MJ.common.tool.UITool.getIndexByValue(_list, p_obj.arr[a][0]);
                if (p_obj.arr[a][0]===_list[i]) {
                    _arr[i] = p_obj.arr[a];
                }
            }
        }
        cc.sys.localStorage.setItem("ting", true);
        this._tingStatus = true;
        cc.log(_arr);
        cc.log(p_obj);
        this._baseBottomInit(0, false, _arr, false);
    },
    //用于设置所有手牌为半透明，并且去除所有事件
    t: function (p_obj) {
        cc.MJ.common.sound.playSoud("ting");
        this._showAction("ting", this._seatMap[p_obj._SNo]);
        if (p_obj._SNo === 0) {
            cc.sys.localStorage.setItem("tTouch",true);
            this._tingStatus = true;
            this._setTing(p_obj._SNo);
            this._baseBottomInit(p_obj._SNo, false, [], true);

        } else {
            //todo:设置其他玩家的听牌状态标识的显示
            // this._baseBottomInit(p_obj._SNo,true,[]);
            this._setTing(p_obj._SNo);
        }
    },
    mo:function (p_obj,p_isBu) {
        this._setBuhua(p_obj._SNo, p_obj._F);
        this._super(p_obj,p_isBu);
    },
    gang:function (p_obj,g_type) {
        this._setBuhua(p_obj._SNo, p_obj._F);
        this._super(p_obj,g_type);
    },
    peng:function (p_obj) {

        this._setBuhua(p_obj._SNo, p_obj._F);
        this._super(p_obj);

    }

});
