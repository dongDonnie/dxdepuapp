cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        rt:{
            "zhong":"",
            "default":"",
            "qiaoma":""
        }
    },

    // use this for initialization
    onLoad: function () {
        this.rt = {
            "zhong":"红中麻将",
            "default":"晃晃麻将",
            "qiaoma":"上海敲麻"
        };
        // this.initEvent();
    },

    // //房间玩家分数R
    // requestRpscore:function () {
    //     var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
    //     var rpscoreData = {
    //         "_Cmd": "rpscore",
    //         "_PID": _PID_temp,    //  玩家ID
    //         "_Data": {
    //         }
    //     };
    //     cc.MJ.socket.sendGetRequest(rpscoreData,null,null);
    //     cc.log("调用了111111");
    // },

    //初始化数据
    initialize:function (data) {
        this.addItem(data);
    },

    //添加子视图
    addItem:function (data) {
        var content = this.scrollView.content;
        var item = this.node.getChildByName("item");
        // var tempitem = cc.instantiate(item);
    //     var huifangBtn = item.getChildByName("huifangBtn");
        var count = 0;
        if (data.length != null) {
            count = data.length;
        }

        content.height = item.height * count + 10*(count-1)+70;
    //     var _EventList = [];
    //     cc.log("个数" + count);
    //     cc.log(data);
        for (var i = 0; i < count; i++) {
    //         var item = {
    //             _son: true,
    //             image: new cc.SpriteFrame(),
    //             timelabel: data[i]._RST,
    //             homeNum: this.rt[data[i]._RT] + " - " + data[i]._RNo,
    //             jushuNum: data[i]._TC + "局",
    //             fenshuNum: {
    //                 _son: true,
    //                 _color: new cc.Color(),
    //                 _string: data[i]._Score,
    //                 f_sprite: new cc.SpriteFrame(),
    //             },
    //             huifangBtn: {_son:true, _button:{_EventID:0 ,_EventData:data[i]._RID}}
    //         };
    //
    //         if (data[i]._Score > 0) {
    //             var color = new cc.Color();
    //             item.fenshuNum._color = color.fromHEX("#FEC534");
    //             item.fenshuNum.f_sprite = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_add");;
    //             item.image = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "share_win");
    //         } else {
    //             var color = new cc.Color();
    //             item.fenshuNum._color = color.fromHEX("#9CB1F0");
    //             item.fenshuNum.f_sprite = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_reduce");;
    //             item.image = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "share_lost");
    //         }
    //
    //         if (cc.isValid(item)) {
    //             cc.MJ.module.game.ZJ_allModule.content.push(item);
    //         } else {
    //             item.active = false;
    //         }
    //
    //         // cc.MJ.module.game.ZJ_allModule.content.push(item);
    //
            var temp_item = cc.instantiate(item);
            content.addChild(temp_item);
            this.updateItem(temp_item, data[i]);
        }
    //     var temp = {
    //         _targetObj: this.node,
    //         _targetName: "zj_all",
    //         _handlerName: "callback"
    //     };
    //     _EventList.push(temp);
    //     // cc.log("数据模型");
    //     // cc.log(cc.MJ.module.game.ZJ_allModule.content);
    //     cc.MJ.common.tool.bindData.bindArray(cc.MJ.module.game.ZJ_allModule.content,tempitem,content,_EventList);
    //     cc.MJ.common.tool.bindData.bindObjAndNode(cc.MJ.module.game.ZJ_allModule.content, content, _EventList);
    },

    //更新item数据
    updateItem:function (temp_item, obj) {
        var item = this.getUItemp(temp_item);
        if (obj._Score > 0) {
            item.image.spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "share_win");
            var temp_coldr = new cc.Color();
            item.fenshuNum.color = temp_coldr.fromHEX("#FEC534");
            item.f_sprite.spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_add");
        } else {
            item.image.spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "share_lost");
            var temp_coldr = new cc.Color();
            item.fenshuNum.color = temp_coldr.fromHEX("#d83232");
            item.f_sprite.spriteFrame = cc.MJ.common.resources.getSpriteFrameByName("ZJ_all", "integral_icon_reduce");
        }
        item.homeNum.string = this.rt[obj._RT] + " - " + obj._RNo;
        item.timelabel.string = obj._RST;
        item.jushuNum.string = obj._TC + "局";
        item.fenshuNum.getComponent(cc.Label).string = obj._Score;
        // item.homeNum.string = this.rt[data[i]._RT] + " - " + data[i]._RNo;


        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.handler = "callback";
        clickEventHandler.component = "zj_all";
        clickEventHandler.customEventData = obj._RID;
        var button = item.huifangBtn.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    //回放按钮点击事件
    callback:function (event,costomEventData) {
        // this.closeBtn();
        cc.MJ.data.setLocalStorage_roomID_zhanji(costomEventData);
        // this.node.active = false;
        this.node.emit('showzjroom');
        // var temp_zjlist = this.node.parent.getChildByName("ZJ_list");
        //cc.log(this.node);
        // temp_zjlist.getComponent("zj_list").requestTscore();
    },

    // 获取UI对象
    getUItemp:function (temp_item) {
        var item = {
            image : null,
            timelabel: null,
            homeNum: null,
            jushuNum: null,
            fenshuNum: null,
            f_sprite: null,
            huifangBtn: null
        };
        var imageSprite = temp_item.getChildByName("image").getComponent(cc.Sprite);
        item.image = imageSprite;

        var timelabel = temp_item.getChildByName("timelabel").getComponent(cc.Label);
        item.timelabel = timelabel;

        var homeNum = temp_item.getChildByName("homeNum").getComponent(cc.Label);
        item.homeNum = homeNum;

        var jushuNum = temp_item.getChildByName("jushuNum").getComponent(cc.Label);
        item.jushuNum = jushuNum;

        var fenshuNum = temp_item.getChildByName("fenshuNum");
        item.fenshuNum = fenshuNum;

        var f_sprite = temp_item.getChildByName("fenshuNum").getChildByName("f_sprite").getComponent(cc.Sprite);
        item.f_sprite = f_sprite;

        var huifangBtn = temp_item.getChildByName("huifangBtn");
        item.huifangBtn = huifangBtn;

        return item;
    },

    closeBtn: function () {
        this.node.emit('backHUD');
        this.scrollView.content.removeAllChildren(true);
        this.node.active = false;
    },

    // //注册事件
    // initEvent:function () {
    //     require("EventConfig");
    //     var _config = cc.MJ.data;
    //     var _eventList = _config.DataBackMap;
    //     _config.currentHandle = this.node;
    //     var self = this;
    //
    //     //房间玩家分数回调
    //     this.node.on(_eventList.rpscore.EventName, function (data) {
    //         if (data.detail._IsS) {
    //             cc.log("房间玩家分数回调成功");
    //             self.initialize(data.detail._Data);
    //         }else {
    //             cc.log(data.detail._EMsg);
    //             cc.MJ.alert.tips_msg(data.detail._EMsg);
    //         }
    //     });
    // },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
