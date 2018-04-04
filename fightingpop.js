cc.Class({
    extends: cc.Component,

    properties: {
        playlist: cc.Node,
        visitorTitle: cc.Label,
        visitorlist: cc.Node,
    },

    init: function (data) {
        var warlist = data.detail._Data._WarList;
        for (let i = 0; i < warlist.length; i++) {
            this.playlist.children[i].active = true;
            this.playlist.children[i].getChildByName('nickname').getComponent(cc.Label).string = warlist[i]._Name;
            this.playlist.children[i].getChildByName('bringin').getComponent(cc.Label).string = warlist[i]._GC;
            this.playlist.children[i].getChildByName('hand_count').getComponent(cc.Label).string = warlist[i]._Num;
            this.playlist.children[i].getChildByName('game_state').getComponent(cc.Label).string = warlist[i]._Score;
        }
        // for (let i = 0; i < data.detail._Data.length; i++) {
        //     this.visitorlist[i].active = true;
        //     this.visitorlist[i].getChildByName('nickname').getComponent(cc.Label).string = 'name' + i;
        //     cc.MJ.common.ui.UrlLoadImage(this.visitorlist[i].getChildByName('avatar'), data.detail._Data);
        // }
        // this.visitorTitle.string = "围观群众（ "+data+" ）";
    },

    init2: function (data) {
        var waitlist = data.detail._Data._WaitList;
        for (let i = 0; i < waitlist.length; i++) {
            this.visitorlist.children[i].active = true;
            this.visitorlist.children[i].getChildByName('nickname').getComponent(cc.Label).string = waitlist[i]._Name;
            cc.MJ.common.ui.UrlLoadImage(this.visitorlist.children[i].getChildByName('avatar'), waitlist[i]._Url);
        }
        this.visitorTitle.string = "围观群众（ " + waitlist.length + " ）";
    },

    onLoad: function () {
        cc.MJ.common.action.showMoveInAction(this.node, this.node.parent, 0.3);

    },

    exitPanel: function () {
        cc.MJ.common.action.showRMoveOutAction(this.node, 0.3, true);
    },
});
