cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart',(event)=>{
            event.stopPropagation();
            cc.log('touch the background');
        })
    },
});
