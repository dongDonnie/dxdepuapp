cc.Class({
    extends: cc.Component,

    properties: {
        jushuLabel: {
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
        itemID: 0
    },

    // use this for initialization
    onLoad: function () {
        // this.node.getChildByName("shareBtn").on('touchend', function () {
        //     cc.log("分享item" + this.itemID + " clicked");
        // }, this);

    },

    updateItem: function(userobj, obj) {
       // this.itemID = itemId;
        this.jushuLabel.string = obj._TableNumber;
        this.jiesuanA.string = this.getplayerScore(userobj[0],obj);
        this.jiesuanB.string = this.getplayerScore(userobj[1],obj);
        this.jiesuanC.string =this.getplayerScore(userobj[2],obj);
        this.jiesuanD.string = this.getplayerScore(userobj[3],obj);
        this.node.getChildByName("huifangBtn").on('touchend', function () {
            cc.sys.localStorage.setItem("table_ID",obj._TableID);

            cc.log("回放item" + this.itemID + " clicked");
            cc.director.loadScene('gamehuifangScene');
        }, this);
        this.node.getChildByName("huifangBtn").active=true;
    },
getplayerScore:function (userobj,obj) {
        var score=0;
        for(var i=0;i<obj._TableScoreCollection.length;i++){
            if(userobj===obj._TableScoreCollection[i]._PlayerID){
                score=obj._TableScoreCollection[i]._TotalScore;
                break;
            }
        }
        return score;

}
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
