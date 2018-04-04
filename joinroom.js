cc.Class({
    extends: cc.Component,

    properties: {
        mygold: cc.Label,
        roomNum: cc.EditBox,
        createRoompre: cc.Prefab,

    },

    // use this for initialization
    onLoad: function () {
        cc.MJ.common.action.showMoveInAction(this.node, this.node.parent, 0.3);
        this.pid = cc.MJ.data.getLocalStorage_LoginName();
        this.info = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
        this.mygold.string = this.info._GC;
    },

    joinRoomBtn: function () {
        var data = {
            "_Cmd": "join",
            "_Data": {
                "_PID": this.pid,
                "_RNo": this.roomNum.string,
                "_GC": -1
            },
            "_PID": this.pid
        }
        cc.MJ.socket.sendGetRequest(data, null, null);
        cc.MJ.data.setLocalStorage_roomNo(this.roomNum.string);
    },

    createRoomBtn: function () {
        var createRoom = cc.instantiate(this.createRoompre);
        createRoom.parent = this.node.parent;

        // cc.MJ.common.action.showMoveOutAction(this.node, 0.3, true);
    },

    exitBtn: function () {
        var data = {
            "_Cmd": "gtype",
            "_PID": this.pid,
            "_Data": {
                "_RT": "landlord" //房间类型
            },
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
        cc.MJ.common.action.showMoveOutAction(this.node, 0.3, true);
    },
});
