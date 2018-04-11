// 工具函数

/**
 * 发送Get请求
 * @param url 请求的网址
 * @param data 发送的数据
 */
function httpGet(url, data = {}) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: 'GET',
            success: function (result) {
                if (result.statusCode == 200) {
                    resolve(result.data);
                }
                else {
                    reject();
                }
            },
            fail: function () {
                reject();
            }
        });
    });
    return promise;
}

/**
 * 发送Post请求
 * @param url 请求的网址
 * @param data 发送的数据
 */
function httpPost(url, data = {}) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
                if (result.statusCode == 200) {
                    resolve(result.data);
                }
                else {
                    reject();
                }
            },
            fail: function () {
                reject();
            }
        });
    });
    return promise;
}

/**
 * 生成范围数组
 */
function range(length) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(i);
    }
    return result;
}

/**
 * 防止快速点击
 */
function preventDoubleClick(self, timeout = 500) {
    self.setData({ buttonClicked: true });
    setTimeout(function () {
        self.setData({ buttonClicked: false })
    }, timeout);
}

/**
 * 判断对象是否为空{}
 */
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
} 

/**
 * 路径参数对象转换为字符串
 */
function object_to_string(obj) {
    if (isEmptyObject(obj)) {
        return "";
    }

    var str = "?";
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + "=" + obj[p] + "&";
        }
    }

    if (str.charAt(str.length - 1) == "&") {
        str = str.substring(0, str.length - 1);
    }
    return str;
}

/**
 * 转发函数
 */
function onShare(title) {
    const array = getCurrentPages();
    const page = array[array.length - 1];
    const options = page.options;
    const route = page.route;
    const path = "/" + route + object_to_string(options);
    return {
        title: title,
        path: path,
        success: function (res) {
            wx.showToast({
                title: '谢谢你的分享'
            });
        }
    };
}

module.exports = {
    httpGet,
    httpPost,
    range,
    preventDoubleClick,
    onShare
}