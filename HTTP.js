/**
 * Created by hxl on 2017/10/11.
 */
var URL = "http://modu.deecent.com:8087";

//cc.MJ.version = "";

var http = cc.Class({
    extends: cc.Component,
    statics: {
        sessionId: 0,
        userId: 0,
        master_url: URL,
        url: URL,
        sendrequest: function (path, data, handler, customURL) {
            console.log("123");
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for (var k in data) {
                if (str !== "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if (customURL == null) {
                customURL = http.url;
            }
            var requesturl = customURL + path + encodeURI(str);
            xhr.open("GET", requesturl, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }else {
                //xhr.setRequestHeader("Access-Control-Allow-Origin","*");

            }
            console.log("123");


            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    console.log(response);
                    if (handler !== null) {
                        handler(JSON.parse(response));
                    }
                }
            };

            xhr.send();
            return xhr;
        }
    }
});