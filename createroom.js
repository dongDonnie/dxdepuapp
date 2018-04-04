cc.Class({
    extends: cc.Component,
    properties: {
        
    },

    onLoad: function () {
        cc.MJ.common.action.showMoveInAction(this.node, this.node.parent, 0.3);
        this.pid = cc.MJ.data.getLocalStorage_LoginName();
    },

    createRoomBtn: function () {
        var data = {
            "_Cmd": "createroom",
            "_PID": this.pid,
            "_Data": {
                "_GOM": {
                    "roomtype": "landlord",//房间类型（landlord：斗地主，niuniu：牛牛，dezhou：德州扑克）
                    "playtype": "easy", //玩法（default：亲友场，easy：初级场，middle：中级场，high：高级场）
                    "mingold": 100, //门槛
                    "gametime": 30, //游戏时间（单位为分钟）
                    "playermingold": 200, //玩家最小带入金额（金币场使用）
                    "mintimes": 1, //基础倍数
                    "maxtimes": 16, //牌型封顶倍数
                }
            }
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
    },

    exitBtn: function () {
        // var joinroom = cc.instantiate(this.joinRoom);
        // joinroom.parent = this.node.parent;

        cc.MJ.common.action.showMoveOutAction(this.node, 0.3, true);
    },
});
