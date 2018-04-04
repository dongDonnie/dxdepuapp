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
        youkeA: {
            default:null,
            type:cc.Label
        },
        youkeB: {
            default:null,
            type:cc.Label
        },
        youkeC: {
            default:null,
            type:cc.Label
        },
        youkeD: {
            default:null,
            type:cc.Label
        },
        jiesuanA: {
            default:null,
            type:cc.Label
        },
        jiesuanB: {
            default:null,
            type:cc.Label
        },
        jiesuanC: {
            default:null,
            type:cc.Label
        },
        jiesuanD: {
            default:null,
            type:cc.Label
        },
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item
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
        this.requesttscore();
    },

    //牌局分数
    requesttscore:function () {
        var _TID_temp = cc.MJ.data.getLocalStorage_roomID_zhanji();
        var tscoreData =  {
            "_Cmd": "tscore",
            "_Data": {
                "_TID": _TID_temp    //  牌局ID
            }
        }
        cc.MJ.socket.sendGetRequest(_TID_temp,null,this);
    },

    //注册事件
    initEvent:function () {
        require("EventConfig");
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;

        //牌局分数回调
        this.node.on(_eventList.roomplayerscore.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log("牌局分数回调成功");
                this.initialize(data.detail._Data);
            }else {
                cc.log(data.detail._EMsg);
            }
        });
    },

    initialize:function(obj) {
        var userobj=[];
        cc.log(obj._RoomPlayerCollection);
        var userlist=obj._RoomPlayerCollection;
        for(var i=0;i<userlist.length;i++){
            userobj.push(userlist[i]._PlayerID);
        }
        this.updateYoukeName(userlist);
        this.content.height = obj._RoomTableScoreCollection.length * (this.itemTemplates.height + this.spacing) + this.spacing;
        for(var i = 0; i < obj._RoomTableScoreCollection.length; ++i) {
            var item = cc.instantiate(this.itemTemplates);
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i+1));
            //更新数据
            item.getComponent('zhanjihuifangItem').updateItem(userobj, obj._RoomTableScoreCollection[i]);
            this.items.push(item);
        }
    },

    getPositionInView: function(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    clickbackBtn: function() {
        cc.MJ.common.ui.loadScene('standingsScene');
    },

    clickLookOther: function() {
        cc.log("查看他人");
    },

    //更新结算和游客姓名
    updateYoukeName: function(userlist) {
        cc.log(userlist[0]._WeChatInfo._Name);
        this.youkeA.string = userlist[0]._WeChatInfo._Name;
        this.youkeB.string =userlist[1]._WeChatInfo._Name;
        this.youkeC.string = userlist[2]._WeChatInfo._Name;
        this.youkeD.string =userlist[3]._WeChatInfo._Name;
        this.jiesuanA.string = userlist[0]._Score;
        this.jiesuanB.string = userlist[1]._Score;
        this.jiesuanC.string = userlist[2]._Score;
        this.jiesuanD.string =userlist[3]._Score;
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
                    var item = items[i].getComponent('zhanjihuifangItem');
                    var itemId = item.itemID - items.length;
                    item.updateItem(i, itemId);
                }
            }else  {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset );
                    var item = items[i].getComponent('zhanjihuifangItem');
                    var itemId = item.itemID + items.length;
                    item.updateItem(i, itemId);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
        // this.lblTotalItems.textKey = "Total Items: " + this.totalCount;
    },
});
