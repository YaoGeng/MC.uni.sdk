//本地址可以用官方的，可以本地部署
window.document.write('<script type="text/javascript" src="https://www.app8848.com/uni.webview.1.5.2.js"><\/script>')

let appReady = new Promise((resolve, reject) => {
    window.document.addEventListener('UniAppJSBridgeReady', function () {

        console.log("uniReady")

        uni.getEnv(function (res) {
            console.log('当前环境：' + JSON.stringify(res));
        });
        var plusReady = function (callback) {
            if (window.plus) {
                callback();
            } else {
                window.document.addEventListener('plusready', callback);
            }
        };
        plusReady(function () {

            console.log("plusReady")
            resolve()
        });

    });
})

/**
 * api 列表
 */
let APIlist = {

    //拍照 返回base64 会压缩 
    cameraApi: function (option, callback) {
        var cmr = plus.camera.getCamera();
        var res = cmr.supportedImageResolutions[0];
        var fmt = cmr.supportedImageFormats[0];
        console.log("Resolution: " + res + ", Format: " + fmt);
        cmr.captureImage(
            function (path) {
                plus.zip.compressImage(
                    {
                        src: path,
                        dst:"_downloads/"+path,
                        quality: 20
                    },
                    function (Event) {
                        plus.io.resolveLocalFileSystemURL(Event.target, function (entry) {
                            entry.file(function (file) {
                                var fileReader = new plus.io.FileReader();
                                fileReader.readAsDataURL(file);
                                fileReader.onloadend = function (evt) {
                                    callback(JSON.stringify(evt.target.result));////base64字符串  
                                }
                            })
                        })
                    }, function (error) {
                        alert("压缩失败");
                    });
               
            },
            function (error) {
                console.log("关闭相机")
            },
            option
        );
    }
}


module.exports = {
    MC_uni: (type = "", option = {}, callback = function () { }) => {
        console.log("调用" + type)
        appReady.then(() => {
            APIlist[type](option, function (data) {
                callback(data)
            })
        })
    }
}