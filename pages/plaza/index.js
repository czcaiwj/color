// pages/plaza/index.js

const { preventDoubleClick, onShare } = require('../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const res = wx.getSystemInfoSync();
        this.setData({
            height: res.windowHeight
        });
    },

    jump: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const id = event.currentTarget.dataset.id;
            let url = '';
            switch (id) {
                case 'china':
                    url = '/pages/plaza/china';
                    break;
                case 'japan':
                    url = '/pages/plaza/japan';
                    break;
                case 'adobe':
                    url = '/pages/plaza/adobe';
                    break;
                case 'fav':
                    url = '/pages/plaza/myfav';
                    break;
            }
            wx.navigateTo({ url });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return onShare('缺乏配色灵感？来配色广场逛逛呗');
    }
})