cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
            default: null,
            type: cc.ScrollView
        },

        wjNUm: [],

        isLoaded: null
    },

    // use this for initialization
    onLoad: function () {
        this.initEvent();
        // this.isLoaded = false;
        // this.requestTscore();
    },

    //添加子视图
    // addItem:function (data) {
    //     var content = this.scrollView.content;
    //     var item = this.node.getChildByName("item");
    //     var tempitem = cc.instantiate(item);
    //     var huifangBtn = item.getChildByName("huifangBtn");
    //
    //     var count = data.length;
    //
    //     content.height = item.height * count + 20*(count-1);
    //     var _EventList = [];
    //
    //     var spriteFrameAdd = new cc.SpriteFrame();
    //     spriteFrameAdd = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_add");
    //     var spriteFrameReduce = new cc.SpriteFrame();
    //     spriteFrameReduce = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_reduce");
    //
    //     for (var i = 0; i < count; i++) {
    //         var fenshu = [];
    //         var fsdata = data[i]._TSL;
    //
    //         for (var t = 0; t < this.wjNUm.length; t++) {
    //             for (var j = 0; j < fsdata.length; j++) {
    //                 if (fsdata[j]._PID === this.wjNUm[t]) {
    //                     fenshu.push(fsdata[j]._TS);
    //                     break;
    //                 }
    //             }
    //         }
    //         cc.log("分数数据");
    //         cc.log(fenshu);
    //         var color = new cc.Color();
    //         var item = {
    //             _son: true,
    //             js_label: data[i]._TN,
    //             wanjia1_label: {
    //                 _son: true,
    //                 _color: fenshu[0] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0"),
    //                 _string: fenshu[0],
    //                 f_sprite: fenshu[0] > 0 ? spriteFrameAdd : spriteFrameReduce,
    //             },
    //             wanjia2_label: {
    //                 _son: true,
    //                 _color: fenshu[1] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0"),
    //                 _string: fenshu[1],
    //                 f_sprite: fenshu[1] > 0 ? spriteFrameAdd : spriteFrameReduce,
    //             },
    //             wanjia3_label: {
    //                 _son: true,
    //                 _color: fenshu[2] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0"),
    //                 _string: fenshu[2],
    //                 f_sprite: fenshu[2] > 0 ? spriteFrameAdd : spriteFrameReduce,
    //             },
    //             wanjia4_label: {
    //                 _son: true,
    //                 _color: fenshu[3] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0"),
    //                 _string: fenshu[3],
    //                 f_sprite: fenshu[3] > 0 ? spriteFrameAdd : spriteFrameReduce,
    //             },
    //             huifangBtn: {_son:true, _button:{_EventID:0 ,_EventData:data[i]._TID}}
    //         };
    //         cc.MJ.module.game.ZJ_listModule.content.push(item);
    //         fenshu.length = 0;
    //     }
    //     var temp = {
    //         _targetObj: this.node,
    //         _targetName: "zj_list",
    //         _handlerName: "callback"
    //     };
    //     _EventList.push(temp);
    //     cc.MJ.common.tool.bindData.bindArray(cc.MJ.module.game.ZJ_listModule.content,tempitem,content,_EventList);
    // },

    //添加子视图
    addItem:function (data) {
        var content = this.scrollView.content;
        var item = this.node.getChildByName("item");
        var count = data.length;
        content.height = item.height * count + 20*(count-1);

        var spriteFrameAdd = new cc.SpriteFrame();
        spriteFrameAdd = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_add");
        var spriteFrameReduce = new cc.SpriteFrame();
        spriteFrameReduce = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_reduce");

        for (var i = 0; i < count; i++) {
            var fenshu = [];
            var fsdata = data[i]._TSL;

            for (var t = 0; t < this.wjNUm.length; t++) {
                for (var j = 0; j < fsdata.length; j++) {
                    if (fsdata[j]._PID === this.wjNUm[t]) {
                        fenshu.push(fsdata[j]._TS);
                        break;
                    }
                }
            }

            var tempitem = cc.instantiate(item);
            content.addChild(tempitem);
            var temp_item = this.getUItemp(tempitem)
            cc.log("分数数据");
            cc.log(fenshu);

            // var color = new cc.Color();

            temp_item.js_label.string = data[i]._TN;

            temp_item.wanjia1_label.getComponent(cc.Label).string = fenshu[0];
            if (fenshu[0] > 0) {
                this.updataLabelColor(temp_item.wanjia1_label, "#FEC534");
            }else {
                this.updataLabelColor(temp_item.wanjia1_label, "#d83232")
            }
            temp_item.f_sprite1.spriteFrame = fenshu[0] > 0 ? spriteFrameAdd : spriteFrameReduce;

            temp_item.wanjia2_label.getComponent(cc.Label).string = fenshu[1];
            if (fenshu[1] > 0) {
                this.updataLabelColor(temp_item.wanjia2_label, "#FEC534");
            }else {
                this.updataLabelColor(temp_item.wanjia2_label, "#d83232")
            }
            // temp_item.wanjia2_label.color = fenshu[1] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0");
            temp_item.f_sprite2.spriteFrame = fenshu[1] > 0 ? spriteFrameAdd : spriteFrameReduce;

            temp_item.wanjia3_label.getComponent(cc.Label).string = fenshu[2];
            if (fenshu[2] > 0) {
                this.updataLabelColor(temp_item.wanjia3_label, "#FEC534");
            }else {
                this.updataLabelColor(temp_item.wanjia3_label, "#d83232")
            }
            // temp_item.wanjia3_label.color = fenshu[2] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0");
            temp_item.f_sprite3.spriteFrame = fenshu[2] > 0 ? spriteFrameAdd : spriteFrameReduce;

            temp_item.wanjia4_label.getComponent(cc.Label).string = fenshu[3];
            if (fenshu[3] > 0) {
                this.updataLabelColor(temp_item.wanjia4_label, "#FEC534");
            }else {
                this.updataLabelColor(temp_item.wanjia4_label, "#d83232")
            }
            // temp_item.wanjia4_label.color = fenshu[3] > 0 ? color.fromHEX("#FEC534") : color.fromHEX("#9CB1F0");
            temp_item.f_sprite4.spriteFrame = fenshu[3] > 0 ? spriteFrameAdd : spriteFrameReduce;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.handler = "huifang";
            clickEventHandler.component = "zj_list";
            clickEventHandler.customEventData = data[i]._TID;
            var button = temp_item.huifangBtn.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);

            // fenshu.length = 0;
        }

    },

    updataLabelColor:function (tempLabel, color) {
        var temp_coldr = new cc.Color();
        tempLabel.color = temp_coldr.fromHEX(color);
    },

    huifang:function (event,costomEventData) {
        var tableNo = cc.sys.localStorage.setItem("table_ID",costomEventData);
        cc.MJ.common.ui.loadScene("gamehuifangScene");
    },

    // 获取UI对象
    getUItemp:function (temp_item) {
        var item = {
            js_label : null,
            wanjia1_label: null,
            f_sprite1:null,
            wanjia2_label: null,
            f_sprite2:null,
            wanjia3_label: null,
            f_sprite3:null,
            wanjia4_label: null,
            f_sprite4:null,
            huifangBtn: null
        };
        var js_label_temp = temp_item.getChildByName("js_label").getComponent(cc.Label);
        item.js_label = js_label_temp;

        var wanjia1_temp = temp_item.getChildByName("wanjia1_label");
        item.wanjia1_label = wanjia1_temp;
        var f_sprite1_temp = temp_item.getChildByName("wanjia1_label").getChildByName("f_sprite").getComponent(cc.Sprite);
        item.f_sprite1 = f_sprite1_temp;

        var wanjia2_temp = temp_item.getChildByName("wanjia2_label");
        item.wanjia2_label = wanjia2_temp;
        var f_sprite2_temp = temp_item.getChildByName("wanjia2_label").getChildByName("f_sprite").getComponent(cc.Sprite);
        item.f_sprite2 = f_sprite2_temp;

        var wanjia3_temp = temp_item.getChildByName("wanjia3_label");
        item.wanjia3_label = wanjia3_temp;
        var f_sprite3_temp = temp_item.getChildByName("wanjia3_label").getChildByName("f_sprite").getComponent(cc.Sprite);
        item.f_sprite3 = f_sprite3_temp;

        var wanjia4_temp = temp_item.getChildByName("wanjia4_label");
        item.wanjia4_label = wanjia4_temp;
        var f_sprite4_temp = temp_item.getChildByName("wanjia4_label").getChildByName("f_sprite").getComponent(cc.Sprite);
        item.f_sprite4 = f_sprite4_temp;

        var huifangBtn = temp_item.getChildByName("huifangBtn");
        item.huifangBtn = huifangBtn;

        return item;
    },

    addTitle:function (data) {

        var spriteFrameAdd = new cc.SpriteFrame();
        spriteFrameAdd = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_add");
        var spriteFrameReduce = new cc.SpriteFrame();
        spriteFrameReduce = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_reduce");

        for (var i = 0; i < data.length; i++) {
            var t = i + 1;
            var wanjiaName = "wj" + t + "_label";
            this.node.getChildByName("titleSprite").getChildByName(wanjiaName).getComponent(cc.Label).string = data[i]._WC._Name;
            this.wjNUm.push(data[i]._PID);

            var tempName = "wanjia" + t + "_label";
            var bottomWanjia = this.node.getChildByName("bottomSprite").getChildByName(tempName);
            bottomWanjia.getComponent(cc.Label).string = data[i]._Score;
            if (data[i]._Score > 0) {
                var color = new cc.Color();
                bottomWanjia.color = color.fromHEX("#FEC534");
                // bottomWanjia.getChildByName("f_sprite").getComponent(cc.Sprite).SpriteFrame = spriteFrameAdd;
            } else {
                var color = new cc.Color();
                bottomWanjia.color = color.fromHEX("#d83232");
                // cc.log(this.node.getChildByName("bottomSprite").getChildByName(tempName).getChildByName("f_sprite").getComponent(cc.Sprite));
                // this.node.getChildByName("bottomSprite").getChildByName(tempName).getChildByName("f_sprite").getComponent(cc.Sprite).srpiteFrame = spriteFrameReduce;
            }
        }
    },

    closeBtn: function () {
        // this.node.active = false;
        // cc.MJ.module.game.ZJ_listModule = null;
        // cc.MJ.module.game.ZJ_listModule.content.splice(0,cc.MJ.module.game.ZJ_listModule.content.length);//清空数组

        this.scrollView.content.removeAllChildren(true);
        this.node.active = false;
    },

    //初始化数据
    initialize: function (data) {
        this.scrollView.content.removeAllChildren(true);
        this.addTitle(data._TSL);
        this.addItem(data._RTSL);
    },

    //牌局分数R
    requestTscore:function () {

        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;

        var _RID_temp = cc.MJ.data.getLocalStorage_roomID_zhanji();
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var rpscoreData = {
            "_Cmd": "tscore",
            "_PID": _PID_temp,
            "_Data": {
                "_RID":_RID_temp
            }
        };
        cc.MJ.socket.sendGetRequest(rpscoreData,null,null);
    },

    //注册事件
    initEvent:function () {
        // require("EventConfig");
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;
        // var self = this;
        //
        // //房间玩家分数回调
        // this.node.on(_eventList.tscore.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("牌局分数回调成功");
        //         self.initialize(data.detail._Data);
        //     }else {
        //         cc.log(data.detail._EMsg);
        //         cc.MJ.alert.tips_msg(data.detail._EMsg);
        //     }
        // });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
