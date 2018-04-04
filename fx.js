cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },

    //分享到聊天界面
    shareSessionBtn:function () {

        cc.MJ.common.jsb.weiChatShareWebViewWXSceneSession("");
    },

    //分享到朋友圈
    shareTimelineBtn:function () {
        cc.MJ.common.jsb.weiChatShareWebViewWXSceneTimeline();
    },

    closeBtn: function () {
        this.node.active = false;
        this.node.emit('backHUD');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
