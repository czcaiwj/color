// 配色入口页
const { onShare, preventDoubleClick } = require('../../utils/functions.js');

Page({
    data: {
        height: 0,
        array: [
            { name: "I am Feeling Lucky", color: "#bf76cc", url: "lucky" },
            { name: "类比色 相似色", color: "#00c3d9", url: "analogous" },
            { name: "互补色", color: "#01d48f", url: "complementary" },
            { name: "分裂补色", color: "#018884", url: "triad" },
            { name: "单色", color: "#f3c300", url: "monochromatic" },
            { name: "渐变", color: "#de6e02", url: "shade" },
            { name: "二次色配比", color: "#fd694c", url: "secondary" }
        ]
    },

    onLoad: function (options) {
        const res = wx.getSystemInfoSync();
        const height = res.windowHeight;
        this.setData({ height: height });
    },

    click: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const name = event.currentTarget.dataset.name;
            let url = '/pages/tools/' + name + '/' + name;
            wx.navigateTo({ url });
        }
    },

    onShareAppMessage: function (res) {
        return onShare("Color颜值，优秀的配色助手");
    }
})