/**
 * Created by hxl on 2017/7/6.
 * 继承于basegame
 */
cc.Class({
    extends: require("BaseGame"),
    properties: {},
    ctor: function () {

    },
    birdshow: function (obj, birdNode) {
        this.loadzhuaNiao(obj._Shape, birdNode);
        this._setCenterPaiNum(obj._RC);
    },
    init: function (obj) {
        this._super(obj);
    },
    danju:function (p_obj) {
        this._super(p_obj,"杠-胡-鸟-分数",["_GS","_HS","_NS","_TS"]);
    },
    zongfen:function (p_obj,p_node) {
        this._LoadzongJiesuan(p_obj,p_node);
    },
    loadzhuaNiao: function (collection, birdNode) {
        var temp_niao=this.node.getChildByName("catchbird");
        if(!cc.isValid(temp_niao)){
            temp_niao = cc.instantiate(birdNode);
            temp_niao.parent = this.node;
            cc.MJ.common.tool.bindData.bindObjAndNode(cc.MJ.module.game.birdModule, this.node);
        }


        var _birdOBJ = cc.MJ.module.game.birdModule.catchbird;
        _birdOBJ._active = true;


        cc.log(temp_niao);
        cc.log(collection);
        cc.MJ.common.sound.playSoud("cangying");
        for (var i = 0; i < _birdOBJ.niaoshuLayout.length; i++) {


            var _tempobj = _birdOBJ.niaoshuLayout[i].birdPai;
            if (collection.length > i) {
                var _paiaction= temp_niao.getChildByName("niaoshuLayout").children[i].getChildByName("flyaction").getComponent(cc.Animation);

                _paiaction.node.active=true;
                _paiaction.play();
                _paiaction.on("finished", function () {
                    _paiaction.node.active=false;

                },this);
                _tempobj._active = true;
                // cc.log("进来 了");
                var _url="Image/pai/my/out/p" + collection[i];
               this._getImage(_url,_tempobj);
                if (collection[i] % 10 === 1 || collection[i] % 10 === 5 || collection[i] % 10 === 9) {
                    _tempobj.bird = true;

                } else {
                    _tempobj.bird = false;
                }
                continue;
            }
            _tempobj._active = false;


        }


    },
    _getImage:function (p_url,obj) {
        cc.loader.loadRes(p_url, cc.SpriteFrame, function (err, spriteFrame) {
            obj.bottompai = spriteFrame;
        });
    }

});
