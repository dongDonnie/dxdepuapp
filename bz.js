cc.Class({
    extends: cc.Component,

    properties: {
        //规则类型
        rulesToggle: {
            default: [],
            type: cc.Toggle
        },
        mjType:null,
        textNum:null
    },

    // use this for initialization
    onLoad: function () {
        this.mjType = "ptmj";
        this.textNum = "1";
        this.textType = {
            ptmj:{
                text1:"<b>基本规则</b><br/>游戏牌数总共108张<br/>只有万,筒,条,没有红中和风发白。<br/>胡牌规则：只能碰牌，不能吃牌，只能自摸不能放炮。<br/>胡牌条件：玩家牌型满足胡牌牌型,即可胡牌。<br/>胡牌的基本牌型：<br/>（1）11、123、123、123、123。 <br/>（2）11、123、123、123、111（1111，下同）。 <br/>（3）11、123、123、111、111。 <br/>（4）11、123、111、111、111。 <br/>（5）11、111、111、111、111。 <br>（七小对不可胡)", 
                text2:"<b>基本番型</b><br/>摸鸟：自摸胡牌后，摸X张鸟牌，如果有1、5、9、则加分。每摸到一鸟加30分，其他三家每家赔付10分。", 
                text3:"<b>游戏结算</b><br/>底分计算：<br>自摸时，其他三家给赢家10分。<br/>如果杠牌者没有胡牌，依然结算杠分<br/>明杠：放杠者给15分。补杠：每人给5分。暗杠：其他三家都给10分。", 
                text4:"<b>特殊规则</b><br/>抢杠胡：玩家A选择杠牌，而杠牌正好是B胡的那张牌的情况下，杠牌的玩家A出三家的分数30分。其他玩家不出分"
            },
            hzmj:{
                text1:"<b>基本规则</b><br/>游戏牌数总共112张<br/>只有万,筒,条,和红中，没有风发白。<br/>红中可以充当任何牌来凑整。<br/>胡牌规则：只能碰牌，不能吃牌，只能自摸不能放炮。有红中不可抢杠胡。<br/>胡牌条件：玩家牌型满足胡牌牌型，即可胡牌。<br/>胡牌的基本牌型：<br/>（1）11、123、123、123、123。 <br/>（2）11、123、123、123、111（1111，下同）。 <br/>（3）11、123、123、111、111。 <br/>（4）11、123、111、111、111。 <br/>（5）11、111、111、111、111。 <br>（七小对不可胡)", 
                text2:"<b>基本番型</b><br/>摸鸟：自摸胡牌后，摸X张鸟牌，如果有1、5、9、红中则加分。每摸到一鸟加30分，其他三家每家赔付10分。", 
                text3:"<b>游戏结算</b> <br/>底分计算：<br>自摸时，其他三家给赢家10分。<br/>如果杠牌者没有胡牌，依然结算杠分<br/>明杠：放杠者给15分。补杠：每人给5分。暗杠：其他三家都给10分。", 
                text4:"<b>特殊规则</b><br/>抢杠胡：玩家A选择杠牌，而杠牌正好是B胡的那张牌的情况下，杠牌的玩家A出三家的分数30分。其他玩家不出分"
            },
            shmj:{
                text1:"<b>基本规则</b><br/>1.	游戏用牌总共144张，带花牌。<br/>2.	上海敲麻必须先听牌才能胡牌，没有听牌允许胡牌，听牌之后不得再换牌。<br/>3.	胡牌条件：玩家牌型满足胡牌牌型，即可胡牌。主要使自己手中的牌或者吃，碰，杠的牌最终形成牌型为：三，三，三，三，二的形状。（注明：三如果为杠子，则可以出现四个牌）。 <br/>4.	游戏规则上有所综合简化，去掉七对、黄番、开宝等玩法。并统一增加了飞苍蝇玩法（可选）即胡牌后摸一张牌，翻到是几点便增加几花，摸到风牌或花牌，为5花。", 
                text2:"<b>基本番型</b><br/>大吊：1番 <br/>杠开：1番<br/>门清：1番 <br/>海底捞：1番 <br/>碰碰胡：1番 <br/>勒子牌型算法。<br/>有勒子的牌型不再计算花数和番数 <br/>清碰 = 清一色+碰碰胡 <br/>门清无花果 = 门清+无花果 <br/>无花果：半勒 <br/>混一色：半勒 <br/>清一色：1勒 <br/>清碰：1勒 <br/>门清无花果：1勒 <br/>混碰：1勒 <br/>说明：总花数*总番数=赢家胡牌总分数。玩家牌型包括多重胡牌类型的，结算时牌型番数累加。勒子牌型直接按勒子计算，不再计算花的数量 <br/>抢杠胡，一付三", 
                text3:"<b>特殊规则</b> <br/>吃碰后不算门清，若只有暗杠（暗杠不算次数）后仍然算门清。 <br/>门清敲掉听牌后，在不影响听牌的情况下，可以暗杠（暗杠不算次数），还是算门清。 <br/>若门清敲掉听牌后，不得明杠。 <br/>玩家敲掉听牌后，在影响胡牌的牌型情况下不得暗杠或者明杠。 <br/>门清胡牌带牌型，碰碰胡大吊车，清一色，混碰，清碰，以上牌型直接算勒子。", 
                text4:"<b>底分计算：</b> <br/>底花：1花/个 <br/>花牌：花/个 <br/>风向碰：1花/个 <br/>风暗刻：1花/个 <br/>明杠（上杠）：1花/个 <br/>暗杠：2花/个 <br/>风向明杠（上杠）：2花/个 <br/>风向暗杠：3花/个"
            }
        }
        this.updateRichText(this.mjType, this.textNum);
    },

    updateRichText:function (mjType, textNum) {
        var text = this.textType[mjType]["text" + textNum];
        cc.log(text);
        var richtext = this.node.getChildByName("textSlider").getChildByName("view").getChildByName("content").getChildByName("richtext");
        richtext.getComponent(cc.RichText).string = text;
        this.node.getChildByName("textSlider").getChildByName("view").getChildByName("content").height = richtext.height;
        this.node.getChildByName("textSlider").getComponent(cc.ScrollView).scrollToTop(0.1);
    },

    //局数
    rulesClicked: function (toggle) {
        cc.MJ.common.sound.playBtnMusic();
        var index= this.rulesToggle.indexOf(toggle);
        switch (index) {
            case 0:
                cc.log("基本规则");
                this.textNum = "1";
                break;
            case 1:
                cc.log("基本番型");
                this.textNum = "2";
                break;
            case 2:
                cc.log("特殊规则");
                this.textNum = "3";
                break;
            case 3:
                cc.log("游戏结算");
                this.textNum = "4";
                break;
            default:
                break;
        }
        this.updateRichText(this.mjType, this.textNum);
    },

    closeBtn: function () {
        cc.MJ.common.sound.playBtnMusic();
        this.node.active = false;
        this.node.emit('backHUD');
    },

    clickpt:function () {
        // this.node.getChildByName("bz_slider").active = true;
        // this.node.getChildByName("hz_slider").active = false;
        // this.node.getChildByName("hh_slider").active = false;
        this.mjType = "ptmj";
        this.updateRichText(this.mjType, this.textNum);
    },

    clickhongzhong:function () {
        // this.node.getChildByName("bz_slider").active = false;
        // this.node.getChildByName("hz_slider").active = true;
        // this.node.getChildByName("hh_slider").active = false;
        this.mjType = "hzmj";
        this.updateRichText(this.mjType, this.textNum);
    },

    clickhh:function () {
        // this.node.getChildByName("hh_slider").active = true;
        // this.node.getChildByName("bz_slider").active = false;
        // this.node.getChildByName("hz_slider").active = false;
        this.mjType = "shmj";
        this.updateRichText(this.mjType, this.textNum);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
