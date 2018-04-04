cc.Class({
    extends: cc.Component,

    properties: {
        image: {
            default: null,
            type: cc.Sprite
        },
        timeLable: {
            default: null,
            type: cc.Label
        },
        homeLabel: {
            default: null,
            type: cc.Label
        },
        jushuLabel: {
            default: null,
            type: cc.Label
        },
        fengshuLabel: {
            default: null,
            type: cc.Label
        },
        itemID: 0
    },

    // use this for initialization
    onLoad: function () {

    },
setroomID:function (obj) {
    cc.sys.localStorage.setItem('RoomID_zhanji', loginname);
},
    updateItem: function (itemId, obj) {

        this.itemID = itemId;
        this.timeLable.string = obj._RoomStartTime;
        this.homeLabel.string = obj._RoomNo;
        this.jushuLabel.string = obj._TableCount;
        this.fengshuLabel.string = obj._Score;

        var loginname=cc.sys.localStorage.getItem('loginname');
        this.node.getChildByName("huifangBtn").on('touchend', function () {
            cc.MJ.data.setLocalStorage_roomID_zhanji(obj._RoomID);
            cc.MJ.common.ui.loadScene('zhanjihuifangScene');
        }, this);
        this.imageLoadImage(this.image, obj._Score < 0 ? "Image/lose" : "Image/win")
    },

    //加载输赢图标
    imageLoadImage: function (btn, url) {
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            var sprite = btn.getComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
