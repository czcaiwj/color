// web颜色入口页
const { preventDoubleClick, onShare } = require('../../utils/functions.js');

Page({
    // 页面的初始数据
    data: {
        height: 0
    },

    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        const res = wx.getSystemInfoSync();
        this.setData({ height: res.windowHeight });
    },

    // 点击跳转
    click: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const name = event.currentTarget.dataset.name;
            switch (name) {
                case "css":
                    wx.navigateTo({
                        url: 'csscolor/csscolor',
                    });
                    break;
                case "web":
                    wx.navigateTo({
                        url: 'webcolor/webcolor',
                    });
                    break;
                case "gray":
                    wx.navigateTo({
                        url: 'graylevel/graylevel',
                    });
                    break;
            }
        }
    },

    onShareAppMessage: function (res) {
        return onShare("CSS颜色、Web安全色、灰度值");
    }
})