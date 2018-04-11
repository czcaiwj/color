// pages/plaza/adobe.js 

const { preventDoubleClick, httpGet, onShare } = require('../../utils/functions.js');
const { GET_ADOBE_COLORS } = require('../../utils/constant.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 0,
        colors: new Array
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const res = wx.getSystemInfoSync();
        this.setData({
            width: (res.windowWidth - 30) / 5
        });
        this.random();
    },

    /**
     * 随机获取配色方案
     */
    random: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const that = this;
            const url = GET_ADOBE_COLORS;
            httpGet(url).then(data => {
                if (data.code == 0) {
                    that.setData({
                        colors: data.data
                    });
                }
            });
        }
    },

    detail: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const index = event.currentTarget.dataset.index;
            const name = this.data.colors[index].name;
            const color1 = this.data.colors[index].color1;
            const color2 = this.data.colors[index].color2;
            const color3 = this.data.colors[index].color3;
            const color4 = this.data.colors[index].color4;
            const color5 = this.data.colors[index].color5;
            wx.navigateTo({
                url: '/pages/plaza/detail?name=' + name + '&color1=' + color1 + '&color2=' + color2 + '&color3=' + color3 + '&color4=' + color4 + '&color5=' + color5
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return onShare('Adobe高分配色方案');
    }
})