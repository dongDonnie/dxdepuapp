/**
 * Created by hxl on 2017/12/4.
 * 俱乐部首页脚本
 */


cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function () {
        this.initEvent();
    },
    initEvent: function () {
        var _config = cc.MJ.data;
        var _eventList = _config.DataBackMap;
        _config.currentHandle = this.node;
        var self = this;

        //用户信息回调
        this.node.on(_eventList.qcl.EventName, function (data) {
            //     "_CL":[
            //         {
            //             ""_CID": "000001", // 俱乐部id
            //             "_CName":"麻将001", //俱乐部名称
            //         "_CIcon":"图片.jpg" ,//俱乐部图标
            //         "_CRCC":1000,//房卡数
            //         "_CMax":500,//俱乐部最大人数
            //         "_CNotice":"11111111111111", //俱乐部公告
            //         "_CUse":1, //俱乐部已有人数
            //         "_WC":{  //会长信息
            //         "_PID": "oik53wXDX3V_-pSYifWlREXFS7kU",    //  openid
            //             "_Name": "Gavin",    //  name
            //             "_Gender": "男",    // gender
            //             "_IUrl": 	"http://wx.qlogo.cn/mmopen/Ib58ibfI66S/0.png",  //  							IconUrl
            //     }    //  玩家微信信息
            // },

            if (data.detail._IsS) {
                self.initClubInfo(data.detail._Data);
            } else {
                console.log(data.detail._EMsg);
            }
        });
    },
    initClubInfo: function (p_data) {
        var club_node = this.node.getChildByName("content").getChildByName("club_cont_bg").children;
        for (var i = 0; i < p_data._CL.length; i++) {
            //循环设置页面俱乐部列表
            var _data = p_data._CL[i];
            var _node = club_node[i];


        }
    },
});
