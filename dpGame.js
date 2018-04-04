/**
 * Created by hxl on 2018/3/12.
 */
cc.Class({
    extends: cc.Component,

    properties: {
        roomType: cc.Label,
        roomRule: cc.Label,
        settingbox: cc.Prefab,
        bringinpre: cc.Prefab,
        gamePlayRule: cc.Prefab,
        fightingPop: cc.Prefab,
        head: cc.Node,
        content: cc.Node,
        dialog: cc.Node,
        myname: cc.Label,
        mygoldnum: cc.Label,
        myhead: cc.Sprite,
        poker: cc.Node,
        waittime: cc.Label,
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
        // console.log(nodeLocation);
        for (var i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            var cardX = card.x;
            var cardY = card.y;
            //框选的范围包括了的牌
            var min, max, miny, maxy;
            if (startTouchLocation.x < nodeLocation.x) {
                min = startTouchLocation.x;
                max = nodeLocation.x;
            } else {
                min = nodeLocation.x;
                max = startTouchLocation.x;
            }
            if (nodeLocation.y <= 90) {
                if (nodeLocation.y >= 60 && cardY === -58) {
                    miny = 40;
                    maxy = 90;
                } else {
                    miny = -80;
                    maxy = 0;
                }

            } else {
                miny = 50;
                maxy = 80;
            }

            if (min <= cardX && cardX <= max && cardY >= miny && cardY <= maxy) {
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

        // console.log('touch start Location:' + JSON.stringify(this.touchStartLocation));

        //计算牌位置
        var index = -1;
        for (var i = 0; i < this.cards.length; i++) {
            var c = this.cards[i];
            if (c.uuid == card.uuid) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            index = this.cards.length - 1;
        }

        //暂存第一次触摸到的牌
        var touchedCard = {
            index: index,
            card: card
        };
        this.firstTouchedCard = touchedCard;
        // console.log("放第一张牌");
        // console.log(card);
        //暂存
        this.pushTouchedCards(touchedCard.index, touchedCard.card);
    },
    /**
     * 添加事件
     */
    addTouchEvent: function () {

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log('poker TOUCH_START');
            this.touchStartEvent(event);

        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // console.log('poker TOUCH_MOVE');
            this.touchmoveEvent(event);


        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_END, function (event) {
            // console.log('poker TOUCH_END');
            // console.log(this.touchedCards);
            this.doSelectCard();

        }, this);

        //父节点监听touch事件（直接子节点必须注册同样的事件方能触发）
        this.poker.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // console.log('poker TOUCH_CANCEL');
            // console.log(this.touchedCards);
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
                    // console.log('card TOUCH_START');
                    // self.touchStartEvent(event);
                    // event._propagationStopped=true;
                }, card);

                card.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                    // console.log('card TOUCH_MOVE');
                    // self.touchmoveEvent(event);
                    // event._propagationStopped=true;
                }, card);

                card.on(cc.Node.EventType.TOUCH_END, function (event) {
                    // console.log('card TOUCH_END');
                    //self.doSelectCard();
                    // event._propagationStopped=true;
                }, card);

                card.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                    // console.log('card TOUCH_CANCEL');
                    //self.doSelectCard();
                    // event._propagationStopped=true;
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


        this.selectedCards = [];

        // console.log(this.touchedCards);
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

        // cc.js.array.removeArray(this.touchedCards, _remove_arr);
        for (var i = 0; i < this.touchedCards.length; i++) {
            var cardObj = this.touchedCards[i];
            var card = this.cards[cardObj.index];
            var pai_data = this.gameService.paiObj["pai0_w"][cardObj.index].poker_x;
            if (cardObj.isSelected && card.y !== pai_data._oldy) { //如果是选中改为不选中
                card.y = pai_data._oldy;


            } else if (card.y === pai_data._oldy) { //不选中改为选中状态
                card.y = pai_data._oldy + 30;

            }
            card.opacity = 255;
            card.color = cc.Color.WHITE;
        }
        this.selectedPai = [];
        for (var i = 0; i < this.cards.length; i++) {
            var pai_data = this.gameService.paiObj["pai0_w"][i].poker_x;
            if (this.cards[i].y !== pai_data._oldy) {
                if (pai_data._button._EventData !== "0") {
                    this.selectedPai.push(pai_data._button._EventData);
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
    initEvent: function () {
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
                console.log("room重载成功");
                cc.sys.localStorage.setItem("_Step", data.detail._Data._Step);
                var _data = self.gameService.init(data.detail._Data);
                if (data.detail._Data._Step === 1) {
                    // cc.MJ.common.sound.playSoud("sound_start");
                    // self.RoomModel.game.inpai._active = false;
                    self.paiActionfunc();
                }
                // self.gameService.initTableBtn(data.detail._Data);
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
                // self.requestCMD("room");
                self.gameService.toppaiObj._active = true;
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
                self.gameService.joinRoom(data.detail._Data);
            } else {
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
                console.log(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.qz.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                var _data = self.gameService.qz(data.detail._Data);


            }
        });
        //房间增减量
        this.node.on(_eventList.cp.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.resetPai();
                self.gameService.cp(data.detail._Data);
                self.showBeishu(data.detail._Data);
                self.playAnimation(data.detail._Data._SNo, data.detail._Data._C);
            } else {
                cc.MJ.common.sound.playSoud("rechoose");
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.c.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.gameService.guopai(data.detail._Data);
                self.resetPai();
            }
        });
        this.node.on(_eventList.ts.EventName, function (data) {
            if (data.detail._IsS) {

                var _s = self.gameService.tsSelectpai(data.detail._Data);
                self.selectedPai = _s;
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.te.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.gameService.dj(data.detail._Data);
            }
        });
        this.node.on(_eventList.re.EventName, function (data) {
            if (data.detail._IsS) {
                // var _flag = isNextStep(data);
                // if (_flag) {
                self.gameService.zj(data.detail._Data);
                // }
            }
        });
        this.node.on(_eventList.exit.EventName, function (data) {
            if (data.detail._IsS) {
                cc.MJ.data.setLocalStorage_roomNo("");
                cc.director.loadScene("dpHomeScene");
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.goldexit.EventName, function (data) {
            if (data.detail._IsS) {
                cc.sys.localStorage.setItem("matchGold", false);
                cc.MJ.data.setLocalStorage_roomNo("");
                cc.director.loadScene("dpHomeScene");
            }
        });
        this.node.on(_eventList.rexit.EventName, function (data) {
            if (data.detail._Data) {

                if (data.detail._Data._SNo === 0) {

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
            }
        });
        this.node.on(_eventList.ss.EventName, function (data) {
            if (data.detail._IsS) {
                if (data.detail._Data._Seconds === 5) {
                    self.gameService.finishObj._active = false;
                    // self.requestCMD("start");
                }
            } else {

            }
        });

        this.node.on(_eventList.qexit.EventName, function (data) {

            if (data.detail._Data) {

            }
        });

        this.node.on(_eventList.gexit.EventName, function (data) {
            if (data.detail._IsS) {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
                cc.sys.localStorage.setItem("matchGold", true);
                cc.director.loadScene("dpgameScene");
            }
        });
        this.node.on(_eventList.readyg.EventName, function (data) {

            if (data.detail._Data) {

                self.setready(data.detail._Data);

            }
        });

        this.node.on(_eventList.match.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log('匹配成功');
                cc.sys.localStorage.setItem("matchGold", false);
                clearInterval(self.sI);
                self.waittime.node.active = false;

                self.gameService._obj.tablebtn.takegold_btn = false;
                self.gameService._obj.tablebtn.start_btn = false;
                self.gameService._obj.tablebtn.cancel_btn = false;

            } else {
                //匹配失败

            }
        });
        this.node.on(_eventList.cmatch.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log('取消匹配成功');
                clearInterval(self.sI);
                self.gameService._obj.tablebtn.takegold_btn = true;
                self.gameService._obj.tablebtn.start_btn = true;
                self.gameService._obj.tablebtn.cancel_btn = false;
                self.waittime.node.active = false;
            } else {

            }
        });

        this.node.on(_eventList.startroom.EventName, function (data) {
            if (data.detail._IsS) {
                self.gameService._obj.gameTypeTable._active = true;
                self.gameService.seatObj._active = true;
                self.gameService._obj.tablebtn.share_btn = true;
                self.gameService._obj.tablebtn.start_btn = false;
                self.roomRule.string = "封顶倍数  " + self.roomrule.maxtimes + "  入场门槛  " + self.roomrule.mingold + "  最小带入  " + self.roomrule.playermingold + "\n房间号：" + self.roomNum;
                // self.gameService.toppaiObj._active = false;
            } else {

            }
        });

        this.node.on(_eventList.sitdown.EventName, function (data) {
            if (data.detail._IsS) {
                if (cc.find('bringin', self.dialog) != null) {
                    cc.MJ.common.action.showMoveOutAction(cc.find('bringin', self.dialog), 0.3, true);
                }
                cc.find("Canvas/content/tablefoot").active = true;
                self.gameService.initMySeat(self.tablenum, self.bringNum);
                self.gameService._obj.tablefoot.header_pic.money_m = '￥' + self.bringNum;
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.addgold.EventName, function (data) {
            if (data.detail._IsS) {
                if (cc.find('bringin', self.dialog) != null) {
                    cc.MJ.common.action.showMoveOutAction(cc.find('bringin', self.dialog), 0.3, true);
                }
                cc.find("Canvas/content/tablefoot").active = true;

                var _oldNum = self.gameService._obj.tablefoot.header_pic.money_m.split("￥")[1];
                self.gameService.initMySeat(0, parseInt(self.bringNum) + parseInt(_oldNum));

                self.gameService._obj.tablefoot.header_pic.money_m = '￥' + (parseInt(self.bringNum) + parseInt(_oldNum));
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.joing.EventName, function (data) {
            if (data.detail._IsS) {
                if (cc.find('bringin', self.dialog) != null) {
                    cc.MJ.common.action.showMoveOutAction(cc.find('bringin', self.dialog), 0.3, true);
                }
                cc.find("Canvas/content/tablefoot").active = true;
                var _oldNum = self.gameService._obj.tablefoot.header_pic.money_m.split("￥")[1];
                self.gameService.initMySeat(0, parseInt(self.bringNum) + parseInt(_oldNum));
                self.gameService._obj.tablefoot.header_pic.money_m = '￥' + (parseInt(self.bringNum) + parseInt(_oldNum));
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.war.EventName, function (data) {
            if (data.detail._IsS) {
                cc.log('获取成功');
                var ft = cc.find('fightingpop', self.dialog);
                if (ft == null) {
                    var fightingpop = cc.instantiate(self.fightingPop);
                    fightingpop.parent = self.dialog;
                    fightingpop.name = "fightingpop";
                    fightingpop.getComponent('fightingpop').init(data);
                } else {
                    ft.getComponent('fightingpop').init(data);
                }
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });

        this.node.on(_eventList.wait.EventName, function (data) {
            if (data.detail._IsS) {
                if (data.detail._Data._WaitList.length != 0) {
                    // self.gameService._seatObj._active = true;
                    if (self.clickWarBtn === true) {
                        self.clickWarBtn = false;
                        var ft = cc.find('fightingpop', self.dialog);
                        if (ft == null) {
                            var fightingpop = cc.instantiate(self.fightingPop);
                            fightingpop.parent = self.dialog;
                            fightingpop.name = "fightingpop";
                            fightingpop.getComponent('fightingpop').init2(data);
                        } else {
                            ft.getComponent('fightingpop').init2(data);
                        }
                    }
                }
            } else {
                cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
        this.node.on(_eventList.takeg.EventName, function (data) {
            if (data.detail._IsS) {
                cc.sys.localStorage.setItem("takeg", data.detail._Data._GC);
                var obj = {
                    _IsReady: true,
                    _IsN: true,
                    _Score: data.detail._Data._GC,
                    _PU: {
                        _Name: self.myInfo._Name,
                        _IUrl: self.myInfo._IUrl
                    }
                }
                self.gameService.initUser(obj, self.gameService.seatObj.seat0);
                if (self.showbringin) {
                    self.bringInMoney(null, data.detail._Data._GC);
                }
            } else {
                // cc.MJ.alert.tips_msg(data.detail._EMsg);
            }
        });
    },
    initBaseData: function () {
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

        this.AnimationCode = {
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

        };
    },
    MatchRoom: function () {
        this.myname.string = this.myInfo._Name;
        this.mygoldnum.string = '￥0';
    },
    onLoad: function () {
        // console.log(cc.sys.localStorage.getItem("test"));
        this.myInfo = JSON.parse(cc.MJ.data.getLocalStorage_PlayerInfo());
        this.pid = cc.MJ.data.getLocalStorage_LoginName();
        this.roomrule = JSON.parse(cc.MJ.data.getLocalStorage_roomRule());
        this.roomNum = cc.MJ.data.getLocalStorage_roomNo();

        this.initBaseData();
        this.initEvent();
        this.takegold();
        var gameMode = cc.sys.localStorage.getItem("matchGold");
        this.head.getChildByName("fighting_btn").active = this.roomrule.playtype === "default";

        //斗地主
        if (this.roomrule.roomtype === "landlord") {
            this.gameService = this.node.addComponent("doudizhu");
            this.gameService.init(null);
            if (gameMode === "true" && this.roomrule.playtype !== "default") {
                this.MatchRoom();
                if (cc.sys.localStorage.getItem("joinready")) {
                    cc.sys.localStorage.removeItem("joinready");
                    this.bringInMoney();
                }
                return;
            }
        } else if (this.roomrule.roomtype === "niuniu") {
            this.gameService = this.node.addComponent("niuniu");
        } else {
            this.gameService = this.node.addComponent("dezhou");
        }


        // this.gameService.init(null);
        // this.gameService._obj.tableinfo._active = false;
        // for (var k = 0; k < 4; k++) {
        //     this.RoomModel.players["Player" + k].headImage = cc.MJ.common.resources.getSpriteFrameByName("game", "game_head_pic");
        // }
        // var _EventList = [{
        //     _targetObj: this.node,
        //     _targetName: "gameController",
        //     _handlerName: "PaiEvent"
        // }];
        // cc.MJ.common.tool.bindData.unbindAllObj(this.RoomModel);
        // cc.MJ.common.tool.bindData.bindObjAndNode(this.RoomModel, this.node, null);
        // console.log(this.RoomModel.game);

        // this.requestSeat();
        this.requestCMD("room");
    },

    takegold: function (showbringin) {
        var data = {
            "_Cmd": "takeg",
            "_Data": {
                "_RT": this.roomrule.roomtype,
                "_PT": this.roomrule.playtype
            },
            "_PID": this.pid
        }
        this.showbringin = showbringin === true ? true : false;
        cc.MJ.socket.sendGetRequest(data, null, null);
    },

    showBeishu: function (data) {
        var zong = (data._RTD._RTs === 0 ? 1 : data._RTD._RTs) * (data._RTD._BTs === 0 ? 1 : data._RTD._BTs) * (data._RTD._STs === 0 ? 1 : data._RTD._STs);
        this.gameService._obj.tablefoot.ownData.beishu.val_m = zong;
        this.gameService.communal.times.room_m = data._RTD._RTs === 0 ? "" : "房间X" + data._RTD._RTs;
        this.gameService.communal.times.boom_m = data._RTD._BTs === 0 ? "" : "炸弹X" + data._RTD._BTs;
        this.gameService.communal.times.spring_m = data._RTD._STs === 0 ? "" : "春天X" + data._RTD._STs;
    },

    // initInformation:function(){
    //     var tablefoot = cc.find('Canvas/content/tablefoot');
    //     cc.find('header_pic/name_m',tablefoot).getComponent(cc.Label).string = this.myInfo._Name;
    //     cc.loader.load(this.myInfo._IUrl, function (err, texture) {
    //         var frame = new cc.SpriteFrame(texture);
    //         cc.find('header_pic/header_pic',tablefoot).getComponent(cc.Sprite).spriteFrame = frame;
    //     });
    // },

    showScore: function () {
        this.gameService.communal._active = true;
        setTimeout(() => {
            this.gameService.communal._active = false;
        }, 3000);
    },

    onDestroy: function () {
        clearInterval(this.sI);
        clearInterval(this.gameService.sI);
    },

    startMatch: function () {
        var data = {};
        if (this.roomrule.playtype == "default") {
            data = {
                "_Cmd": "startroom",
                "_Data": {
                    "_RNo": this.roomNum
                },
                "_PID": this.pid
            };
        } else {
            data = {
                "_Cmd": "match",
                "_Data": {
                    "_RT": this.roomrule.roomtype,
                    "_PT": this.roomrule.playtype
                },
                "_PID": this.pid
            };
            var self = this;
            var t = 0;
            this.waittime.node.active = true;
            this.sI = setInterval(function () {
                self.waittime.string = '准备开始...' + (++t) + 's';
            }, 1000)
            this.gameService._obj.tablebtn.takegold_btn = false;
            this.gameService._obj.tablebtn.start_btn = false;
            this.gameService._obj.tablebtn.cancel_btn = true;
        }

        cc.MJ.socket.sendGetRequest(data, null, null);

    },

    cancelMatch: function () {
        var data = {
            "_Cmd": "cmatch",
            "_Data": {
                "_RT": this.roomrule.roomtype,
                "_PT": this.roomrule.playtype,
            },
            "_PID": this.pid
        }
        cc.MJ.socket.sendGetRequest(data, null, null);
    },

    //呼出设置界面
    setTing: function () {
        if (cc.find('setting', this.dialog) != null) {
            return;
        }
        var setting = cc.instantiate(this.settingbox);
        setting.name = "setting";
        setting.parent = this.dialog;
        console.log(setting.getComponent("roomsetting"));
        setting.getComponent("roomsetting").setMgr(this);
    },
    
    //呼出带入金币界面
    bringInMoney: function (table,num) {
        // var bringin = this.dialog.getChildByName('bringin_money');
        // bringin.getChildByName('gold_count').getComponent(cc.Label).string = this.myInfo._GC;
        // this.playInAni(bringin, this.dialog, 0.3);
        if (cc.find("bringin", this.dialog) != null) {
            return;
        }
        var bringin = cc.instantiate(this.bringinpre);
        bringin.parent = this.dialog;
        bringin.name = "bringin";
        this.bringNum = 0;
        bringin.getComponent('bringInCoin').setMgr(this, table, num);
    },
    
    //呼出玩法界面
    playRule: function () {
        if (cc.find("playrule", this.dialog) != null) {
            return;
        }
        var playrule = cc.instantiate(this.gamePlayRule);
        playrule.parent = this.dialog;
        playrule.name = "playrule"
    },

    //呼出战况
    showWar: function () {
        if (cc.find('fightingpop', this.dialog) != null) {
            return;
        }
        var data = {
            "_Cmd": "war",
            "_Data": {
                "_RNo": this.roomNum
            },
            "_PID": this.pid
        };
        var data2 = {
            "_Cmd": "wait",
            "_Data": {
                "_RNo": this.roomNum
            },
            "_PID": this.pid
        }
        this.clickWarBtn = true;
        cc.MJ.socket.sendGetRequest(data, null, null);
        cc.MJ.socket.sendGetRequest(data2, null, null);
    },

    //返回大厅界面
    backHomeScene: function () {
        cc.director.loadScene('dpHomeScene');
    },

    playInAni: function (nd, parent, time) {
        cc.MJ.common.action.showMoveInAction(nd, parent, time);
    },

    playOutAni: function (nd, time) {
        cc.MJ.common.action.showMoveOutAction(nd, time);
    },

    //设置音量与音效
    setYinliangBtn: function () {
        var yinliang = cc.find('ylprogressBar', this.settingbox);
        yinliang.getComponent(cc.ProgressBar).progress = yinliang.getChildByName('ruchangSlider').getComponent(cc.Slider).progress;
        var yinxiao = cc.find('yxprogressBar', this.settingbox);
        yinxiao.getComponent(cc.ProgressBar).progress = yinxiao.getChildByName('ruchangSlider').getComponent(cc.Slider).progress;
        cc.MJ.data.setLocalStorage_yl(yinliang.getComponent(cc.ProgressBar).progress);
        cc.MJ.data.setLocalStorage_yx(yinxiao.getComponent(cc.ProgressBar).progress);
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
        cc.MJ.common.sound.playSoud("givecard");
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
        this.colorArr = [];
        this.selectedPai = [];
        for (var i = 0; i < this.cards.length; i++) {
            var _obj = this.gameService.paiObj.pai0_w[i];
            _obj.poker_x._y = _obj.poker_x._oldy;
            // this.cards[i].y = 0;
        }

    },
    //根据命令发送数据+牌型
    requestData: function (p_cmdName, p_shape) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = this.roomNum;
        var data = {
            "_Cmd": p_cmdName,
            "_PID": _PID_temp,
            "_Data": {
                "_Shape": p_shape //  房间号
            }
        };
        cc.MJ.socket.sendGetRequest(data, null, this);
    },
    //根据命令发送数据
    requestCMD: function (p_cmdName) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var _RoomNO_temp = this.roomNum;
        var data = {
            "_Cmd": p_cmdName,
            "_PID": _PID_temp,
            "_Data": {
                "_RNo": _RoomNO_temp //  房间号
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
                "_IsCall": p_val // 是否叫牌（1 叫牌，0 不叫）
            }
        };

        cc.MJ.socket.sendGetRequest(data, null, this);
    },
    sitdownEvent: function (event, customEventData) {
        if (!this.gameService.seatObj["seat" + customEventData].space || this.roomNum === "") {
            return;
        }
        this.tablenum = customEventData;
        // cc.MJ.socket.sendGetRequest(data, null, this);
        this.bringInMoney(customEventData);
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
        // this.requestCMD(this.roomrule.playtype !== "default" ? "goldexit" : "exit");
        if (this.roomrule.playtype !== "default") {
            var data = {
                "_Cmd": "goldexit",
                "_PID": this.pid,
                "_Data": {
                    "_RT": this.roomrule.roomtype,
                    "_PT": this.roomrule.playtype
                }
            };
            cc.MJ.socket.sendGetRequest(data, null, this);
        } else {
            this.requestCMD("exit");
        }
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

        // var animationNode = this.node.getChildByName("game").getChildByName("playTypeNode");
        // var paiType = this.node.getChildByName("game").getChildByName("paiType");
        // var seat = animationNode.getChildByName("player" + p_sno);
        // if (p_code.indexOf("fj") !== -1) {
        //     p_code = "fj";
        // }
        // var animNode = paiType.getChildByName(this.AnimationCode[p_code]);


        // if (p_code === "fj") {
        //     var plane = paiType.getChildByName("planeAnimation");
        //     var planeanim = plane.getComponent(cc.Animation);
        //     plane.active = true;
        //     planeanim.play();
        // }
        // if (animNode) {
        //     var animNode_copy = cc.instantiate(animNode);
        //     animNode_copy.parent = seat;
        //     animNode_copy.active = true;
        //     var anim = animNode_copy.getComponent(cc.Animation);
        //     anim.play();
        //     this.scheduleOnce(function () {
        //         animNode_copy.destroy();
        //     }, 5);
        // }

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
        // var father = this.node.getChildByName("game").getChildByName("paiaction");
        // father.active = true;
        // var painode = father.children;
        // for (var i = 0; i < painode.length; i++) {
        //     painode[i].x = 1436;
        // }
        this.gameService.paiObj._active = true;
        var painode = cc.find('Canvas/content/gameTypeTable/landlord/pai/pai0_w').children;
        for (var i = 0; i < painode.length - 3; i++) {
            painode[i].x = 1436;
        }
        var code = 0;
        var interval = 0.1;
        // 重复次数
        var repeat = painode.length - 4;
        // 开始延时
        var delay = 0.5;
        var scode = 0;
        this.schedule(function () {
            var moveto_action = cc.moveTo(0.2, cc.p(74.5+scode * 54, painode[code].y));
            var newAction = cc.speed(moveto_action, 0.6);
            painode[code].runAction(newAction);
            code++;
            scode++;
            if (code == 10) {
                scode = 0;
            }
            cc.MJ.common.sound.playSoud("fapai");
            // if (code === 20) {
            //     father.active = false;
            //     this.RoomModel.game.inpai._active = true;
            // }
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

    update: function (dt) {

    },
});