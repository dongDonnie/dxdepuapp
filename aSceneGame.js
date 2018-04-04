/**
 * Created by hxl on 2017/7/6.
 * game场景默认加载js
 */

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.contains_pai_index = function (index_value) {
    for (var i in this) {
        if (this[i].Code == index_value) return true;
    }
    return false;
};

// var musicModule = require("MusciModule");
var Global_CommonModule = function (p_btn, p_show, p_Sprite, p_opacity) {
    this._son = true;
    if (!p_Sprite) {
        this._sprite = new cc.SpriteFrame();
    }

    this._color = new cc.Color(255, 255, 255);
    this._active = p_show || false;

    var _btn = {_EventData: "0", _EventID: 0};
    this._button = p_btn || _btn;
    // if (p_opacity) {
    this._opacity = 255;

    return this;
};
var game_class = cc.Class({
    extends: require("BaseGame"),

    properties: {
        downSpr_pre: {
            default: null,
            type: cc.Prefab
        },
        settingNew: {
            default: null,
            type: cc.Node
        },
        wanfaNew: {
            default: null,
            type: cc.Node
        },
        hulistNew: {
            default: null,
            type: cc.Node
        },
        GZNew: {
            default: null,
            type: cc.Node
        },
        liuju: {
            default: null,
            type: cc.Prefab
        },
        //帮助prefab
        help_pre: {
            default: null,
            type: cc.Prefab
        },
        //设置prefab
        setting_pre: {
            default: null,
            type: cc.Prefab
        },


        zongjiesuan: {
            default: null,
            type: cc.Node
        },
        danjujiesuan: {
            default: null,
            type: cc.Prefab
        },
        niao_layout: {
            default: null,
            type: cc.Prefab
        },
        cangying_layout: {
            default: null,
            type: cc.Prefab
        },
        wanjia: {
            default: null,
            type: cc.Prefab
        },

        BottomBtnList: [],


        huPai_pre: {
            default: null,
            type: cc.Prefab
        },
        guangyun: [cc.Node, cc.Node, cc.Node, cc.Node],
        headtable: [cc.Node, cc.Node, cc.Node, cc.Node],
        _loginname: "",
        _roomNo: "",
        _isActive: false,
        _isEnd: false,
        _TablePaiObj: null,
        peng_soud: cc.AudioClip,
        gang_soud: cc.AudioClip,
        hu_soud: cc.AudioClip,
        _selectedPai: null,
        _Common_curent_shoupai: null,
        _layout_actionList: null,
        _isLock_play: false,
        finger_node: cc.Node
    },

    getLocation: function (coordinate) {
        cc.log("定位成功了======" + coordinate);
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var temp = coordinate.split("-");

        var li = {
            "_Cmd": "li",
            "_PID": _PID_temp,
            "_Data": {
                "_Ip": null,    //  指定座位编号（-1表示系统安排）
                "_Longitude": temp[0],    //  房间号
                "_Latitude": temp[1]
            }
        };
        cc.MJ.socket.sendGetRequest(li, null, this);
    },

    downBtn: function () {
        // cc.log("下拉————————————————————————————");
        //创建预制节点
        var newAlart = cc.instantiate(this.downSpr_pre);
        newAlart.parent = this.node;

        //获取下按钮
        var btn = this.node.getChildByName("downBtn");
        newAlart.setPosition(btn.getPosition());

        //instantiate 克隆节点
        // gameModule.downBtn = cc.instantiate(btn);
        // gameModule.position = btn.getPosition();
        this.downBtn_obj = btn;

        var alartH = newAlart.height;
        var btnH = btn.height;

        newAlart.setPositionY(btn.getPositionY() - alartH / 2 + btnH / 2);

        // gameModule.alert = newAlart;
        this.downBtnAlert = newAlart

        //销毁节点
        btn.active = false;

        //获取子控件
        var children = newAlart.children;
        //遍历子控件
        for (var i = 0; i < children.length; ++i) {
            // cc.log("Node" + children[i]);

            //给每个按钮绑定一个事件
            var clickEventHandler = new cc.Component.EventHandler();
            //目标节点
            clickEventHandler.target = this.node;
            //目标组件名
            clickEventHandler.component = "aSceneGame";
            //响应事件函数名
            clickEventHandler.handler = "rightBtnEvent";
            switch (i) {
                //自定义事件数据
                case 0:
                    clickEventHandler.customEventData = "helpEvent";
                    break;
                case 1:
                    clickEventHandler.customEventData = "settingEvent";
                    break;
                case 2:
                    clickEventHandler.customEventData = "hostingEvent";
                    break;
                case 3:
                    // var _jiesan=cc.sys.localStorage.getItem("jiesan");
                    // if(!_jiesan){
                    //     children[i].active=false;
                    // }else {
                    //     children[i].active=true;
                    // }
                    clickEventHandler.customEventData = "quitEvent";
                    break;
                case 4:
                    clickEventHandler.customEventData = "closeEvent";
                    break;
            }
            var button = children[i].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }


    },
    clearShowbox: function (p_currentType) {
        //TODO 待完善，用于清理当前桌面显示的弹框
        for (var i = 0; i < this.headtable.length; i++) {
            this.headtable[i].active = false;
        }
    },

    /**处理弹框显示事件
     *
     * 包括玩法，设置，规则
     *
     * **/
    openSetting: function (event) {

        var moveto_action = cc.moveTo(0.2, cc.p(264.5, 0));
        this.settingNew.runAction(moveto_action);
    },
    //打开玩法弹框
    openWanfa: function (event, CustomEventData) {
        cc.log(CustomEventData);
        // this.wanfaNew.active = CustomEventData==="true"?true:false;
        var _p = CustomEventData === "true" ? cc.p(0, 0) : cc.p(0, 750);
        var moveto_action = cc.moveTo(0.2, _p);
        this.wanfaNew.runAction(moveto_action);
    },
    //打开胡牌提示
    openhulist: function (event, CustomEventData) {
        cc.log(CustomEventData);
        this.hulistNew.active = !this.hulistNew.active;
        // this.scheduleOnce(function () {
        //     this.hulistNew.active=!this.hulistNew.active;
        // },5);
        // this.wanfaNew.active = CustomEventData==="true"?true:false;
        // var _p = CustomEventData === "true" ? cc.p(-7, -117) : cc.p(-1300, -117);
        // var moveto_action = cc.moveTo(0.2, _p);
        // this.hulistNew.runAction(moveto_action);
        // cc.log(this.hulistNew.x);
    },
    //打开游戏规则
    setGZOpenStatus: function (event, CustomEventData) {
        var moveto_action = cc.moveTo(0.2, cc.p(1080, 0));
        this.settingNew.runAction(moveto_action);
        var _p = CustomEventData === "true" ? cc.p(0, 0) : cc.p(-1334, 0);
        var moveto_action = cc.moveTo(0.2, _p);
        this.GZNew.runAction(moveto_action);

    },
    //右边弹出按钮事件
    rightBtnEvent: function (event, customEventData) {
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var node = event.target;
        var button = node.getComponent(cc.Button);

        if (customEventData == "helpEvent") {
            cc.log("这是帮助按钮");
            if (!cc.isValid(this.help)) {
                this.help = cc.instantiate(this.help_pre);
                this.help.parent = this.node;
                cc.MJ.common.ui.popSize(this.help);
            } else if (!this.help.active) {
                this.help.active = true;
            }

            return;
        }
        if (customEventData == "settingEvent") {
            cc.log("这是设置按钮");
            if (!cc.isValid(this.setting)) {
                this.setting = cc.instantiate(this.setting_pre);
                this.setting.parent = this.node;
                cc.MJ.common.ui.popSize(this.setting);
            } else if (!this.setting.active) {
                this.setting.active = true;
            }
            return;
        }
        if (customEventData == "hostingEvent") {
            cc.log("这是托管按钮");
            return;
        }
        if (customEventData == "quitEvent") {
            cc.log("这是jiesan按钮");
            if (!this.isSendQuit) {
                this.isSendQuit = false;
                var fapai = {
                    _Cmd: "qexit",
                    _PID: this.loginname,
                    _Data: {

                        _IsC: true
                    },
                };
                cc.MJ.socket.sendGetRequest(fapai, null, null);

            }
            this.downBtnAlert.destroy();

            this.downBtn_obj.active = true;

            //  cc.director.loadScene('chooseScene');
            return;
        }
        if (customEventData == "closeEvent") {
            cc.log("这是关闭按钮");

            //isValid 检查该对象是否不为null 并且尚未销毁
            if (cc.isValid(this.downBtnAlert)) {
                this.downBtnAlert.destroy();

                this.downBtn_obj.active = true;

            }
            return;
        }
    },
    //点击头像，显示详情弹框
    clickHeadEvent: function (event, customEventData) {
        var _node = event.target;
        if (this.RoomModel[_node.name]) {
            this.RoomModel[_node.name].headtable._active = !this.RoomModel[_node.name].headtable._active;
        }

        for (var i = 0; i < this.headtable.length; i++) {
            if (this.headtable[i].parent.name !== _node.name) {
                this.headtable[i].active = false;
            }
        }
    },
    /**处理弹框显示事件
     *
     * 包括玩法，设置，规则
     *
     * **/

    /**解散房间处理事件
     *
     * 包括 发起，同意，拒绝，确认
     *
     * **/
    clickjiesanEvent: function () {
        var fapai = {
            _Cmd: "qexit",
            _PID: this.loginname,
            _Data: {

                _IsC: true
            },
        };
        cc.MJ.socket.sendGetRequest(fapai, null, null);
        var moveto_action = cc.moveTo(0.2, cc.p(1080, 0));
        this.settingNew.runAction(moveto_action);
    },
    //同意解散房间
    jiesan_agree: function () {
        var fapai = this._getSendObj("true");
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    //拒绝解散房间
    jiesan_refuse: function () {
        this.isSendQuit = false;
        var fapai = this._getSendObj("false");
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    //确认解散结果
    jiesan_confirm: function () {

        // if (this.ExistStatus) {
        //     cc.director.loadScene('chooseScene');
        // } else {
        this.RoomModel.jiesan._active = false;
        // }

    },
    //根据决定，获取解散房间需要发送的数据
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
    /**解散房间处理事件
     *
     * 包括 发起，同意，拒绝，确认
     *
     * **/

    /**处理出牌事件
     *
     * 包括 点击，滑动，点击胡牌提示
     *
     * **/
    //touch 公用事件
    touchpai: function (self) {
        if (this.opacity !== 100) {
            cc.log("cancel");
            if (cc.isValid(this._movepai)) {

                if (this._movepai.y >= -175) {
                    self.setPosition(this.btn_pp[self.uuid]["xy"].x, 35);

                    cc.log("进来设置已经选中");
                    this.clickStatus = true;
                    this.bottomPaiEvent({currentTarget: self}, self.getComponent(cc.Button).clickEvents[0].customEventData);

                }
                else if (this._movepai.y < -265 || this._movepai.y > -265) {
                    self.setPosition(this.btn_pp[self.uuid]["xy"].x, 0);
                }

                var moveto_action = cc.moveTo(0.2, cc.p(this.btn_pp[self.uuid]["x"], -262));
                this._movepai.runAction(moveto_action);

                this._movepai.destroy();

            }

        }

    },
    //销毁移动至桌面的牌
    movepaiDestroy: function (p_movepai) {
        this.scheduleOnce(function () {
            p_movepai.destroy();
        }, 0.23);
    },
    //touch 事件初始化
    bindbottomPaiTouchEvent: function () {

        var self = this;
        this.touchStatus = true;
        this.btn_pp = {};
        var bottomlist = this.node.getChildByName("playGame").getChildByName("bottom_pai").children;
        for (var i = 0; i < bottomlist.length; i++) {
            var _btnObj = bottomlist[i];
            var _x = 589 - i * 90;
            if (i === 0) {
                _btnObj = bottomlist[i].children[0];
                // _x = 589 - i * 90 + 10;
            }
            if (i >= 1) {
                _x = 589 - i * 90 - 13;
                if (_x < 0) {
                    _x = _x + 13;
                }
            }
            var _btnposition = _btnObj.getPosition();
            _btnposition.y = 0;
            self.btn_pp[_btnObj.uuid] = {
                xy: _btnposition,
                x: _x
            };
            _btnObj.targetOff(_btnObj);
            _btnObj.on(cc.Node.EventType.TOUCH_START, function (event) {
                //牌的Y达到35，允许触摸滑动出牌

                if (this.opacity !== 100 && self.touchStatus) {
                    self.touchStatus = false;

                    self._movepai = cc.instantiate(this);
                    self._movepai.parent = self.node;
                    var x = event.touch.getDelta().x;
                    var y = event.touch.getDelta().y;

                    // var _test = self.node.convertToWorldSpaceAR(this.position);

                    var _y = -265;
                    self._movepai.active = false;
                    self._movepai.setPosition(self.btn_pp[this.uuid]["x"], _y);

                    self.clickStatus = true;
                    self.bottomPaiEvent({currentTarget: this}, this.getComponent(cc.Button).clickEvents[0].customEventData);

                    // this.y = 35;
                }
            }, _btnObj);
            _btnObj.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                var temp_zhuang_flag = cc.sys.localStorage.getItem("table_zhuang");

                if (this.opacity !== 100 && temp_zhuang_flag === "true") {

                    var delta = event.touch.getDelta();
                    if (!self._movepai.active && (Math.abs(delta.x) > 10 || Math.abs(delta.y) > 10)) {
                        self._movepai.active = true;
                        this.y = -180;
                    }
                    self._movepai.x += delta.x;
                    self._movepai.y += delta.y;
                }

            }, _btnObj);
            _btnObj.on(cc.Node.EventType.TOUCH_END, function (event) {

                self.touchStatus = true;
                // event. stopPropagationImmediate();
                self.touchpai(this);
                self.clickStatus = false;
                // if(cc.sys.isNative){
                //     self.bottomPaiEvent({currentTarget: this}, this.getComponent(cc.Button).clickEvents[0].customEventData);
                // }
            }, _btnObj);
            _btnObj.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                self.touchStatus = true;
                self.touchpai(this);
                self.clickStatus = false;
                // self.bottomPaiEvent({currentTarget: this}, this.getComponent(cc.Button).clickEvents[0].customEventData);
            }, _btnObj);
        }

    },
    //处理发送弃牌数据，及伪出牌逻辑处理
    doSendDrop: function (customEventData) {
        if (customEventData.arr) {
            customEventData.arr = [customEventData.arr];
            this._sendSocketMsg(customEventData);
            var _num = this.RoomModel.sieve_plate.allPaiNumber.split("x");
            var data = {
                _Shape: [customEventData.arr[0][0]],
                _SNo: 0,
                _DNo: 0,
                _VC: null,
                _RC: parseInt(_num[1]) - 1,
                _tgCard: customEventData.arr[0][0],
                _tgSNo: 0,
                _IsD: false, _NDC: null
            };
            this.gameService.drop(data);
        } else {
            var fapai = {
                _Cmd: "d",
                _PID: this.loginname,
                _Data: {

                    _Shape: [customEventData]
                }
            };
            cc.MJ.socket.sendGetRequest(fapai, null, this);
            var _num = this.RoomModel.sieve_plate.allPaiNumber.split("x");
            var data = {
                _Shape: [customEventData],
                _SNo: 0,
                _DNo: 0,
                _VC: null,
                _RC: parseInt(_num[1]) - 1,
                _tgCard: customEventData,
                _tgSNo: 0,
                _IsD: false, _NDC: null
            };
            this.gameService.drop(data);
        }
    },
    //下边牌按钮的点击事件
    bottomPaiEvent: function (event, customEventData) {

        var button = event.currentTarget;
        var pp = button.getPosition();

        if (!this.clickStatus) {
            return;
        }
        var temp_zhuang_flag = cc.sys.localStorage.getItem("table_zhuang");
        if (!temp_zhuang_flag) {
            return;
        }

        // var tTouchBool = cc.sys.localStorage.getItem("tTouch");
        // if (tTouchBool === true) {
        //     return;
        // }

        if (button.opacity !== 100) {

            if (pp.y === 35 && temp_zhuang_flag === "true") {
                // cc.log(temp_zhuang_flag);
                cc.sys.localStorage.setItem("table_zhuang", false);
                cc.MJ.common.sound.playSoud("playPai");
                var pai_num = customEventData;
                //this.playPaiSoud(this.soudlist[customEventData]);
                if (this.selectedPai) {
                    var oldselectp = this.selectedPai.getPosition();
                    oldselectp.y = 0;

                    this.selectedPai.setPosition(oldselectp);
                    // var _action = cc.moveTo(0.2, oldselectp);
                    // this.selectedPai.runAction(_action);
                    this.selectedPai = null;
                }
                pp.y = 0;
                button.setPosition(pp);
                // var _action = cc.moveTo(0.2, cc.p(pp.x,0));
                // button.runAction(_action);

                // cc.log(customEventData);
                this.doSendDrop(customEventData);
                // this.sethutips(customEventData);
                this.RoomModel.AHP = [];
                return;


            } else {
                if (this.selectedPai !== null && cc.isValid(this.selectedPai) && this.selectedPai.uuid !== button.uuid) {

                    var oldselectp = this.selectedPai.getPosition();
                    oldselectp.y = 0;
                    // var _selectaction = cc.moveTo(0.1, cc.p(oldselectp.x, 0));
                    // this.selectedPai.runAction(_selectaction);
                    this.selectedPai.setPosition(oldselectp);
                }
                this.sethutips(customEventData);

                pp.y = 35;

                button.setPosition(pp);
                // var _action = cc.moveTo(0.1, cc.p(pp.x, 35));
                // button.runAction(_action);
                this.selectedPai = button;
                var _val = "";
                if (customEventData.arr) {
                    _val = customEventData.arr[0];
                } else {
                    _val = customEventData;
                }
                this.gameService.selectPlayedPai(parseInt(_val), true);

            }
        }
        this.clickStatus = false;
        // cc.log("这是第" + customEventData + "个按钮");
    },
    //点击牌，显示可胡牌
    sethutips: function (customEventData) {
        // cc.log(this.RoomModel.AHP);
        this.RoomModel.hu_popup_bg._active = false;
        if (this.RoomModel.AHP) {
            var _dropCard = 0;
            if (customEventData.arr) {
                _dropCard = customEventData.arr[0];
            } else {
                _dropCard = customEventData;
            }
            cc.log(customEventData);
            cc.log(_dropCard);
            for (var i = 0; i < this.RoomModel.AHP.length; i++) {
                if (parseInt(this.RoomModel.AHP[i]._DCard) === parseInt(_dropCard)) {
                    // this.RoomModel.hu_popup_bg._active = true;
                    this.gameService.setHuList(this.RoomModel.AHP[i]._ATL);
                    this.RoomModel.hu_popup_bg._active = true;
                    // this.scheduleOnce(function () {
                    //     this.RoomModel.hu_popup_bg._active = false;
                    // },3);
                    break;
                } else {
                    this.RoomModel.hu_popup_bg._active = false;
                }
            }

        }
    },
    /**处理出牌事件
     *
     * 包括 点击，滑动，点击胡牌提示
     *
     * **/

    /**处理吃，碰，杠，胡，听，自动胡牌事件
     *
     * **/
    //杠按钮 事件
    gangEvent: function (event, customEventData) {

        var _layout = this.RoomModel.pengLayout;
        for (var i = 0; i < _layout.chitype.length; i++) {
            _layout.chitype[i].pai._active = false;
        }
        var _EventData = JSON.parse(customEventData);
        if (_EventData.arr.length > 1) {
            for (var i = 0; i < _EventData.arr.length; i++) {
                _layout.gangtype[i].p12._active = true;
                var _temp_param = {Code: _EventData.Code, arr: [_EventData.arr[i]]};
                _layout.gangtype[i].p12._button = {_EventData: JSON.stringify(_temp_param), _EventID: 2};
                cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + _EventData.arr[i][0], _layout.gangtype[i].p12);
            }
            var button = event.target.getComponent(cc.Button);
            //button.clickEvents = [];
            for (var j = 0; j < 3; j++) {
                if (j > _EventData.arr.length - 1) {
                    _layout.gangtype[j].p12._active = false;
                }
            }

        } else {
            this.gangDetailEvent(event, customEventData);
        }
    },
    gangDetailEvent: function (event, customEventData) {
        var _EventData = JSON.parse(customEventData);
        //cc.MJ.common.sound.playSoudClip(this.gang_soud);
        var node = event.target;
        // var anim = node.getComponent(cc.Animation);

        //延迟2秒执行动画
        // setTimeout(function () {
        //     //开始动画
        //     anim.play("gangAnimationClip");
        // }, 1000);

        // anim.play("gangAnimationClip");
        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;

        this._sendSocketMsg(_EventData);
        var button = node.getComponent(cc.Button);
        //button.clickEvents = [];

    },
    //吃按钮 事件
    chiEvent: function (event, customEventData) {
        var _layout = this.RoomModel.pengLayout;
        var _EventData = JSON.parse(customEventData);
        for (var i = 0; i < _layout.gangtype.length; i++) {
            _layout.gangtype[i].p12._active = false;
        }
        // cc.log(customEventData);
        if (_EventData.arr.length > 1) {
            for (var i = 0; i < _EventData.arr.length; i++) {
                _layout.chitype[i].pai._active = true;
                var _temp_param = {Code: _EventData.Code, arr: [_EventData.arr[i]]};
                _temp_param = JSON.stringify(_temp_param);

                _layout.chitype[i].pai._button = {_EventData: _temp_param, _EventID: 7};
                var _paiChildren = _layout.chitype[i].pai;

                cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + _EventData.arr[i][0], _paiChildren.pleft);
                cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + _EventData.arr[i][1], _paiChildren.pcenter);
                cc.MJ.common.tool.UITool.buttonLoadImage(null, "Image/pai/my/out/p" + _EventData.arr[i][2], _paiChildren.pright);
            }
            for (var j = 0; j < 3; j++) {
                if (j > _EventData.arr.length - 1) {
                    _layout.chitype[j].pai._active = false;
                }
            }
        } else {
            this.chiDetailEvent(event, customEventData);
        }
    },
    chiDetailEvent: function (event, customEventData) {
        var _EventData = JSON.parse(customEventData);
        var node = event.target;

        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;

        this._sendSocketMsg(_EventData);
    },
    //碰牌事件
    pengEvent: function (event, customEventData) {
        // cc.log("++++++___________________-");
        //cc.MJ.common.sound.playSoudClip(this.peng_soud);
        var node = event.target;
        var btn = node.getComponent(cc.Button);
        // btn.interactable = false;
        // var anim = node.getComponent(cc.Animation);
        var _EventData = JSON.parse(customEventData);
        //延迟2秒执行动画
        // setTimeout(function () {
        //     //开始动画
        //     anim.play("gangAnimationClip");
        // }, 1000);

        // anim.play("pengAnimationClip");
        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;
        this._sendSocketMsg(_EventData);
        var button = node.getComponent(cc.Button);
        //button.clickEvents = [];
    },
    //胡牌事件
    huEvent: function (event, customEventData) {
        //cc.MJ.common.sound.playSoudClip(this.hu_soud);
        var node = event.target;

        // var anim = node.getComponent(cc.Animation);
        var _EventData = JSON.parse(customEventData);
        //延迟2秒执行动画
        // setTimeout(function () {
        //     //开始动画
        //     anim.play("gangAnimationClip");
        // }, 1000);

        // anim.play("huAnimationClip");
        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;

        this._sendSocketMsg(_EventData);

        var button = node.getComponent(cc.Button);
        // button.clickEvents = [];

    },
    //自动胡牌
    autoHu: function (p_data) {
        var _node = this.node.getChildByName("pengLayout").getChildByName("actionType").getChildByName("huBtn");
        this.huEvent({target: _node}, p_data);
    },
    cancelEvent: function (event) {
        var penglayout = this.node.getChildByName("pengLayout");
        penglayout.active = false;
        // this.initHuBtn();
        // this.initPengBtn();
        var fapai = {
            _Cmd: "c",
            _PID: this.loginname
        };
        cc.MJ.socket.sendGetRequest(fapai, null, this);
    },
    //绑定至手牌上
    tingEvent: function (event, customEventData) {
        var _EventData = JSON.parse(customEventData);


        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;

        this._sendSocketMsg(_EventData);//发送至服务器，已听牌并且已打出规定牌中的其中一张
        //此时服务器将返回d的命令告知，已打牌，并通过t命令告知已听牌
    },
    //绑定至手牌上
    tingBtnEvent: function (event, customEventData) {
        var _EventData = JSON.parse(customEventData);


        var _layout = this.RoomModel.pengLayout;
        _layout._active = false;

        this.gameService.ting(_EventData);
    },

    /**处理吃，碰，杠，胡，听，自动胡牌事件
     *
     * **/

    /**通用动作数据发送
     *
     * */
    _sendSocketMsg: function (_EventData) {
        cc.log(_EventData.arr);
        var fapai = {
            _Cmd: _EventData.Code,
            _PID: this.loginname,
            _Data: {

                _Shape: _EventData.arr[0]
            },
        };
        cc.MJ.socket.sendGetRequest(fapai, null, null);
    },
    /**通用动作数据发送
     *
     * */





    fuzhi: function (event, customEventData) {
        cc.MJ.common.jsb.pasteboardByStr(event.target.getComponent(cc.Label).string);
        cc.MJ.alert.tips_msg("复制成功");
    },


    /**桌面按钮事件
     *
     * 包含  单局结算关闭，返回大厅，胡牌灯泡
     *
     */
    closeDanju: function (event, customEventData) {
        var node = event.target;

        node.parent.active = false;

    },
    backtoIndex: function (event, customEventData) {
        cc.MJ.common.jsb.stopPing();
        // cc.director.loadScene("chooseScene");
        if (parseInt(cc.MJ.data.getLocalStorage_roomNo().length) > 6) {
            cc.sys.localStorage.setItem("backclubFlag", "1");
            cc.MJ.common.ui.loadScene("clubInfo");
        } else {
            cc.MJ.common.ui.loadScene("chooseScene");
        }
    },
    hutipsEvent: function (event, customEventData) {
        this.RoomModel.hu_popup_bg._active = !this.RoomModel.hu_popup_bg._active;
    },
    /**桌面按钮事件
     *
     * 包含  单局结算关闭，返回大厅，胡牌灯泡
     *
     */
    onDestroy: function () {
        cc.sys.garbageCollect();
    },
    ctor: function () {
        this.RoomModel = {
            head_bg_s_top: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }, ready_icon: false,
                headtable: {
                    _son: true,
                    _active: false,
                    id: {
                        _son: true,
                        val: ""
                    }, ip: {
                        _son: true,
                        val: ""
                    }, head_pic_s: new cc.SpriteFrame()
                }
            },
            head_bg_s_left: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }, ready_icon: false, headtable: {
                    _son: true,
                    _active: false,
                    id: {
                        _son: true,
                        val: ""
                    }, ip: {
                        _son: true,
                        val: ""
                    }, head_pic_s: new cc.SpriteFrame()
                }
            },
            head_bg_s_right: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }, ready_icon: false,
                headtable: {
                    _son: true,
                    _active: false,
                    id: {
                        _son: true,
                        val: ""
                    }, ip: {
                        _son: true,
                        val: ""
                    }, head_pic_s: new cc.SpriteFrame()
                }
            },
            head_bg_s_bottom: {
                _son: true,
                head_pic_s: new cc.SpriteFrame(),
                label: "",
                zhuang: false,
                net: false,
                Fen: 0,
                ting: false,
                bh_bg: {
                    _son: true,
                    _active: true,
                    h_label: "x0"
                }, ready_icon: false,
                headtable: {
                    _son: true,
                    _active: false,
                    id: {
                        _son: true,
                        val: ""
                    }, ip: {
                        _son: true,
                        val: ""
                    }, head_pic_s: new cc.SpriteFrame()
                }
            },
            RoomInfoLabel: "",
            sieve_plate: {
                _son: true,
                Second: {
                    _son: true, leftNumber: new cc.SpriteFrame(), rightNumber: new cc.SpriteFrame()
                },
                zhuang: {
                    _son: true,
                    leftzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    topzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    rightzhuang: {_son: true, _sprite: new cc.SpriteFrame()},
                    bottomzhuang: {_son: true, _sprite: new cc.SpriteFrame()}
                },
                allPaiNumber: "x0"
            },
            ready_btn: false,
            bulb_btn: false,
            voice: {
                _son: true,
                rightVoice: {_son: true, timelabel: 60, _active: false},
                leftVoice: {_son: true, timelabel: 60, _active: false},
                topVoice: {_son: true, timelabel: 60, _active: false},
                bottomVoice: {_son: true, timelabel: 60, _active: false},
            },
            textMessage: {
                _son: true,
                leftmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                rightmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                topmsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
                bottommsg: {_son: true, timelabel: "我等得花都谢了", _active: false},
            },
            pengLayout: {
                _son: true,
                _active: false,
                actionType: {
                    _son: true,
                    pengBtn: new Global_CommonModule({_EventData: "0", _EventID: 3}, false, true),
                    gangBtn: new Global_CommonModule({_EventData: "0", _EventID: 1}, false, true),
                    huBtn: new Global_CommonModule({_EventData: "0", _EventID: 4}, false, true),
                    cancelbtn: new Global_CommonModule({_EventData: "0", _EventID: 5}, true, true),
                    chiBtn: new Global_CommonModule({_EventData: "0", _EventID: 6}, false, true),
                    tingBtn: new Global_CommonModule({_EventData: "0", _EventID: 9}, false, true)
                },

                chitype: [
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    },
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    },
                    {
                        pai: {
                            _son: true,
                            _button: {_EventData: "0", _EventID: 7},
                            _active: false,
                            pleft: {_son: true, _sprite: new cc.SpriteFrame()},
                            pcenter: {_son: true, _sprite: new cc.SpriteFrame()},
                            pright: {_son: true, _sprite: new cc.SpriteFrame()},
                        }
                    }
                ],
                gangtype: [
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})},
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})},
                    {p12: new Global_CommonModule({_EventData: "0", _EventID: 2})}
                ],

            },
            playGame: {
                _son: true,
                _active: true,
                left_pai: [
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false},
                    {left: false}],
                bottom_pai: [{
                    top: {
                        _son: true,
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    }
                },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _button: {_EventData: "0", _EventID: 0},
                            _opacity: 255,
                            _active: true
                        }
                    }],
                right_pai: [{right: false}, {right: false}, {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},
                    {right: false},],
                top_pai: [
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false},
                    {top: false}
                ]
            },
            huselecttips: [
                {tips: {_son: true, _opacity: 0}}, {tips: {_son: true, _opacity: 0}}, {
                    tips: {
                        _son: true,
                        _opacity: 0
                    }
                }, {tips: {_son: true, _opacity: 0}}, {tips: {_son: true, _opacity: 0}}, {
                    tips: {
                        _son: true,
                        _opacity: 0
                    }
                }, {tips: {_son: true, _opacity: 0}}, {tips: {_son: true, _opacity: 0}}, {
                    tips: {
                        _son: true,
                        _opacity: 0
                    }
                }, {tips: {_son: true, _opacity: 0}}, {tips: {_son: true, _opacity: 0}}, {
                    tips: {
                        _son: true,
                        _opacity: 0
                    }
                }, {tips: {_son: true, _opacity: 0}}, {tips: {_son: true, _opacity: 0}}
            ],
            endGame: {
                _son: true,
                _active: false,
                left_pai: [
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        left: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }],
                bottom_pai: [
                    {
                        top: {
                            _son: true,
                            temp1: {
                                _son: true,
                                _sprite: new cc.SpriteFrame(),
                                _opacity: 255,
                                _active: true
                            }
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        temp1: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }],
                right_pai: [{
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                }, {
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                }, {
                    right: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        _opacity: 255,
                        _active: true
                    }
                },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        right: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },],
                top_pai: [
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    },
                    {
                        top: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _active: true
                        }
                    }
                ]
            },
            left_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                    }
                },
            ],
            right_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            bottom_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            top_action: [
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
                {
                    gang_pai: {
                        _son: true,
                        _active: true,
                        pai_left: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_center: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_right: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        },
                        pai_top: {
                            _son: true,
                            _active: false,
                            _sprite: new cc.SpriteFrame(),
                            _opacity: 255,
                            _color: new cc.Color(255, 255, 255),
                            jt: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                        }
                    }
                },
            ],
            leftPlayPaiLayout: [
                {
                    left: new Global_CommonModule()
                },
                {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                }, {
                    left: new Global_CommonModule()
                },
            ],
            rightPlayPaiLayout: [
                {
                    right: new Global_CommonModule()
                },
                {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    right: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                }, {
                    RightPlaypaiQie: new Global_CommonModule()
                },
            ],
            bottomPlayPaiLayout: [
                {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottom: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }, {
                    bottomPlayPaiQie: new Global_CommonModule()
                }

            ],
            topPlayPaiLayout: [
                {
                    top: new Global_CommonModule()
                },
                {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }, {
                    top: new Global_CommonModule()
                }
            ],
            bottomHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            leftHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            topHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            rightHua: [
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }, {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                },
                {
                    hua: {_son: true, _active: false, _sprite: new cc.SpriteFrame()}
                }
            ],
            leftShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            rightShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            topShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            bottomShow: {
                _son: true,
                _active: false,
                _sprite: new cc.SpriteFrame()
            },
            liuju: false,
            ZJ_qm: {
                _son: true,
                _active: false,
                time_label: "时间",
                room_label: "房间规则",
                roomright_label: {
                    _son: true,
                    label1: "杠",
                    label2: "鸟",
                    label3: "胡",
                    label4: "分数",
                },
                content: {
                    _son: true,
                    item1: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: {
                            _son: true,
                            zimo: false,
                            hupai: false,
                            dianpao: false
                        },
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item2: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        }, pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: {
                            _son: true,
                            zimo: false,
                            hupai: false,
                            dianpao: false
                        },
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item3: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: {
                            _son: true,
                            zimo: false,
                            hupai: false,
                            dianpao: false
                        },
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                    item4: {
                        _son: true,
                        head_sprite: {
                            _son: true,
                            _sprite: new cc.SpriteFrame(),
                            zhuang_sprite: false,
                            name: ""
                        },
                        item_label: "",
                        pailayout: {
                            _son: true,
                            listlayout: [
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                                {paiItem: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}},
                            ],
                            actionglayout: [
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                },
                                {
                                    gang_pai: {
                                        _son: true,
                                        _active: false,
                                        pai_left: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_center: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_right: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                                        pai_top: {_son: true, _sprite: new cc.SpriteFrame(), _active: false}
                                    }
                                }
                            ],

                        },
                        pai: {_son: true, _sprite: new cc.SpriteFrame(), _active: false},
                        typelabel: {
                            _son: true,
                            zimo: false,
                            hupai: false,
                            dianpao: false
                        },
                        cyf_label: "",
                        hlzf_label: "",
                        gf_label: "",
                        ff_label: ""
                    },
                }
            },
            ZJ_room: {
                _son: true,
                _active: false,
                time_label: "",
                room_label: "",
                roomitem: "",
                roomItem1: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem2: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem3: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },
                roomItem4: {
                    _son: true,
                    head_sprite: {
                        _son: true,
                        _sprite: new cc.SpriteFrame(),
                        fz_sprite: false

                    },
                    head_label1: "",
                    head_label2: "",
                    head_label3: "",
                    left_label: {
                        _son: true,
                        left_label1: {
                            _son: true,
                            label1: "",
                        },
                        left_label2: {
                            _son: true,
                            label2: "",
                        },
                        left_label3: {
                            _son: true,
                            label3: "",
                        },
                        left_label4: {
                            _son: true,
                            label4: "",
                        },
                        left_label5: {
                            _son: true,
                            label5: "",
                        }
                    },

                    num_label: {_son: true, _string: "", _color: new cc.Color()},
                    dyj_sprite: false,
                    zjps_sprite: false
                },


            },
            play_popup_bg: {
                _son: true,
                roomtypeLabel: "",
                qiaoma: {
                    _son: true,
                    _active: false,
                    dihua: {_son: true, selected: false, unselected: false},
                    wanfa: {_son: true, selected: false, unselected: false},
                    lezi: {
                        _son: true,
                        ten: {_son: true, selected: false, unselected: false},
                        twenty: {_son: true, selected: false, unselected: false}
                    }
                },
                huanghuang: {
                    _son: true,
                    _active: false,
                    wanfa: {
                        _son: true,
                        zimo: {_son: true, selected: false, unselected: false},
                        hongzhong: {_son: true, selected: false, unselected: false}
                    },
                    niao: {
                        _son: true,
                        two: {_son: true, selected: false, unselected: false},
                        four: {_son: true, selected: false, unselected: false},
                        six: {_son: true, selected: false, unselected: false},
                        eight: {_son: true, selected: false, unselected: false}
                    }
                }
            },
            hu_popup_bg: {
                _son: true,
                _active: false,
                tips: false,
                cell: true,
                hu_cont_bg1: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg2: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg3: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg4: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg5: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg6: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg7: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg8: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg9: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg10: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg11: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg12: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg13: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg14: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg15: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                },
                hu_cont_bg16: {
                    _son: true,
                    _active: true,
                    pai: new cc.SpriteFrame(),
                    num: ""
                }
            },
            jiesan: {
                _son: true,
                _active: false,
                refuse: true,
                agree: true,
                confirm: false,
                content: {
                    _son: true,
                    name: "",
                    staticlabel: ""
                }
            }, buhuaShow: false
        };
    },
    //用于处理单击空白处隐藏弹框等处理的事件
    NodeClickEventInit: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.clearShowbox("");
            self.clearPaiposition();
        }, this.node);
    },
    clearPaiposition: function () {
        var _pai = this.node.getChildByName("playGame").getChildByName("bottom_pai");
        for (var i = 0; i < _pai.children.length; i++) {
            var _tempObj = null;
            if (i === 0) {
                _tempObj = _pai.children[i].getChildByName("temp1");
            } else {
                _tempObj = _pai.children[i]
            }
            _tempObj.y = 0;
        }
    },
    // use this for initialization
    onLoad: function () {

        if (!cc.MJ) {
            cc.director.loadScene('ConfigScene');
        }
        cc.sys.localStorage.setItem("tTouch", false);

        cc.sys.localStorage.setItem("sceneName", "gameScene");
        cc.sys.localStorage.setItem("table_zhuang", true);
        this.loginname = cc.sys.localStorage.getItem('_PID');
        this.roomNo = cc.sys.localStorage.getItem('roomNo');
        //this.finger_node = cc.instantiate(this.node.getChildByName("finger"));
        cc.MJ.common.sound.stopPlay();
        if (cc.MJ.common.sound.getPlayState() !== 1) {
            cc.MJ.common.sound.playbgMusic("gaming");
        }
        var fapai = {
            _Cmd: "room",
            _PID: this.loginname,
            _Data: {

                _RNo: this.roomNo    //  房间号
            }
        }
        // cc.log(cc.MJ.module.game);
        // this.RoomModel = cc.MJ.module.game.RoomModule;
        this.NodeClickEventInit();

        var playType = cc.MJ.data.getLocalStorage_playType();
        cc.MJ.module.game.RoomModule = this.RoomModel;
        if (playType === "qiaoma") {
            this._specialLayout = this.cangying_layout;
            this.gameService = this.node.addComponent("qiaoma");
        } else {
            this._specialLayout = this.niao_layout;
            this.gameService = this.node.addComponent("huanghuang");
        }

        /* var huanghuang = require("huanghuang");
         this.gameService = new huanghuang();*/
        this.gameService._FingerNode = this.node.getChildByName("finger");

        var _EventList = [
            {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "bottomPaiEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "gangEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "gangDetailEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "pengEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "huEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "cancelEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "chiEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "chiDetailEvent"
            }, {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "tingEvent"
            },
            {
                _targetObj: this.node,
                _targetName: "aSceneGame",
                _handlerName: "tingBtnEvent"
            },
        ];

        this.RoomModel.ZJ_qm._active = false;
        this.RoomModel.ZJ_room._active = false;
        this.initEvent();
        cc.MJ.common.tool.bindData.bindObjAndNode(this.RoomModel, this.node, _EventList);

        // this.setSafeData("");
        // return;
        cc.MJ.socket.sendGetRequest(fapai, null, null);
        //this.bird([1,5,8,9], this.niao_layout);
        // this.gameService.danju("");
        //this.gameService.zongfen("");
        // cc.MJ.socket.closeConnect();
        this.safeLoad = false;
        cc.MJ.alert.show_net_tips();
        // var urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        // var url = urlReg.exec(cc.MJ.config.Url);
        // cc.log(url[0]);
        cc.MJ.common.jsb.startPing();


    }
    ,
    //初始化数据响应事件
    initEvent: function () {

        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        // cc.log(_config);
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

        this.node.on(_eventList.room.EventName, function (data) {
            // cc.log("进来了11111");
            // cc.log(data.detail._Data);
            if (data.detail._Data) {
                cc.MJ.data.setLocalStorage_playType(data.detail._Data._GOM.playtype);
                var _step = cc.sys.localStorage.getItem("_Step");
                if (_step !== "0") {
                    if (parseInt(data.detail._Data._Step) > parseInt(_step)) {

                        self.initRoom(data.detail._Data);
                    }
                } else {
                    cc.sys.localStorage.setItem("_Step", data.detail._Data._Step);
                    self.initRoom(data.detail._Data);
                    if (data.detail._Data._IsSC) {
                        self.playshaiziAction(self.initRoom, data.detail._Data);
                    } else {
                        if (!data.detail._Data._IsEG) {
                            self.gameService.fapai();
                        }


                    }


                    cc.sys.localStorage.setItem("ComfirmFlag", true);
                }
                // self.zongjieduan(null);
                // self.bird("",self._specialLayout);
                var li = {
                    "_Cmd": "li",
                    "_PID": self.loginname,
                    "_Data": {
                        "_Ip": null,    //  指定座位编号（-1表示系统安排）
                        "_Longitude": null,    //  房间号
                        "_Latitude": null
                    }
                };
                cc.MJ.socket.sendGetRequest(li, null, null);
                // self.gameService.danju("");
            } else {
                cc.director.loadScene("chooseScene");
            }


        });

        this.node.on(_eventList.start.EventName, function (data) {

            if (data.detail._IsS) {
                self.playshaiziAction(self.nextTable, data.detail._Data);
                self.nextTable(data.detail._Data);
            }

        });
        // this.node.on(_eventList.emoji.EventName, function (data) {
        //
        //     if (data.detail._IsS) {
        //
        //         // self.nextTable(data.detail._Data);
        //     }
        //
        // });

        function autoplay(data) {
            var _ting = cc.sys.localStorage.getItem("ting");
            if (_ting === "true" && data.detail._Data._VC === null && data.detail._Data._SNo === 0) {
                var _shape = data.detail._Data._Shape;
                if (parseInt(_shape[0]) < 35) {
                    self.scheduleOnce(function () {
                        var fapai = {
                            _Cmd: "d",
                            _PID: self.loginname,
                            _Data: {

                                _Shape: _shape
                            }
                        };
                        cc.MJ.socket.sendGetRequest(fapai, null, this);
                        var _num = self.RoomModel.sieve_plate.allPaiNumber.split("x");
                        var _data = {
                            _Shape: _shape,
                            _SNo: 0,
                            _DNo: 0,
                            _VC: null,
                            _RC: parseInt(_num[1]) - 1,
                            _tgCard: _shape,
                            _tgSNo: 0,
                            _IsD: false
                        };
                        self.gameService.drop(_data);
                    }, 1);
                }

            }
        }

        this.node.on(_eventList.m.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.mo(data.detail._Data);
                autoplay(data);


            }
        });
        this.node.on(_eventList.p.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.peng(data.detail._Data);
            }
        });
        // this.node.on(_eventList.c.EventName, function (data) {
        //     var _flag = isNextStep(data);
        //
        // });
        this.node.on(_eventList.lg.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.lg(data.detail._Data);
            }

        });
        this.node.on(_eventList.dg.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.dg(data.detail._Data);
            }

        });
        this.node.on(_eventList.fg.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.fg(data.detail._Data);
            }
        });
        this.node.on(_eventList.b.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.bu(data.detail._Data);
                autoplay(data);
            }
        });
        this.node.on(_eventList.d.EventName, function (data) {
            // cc.log("响应qipai");
            if (!data.detail._IsS) {
                var _step = cc.sys.localStorage.getItem("_Step");
                cc.sys.localStorage.setItem("_Step", parseInt(_step) - 1);
                var fapai = {
                    _Cmd: "room",
                    _PID: self.loginname,
                    _Data: {

                        _RNo: self.roomNo    //  房间号
                    }
                };
                cc.MJ.socket.sendGetRequest(fapai, null, null);
                // cc.sys.localStorage.setItem("table_zhuang", true);
            } else {
                var _flag = isNextStep(data);
                if (_flag) {
                    // cc.log("执行qipai");
                    if (data.detail._Data._SNo !== 0) {
                        self.drop(data.detail._Data);
                    }

                }
            }

        });
        this.node.on(_eventList.h.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.hu(data.detail._Data);

            }
        });
        this.node.on(_eventList.j.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.bird(data.detail._Data, self._specialLayout);
            }
        });
        this.node.on(_eventList.genv.EventName, function (data) {
            if (data.detail._Data) {
                self.SetUserInfo(data.detail._Data);
            }


        });
        this.node.on(_eventList.te.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.danju(data.detail._Data);
            }


        });
        this.node.on(_eventList.re.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.zongjieduan(data.detail._Data);
            }


        });
        this.node.on(_eventList.e.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.chi(data.detail._Data);
            }
        });
        this.node.on(_eventList.f.EventName, function (data) {
            var _flag = isNextStep(data);
            if (_flag) {
                self.buhua(data.detail._Data);
            }
        });
        this.node.on(_eventList.t.EventName, function (data) {
            if (!data.detail._IsS) {
                var _step = cc.sys.localStorage.getItem("_Step");
                cc.sys.localStorage.setItem("_Step", parseInt(_step) - 1);
                var fapai = {
                    _Cmd: "room",
                    _PID: self.loginname,
                    _Data: {

                        _RNo: self.roomNo    //  房间号
                    }
                };
                cc.MJ.socket.sendGetRequest(fapai, null, null);
                // cc.sys.localStorage.setItem("table_zhuang", true);
            } else {
                var _flag = isNextStep(data);
                if (_flag) {
                    self.tingpai(data.detail._Data);
                }
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
                    cc.log("解散发起了！！！！！！");
                    self.RoomModel.jiesan._active = true;
                    self.RoomModel.jiesan.confirm = false;
                    self.RoomModel.jiesan.agree = false;
                    self.RoomModel.jiesan.refuse = false;
                    self.RoomModel.jiesan.content.name = "";
                    self.RoomModel.jiesan.content.staticlabel = "已发起解散房间，请等待其他玩家选择";
                } else {
                    var _seat = cc.MJ.module.game.seatInfo;
                    var _seatName = "head_bg_s_" + _seat[data.detail._Data._SNo];

                    self.RoomModel.jiesan._active = true;
                    self.RoomModel.jiesan.confirm = false;
                    self.RoomModel.jiesan.agree = true;
                    self.RoomModel.jiesan.refuse = true;
                    self.RoomModel.jiesan.content.name = self.RoomModel[_seatName].label;
                    self.RoomModel.jiesan.content.staticlabel = "     请求解散房间";
                }

            }
        });
        this.node.on(_eventList.li.EventName, function (data) {

            if (data.detail._Data) {
                self.safeLoad = true;
                self.safeData = data.detail._Data._LIS;
                self.setSafeData(self.safeData);

            }
        });
        this.node.on(_eventList.readyg.EventName, function (data) {

            if (data.detail._Data) {

                self.setReady(data.detail._Data);

            }
        });

    },

    //骰子动画
    playshaiziAction: function (p_func, p_data) {
        var _fatherNode = this.node.getChildByName("shaizi");
        var _s1 = _fatherNode.getChildByName("shaizi1");
        var _s2 = _fatherNode.getChildByName("shaizi2");
        _fatherNode.active = true;
        var _actionNode = _fatherNode.getChildByName("shaizi_anmi");
        var _action = _actionNode.getComponent(cc.Animation);
        _actionNode.active = true;
        _s1.active = false;
        _s2.active = false;
        var self = this;
        cc.MJ.common.sound.playSoud("shaizi");
        _action.on("finished", function () {
            _actionNode.active = false;
            _s1.active = true;
            _s2.active = true;
            cc.MJ.common.tool.UITool.buttonLoadImage(_s1, "actionImage/shaizi/shaizi" + Math.floor(Math.random() * 6 + 1));
            cc.MJ.common.tool.UITool.buttonLoadImage(_s2, "actionImage/shaizi/shaizi" + Math.floor(Math.random() * 6 + 1));

            this.scheduleOnce(function () {
                _s1.active = false;
                _s2.active = false;
                _fatherNode.active = false;
                // p_func.call(self,p_data);
                // self.gameService.fapai();
                self.fapaiAction();
            }, 1);
            // _emoji.getComponent(cc.Sprite).spriteFrame = self._emoji[p_obj._ECode];
        }, this);
        _action.play();
    },
    //发牌动画
    fapaiAction: function () {
        var _fapaiAction = this.node.getChildByName("fapaiAction");
        for (var i = 0; i < _fapaiAction.children.length; i++) {
            _fapaiAction.children[i].active = false;
        }
        _fapaiAction.active = true;
        this.RoomModel.playGame._active = false;

        var self = this;

        // 以秒为单位的时间间隔
        var interval = 0.5;
        // 重复次数
        var repeat = 3;
        // 开始延时
        var delay = 0;
        var _num = 0;

        //根据是否庄决定牌的数量
        var _pailength = this.RoomModel._zhuangNo === 0 ? 14 : 13;
        this.schedule(function () {
            cc.MJ.common.sound.playSoud("fapai");
            var _length = _num + 4 > _fapaiAction.children.length ? _pailength : _num + 4;
            for (var i = _num; i < _length; i++) {
                _fapaiAction.children[i].active = true;
                _num++;
            }
            if (_pailength === _num) {
                self.RoomModel.playGame._active = true;
                self.gameService.fapai();
                cc.MJ.common.sound.playSoud("gameStart");
                for (var i = 0; i < _fapaiAction.children.length; i++) {
                    _fapaiAction.children[i].active = false;
                }
                _fapaiAction.active = false;
            }
        }, interval, repeat, delay);

    },
    //循环播放光晕动画
    setDayingiaAction: function () {
        for (var i = 0; i < this.guangyun.length; i++) {
            var rotationTo = cc.repeat(cc.rotateBy(0.3, 360, 360), 5);
            var _action = this.guangyun[i].runAction(rotationTo);
        }

    },

    /**安全检测数据处理
     *
     * */
    //设置安全检测数据
    setSafeData: function (data) {

        var temparr = [];
        // data = [
        //     {
        //         "_SNo": 0,
        //         "_Ip": "1.1.1.1",
        //         "_Longitude": "543", //经度
        //         "_Latitude": "34" //纬度
        //     },
        //     {
        //         "_SNo": 3,
        //         "_Ip": "1.1.1.1",
        //         "_Longitude": "543", //经度
        //         "_Latitude": "34" //纬度
        //     },
        //     {
        //         "_SNo": 1,
        //         "_Ip": "1.1.2.1",
        //         "_Longitude": "543", //经度
        //         "_Latitude": "34" //纬度
        //     },
        //     {
        //         "_SNo": 2,
        //         "_Ip": "1.1.1.2",
        //         "_Longitude": "543", //经度
        //         "_Latitude": "34" //纬度
        //     }]

        data.sort(function (a, b) {
            return a._SNo - b._SNo;
        });
        var _flag = true;
        var iparr = [];
        var iparr_false = [];
        var disarr = [];
        for (var k = 0; k < data.length; k++) {
            //cc.MJ.common.jsb.distanceNum();
            this.setSafeBasic(data[k]);
            for (var i = k + 1; i < data.length; i++) {
                var _arr = [data[k]._SNo, data[i]._SNo];
                _arr.sort(function (a, b) {
                    return a - b;
                });
                var _distance = cc.MJ.common.jsb.distanceNum(data[k]._Latitude, data[k]._Longitude, data[i]._Latitude, data[i]._Longitude);
                // _distance = 12220;
                var ip_flag = data[k]._Ip === data[i]._Ip ? false : true;
                if ((_distance < 100 || !ip_flag) && _flag) {
                    _flag = false;
                }
                var _value = _arr.join("_");
                temparr.push(_value);

                iparr.push({sno: _value, ip: ip_flag});
                if (_distance < 100 && _distance !== "") {
                    disarr.push({sno: _value, dis: false});
                }
                if (!ip_flag) {
                    iparr_false.push({sno: _value, ip: ip_flag});
                }
                this.setSafeContent(_value, _distance, ip_flag);

            }
        }
        //根据是否安全的flag,设置红绿切换
        var _fatherNode = this.node.getChildByName("scanning_popup");
        var closebtn = _fatherNode.getChildByName("close_btn");
        var security_icon = _fatherNode.getChildByName("security_icon");
        var notice_list_box = _fatherNode.getChildByName("notice_list_box");
        var demo_item = _fatherNode.getChildByName("item");
        var notice_out = this.node.getChildByName("safe_logo");

        for (var a = 0; a < data.length; a++) {
            var _sno = data[a]._SNo;
            var _tempFlag = true;
            for (var k = 0; k < iparr.length; k++) {


                var _user_arr = iparr[k].sno.split("_");
                for (var i = 0; i < _user_arr.length; i++) {
                    if (_user_arr[i].toString() === _sno.toString() && !iparr[k].ip) {
                        _tempFlag = false;
                        break;
                    }
                }

            }
            var user1 = _fatherNode.getChildByName("headbox").getChildByName("box" + _sno);
            var ip1 = user1.getChildByName("ip");
            if (!_tempFlag) {
                ip1.color = cc.Color.RED;

            } else {
                ip1.color = cc.Color.GREEN;
            }

        }

        var _seat_Data = this.RoomModel;
        var _seat = cc.MJ.module.game.seatInfo;


        var content_box = notice_list_box.getChildByName("view").getChildByName("content");
        for (var i = 1; i < content_box.children.length; i++) {
            content_box.children[i].destroy();
        }
        content_box.height = demo_item.height * disarr.length + iparr_false.length * demo_item.height + (disarr.length + iparr_false.length) * 10 + 200;
//右侧信息展示
        for (var a = 0; a < disarr.length; a++) {
            var temp_item = cc.instantiate(demo_item);
            content_box.addChild(temp_item);

            var _user_arr = disarr[a].sno.split("_");
            var _seatName1 = "head_bg_s_" + _seat[_user_arr[0]];
            var _seatName2 = "head_bg_s_" + _seat[_user_arr[1]];
            // var _label = temp_item.getChildByName("label").getComponent(cc.Label);
            temp_item.setPosition(0, 0);
            var _name1 = temp_item.getChildByName("name1").getComponent(cc.Label);
            var _name2 = temp_item.getChildByName("name2").getComponent(cc.Label);
            var _content = temp_item.getChildByName("content").getComponent(cc.Label);
            _name1.string = _seat_Data[_seatName1].label;
            _name2.string = _seat_Data[_seatName2].label;
            _content.string = "[距离过近]";
            // _label.string = _seat_Data[_seatName1].label+ "与" + _seat_Data[_seatName2].label + "[距离过近]";

        }
        for (var a = 0; a < iparr_false.length; a++) {
            var temp_item = cc.instantiate(demo_item);
            content_box.addChild(temp_item);
            var _user_arr = iparr_false[a].sno.split("_");
            var _seatName1 = "head_bg_s_" + _seat[_user_arr[0]];
            var _seatName2 = "head_bg_s_" + _seat[_user_arr[1]];
            // var _label = temp_item.getChildByName("label").getComponent(cc.Label);
            temp_item.setPosition(0, 0);
            var _name1 = temp_item.getChildByName("name1").getComponent(cc.Label);
            var _name2 = temp_item.getChildByName("name2").getComponent(cc.Label);
            var _content = temp_item.getChildByName("content").getComponent(cc.Label);
            _name1.string = _seat_Data[_seatName1].label;
            _name2.string = _seat_Data[_seatName2].label;
            _content.string = "[ip一样]";
            // _label.string = _seat_Data[_seatName1].label + "与" + _seat_Data[_seatName2].label + "[ip一样]";

        }

        if (_flag) {
            cc.MJ.common.tool.UITool.buttonLoadImage(_fatherNode, "backImage/scanning_popup_green", null);
            cc.MJ.common.tool.UITool.buttonLoadImage(closebtn, "backImage/clost_btn_green", null);
            cc.MJ.common.tool.UITool.buttonLoadImage(notice_out, "backImage/safe_logo", null);
            security_icon.active = true;
            notice_list_box.active = false;


        } else {
            cc.MJ.common.tool.UITool.buttonLoadImage(_fatherNode, "backImage/scanning_popup_red", null);
            cc.MJ.common.tool.UITool.buttonLoadImage(closebtn, "backImage/close_btn", null);
            cc.MJ.common.tool.UITool.buttonLoadImage(notice_out, "backImage/notice_logo", null);
            security_icon.active = false;
            notice_list_box.active = true;
        }

    },
    //设置安全检测基础用户数据
    setSafeBasic: function (user) {
        var _seat_Data = this.RoomModel;
        var _seat = cc.MJ.module.game.seatInfo;
        var _seatName = "head_bg_s_" + _seat[user._SNo];

        var _fatherNode = this.node.getChildByName("scanning_popup");
        var user1 = _fatherNode.getChildByName("headbox").getChildByName("box" + user._SNo);

        var ip = user1.getChildByName("ip").getComponent(cc.Label);
        var name = user1.getChildByName("name").getComponent(cc.Label);
        var head = user1.getChildByName("head").getComponent(cc.Sprite);

        name.string = _seat_Data[_seatName].label;
        head.spriteFrame = _seat_Data[_seatName].head_pic_s;
        ip.string = user._Ip === null ? "暂未检测" : user._Ip;

        _seat_Data[_seatName].headtable.ip.val = ip.string;

    },
    //设置安全检测右侧内容数据
    setSafeContent: function (key, distance, ip_flag) {


        var _fatherNode = this.node.getChildByName("scanning_popup");
        var _node = _fatherNode.getChildByName("headline").getChildByName("line" + key);
        var ctx = _node.getComponent(cc.Graphics);
        var _labelnode = _node.getChildByName("label" + key);
        var _label = _labelnode.getComponent(cc.Label);
        if (distance !== "") {
            var _content = distance > 1000 ? "超过1000" : distance
            _label.string = "相距" + _content + "米";
        } else {
            _label.string = "暂未检测";
        }

        ctx.lineWidth = 5;
        if (distance < 100) {
            ctx.strokeColor = cc.Color.RED;
            _labelnode.color = cc.Color.RED;

        } else {
            ctx.strokeColor = cc.Color.GREEN;
            _labelnode.color = cc.Color.GREEN;
        }


        ctx.moveTo(0, 0);
        ctx.lineTo(_node.width, 0);
        ctx.stroke();

    },
    closeSafe: function (event) {
        var _fatherNode = this.node.getChildByName("scanning_popup");
        _fatherNode.active = false;
    },
    showSafe: function (event) {

        if (!this.safeLoad) {
            cc.MJ.alert.tips_msg("正在检测中，请稍后查看");
            var li = {
                "_Cmd": "li",
                "_PID": self.loginname,
                "_Data": {
                    "_Ip": null,    //  指定座位编号（-1表示系统安排）
                    "_Longitude": null,    //  房间号
                    "_Latitude": null
                }
            };
            cc.MJ.socket.sendGetRequest(li, null, this);
        } else {
            var _fatherNode = this.node.getChildByName("scanning_popup");
            _fatherNode.active = true;
        }
    },
    /**安全检测数据处理
     *
     * */


    /**底层麻将逻辑处理
     *
     * */
    nextTable: function (data) {
        this.gameService.nextGame(data, {loginName: this.loginname, roomNo: this.roomNo});
    }
    ,
    SetUserInfo: function (data) {
        this.gameService.setgenv(data);
    }
    ,
    drop: function (data) {
        this.gameService.drop(data);
    }
    ,
    bu: function (data) {
        this.gameService.mo(data, true);
    }
    ,
    mo: function (data) {
        this.gameService.mo(data);
    }
    ,
    peng: function (data) {
        this.gameService.peng(data);
    }
    ,
    hu: function (data) {
        this.gameService.hu(data);
    }
    ,
    bird: function (data, birdNode) {

        this.gameService.birdshow(data, birdNode);
    }
    ,
    lg: function (data) {
        this.gameService.gang(data, "lg");
    }
    ,
    dg: function (data) {
        this.gameService.gang(data, "dg");
    }
    ,
    fg: function (data) {
        this.gameService.gang(data, "fg");
    }
    ,
    initRoom: function (data) {
        cc.log(this);
        this.gameService.init(data);
        this.bindbottomPaiTouchEvent();
    }
    ,
    danju: function (data) {
        this.gameService.danju(data, this.danjujiesuan);
    }
    ,
    zongjieduan: function (data) {
        cc.log("________________________");
        //播放光晕动画
        this.setDayingiaAction();
        this.gameService.zongfen(data, this.zongjiesuan);
    }
    ,
    chi: function (data) {
        // cc.log("吃的按钮的回调事件");
        // var playType = cc.MJ.data.getLocalStorage_playType();
        // cc.log("-----------" + playType);
        // // cc.log(data);
        // cc.log(this.gameService.name);
        this.gameService.chi(data);
    }
    ,
    buhua: function (data) {
        this.gameService.buhua(data);
    }
    ,
    tingpai: function (data) {
        this.gameService.t(data);
    }
    ,
    readyEvent: function () {
        this.gameService.readyGame();
    }
    ,
    setReady: function (p_obj) {
        this.gameService.setReadyShow(p_obj);
    },
    /**底层麻将逻辑处理
     *
     * */
    //分享
    ShareWeIChat: function () {
        cc.MJ.common.jsb.weiChatShareImage(this);
    }
});

