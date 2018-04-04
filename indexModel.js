cc.Class({
    extends: cc.Component,

    properties: {
        pidArray: null,
    },

    onLoad: function () {
    },

    setRankingListByData: function (data) {
        var item = this.node.getChildByName("centerNode").getChildByName("advertising").getChildByName("item");
        var count = data._PCL.length;
        var scrollviewNode = this.node.getChildByName("centerNode").getChildByName("advertising").getChildByName("ScrollView");
        var content = scrollviewNode.getChildByName("view").getChildByName("content");
        content.height = item.height * count;
        for (var i = 0; i < count; i++) {
            var dataModel = data._PCL[i];
            var tempItem = cc.instantiate(item);
            if (i < 3) {
                var t = i + 1;
                tempItem.getChildByName("rankingImage").active = true;
                tempItem.getChildByName("rankingImage").getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ph", "rank0" + t);
                tempItem.getChildByName("rankingLabel").active = false;
            } else {
                tempItem.getChildByName("rankingImage").active = false;
                tempItem.getChildByName("rankingLabel").active = true;
                var str = i + 1;
                tempItem.getChildByName("rankingLabel").getComponent(cc.Label).string = str;
            }
            tempItem.getChildByName("userName").getComponent(cc.Label).string = dataModel._WC._Name;
            var userImage = tempItem.getChildByName("mask").getChildByName("userImage");
            cc.MJ.common.ui.UrlLoadImage(userImage, dataModel._WC._IUrl);
            tempItem.getChildByName("cardNum").getComponent(cc.Label).string = dataModel._CCC;
            content.addChild(tempItem);
        }
        //设置自己的排行
        var _myItem = this.node.getChildByName("centerNode").getChildByName("advertising").getChildByName("myItem");
        if (data._R > 3) {
            _myItem.getChildByName("rankingImage").active = false;
            _myItem.getChildByName("rankingLabel").active = true;
            _myItem.getChildByName("rankingLabel").getComponent(cc.Label).string = data._R > 50 ? "未入榜" : data._R;
        } else {
            _myItem.getChildByName("rankingImage").active = true;
            _myItem.getChildByName("rankingImage").getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ph", "rank0" + data._R);
            _myItem.getChildByName("rankingLabel").active = false;
        }
        _myItem.getChildByName("userName").getComponent(cc.Label).string = data._WC._Name;
        var userImage = _myItem.getChildByName("mask").getChildByName("userImage");
        cc.MJ.common.ui.UrlLoadImage(userImage, data._WC._IUrl);
        _myItem.getChildByName("cardNum").getComponent(cc.Label).string = data._CCC;
    },

    zjRoomData: function (obj) {
        if (obj._Data) {
            this.addZJRoomItem(obj._Data);
        } else {
            cc.MJ.alert.tips_msg("当前玩家暂无战绩");
        }

    },
    addZJRoomItem: function (data) {
        var zjRoom = this.node.getChildByName("AlertNode").getChildByName("zjRoom");
        var content = zjRoom.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
        var item = zjRoom.getChildByName("item");
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tempItem = cc.instantiate(item);
            content.addChild(tempItem);
            var resultimage = "share_win";
            var labelColor = new cc.Color();
            labelColor = cc.hexToColor("#F6FBA7");
            if (itemData._Score < 0) {
                resultimage = "share_lost";
                labelColor = cc.hexToColor("#9cb1f0");
            }
            tempItem.getChildByName("timeLabel").color = labelColor;
            tempItem.getChildByName("roomNumberLabel").color = labelColor;
            tempItem.getChildByName("inningLabel").color = labelColor;
            tempItem.getChildByName("scoreLabel").color = labelColor;
            tempItem.getChildByName("resultImage").getComponent(cc.Sprite).spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("zjAll", resultimage);
            tempItem.getChildByName("timeLabel").getComponent(cc.Label).string = itemData._RST;
            tempItem.getChildByName("roomNumberLabel").getComponent(cc.Label).string = itemData._RNo;
            tempItem.getChildByName("inningLabel").getComponent(cc.Label).string = itemData._TC + "局";
            tempItem.getChildByName("scoreLabel").getComponent(cc.Label).string = itemData._Score > 0 ? "+" + itemData._Score : itemData._Score;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "indexModel";//这个是代码文件名
            clickEventHandler.handler = "detailCallBack";
            clickEventHandler.customEventData = itemData._RID;

            var button = tempItem.getChildByName("detailBtn").getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    },
    detailCallBack: function (event, customEventData) {
        // console.log("绑定的data", customEventData);
        this.showZjDetail(customEventData);
    },

    zjDetailData: function (obj) {
        // console.log("更新战绩详情");
        this.pidArray = [];
        var zjDetail = this.node.getChildByName("AlertNode").getChildByName("zjDetail");
        var titleLabel = zjDetail.getChildByName("labelSprite");
        var bottomLabel = zjDetail.getChildByName("bottom");
        for (var i = 0; i < obj._Data._TSL.length; i++) {
            var tslData = obj._Data._TSL[i];
            titleLabel.getChildByName("player" + (i + 1)).getComponent(cc.Label).string = tslData._WC._Name;
            bottomLabel.getChildByName("allLabel" + (i + 1)).getComponent(cc.Label).string = tslData._Score;
            this.pidArray.push(tslData._PID);
        }
        this.addZJDetailItem(obj._Data._RTSL);
    },
    addZJDetailItem: function (data) {
        var zjDetail = this.node.getChildByName("AlertNode").getChildByName("zjDetail");
        var content = zjDetail.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
        content.removeAllChildren(true);
        var item = zjDetail.getChildByName("item");
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tempItem = cc.instantiate(item);
            content.addChild(tempItem);
            tempItem.getChildByName("inningsLabel").getComponent(cc.Label).string = itemData._TN;
            var tslArray = ["", "", "", "", ""];
            for (var t = 0; t < this.pidArray.length; t++) {
                for (var j = 0; j < itemData._TSL.length; j++) {
                    if (itemData._TSL[j]._PID === this.pidArray[t]) {
                        tslArray.splice(t, 1, itemData._TSL[j]._TS);
                    }
                }
            }
            this.updateZJDetailScore(tslArray, tempItem);
        }
    },
    addZJDetailItem: function (data) {
        var zjDetail = this.node.getChildByName("AlertNode").getChildByName("zjDetail");
        var content = zjDetail.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
        content.removeAllChildren(true);
        var item = zjDetail.getChildByName("item");
        for (var i = 0; i < data.length; i++) {
            var itemData = data[i];
            var tempItem = cc.instantiate(item);
            content.addChild(tempItem);
            tempItem.getChildByName("inningsLabel").getComponent(cc.Label).string = itemData._TN;
            var tslArray = ["", "", "", "", ""];
            for (var t = 0; t < this.pidArray.length; t++) {
                for (var j = 0; j < itemData._TSL.length; j++) {
                    if (itemData._TSL[j]._PID === this.pidArray[t]) {
                        tslArray.splice(t, 1, itemData._TSL[j]._TS);
                    }
                }
            }
            this.updateZJDetailScore(tslArray, tempItem);
        }
    },
    updateZJDetailScore: function (scoreAry, item) {
        // console.log("更新每局的分数");
        // console.log(scoreAry);
        for (var i = 0; i < 4; i++) {
            item.getChildByName("score" + (i + 1)).getComponent(cc.Label).string = scoreAry[i];
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
