/**
 * Created by hxl on 2017/7/9.
 */
cc.Class({
    extends: cc.Component,
    properties: {
        playerNum: null, //玩家人数
        fangzhuType: null, // 是否是房主
        roomObj: null
    },
    ctor: function () {
        this.youTurn = {
            turn1: "head_travel",
            turn2: "two_tour",
            turn3: "three_tour"
        }
    },

    init: function (p_obj, p_room) {
        this.roomObj = p_room;
        if (p_obj._IsSG) {
            this.roomObj.game._active = true;
        } else {
            this.roomObj.game._active = false;
        }
        this.initGameMessage(p_obj);
        this.initPlayers(p_obj._PSL);
        this.playerNum = p_obj._PSL.length;
        if (p_obj._MPSNo === 0) {
            this.fangzhuType = true;
        } else {
            this.fangzhuType = false;
        }
        if (this.playerNum === 4 && this.fangzhuType) {
            //this.roomObj.setBtnNode.startBtn = true;
        } else {
            //this.roomObj.setBtnNode.startBtn = false;
        }
    },

    initGameMessage: function (obj) {
        this.roomObj.gameMessage.tableMessage.roomLabel = "房间号:" + obj._RNo;
        this.roomObj.gameMessage.tableMessage.inningLabel = "第" + obj._TN + "/" + obj._GOM.count + "局";
        var _playtype = obj._GOM.playtype === "default" ? "4王玩法  " : "8王玩法  ";
        var _bomb = obj._GOM.bomb === "" ? "" : obj._GOM.bomb + "  升级  ";
        var _bous = obj._GOM.bonus === "0" ? "赢分不加倍  " : "赢分加倍  ";
        this.roomObj.gameMessage.tableMessage.playTypeLabel = _playtype + _bomb + _bous + " 废王罚款 可以出顺子,2连对,3带2  ";
        this.weiChatShareMessage = this.roomObj.gameMessage.tableMessage.playTypeLabel;
        this.roomCount = obj._GOM.count;
        this._roomNo = obj._RNo;
    },

    initPlayers: function (obj) {
        this.roomObj.game.jiao = false;
        this.roomObj.game.btnlayout._active = false;
        this.setPlayerNum(obj.length);

    },

    setPlayerModel: function (obj, isfangzhu, p_obj) {
        //var headImage = playerModel.getChildByName("headImage");
        // cc.MJ.common.tool.UITool.UrlLoadImageforBind(obj._WC._IUrl, playerModel.headImage);
        var playerNum = "Player" + (obj._SNo);
        var playerModel = this.roomObj.players[playerNum];
        playerModel._active = true;
        cc.loader.load(obj._WC._IUrl, function (err, texture) {
            var frame = new cc.SpriteFrame(texture);
            playerModel.headImage = frame;
        });

        this.setTurn(obj, playerModel);

        playerModel.name = obj._WC._Name;
        playerModel.score = obj._Score;
        playerModel.jiang.jianglabel = obj._AwardScore;
        playerModel.jian.jianLabel = obj._PlayerScore;

        // playerModel.zhuang = isfangzhu;
        playerModel.fangzhu = isfangzhu;
        this.setZhuang(p_obj, playerModel, obj._SNo);

    },
    setZhuang: function (p_obj, playerModel, _seat_no) {
        var _zhuang = this.getZhuang(p_obj, _seat_no);
        playerModel.partner = _zhuang.ispartner;
        playerModel.dozen = _zhuang.isdozen;
        playerModel.zhuang = p_obj._BankerSeatNo === _seat_no;
    },
    setBasicUser: function () {
        //todo 待统一字段名称后优化,提高复用性
    },
    setAllfen: function (p_obj) {
        for (var i = 0; i < p_obj.length; i++) {
            this.setfen(p_obj[i]);
        }

    }
    , setfen: function (p_obj) {
        var playerNum = "Player" + (p_obj._SNo);
        var playerModel = this.roomObj.players[playerNum];
        playerModel.jiang.jianglabel = p_obj._AS;
        playerModel.jian.jianLabel = p_obj._PS;
        playerModel.score = p_obj._Score;
    },
    setTurn: function (p_obj, playerModel) {
        if (p_obj._WinNo !== 0) {
            var _turn = this.youTurn["turn" + p_obj._WinNo];
            var _sprite = cc.MJ.common.resources.getSpriteFrameByName("gamejiesuan", _turn);
            console.log(p_obj._WinNo);
            console.log(_sprite);
            playerModel.turn._sprite = _sprite;
            playerModel.turn._active = true;
        } else {
            playerModel.turn._sprite = new cc.SpriteFrame();
            playerModel.turn._active = false;
        }
    }, setScore: function (p_obj, p_sno) {
        if (p_sno !== null) {

            var playerNum = "Player" + (p_sno);
            var playerModel = this.roomObj.players[playerNum];
            // this.setfen(p_obj);
            this.setTurn(p_obj, playerModel);

            this.setZhuang(p_obj, playerModel, p_sno);
        }

    },
    getZhuang: function (p_obj, _seat_NO) {
        var isdozen = p_obj._BankerSeatNo === p_obj._FriendSeatNo && p_obj._FriendSeatNo === _seat_NO;
        var ispartner = p_obj._BankerSeatNo !== p_obj._FriendSeatNo && (p_obj._FriendSeatNo === _seat_NO || p_obj._BankerSeatNo === _seat_NO);
        return {isdozen: isdozen, ispartner: ispartner};
    },

    //玩家增减量
    pSeatPlayer: function (obj) {
        var playerNum = "Player" + (obj._Data._SNo);
        var playerModel = this.roomObj.players[playerNum];
        if (obj._Data._Fg) {
            playerModel._active = true;
            playerModel.name = obj._Data._WC._Name;
            playerModel.score = "0";
            playerModel.jiang.jianglabel = "0";
            playerModel.jian.jianLabel = "0";
            cc.loader.load(obj._Data._WC._IUrl, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                playerModel.headImage = frame;
            });
            playerModel.zhuang = false;
            playerModel.turn._active = false;
            playerModel.fangzhu = false;
            playerModel.dozen = false;
            playerModel.partner = false;
            //this.setPlayerModel(obj._Data, playerModel, false);
            this.setPlayerNum(1);
        } else {
            // playerModel.headImage = cc.MJ.common.resources.getSpriteFrameByName("gameAtlas","noHead_pic");

            playerModel._active = false;
            playerModel.name = "等待入座";
            playerModel.score = "0";
            playerModel.jiang.jianglabel = "0";
            playerModel.jian.jianLabel = "0";
            this.roomObj.readylayout["ready" + obj._Data._SNo] = false;
            if (playerModel.fangzhu) {
                cc.MJ.common.ui.loadScene("indexScene");
            }
            this.setPlayerNum(-1);
        }
    },

    //玩家人数监听
    setPlayerNum: function (num) {
        this.playerNum += num;
        if (this.playerNum >= 4) {
            this.roomObj.setBtnNode.invitebtn = false;
        } else {
            this.roomObj.setBtnNode.invitebtn = true;
        }
    },

    // initZhuangAndSocreAndNiu:function () {
    //     console.log("调用了初始化方法");
    //     for (var i = 1; i < 6; i++) {
    //         // var isfangzhu = false;
    //         // if (mpsno === obj[i]._SNo) {
    //         //     isfangzhu = true;
    //         // }
    //         var playerNum = "Player" + i;
    //         this.node.getChildByName("players").getChildByName(playerNum).getChildByName("zhuangSprite").active = false;
    //
    //         var scoreNum = "score" + i;
    //         this.node.getChildByName("startGame").getChildByName("score").getChildByName(scoreNum).active = false;
    //
    //         var niuNumModel = this.node.getChildByName("startGame").getChildByName("niu").getChildByName("niuNum");
    //         niuNumModel.getChildByName("niuNumbg" + i).active = false;
    //     }
    // },
    // initAll:function () {
    //     this.initZhuangAndSocreAndNiu();
    // }

});