cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },

    closeBtn: function () {
        this.node.active = false;
        this.node.emit('backHUD');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
