// 小程序入口页
const { preventDoubleClick, onShare } = require('../../utils/functions.js');

Page({
    data: {

    },

    onLoad: function () {
        
    },

    click: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const name = event.currentTarget.dataset.name;
            switch (name) {
                case "plaza": // 配色广场
                    wx.navigateTo({
                        url: '/pages/plaza/index',
                    })
                    break;
                case "transition": // 颜色转换
                    wx.navigateTo({
                        url: '/pages/transition/transition',
                    });
                    break;
                case "tools": // 配色工具
                    wx.navigateTo({
                        url: '/pages/tools/tools',
                    });
                    break;
                case "web": // Web颜色
                    wx.navigateTo({
                        url: '/pages/web/web',
                    });
                    break;
                case "about": // 关于
                    wx.navigateTo({
                        url: '/pages/about/about',
                    });
                    break;
            }
        }
    },

    onShareAppMessage: function (res) {
        return onShare("Color颜值，优秀的配色助手");
    }
})
