// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        spIcon:{
            default:null,
            type:cc.Sprite
        },
        spIcons:{
            default:[],
            type:cc.SpriteFrame
        },
        intex:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    start () {
    },
    gengxin(){
        try{
            this.spIcon.spriteFrame = this.spIcons[this.intex];
        }catch(exp)
        {

        }
    }
    // update (dt) {
    //     console.log("update");
    //     console.log(dt);
    //     console.log(this.spIcons);
    //     console.log(this.intex);
    // },
});
