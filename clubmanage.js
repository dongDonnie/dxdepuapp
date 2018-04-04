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
        webview: cc.WebView
    },

    // use this for initialization
    onLoad: function () {
        var scheme = "TestKey";// 这里是与内部页面约定的关键字
        function jsCallback (url) {
            // 这里的返回值是内部页面的 url 数值，
            // 需要自行解析自己需要的数据
            var str = url.replace(scheme + '://', '');
            var data = JSON.stringify(str);// {a: 0, b: 1}
            console.log(data);
        }
console.log(this.webview);
        this.webview.setJavascriptInterfaceScheme(scheme);
        this.webview.setOnJSCallback(jsCallback);

        // cc.testWebview = function () {
        //     console.log("调用了");
        // }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
