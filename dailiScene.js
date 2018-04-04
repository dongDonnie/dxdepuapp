cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        webview:cc.WebView
    },

    // use this for initialization
    onLoad: function () {
        var web = this.webview;
        var webUrl = "http://106.14.117.76:9001/?uid=" + cc.MJ.data.getLocalStorage_LoginName();
        console.log(webUrl);
        web.url = webUrl;
        cc.MJ.common.jsb.closedailiBtn();
    },
    //关闭网页
    closeWebView: function () {
        console.log("=============关闭网页");
        cc.MJ.common.ui.loadScene('chooseScene');

        // this.clubMessageShow("message");
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
