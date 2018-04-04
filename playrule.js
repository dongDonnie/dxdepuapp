cc.Class({
    extends: cc.Component,

    properties: {
        fengdiCount:cc.Label,
        ruchangCount:cc.Label,
        timeSlider:cc.Slider,
        fengdingSlider: cc.Slider,
        fengdingprogress: cc.Sprite,
        timeprogress:cc.Sprite,
    },

    onLoad: function () {
        this.TimeData=[30,60,90,120,180,240,300];
        this.mingoldData = [100,200,300,400,500,800,2000,3000,5000,10000,25000];
        cc.MJ.common.action.showMoveInAction(this.node,this.node.parent,0.3);
        var roomrule = cc.MJ.data.getLocalStorage_roomRule();
        roomrule = JSON.parse(roomrule);
        this.fengdiCount.string = roomrule.maxtimes;
        this.ruchangCount.string = roomrule.mingold+"/"+roomrule.playermingold;
        
        if(roomrule.playtype !== 'default'){
            this.timeSlider.node.active = false;
            this.node.getChildByName('game_time').active = false;
            this.node.getChildByName('time').active = false;
        }else{
            
        }
        this.fengdingSlider.enabled = false;
        this.timeSlider.enabled = false;

        var _arrval = this.mingoldData.indexOf(roomrule.mingold);
        this.fengdingSlider.progress = (1 / 10) * _arrval;
        this.fengdingprogress.fillRange = _arrval * 0.1;

        var _arrval2 = this.TimeData.indexOf(roomrule.gametime);
        this.timeSlider.progress = (1 / 6) * _arrval2;
        this.timeprogress.fillRange = (1 / 6) * _arrval2;
    },

    closebtn:function(){
        cc.MJ.common.action.showMoveOutAction(this.node,0.3,true);
    },

});
