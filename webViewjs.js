cc.Class({
    extends: cc.Component,

    properties: {
        webView: {
            default: null,
            type: cc.WebView
        },
        webView_obj: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.webView.enabled = false;
        var loginname=cc.sys.localStorage.getItem("_PID");
        //this.webView.enabled=true;
        var jiedian = cc.instantiate(this.webView_obj);
        var web = jiedian.getComponent(cc.WebView);
        this.node.addChild(jiedian);
        web.url="http://106.14.117.76:7456?loginname="+loginname;

        //cc.log("进webview了");
    },

    clickfanhuiBtn:function() {
        this.node.destroy();
       cc.director.loadScene('chooseScene');
    },

    onWebFinishLoad: function (sender, event) {
       // cc.log("进事件了");

        if (event === cc.WebView.EventType.LOADED) {
            cc.log("is loaded!");
        } else if (event === cc.WebView.EventType.LOADING) {
            cc.log("is loading!");
        } else if (event === cc.WebView.EventType.ERROR) {
            cc.log("is error!");
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
