cc.Class({
    extends: cc.Component,

    properties: {
        contentNode:cc.Node,
        shopItem:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        cc.MJ.common.action.showMoveInAction(this.node, this.node.parent, 0.3);
        this.pid = cc.MJ.data.getLocalStorage_LoginName();
    },

    init(data){
        this.contentNode.removeAllChildren();
        var _EventList = [{
            _targetObj: this.node, //事件所在节点
            _targetName: "shop", //事件所在脚本名称
            _handlerName: "bugGold" //事件名
        }]; //事件列表，用户动态绑定

        for (var i = 0; i < data._MallList.length; i++) {
            var item = cc.instantiate(this.shopItem);
            item.parent = this.contentNode;
            var _obj = cc.MJ.common.tool.bindData.getNodeObj(item);
            // _obj.notice_q._sprite = cc.MJ.common.ui.UrlLoadImage(data._MallList[i]._Url);
            // _obj.notice_q._button = { _EventData: "1212", _EventID: 0 };
            var tempdata = data._MallList[i];
            _obj.gold_coin_m = cc.MJ.common.ui.UrlLoadImage(tempdata.url);
            _obj.gold_count_m = tempdata.name;
            _obj.buy_btn_q._button = {_EventData: tempdata.id, _EventID: 0};
            _obj.buy_count_m = "￥" + tempdata.price;
            cc.MJ.common.tool.bindData.bindObjAndNode(_obj, item, _EventList);
        }
        
    },

    bugGold:function(event, customEventData){
        var data = {
            "_Cmd": "buy",
            "_PID": this.pid,
            "_Data": {
                "_GoodId": customEventData
            },
        };

        cc.MJ.socket.sendGetRequest(data, null, null);
    },
});
