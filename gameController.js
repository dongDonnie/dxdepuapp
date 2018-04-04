cc.Class({
    extends: require("BaseGame"),

    properties: {
        poker: {
            default: null,
            type: cc.Node
        },
    },
    // use this for initialization
    onLoad: function () {
        // this.gameCount = 0;
        // this.qzBtnisCheck = false;
        // this.yBtnisCheck = false;
        // this.niuBtnisCheck = false;
        // this.gameEnd = false;
        //this.RoomModel = cc.MJ.common.tool.bindData.deepCopy(cc.MJ.module.game.RoomModule);
        //牌

        // console.log(cc.sys.localStorage.getItem("test"));
        this.cards = this.poker.children;
        // console.log(this.cards);
        // //牌初始位置
        this.cardInitY = this.cards[0].y;

        //触摸选择到的牌
        this.touchedCards = [];

        //选中的牌
        this.selectedCards = [];

        this.selectedPai = [];

        //当前选中的理牌
        this.liARR = [];

        this.select_Arr_index = [];

        //当前所有理好的理牌
        this.liARR_All = [];
        this.liARR_All_obj = [];

        this.colorArr = [];

        this.AnimationCode =
            {
                ld: "liandui",
                zd: "bombNode",
                wsk: "510K",
                cs: "shunzi",
                fj: "planeTitle",
                wz: "kingBombNode",
                wk: "wasteKing",
                // sded:"",
                // sdelt:"",
                fjdpd: "planeTitle",
                fjdplt: "planeTitle"

            }
        ;

        this.RoomModel = cc.MJ.module.game.RoomModule;
        this.RoomModel.jiesan._active = false;
        this.RoomModel.alert.end._active = false;
        this.RoomModel.alert.dj._active = false;
        this.RoomModel.game.tanlayout._active = false;
        for (var k = 0; k < 4; k++) {
            this.RoomModel.players["Player" + k].headImage = cc.MJ.common.resources.getSpriteFrameByName("game", "game_head_pic");
        }
        var _EventList = [
            {
                _targetObj: this.node,
                _targetName: "gameController",
                _handlerName: "PaiEvent"
            }
        ];
        cc.MJ.common.tool.bindData.unbindAllObj(this.RoomModel);
        cc.MJ.common.tool.bindData.bindObjAndNode(this.RoomModel, this.node, null);
        // console.log(this.RoomModel.game);
        this.initEvent();
        // this.requestSeat();
        this.requestCMD("room");
        // function testNum() {
        //     cc.MJ.socket.closeConnect();
        // }
        // cc.director.getScheduler().schedule(testNum, this, 12, cc.macro.REPEAT_FOREVER, 0, false);
        //
        //
        var obj = {
            "_Cmd": "room",
            "_Data": {
                "_RNo": "641853",
                "_TN": 1,
                "_MPID": "60006273",
                "_Step": 5,
                "_IsEG": false,
                "_IsSG": true,
                "_GOM": {"playtype": "default", "count": "4"},
                "_PSL": [{
                    "_SNo": 0,
                    "_CCL": [72, 34, 7, 32, 75, 3, 48, 34, 47, 17, 6, 67, 4, 49, 7, 72, 10, 45, 25, 70, 55, 27, 29, 73, 31, 26, 32],
                    "_Score": 0,
                    "_IsW": false,
                    "_VC": ["cp"],
                    "_WC": {
                        "_PID": "60006273",
                        "_Name": "h41578",
                        "_Gender": "女",
                        "_IUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u\u003d1048029575,162408559\u0026fm\u003d26\u0026gp\u003d0.jpg",
                        "_GC": 0
                    },
                    "_IsN": true,
                    "_CCC": 27,
                    "_WinNo": 0,
                    "_AwardScore": 0,
                    "_PenaltyScore": 0,
                    "_DL": [75, 35, 48],
                    "_ShapeType": ""
                }, {
                    "_SNo": 1,
                    "_CCL": [54, 51, 13, 65, 31, 24, 64, 11, 53, 35, 33, 49, 74, 71, 68, 5, 12, 33, 45, 43, 9, 70, 24, 14, 17, 6, 12],
                    "_Score": 0,
                    "_IsW": false,
                    "_VC": [],
                    "_WC": {
                        "_PID": "14006374",
                        "_Name": "h98677",
                        "_Gender": "女",
                        "_IUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u\u003d1048029575,162408559\u0026fm\u003d26\u0026gp\u003d0.jpg",
                        "_GC": 0
                    },
                    "_IsN": true,
                    "_CCC": 27,
                    "_WinNo": 0,
                    "_AwardScore": 0,
                    "_PenaltyScore": 0,
                    "_DL": [],
                    "_ShapeType": ""
                }, {
                    "_SNo": 2,
                    "_CCL": [28, 46, 54, 35, 68, 46, 44, 74, 53, 67, 9, 66, 71, 55, 4, 52, 10, 50, 8, 14, 75, 30, 65, 43, 47, 28, 16],
                    "_Score": 0,
                    "_IsW": false,
                    "_VC": ["cp"],
                    "_WC": {
                        "_PID": "53006575",
                        "_Name": "h53873",
                        "_Gender": "女",
                        "_IUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u\u003d1048029575,162408559\u0026fm\u003d26\u0026gp\u003d0.jpg",
                        "_GC": 0
                    },
                    "_IsN": true,
                    "_CCC": 27,
                    "_WinNo": 0,
                    "_AwardScore": 0,
                    "_PenaltyScore": 0,
                    "_DL": [],
                    "_ShapeType": ""
                }, {
                    "_SNo": 3,
                    "_CCL": [66, 27, 44, 30, 29, 48, 5, 64, 11, 51, 69, 63, 69, 15, 50, 13, 25, 3, 8, 23, 26, 73, 23, 16, 52, 63, 15],
                    "_Score": 0,
                    "_IsW": false,
                    "_VC": [],
                    "_WC": {
                        "_PID": "33006376",
                        "_Name": "h48492",
                        "_Gender": "女",
                        "_IUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u\u003d1048029575,162408559\u0026fm\u003d26\u0026gp\u003d0.jpg",
                        "_GC": 0
                    },
                    "_IsN": true,
                    "_CCC": 27,
                    "_WinNo": 0,
                    "_AwardScore": 0,
                    "_PenaltyScore": 0,
                    "_DL": [],
                    "_ShapeType": ""
                }],
                "_BankerSeatNo": 1,
                "_IsR": true,
                "_TET": null,
                "_MPSNo": 3,
                "_FriendSeatNo": null,
                "_TS": 0
            },
            "_NSID": "1b3c20d7-6669-4003-ab03-e08e605a6def",
            "_EMsg": null,
            "_IsS": true,
            "_PID": "60006273"
        };
        //
        //  this.init(obj._Data, this.RoomModel);
        //
        // this.zj("");
        this.loginname = cc.MJ.data.getLocalStorage_LoginName();
        this.paixuFlag = true;
        this.talkbtn = true;
        this.weiChatShareMessage = "";
        // this.RoomModel.game._active=true;
        // this.paiActionfunc();
        // var _finger_postion = this.node.getChildByName("game").getChildByName("players").getChildByName("Player0");
        //
        // var action1 = cc.moveTo(1, cc.p(0, 50));
        // var action2 = cc.moveTo(1, cc.p(0, 30));
        // var seq = cc.sequence(action1, action2);
        // // _finger_postion.stopAllActions();
        // _finger_postion.runAction(cc.repeatForever(seq));

    },
    //注册事件
    initEvent: function () {
        require("EventConfig");
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;
        //判断是否为下一步
        function isNextStep(data) {
            if (data.detail._Data) {
                var _step = cc.sys.localStorage.getItem("_Step");
                if ((parseInt(_step) + 1) === data.detail._Data._Step && parseInt(_step) !== 0) {
                    cc.sys.localStorage.setItem("_Step", data.detail._Data._Step);
                    cc.sys.localStorage.setItem("ComfirmFlag", true);
                    return true;

                }


            }
            cc.sys.localStorage.setItem("ComfirmFlag", false);
            return false;
        }

        //玩家入座
        this.node.on(_eventList.room.EventName, function (data) {
            // var _flag = isNextStep(data);
            if (data.detail._IsS) {
                console.log("玩家入座成功");
                if (data.detail._Data._Step === 1) {
                    cc.MJ.common.sound.playSoud("sound_start");
                    self.RoomModel.game.inpai._active = false;
                    self.paiActionfunc();

                }
                cc.sys.localStorage.setItem("_Step", data.detail._Data._Step);
                var _data = self.init(data.detail._Data, self.RoomModel);
                if (data.detail._Data._Step === 1) {
                    for (var i = 0; i < _data.length; i++) {
                        self.playAnimation(_data[i], "wk");
                    }
                }
                //self.selectPoker([6,46,25,5,4,24]);
                //self.playAnimation(3, "fj");
                // console.log(self.RoomModel.game);
                var node = self.node.getChildByName("game").getChildByName("tool").getChildByName("paixu");
                cc.MJ.common.tool.UITool.buttonLoadImage(node, "Image/newAdd/bt_cardorder_n");
            } else {
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
                console.log(data.detail._EMsg);
            }
        });

        //开始游戏回调
        this.node.on(_eventList.start.EventName, function (data) {
            if (data.detail._IsS) {
                console.log("开始游戏成功");
                self.gameCount++;
                self.requestCMD("room");
            } else {
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
                console.log(data.detail._EMsg);
            }
        });
        //房间增减量
        this.node.on(_eventList.pseat.EventName, function (data) {
            var _flag = isNextStep(data);
            if (data.detail._IsS) {
                console.log("房间增减量成功");
                self.pseatModel(data.detail);
            } else {
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
                console.log(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.qz.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                var _data = self.qz(data.detail._Data);


            }
        });
        //房间增减量
        this.node.on(_eventList.cp.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.resetPai();
                self.cp(data.detail._Data);
                self.playAnimation(data.detail._Data._SNo, data.detail._Data._C);
            } else {
                cc.MJ.common.sound.playSoud("rechoose");
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.c.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.guopai(data.detail._Data);
            }
        });
        this.node.on(_eventList.ts.EventName, function (data) {
            if (data.detail._IsS) {

                var _s = self.tsSelectpai(data.detail._Data);
                self.selectedPai = _s;
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.te.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.dj(data.detail._Data);
            }
        });
        this.node.on(_eventList.re.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.zj(data.detail._Data);
            }
        });
        this.node.on(_eventList.exit.EventName, function (data) {
            if (data.detail._IsS) {
                cc.director.loadScene("indexScene");
            }
        });
        this.node.on(_eventList.rexit.EventName, function (data) {
            if (data.detail._Data) {

                if (data.detail._Data._SNo === 0) {
                    //self.tingpai(data.detail._Data);
                    self.RoomModel.jiesan._active = true;
                    self.RoomModel.jiesan.confirm = false;
                    self.RoomModel.jiesan.agree = false;
                    self.RoomModel.jiesan.refuse = false;
                    self.RoomModel.jiesan.content.name = "";
                    self.RoomModel.jiesan.content.staticlabel = "请等待其他玩家选择";
                }

            }
        });
        this.node.on(_eventList.exitg.EventName, function (data) {
            if (data.detail._Data) {

                if (data.detail._IsS) {
                    self.ExistStatus = true;

                } else {
                    self.ExistStatus = false;

                }
                self.RoomModel.jiesan._active = true;
                self.RoomModel.jiesan.confirm = true;
                self.RoomModel.jiesan.agree = false;
                self.RoomModel.jiesan.refuse = false;
                self.RoomModel.jiesan.content.name = "";
                self.RoomModel.jiesan.content.staticlabel = data.detail._Data._Result;


            }
        });


        this.node.on(_eventList.qexit.EventName, function (data) {

            if (data.detail._Data) {

                if (data.detail._Data._SNo === 0) {
                    //self.tingpai(data.detail._Data);
                    console.log("解散发起了！！！！！！");
                    self.RoomModel.jiesan._active = true;
                    self.RoomModel.jiesan.confirm = false;
                    self.RoomModel.jiesan.agree = false;
                    self.RoomModel.jiesan.refuse = false;
                    self.RoomModel.jiesan.content.name = "";
                    self.RoomModel.jiesan.content.staticlabel = "已发起解散房间，请等待其他玩家选择";
                } else {
                    var _seat = cc.MJ.module.game.seatInfo;
                    var _seatName = "Player" + data.detail._Data._SNo;

                    self.RoomModel.jiesan._active = true;
                    self.RoomModel.jiesan.confirm = false;
                    self.RoomModel.jiesan.agree = true;
                    self.RoomModel.jiesan.refuse = true;
                    console.log(self.RoomModel.players[_seatName].name);
                    self.RoomModel.jiesan.content.name = self.RoomModel.players[_seatName].name;
                    self.RoomModel.jiesan.content.staticlabel = "     请求解散房间";
                }

            }
        });
        this.node.on(_eventList.readyg.EventName, function (data) {

            if (data.detail._Data) {

                self.setready(data.detail._Data);

            }
        });


    },

    /**
     * 滑动选择牌
     * */
    start: function () {

        // console.info("执行了" + this.cards);
        this.addTouchEvent();
    },

    touchmoveEvent: function (event) {

        var card = event.target;
        //先清除原先触摸到的牌
        //this.clearTouchedCards();
        // console.log('poker TOUCH_MOVE+++++++++++++++++++++++++=');
        //保存第一张牌
        this.pushTouchedCards(this.firstTouchedCard.index, this.firstTouchedCard.card);

        //触摸点转换为card节点坐标
        var nodeLocation = this.cards[0].convertTouchToNodeSpace(event);

        // console.log('touch nodeLocation:' + JSON.stringify(nodeLocation));
        var x = nodeLocation.x;
        var y = nodeLocation.y;

        //找到当前选中的牌
        var currentCard = null;
        // for (var i = 0; i < this.cards.length; i++) {
        //     var card = this.cards[i];
        //     var cardX = card.x;
        //     var cardY = card.y;
        //     console.log('card x=' + cardX + ',y=' + cardY);
        //
        //
        //     //某张牌范围包括了鼠标位置，选中此牌与触摸开头的所有牌
        //     var cardWidth = i == 27 ? card.width : 20;
        //     var cardHeight = card.height;
        //     if (cardX <= x && x <= cardX + cardWidth && cardY <= y && y <= cardY + cardHeight) {
        //         currentCard = card;
        //
        //         //暂存触摸到的牌
        //         this.pushTouchedCards(i, card);
        //         break;
        //     }
        // }

        //添加开头与此牌直接的所有牌
        var startTouchLocation = this.touchStartLocation;
        for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            var cardX = card.x;
            //框选的范围包括了的牌
            var min, max;
            if (startTouchLocation.x < nodeLocation.x) {
                min = startTouchLocation.x;
                max = nodeLocation.x;
            } else {
                min = nodeLocation.x;
                max = startTouchLocation.x;
            }
            // console.log('min=' + min + ', max=' + max);

            if (min <= cardX && cardX <= max) {
                //暂存触摸到的牌

                this.pushTouchedCards(i, card);

            }
        }
    },
    touchStartEvent: function (event) {


        //牌
        var card = event.target;

        //起始触摸位置（和第一张card一样，相对于poker的位置）
        this.touchStartLocation = this.cards[0].convertTouchToNodeSpace(event);

        console.log('touch start Location:' + JSON.stringify(this.touchStartLocation));

        //计算牌位置
        var index = 0;
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.uuid == card.uuid) {
                index = i;
                break;
            }
        }

        //暂存第一次触摸到的牌
        var touchedCard = {
            index: index,
            card: card
        };
        this.firstTouchedCard = touchedCard;
        console.log("放第一张牌");
        console.log(card);
        //暂存
        this.pushTouchedCards(touchedCard.index, touchedCard.card);
    },
    /**
     * 添加事件
     */
    addTouchEvent: function () {

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('poker TOUCH_START');
            this.touchStartEvent(event);

        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log('poker TOUCH_MOVE');
            this.touchmoveEvent(event);


        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log('poker TOUCH_END');
            console.log(this.touchedCards);
            this.doSelectCard();
        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            console.log('poker TOUCH_CANCEL');
            console.log(this.touchedCards);
            this.doSelectCard();
        }, this);

        //给所有的牌注册事件，会自动冒泡到poker节点
        for (var i = 0; i < this.cards.length; i++) {
            var cards = this.cards;
            var self = this;
            //闭包传递i值
            (function (i) {
                var card = cards[i];
                var card0 = cards[0];

                card.on(cc.Node.EventType.TOUCH_START, function (event) {
                    console.log('card TOUCH_START');
                    // self.touchStartEvent(event);

                }, card);

                card.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    console.log('card TOUCH_MOVE');
                    // self.touchmoveEvent(event);
                }, card);

                card.on(cc.Node.EventType.TOUCH_END, function (event) {
                    console.log('card TOUCH_END');
                    //self.doSelectCard();
                }, card);

                card.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                    console.log('card TOUCH_CANCEL');
                    //self.doSelectCard();
                }, card);


            })(i);

        }

    },

    /**
     * 暂存触摸到的牌
     */
    pushTouchedCards: function (index, card) {
        //构造牌对象
        var cardObj = {
            index: index,
            name: card.uuid,
            isSelected: card.y == this.cardInitY ? false : true //高度不一样，表示选中
        };

        //防止重复添加
        var existCard = this.touchedCards.find(function (obj) {

            if (obj.name === card.uuid) {
                obj.isSelected = cardObj.isSelected;
                return obj;
            } else {
                return null;
            }
        });
        if (!existCard) {
            //添加暂存

            this.touchedCards.push(cardObj);
            cc.MJ.common.sound.playSoud("selected");
            //包含提示
            this.addCardMask(card);
        }
    },

    /**
     * 清除原先暂存的触摸到的牌
     */
    clearTouchedCards: function () {
        // for (var i = 0; i < this.touchedCards.length; i++) {
        //     var cardIndex = this.touchedCards[i].index;
        //     var card = this.cards[cardIndex];
        //     card.removeChild(card.children[0]);
        // }
        this.touchedCards = [];
    },

    /**
     * 选择牌
     */
    doSelectCard: function () {
        var hash = {};
        this.touchedCards = this.touchedCards.reduce(function (item, next) {
            hash[next.name] ? '' : hash[next.name] = true && item.push(next);
            return item;
        }, []);
        var _linode = this.node.getChildByName("game").getChildByName("tool").getChildByName("lipai");
        cc.MJ.common.tool.UITool.buttonLoadImage(_linode, "Image/newAdd/bt_arrange_n");
        var _remove_arr = [];
        for (var i = 0; i < this.liARR_All_obj.length; i++) {
            var flag = false;
            for (var k = 0; k < this.liARR_All_obj[i].length; k++) {

                for (var a = 0; a < this.touchedCards.length; a++) {
                    var cardObj = this.touchedCards[a];
                    var f_cardobj = this.liARR_All_obj[i][k];
                    console.log(cardObj);
                    if (cardObj.index === f_cardobj.index) {
                        flag = true;
                        _remove_arr.push(cardObj);

                    }

                }

            }
            if (flag) {
                cc.MJ.common.tool.UITool.buttonLoadImage(_linode, "Image/newAdd/bt_arrangecancel_n");
                var _cardObj = this.liARR_All_obj[i][0];
                var _pai_data = this.roomObj.game.inpai["inpai0"][_cardObj.index].paibtn;
                var _temp_y = _pai_data._y === 30 ? 0 : 30;
                for (var k = 0; k < this.liARR_All_obj[i].length; k++) {
                    var cardObj = this.liARR_All_obj[i][k];
                    var pai_data = this.roomObj.game.inpai["inpai0"][cardObj.index].paibtn;

                    pai_data._y = _temp_y;
                    pai_data._color = this.colorArr[i];
                }
                if (_temp_y === 30) {
                    this.select_Arr_index.push(i);
                } else {
                    var _index = cc.MJ.common.tool.UITool.getIndexByValue(this.select_Arr_index, i);

                    this.select_Arr_index.splice(_index, 1);
                }

            }

        }

        console.log(this.liARR_All_obj);
        this.selectedCards = [];

        console.log(this.touchedCards);
        this.liARR = [];
        //改变牌状态
        // var existCard = this.touchedCards.find(function (obj) {
        //
        //     if (obj.index === index) {
        //         obj.isSelected = cardObj.isSelected;
        //         return obj;
        //     } else {
        //         return null;
        //     }
        // });

        cc.js.array.removeArray(this.touchedCards, _remove_arr);
        for (var i = 0; i < this.touchedCards.length; i++) {
            var cardObj = this.touchedCards[i];
            var card = this.cards[cardObj.index];

            var pai_data = this.roomObj.game.inpai["inpai0"][cardObj.index].paibtn;
            console.log(this.roomObj.game.inpai["inpai0"][cardObj.index].paibtn);
            if (cardObj.isSelected && card.y === 30) { //如果是选中改为不选中
                card.y = 0;

                // var _index = cc.MJ.common.tool.UITool.getIndexByValue(this.selectedPai, pai_data._EventData);
                //
                // this.selectedPai.splice(_index, 1);
                // cc.js.array.remove(this.selectedPai, pai_data._EventData);
                // console.log("删除数组");
            } else if (card.y === 0) { //不选中改为选中状态
                card.y = 30;
                // if (pai_data._button._EventData !== "0" && pai_data._active) {
                //     this.liARR.push(cardObj);
                // }


                // if (pai_data._EventData !== "0") {
                //     console.log(pai_data._EventData);
                //     // this.selectedPai.push(pai_data._EventData);
                //
                // }
                // console.log("添加数组");
            }
            // console.log("处理后的数组");
            // console.log(this.selectedPai);
            card.opacity = 255;
            card.color = cc.Color.WHITE;
        }
        this.selectedPai = [];
        for (var i = 0; i < this.cards.length; i++) {
            var pai_data = this.roomObj.game.inpai["inpai0"][i].paibtn._button;
            if (this.cards[i].y === 30) {
                if (pai_data._EventData !== "0") {
                    this.selectedPai.push(pai_data._EventData);
                    this.liARR.push({
                        index: i,
                        name: this.cards[i].uuid,
                        isSelected: true //高度不一样，表示选中
                    });
                }
            }
        }
        console.log("处理后的数组");
        console.log(this.selectedPai);
        //重置
        this.clearTouchedCards();

        //显示选中的牌
        //this.showSelectedCards();
    },

    /**
     * 包含牌遮罩
     */
    addCardMask: function (card) {
        // var cardMask = cc.instantiate(this.cardMask);
        // cardMask.setPosition(cc.p(0, 0));
        card.color = cc.hexToColor("#D1B0F0");
        card.opacity = 255;
    },

    /**
     * 显示选中的牌
     */
    showSelectedCards: function () {
        this.selectedCards = [];
        for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            var isSelected = card.y == this.cardInitY ? false : true;
            if (isSelected) {
                this.selectedCards.push(card.name);
            }
        }
        //输出
        // console.info("selected cards is: " + JSON.stringify(this.selectedCards));
    },
    /**
     * 滑动选择牌
     * */


    /**
     * 按钮绑定事件
     * */

    //炫耀按钮事件
    xuanyaobtn: function () {
        cc.MJ.common.jsb.weiChatShareImage(this);
    },
    //返回大厅事件
    backindexbtn: function () {
        cc.director.loadScene("indexScene");
    },

    //下边牌按钮的点击事件
    PaiEvent: function (event, customEventData) {

        var button = event.currentTarget;
        var pp = button.getPosition();
        //button.setPosition ();
        // console.log(customEventData);
        //var _EventData = JSON.parse(customEventData);
        var temp_zhuang_flag = cc.sys.localStorage.getItem("table_zhuang");

        if (pp.y === 30) {
            //pp.y = 0;
            button.y = 0;
            var _index = cc.MJ.common.tool.UITool.getIndexByValue(this.selectedPai, customEventData);
            this.selectedPai.splice(_index, 1);
        } else {
            // pp.y = 15;
            button.y = 30;
            this.selectedPai.push(customEventData);
        }


        // button.setPosition(pp);


        console.log("这是第" + customEventData + "个按钮");
    },

    readyEvent: function () {
        this.roomObj.game.tanlayout._active = false;
        this.RoomModel.alert.dj._active = false;
        this._sendReadyMsg(false);
    },
    chuPaiEvent: function (event, customEventData) {
        // cc.MJ.common.sound.playSoud("givecard");
        // var _datasound = ["dani0", "dani1", "dani2"];
        // this.radomSound(_datasound, 0, 2);
        console.log(this.selectedPai);
        var button = event.currentTarget;
        var pp = button.getPosition();
        this.requestData("cp", this.selectedPai);
        // this.resetPai();

    },
    radomSound: function (_datasound, min, max) {
        var RandomNum = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range);
            return num;
        }

        var num = RandomNum(min, max);
        cc.MJ.common.sound.playSoud(_datasound[num]);
    },
    guoPaiEvent: function (event, customEventData) {
        // var _datasound = ["pass0", "pass1", "pass2", "pass3"];
        // this.radomSound(_datasound, 0, 3);
        var button = event.currentTarget;
        this.requestData("c", []);
        this.resetPai();
    },
    tsEvent: function (event, customEventData) {
        this.requestData("ts", null);
        this.resetPai();
    },
    //重置牌的位置
    resetPai: function () {
        this.liARR_All = [];
        this.colorArr = [];
        this.liARR_All_obj = [];
        this.selectedPai = [];
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].y = 0;
        }

    },
    //根据命令发送数据+牌型
    requestData: function (p_cmdName, p_shape) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = cc.MJ.data.getLocalStorage_roomNo();
        var data = {
            "_Cmd": p_cmdName,
            "_PID": _PID_temp,
            "_Data": {
                "_Shape": p_shape    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
    },
    //根据命令发送数据
    requestCMD: function (p_cmdName) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = cc.MJ.data.getLocalStorage_roomNo();
        var data = {
            "_Cmd": p_cmdName,
            "_PID": _PID_temp,
            "_Data": {
                "_RNo": _RoomNO_temp    //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
    },
    //抢庄命令发送
    requestJiao: function (p_val) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var data = {
            "_Cmd": "qz",
            "_PID": _PID_temp,
            "_Data": {
                "_IsCall": p_val  // 是否叫牌（1 叫牌，0 不叫）
            }
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
    },
    //叫牌事件
    jiaoPai: function (event, customEventData) {
        this.requestJiao(customEventData);
    },
    //开始按钮事件
    startGameBtn: function () {
        this.requestCMD("start");
    },
    //退出房间按钮事件
    existBtn: function () {
        this.requestCMD("exit");
    },
    //解散房间按钮事件
    jiesanEvent: function () {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var fapai = {
            _Cmd: "qexit",
            _PID: _PID_temp,
            _Data: {

                _IsC: true
            },
        };
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    //同意解散房间事件
    jiesan_agree: function () {
        var fapai = this._getSendObj("true");
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    //拒绝解散房间事件
    jiesan_refuse: function () {
        this.isSendQuit = false;
        var fapai = this._getSendObj("false");
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    //确认解散结果事件
    jiesan_confirm: function () {

        // if (this.ExistStatus) {
        //     cc.director.loadScene('chooseScene');
        // } else {
        this.RoomModel.jiesan._active = false;
        // }

    },
    //统一发送解散房间相关命令
    _getSendObj: function (p_val) {
        var fapai = {
            _Cmd: "rexit",
            _PID: this.loginname,
            _Data: {

                _IsC: p_val
            },
        };
        return fapai;
    },
    //根据牌型播放对应动画
    playAnimation: function (p_sno, p_code) {

        var animationNode = this.node.getChildByName("game").getChildByName("playTypeNode");
        var paiType = this.node.getChildByName("game").getChildByName("paiType");
        var seat = animationNode.getChildByName("player" + p_sno);
        if (p_code.indexOf("fj") !== -1) {
            p_code = "fj";
        }
        var animNode = paiType.getChildByName(this.AnimationCode[p_code]);


        if (p_code === "fj") {
            var plane = paiType.getChildByName("planeAnimation");
            var planeanim = plane.getComponent(cc.Animation);
            plane.active = true;
            planeanim.play();
        }
        if (animNode) {
            var animNode_copy = cc.instantiate(animNode);
            animNode_copy.parent = seat;
            animNode_copy.active = true;
            var anim = animNode_copy.getComponent(cc.Animation);
            anim.play();
            this.scheduleOnce(function () {
                animNode_copy.destroy();
            }, 5);
        }

    },

    //显示隐藏设置按钮
    settingEvent: function (event, CustomEventData) {
        var settingnode = this.node.getChildByName("setting");
        if (CustomEventData === "1") {
            settingnode.active = false;
        } else {
            settingnode.active = true;
        }


    },
    //发牌动画
    paiActionfunc: function () {
        var father = this.node.getChildByName("game").getChildByName("paiaction");
        father.active = true;
        var painode = father.children;
        for (var i = 0; i < painode.length; i++) {
            painode[i].x = 1436;
        }
        var code = 0;
        var interval = 0.1;
        // 重复次数
        var repeat = painode.length - 1;
        // 开始延时
        var delay = 0;
        this.schedule(function () {


            var moveto_action = cc.moveTo(0.2, cc.p(code * 44, painode[code].y));
            var newAction = cc.speed(moveto_action, 0.6);
            painode[code].runAction(newAction);
            code++;
            cc.MJ.common.sound.playSoud("fapai");
            if (code === 27) {
                father.active = false;
                this.RoomModel.game.inpai._active = true;
            }
        }, interval, repeat, delay);

        // }

    },
    //聊天框内容显示隐藏文字聊天与表情聊天
    showtalkContentEvent: function (event) {
        var fathernode = this.node.getChildByName("talk_bg");
        var msg_node = fathernode.getChildByName("talk_content");
        var emoji_node = fathernode.getChildByName("biaoqing");
        var node = event.target;
        if (this.talkbtn) {
            this.talkbtn = false;
            msg_node.active = true;
            emoji_node.active = false;
            cc.MJ.common.tool.UITool.buttonLoadImage(node, "Image/msg/expression_btn_on");

        } else {
            this.talkbtn = true;
            msg_node.active = false;
            emoji_node.active = true;
            cc.MJ.common.tool.UITool.buttonLoadImage(node, "Image/msg/common_btn_on");
        }
    },
    //理牌事件
    lipaiEvent: function (event) {

        //获取例牌数据传输

        //设置牌面颜色


        console.log("选中的例牌");
        console.log(this.select_Arr_index);
        if (this.select_Arr_index.length > 0) {
            if (this.select_Arr_index.length === this.liARR_All.length) {

                this.liARR_All = [];
                this.liARR_All_obj = [];
            } else {
                for (var i = 0; i < this.select_Arr_index.length; i++) {
                    if (i !== 0) {
                        cc.js.array.removeAt(this.liARR_All, this.select_Arr_index[i] - i);
                        cc.js.array.removeAt(this.liARR_All_obj, this.select_Arr_index[i] - i);
                    } else {
                        cc.js.array.removeAt(this.liARR_All, this.select_Arr_index[i]);
                        cc.js.array.removeAt(this.liARR_All_obj, this.select_Arr_index[i]);
                    }

                }
            }
            this.selectedPai = [];
            this.liARR = [];
            this.select_Arr_index = [];

        }


        var color = cc.Color.RED;
        if (this.colorArr.length > 0 && this.colorArr[this.colorArr.length - 1]._val === new cc.Color(0, 216, 217)._val) {
            this.colorArr.push(color.fromHEX("#d8c604"));
        } else {
            this.colorArr.push(new cc.Color(0, 216, 217));
        }

        if (this.liARR.length > 0) {
            this.liARR_All_obj.push(this.liARR);
            this.liARR_All.push(this.selectedPai);
            this.selectedPai = [];
            this.liARR = [];
        }
        this.lipai(this.liARR_All, this.colorArr, this.liARR_All_obj);

    },
    //排序事件
    paixuEvent: function (event) {
        this.liARR_All = [];
        this.colorArr = [];
        this.liARR_All_obj = [];
        var node = event.target;
        //获取排序数据传输
        this.paixu(this.paixuFlag);
        if (this.paixuFlag) {
            this.paixuFlag = false;
            cc.MJ.common.tool.UITool.buttonLoadImage(node, "Image/newAdd/bt_cancelorder_n");

        } else {
            this.paixuFlag = true;
            cc.MJ.common.tool.UITool.buttonLoadImage(node, "Image/newAdd/bt_cardorder_n");
        }
        this.selectedPai = [];
    },
    //选中510k事件
    li510kEvent: function () {
        //获取510k数据传输
        var obj = [];
        var _obj = this.li510k(this.liARR_All);
        this.selectedPai = _obj.select;
        var _linode = this.node.getChildByName("game").getChildByName("tool").getChildByName("lipai");
        cc.MJ.common.tool.UITool.buttonLoadImage(_linode, "Image/newAdd/bt_arrange_n");
        this.liARR = [];
        var _index = 0;
        var _currentarr = _obj.objarr;
        for (var i = 0; i < _currentarr.length; i++) {
            for (var k = _index; k < this.selectedPai.length; k++) {
                if (_currentarr[i] === this.selectedPai[k]) {
                    this.liARR.push({
                        index: i,
                        name: this.cards[i].uuid,
                        isSelected: true //高度不一样，表示选中

                    });
                    _index++;
                }

            }
        }

    },
    //邀请好友
    inviteFriend: function () {
        var roomNo = cc.sys.localStorage.getItem('roomNo');
        cc.MJ.common.jsb.weiChatShareWebViewWXSceneSession(roomNo, this.weiChatShareMessage);
    },
    /**
     * 按钮绑定事件
     * */

    //房间玩家增减量
    pseatModel: function (obj) {
        this.pSeatPlayer(obj);
    },

});



