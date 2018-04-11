// pages/plaza/myfav.js

const { httpPost, preventDoubleClick } = require('../../utils/functions.js');
const { GET_USER_COLORS } = require('../../utils/constant.js');

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
    },

    onShow: function () {
        const url = GET_USER_COLORS;
        const data = {
            cust_id: wx.getStorageSync('cust_id'),
            openid: wx.getStorageSync('openid')
        };
        const that = this;
        httpPost(url, data).then(data => {
            if (data.code == 0) {
                that.setData({
                    colors: data['data']
                });
            }
        });
    },

    detail: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const index = event.currentTarget.dataset.index;
            const name = this.data.colors[index].name;
            const id = this.data.colors[index].id;
            const color1 = this.data.colors[index].color1;
            const color2 = this.data.colors[index].color2;
            const color3 = this.data.colors[index].color3;
            const color4 = this.data.colors[index].color4;
            const color5 = this.data.colors[index].color5;
            wx.navigateTo({
                url: '/pages/plaza/detail?source=my&id=' + id + '&name=' + name + '&color1=' + color1 + '&color2=' + color2 + '&color3=' + color3 + '&color4=' + color4 + '&color5=' + color5
            });
        }
    }
})