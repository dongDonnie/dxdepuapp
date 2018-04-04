/**
 * Created by hxl on 2017/7/5.
 * 用于存放数据交互模块处理的基础配置数据
 */
/*模块回调对应事件*/
var Data_Event_Config = {
    /*登录 模块回调对应事件*/
    login_Back_Map: {
        tlogin: {                    //登录
            Cmd: "tlogin",
            EventName: "tlogin_S"
        },
        login: {                    //登录
            Cmd: "login",
            EventName: "login_S"
        },
        regist: {
            Cmd: "regist",          //注册
            EventName: "regist_S"
        },
        logout: {
            Cmd: "logout",          //注销
            EventName: "logout_S"
        },
        updatep: {
            Cmd: "updatep",         //修改密码
            EventName: "updatep_S"
        },
        code: {
            Cmd: "code",            //发送验证码
            EventName: "code_S"
        },
        check: {
            Cmd: "check",           //验证验证码
            EventName: "check_S"
        },
        suggest: {
            Cmd: "suggest",         //客服建议
            EventName: "suggest_S"
        },
        configs: {
            Cmd: "configs",         //动态内容配置
            EventName: "configs_S"
        },
        forget: {
            Cmd: "forget",           //修改密码
            EventName: "forget_S"
        }
        // loginHandle:null,
        // loginFunction:null
    },
    /*大厅 模块回调对应事件*/
    hall_Back_Map: {
        tuser: {                     //用户信息
            Cmd: "tuser",
            EventName: "tuser_S"
        },
        config: {                 //动态内容配置
            Cmd: "config",
            EventName: "config_S"
        },
        createroom: {            //创建房间
            Cmd: "createroom",
            EventName: "createroom_S"
        },
        charts: {                   //排行榜
            Cmd: "charts",
            EventName: "charts_S"
        }, share: {                   //排行榜
            Cmd: "share",
            EventName: "share_S"
        },
        devote: {
            Cmd: "devote",        //贡献
            EventName: "devote_S"
        },
        devoterecord: {
            Cmd: "devoterecord",        //贡献列表
            EventName: "devoterecord_S"
        },
        buyingrecord: {
            Cmd: "buyingrecord",         //购买记录
            EventName: "buyingrecord_S"
        }, notice: {                   //公告
            Cmd: "notice",
            EventName: "notice_S"
        }, malllist: {
            Cmd: "malllist",            //商城
            EventName: "malllist_S"
        },
        gtype: {
            Cmd: "gtype",
            EventName: "gtype_S"
        },
        buy: {
            Cmd: "buy",
            EventName: "buy_S"
        },
        pgame: {
            Cmd: "pgame",
            EventName: "pgame_S"
        }

    },
    /*游戏准备 模块回调对应事件*/
    start_Back_Map: {
        cvoice: {                       //语音聊天
            Cmd: "cvoice",
            EventName: "cvoice_S"
        }, wvoice: {                    //文字聊天
            Cmd: "wvoice",
            EventName: "wvoice_S"
        }, emoji: {
            Cmd: "emoji",
            EventName: "emoji"
        }, exit: {                      //退出房间
            Cmd: "exit",
            EventName: "exit_S"
        }, seat: {                      //玩家入座
            Cmd: "seat",
            EventName: "seat_S"
        }, sitdown: {                   //加入房间
            Cmd: "sitdown",
            EventName: "sitdown_S"
        }, start: {                     //开始游戏
            Cmd: "start",
            EventName: "start_S"
        }, pseat: {                     //房间增减量
            Cmd: "pseat",
            EventName: "pseat_S"
        },
        joinready: {
            Cmd: "joinready",
            EventName: "joinready_S"
        },
        join: {
            Cmd: "join",
            EventName: "join_S"
        }
        ,
        match: {
            Cmd: "match",
            EventName: "match_S"
        },
        cmatch: {
            Cmd: "cmatch",
            EventName: "cmatch_S"
        },
        startroom: {
            Cmd: "startroom",
            EventName: "startroom_S"
        },
        wait: {
            Cmd: "wait",
            EventName: "wait_S"
        },
        addgold:{
            Cmd: "addgold",
            EventName: "addgold_S"
        },
        joing: {
            Cmd: "joing",
            EventName: "joing_S"
        },
        goldexit: {
            Cmd: "goldexit",
            EventName:"goldexit_S"
        },
        takeg: {
            Cmd: "takeg",
            EventName:"takeg_S"
        }
        // startHandle:null,
        // startFunction:null
    }
    ,
    /*战绩 模块回调对应事件*/
    zhanji_Back_Map: {
        tscore: {                          //牌局分数
            Cmd: "tscore",
            EventName: "tscore_S"
        },
        rpscore: {                          //房间玩家分数
            Cmd: "rpscore",
            EventName: "rpscore_S"
        }
        ,
        roomtablescore: {
            Cmd: "roomtablescore",
            EventName: ""
        },
        // zhanjiHandle:null,
        // zhanjiFunction:null
    },

    settting_Back_Map: {

        suggest: {//建议
            Cmd: "suggest",
            EventName: "suggest_S"
        }
    },
    /*游戏实战 模块回调对应事件*/
    game_Back_Map: {
        room: {                         //房间重载
            Cmd: "room",
            EventName: "room_S"
        },
        qz: {                            //玩家抢庄
            Cmd: "qz",
            EventName: "q_S"
        },
        qe: {                           //抢庄结束
            Cmd: "qe",
            EventName: "qe_S"
        },
        cp: {                            //玩家压分
            Cmd: "cp",
            EventName: "cp"
        },
        c: {
            Cmd: "c",
            EventName: "c"           //压分结束
        },
        ts: {
            Cmd: "ts",
            EventName: "ts"           //发牌结束
        },
        ne: {
            Cmd: "ne",
            EventName: "ne_S"
        },
        te: {                           //单局结算
            Cmd: "te",
            EventName: "te_S"
        },
        readyg: {                       //准备游戏
            Cmd: "readyg",
            EventName: "reaadyg_S"
        },
        re: {                           //游戏结束
            Cmd: "re",
            EventName: "re_S"
        },
        qexit: {                        //发起退出游戏
            Cmd: "qexit",
            EventName: "qexit_S"
        },
        goldexit:{
            Cmd: "goldexit",
            EventName: "goldexit_S"
        },
        gexit: {                        //发起退出游戏
            Cmd: "gexit",
            EventName: "gexit_S"
        },
        rexit: {                         //玩家确认退出游戏
            Cmd: "rexit",
            EventName: "rexit_S"
        },
        exitg: {                         //退出游戏最终结果
            Cmd: "exitg",
            EventName: "exitg_S"
        },

        ss: {
            Cmd: "ss",
            EventName: "ss_S"
        },
        war: {
            Cmd: "war",
            EventName: "war_S"
        }
        // rc:{
        //     Cmd: "rc",
        //     EventName: "rc_S"
        // }
        // f:{
        //     Cmd: "f",
        //     EventName: "f_S"
        // },
        // t:{
        //     Cmd: "t",
        //     EventName: "t_S"
        // },
        // gameHandle:null,
        // gameFunction:null
    }/*,
     getConcatData: function () {
     var temp_arr = this.login_Back_Map.concat(this.hall_Back_Map, this.start_Back_Map, this.zhanji_Back_Map, this.game_Back_Map);
     return temp_arr;
     }*/
};
var CommonTool = require("CommonTool");
var Event_Config = cc.Class({
    extends: cc.Component,
    properties: {},
    statics: {
        DataBackMap: [],
        currentHandle: null
    },
    ctor: function () {
        this.DataBackMap = CommonTool.MJTool.extend({},
            Data_Event_Config.login_Back_Map,
            Data_Event_Config.hall_Back_Map,
            Data_Event_Config.start_Back_Map,
            Data_Event_Config.zhanji_Back_Map,
            Data_Event_Config.game_Back_Map,
            Data_Event_Config.settting_Back_Map
        );
    }
});
