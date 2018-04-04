cc.Class({
    extends: cc.Component,

    properties: {
        mesagge: "",
        mobile: ""
    },

    // use this for initialization
    onLoad: function () {
        this.initEvent();
    },

    //文本框监听事件
    textEditBoxDidBeginEditing: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxDidBeginEditing");
    },

    textEditBoxDidChanged: function (text, sender) {
        // cc.log(sender.node.name + " multi line editBoxDidChanged: " + text);
        this.message = text;
    },

    textEditBoxDidEndEditing: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxDidEndEditing: " + this.textEditBox.string);
    },

    textEditBoxDidReturn: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxReturn: " + this.textEditBox.string);
    },

    //输入电话号码文本框监听事件
    phoneNumEditBoxDidBeginEditing: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxDidBeginEditing");
    },

    phoneNumEditBoxDidChanged: function (text, sender) {
        // cc.log(sender.node.name + " multi line editBoxDidChanged: " + text);
        this.mobile = text;
    },

    phoneNumEditBoxDidEndEditing: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxDidEndEditing: " + this.textEditBox.string);
    },

    phoneNumEditBoxDidReturn: function (sender) {
        // cc.log(sender.node.name + " multi line editBoxReturn: " + this.textEditBox.string);
    },

    //提交
    tijiaoBtnClick: function () {
        cc.log("这是一个提交按钮");
        if (this.message !== "" && this.mobile !== "") {
            var fapai = {_Message: this.message, _mobile: this.mobile};
            this.requestSuggest(fapai);
        }else {
            cc.MJ.alert.tips_msg("建议信息或手机号不能为空");
        }
    },

    closeBtn: function () {
        cc.log("捡来勒戒离开的骄傲放假啊接口的放假啊了=======");
        this.node.active = false;
        this.node.emit('backHUD');
    },

    //客服建议
    requestSuggest:function (obj) {
        var _PID_temp = cc.MJ.data.getLocalStorage_LoginName();
        var suggestData = {
            "_Cmd": "suggest",
            "_PID": _PID_temp,
            "_Data": {
                "_Msg": obj._Message,       //  建议内容
                "_Mobile": obj._mobile    //  客户手机号
            }
        };
        cc.MJ.socket.sendGetRequest(suggestData,null,this);
    },

    //注册事件
    initEvent:function () {
        // var self = this;
        // require("EventConfig");
        // var _config = cc.MJ.data;
        // var _eventList = _config.DataBackMap;
        // _config.currentHandle = this.node;
        //
        // //客服建议
        // this.node.on(_eventList.suggest.EventName, function (data) {
        //     if (data.detail._IsS) {
        //         cc.log("客服建议成功");
        //         self.closeBtn();
        //         cc.MJ.alert.tips_msg("提交成功");
        //     }else {
        //         cc.log(data._EMsg);
        //     }
        // });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
