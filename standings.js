cc.Class({
    extends: cc.Component,

    properties: {
        //scrollView 子元素
        itemTemplates: {
            default:null,
            type:cc.Node
        },
        //scrollView
        scrollView: {
            default:null,
            type:cc.ScrollView
        },
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item  10
        bufferZone: 0, // when item is away from bufferZone, we relocate it
    },

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;
        this.items = [];
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this.initEvent();
        this.requestRpscore();

        var obj = [
            {
                "_TC":2,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"346132",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":245    //  玩家在房间游戏的总得分
            },
            {
                "_TC":4,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"328834",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":245    //  玩家在房间游戏的总得分

            },
            {
                "_TC":6,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"123456",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":245    //  玩家在房间游戏的总得分

            },
            {
                "_TC":8,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"329234",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":-100    //  玩家在房间游戏的总得分

            },
            {
                "_TC":8,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"329234",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":245    //  玩家在房间游戏的总得分

            },
            {
                "_TC":8,    //  总共几盘
                "_RID":"LJASFOUOWRJNKKSAFKLA",    //  牌局ID
                "_RNo":"329234",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":-100    //  玩家在房间游戏的总得分

            },
            {
                "_TC":8,    //  总共几盘
                "_RID":"",    //  牌局ID
                "_RNo":"329234",    //  房间号
                "_RST":"2017-06-23",    //  房间开始时间
                "_Score":245    //  玩家在房间游戏的总得分

            },
        ];
        // cc.MJ.module.Game.zhanjiModule.content = obj;
        // this.initialize(obj);
    },

    //房间玩家分数R
    requestRpscore:function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var rpscoreData = {
            "_Cmd": "rpscore",
            "_PID": _PID_temp,    //  玩家ID
            "_Data": {

            }
        }
    },

    //设置image
    setImage: function (url, i) {
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            cc.MJ.module.Game.zhanjiModule.content[i].image = spriteFrame;
        });
    },

    //初始化数据
    initialize:function(obj) {
        // var Global_CommonModule = function (p_btn) {
        //     this._son = true;
        //     this._sprite = new cc.SpriteFrame();
        //
        //     this._active = false;
        //
        //     var _btn = {_EventData: "0", _EventID: 0};
        //     this._button = p_btn || _btn;
        //     return this;
        // };

        this.content.height = obj.length * (this.itemTemplates.height + this.spacing) + this.spacing;
        for(var i = 0; i < obj.length; ++i) {
            var item = {
                _son: true,
                image: new cc.SpriteFrame(),
                timelabel: obj[i]._RST,
                homeNumber: obj[i]._RNo,
                jushuNum: obj[i]._TC,
                fenshuNum: obj[i]._Score,
                huifangBtn: new Global_CommonModule({_EventData: obj[i]._RID, _EventID:i})
                // huifangBtn: new Global_CommonModule({_EventData: obj[i]._RID, _EventID:i})
            };
            cc.MJ.module.Game.zhanjiModule.content.push(item);
        }
        cc.MJ.common.tool.MJTool.bindData.bindArray(cc.MJ.module.Game.zhanjiModule.content,this.itemTemplates,this.content);

        // for(var i = 0; i < obj.length; ++i) {
        //     var url =  obj[i]._Score < 0 ? "Image/lose" : "Image/win";
        //     this.setImage(url,i);
        //
        //     var btn = cc.MJ.module.Game.zhanjiModule.content[i].huifangBtn._button;
        //     btn.on(cc.Node.EventType.TOUCH_START, function (event) {
        //         cc.log("--------点击了" + event);
        //     });
        // }
    },

    getPositionInView: function(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    //注册事件
    initEvent:function () {
        require("EventConfig");
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;

        //房间玩家分数回调
        this.node.on(_eventList.rpscore.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("房间玩家分数回调成功");
                // this.initialize(data.detail._Data._PSL);
            }else {
                cc.log(data.detail._EMsg);
            }
        });
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY;
        var offset = (this.itemTemplates.height + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset);
                    var item = items[i].getComponent('zhanjiItem');
                    var itemId = item.itemID - items.length;
                    item.updateItem(i, itemId);
                }
            }else  {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset );
                    var item = items[i].getComponent('zhanjiItem');
                    var itemId = item.itemID + items.length;
                    item.updateItem(i, itemId);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    },

    //返回按钮
    clickfanhuiBtn:function() {
        cc.MJ.common.ui.loadScene('chooseScene')
    },
});
