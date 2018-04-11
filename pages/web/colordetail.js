// 颜色详情
// pages/common/colordetail.js
const colors = require('../../utils/colors.js');
const { onShare } = require('../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: 0,
        hex: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.color == undefined) {
            wx.navigateBack({
                delta: 1
            });
        }

        const hex = options.color;
        const name = options.name == undefined ? '色彩分量' : options.name;
        const rgb = colors.hex2rgb(hex);
        const hsb = colors.rgb2hsb(rgb[0], rgb[1], rgb[2]);
        const lab = colors.rgb2lab(rgb[0], rgb[1], rgb[2]);
        const cmyk = colors.rgb2cmyk(rgb[0], rgb[1], rgb[2]);

        this.setData({
            hex: hex,
            name: name,
            red: rgb[0],
            green: rgb[1],
            blue: rgb[2],
            hue: hsb[0],
            saturation: hsb[1],
            brightness: hsb[2],
            luminosity: lab[0],
            a: lab[1],
            b: lab[2],
            cyan: cmyk[0],
            magenta: cmyk[1],
            yellow: cmyk[2],
            black: cmyk[3],
        });
    },

    onReady: function () {
        wx.setNavigationBarTitle({
            title: this.data.name
        });
    },

    onShareAppMessage: function () {
        return onShare(this.data.name + '的各颜色分量');
    }
})