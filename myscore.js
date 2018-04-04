cc.Class({
    extends: cc.Component,

    properties: {
        contents: cc.Node,
        recordItem: cc.Prefab,
        scoreItem: cc.Prefab,
        scoreDeatils: cc.Node,
        tips: cc.Label,
        roomNumber: cc.Label,
        from: cc.Label,
        total: cc.Label,
        host: cc.Label,
        type: cc.Label,
        hands: cc.Label,
        content2: cc.Node,
    },

    onLoad: function () {
        cc.MJ.common.action.showMoveInAction(this.node, this.node.parent, 0.3);
        this.myInfo = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
    },

    init: function (data) {
        this.contents.removeAllChildren();
        var _EventList = [{
            _targetObj: this.node, //事件所在节点
            _targetName: "myscore", //事件所在脚本名称
            _handlerName: "rpscores" //事件名
        }];
        for (let i = 0; i < data.length; i++) {
            var item = cc.instantiate(this.recordItem);
            item.parent = this.contents;
            var _obj = cc.MJ.common.tool.bindData.getNodeObj(item);
            _obj.click_q._button = { _EventData: data[i], _EventID: 0 };
            _obj.month_year_m = data[i]._RST;
            _obj.count_m = data[i]._Score;
            _obj.someone_plays_m = this.myInfo._Name + "的牌局";
            _obj.room_type_m = this.getRoomType(data[i]._PT);
            cc.MJ.common.tool.bindData.bindObjAndNode(_obj, item, _EventList);
        }
    },

    rpscores: function (event, eventData) {
        var data = {
            "_Cmd": "tscore",
            "_Data": {
                "_RID": eventData._RID
            },
            "_PID": 'gavin_test_001'
        }
        cc.MJ.socket.sendGetRequest(data, null, null);
    },

    tscoreBack: function (data) {
        cc.MJ.common.action.showMoveInAction(this.scoreDeatils, this.node, 0.3);

        this.tips.string = data.detail._Data._SGT + " 至 " + data.detail._Data._EGT + "(总时长：" + data.detail._Data._GT + "分钟）";
        this.roomNumber.string = data.detail._Data._RNo;
        this.type.string = data.detail._Data._RT;
        this.hands.string = data.detail._Data._TC;
        this.total.string = data.detail._Data._TG;
        this.host.string = data.detail._Data._MPN;

        var userList = data.detail._Data._TSL;
        this.content2.removeAllChildren();
        for (let i = 0; i < userList.length; i++) {
            let item = cc.instantiate(this.scoreItem);
            item.parent = this.content2;
            var _obj = cc.MJ.common.tool.bindData.getNodeObj(item);
            cc.MJ.common.tool.bindData.bindObjAndNode(_obj, item, null);
            if (userList[i]._PU != null) {
                cc.MJ.common.ui.UrlLoadImage(null, userList[i]._PU._IUrl, _obj.avatar_x);
                _obj.nickname_m = userList[i]._PU._Name;
            } else {
                cc.MJ.common.tool.UITool.buttonLoadImage(null, "dp/index/record_header_pic", _obj.avatar_x);
                _obj.nickname_m = "未知姓名";
            }
            _obj.brringin_m = userList[i]._PG;
            _obj.hands_m = userList[i]._SC;
            _obj.scroes_m = userList[i]._Score;
        }
    },

    getRoomType: function (pt) {
        var str = '';
        if (pt == 'easy') {
            str = "初级场";
        } else if (pt == 'middle') {
            str = "中级场";
        } else if (pt == 'high') {
            str = "高级场";
        } else if (pt == 'default') {
            str = "亲友场";
        }
        return str;
    },

    backMyScore: function () {
        cc.MJ.common.action.showMoveOutAction(this.scoreDeatils, 0.3);
    },

    backPersonalBtn: function () {
        cc.MJ.common.action.showMoveOutAction(this.node, 0.3, true);
        cc.find("Canvas/footMenu").active = true;
    },

});
