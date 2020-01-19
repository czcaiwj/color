// pages/plaza/detail.js

const {
    hex2rgb,
    rgb2hsb
} = require('../../utils/colors.js');

const { preventDoubleClick, onShare, httpPost, httpGet } = require('../../utils/functions.js');
const { DELETE_USER_COLORS } = require('../../utils/constant.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        colors: new Array,
        source: '',
        id: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const source = options.source == 'my' ? 'my' : 'other';
        const id = options.id == undefined ? -1 : options.id;
        const name = options.name;
        const color1 = options.color1;
        const color2 = options.color2;
        const color3 = options.color3;
        const color4 = options.color4;
        const color5 = options.color5;
        let colors = new Array(color1, color2, color3, color4, color5);

        let result = new Array;
        for (let i = 0; i < 5; i++) {
            const color = colors[i];
            const rgb = hex2rgb(color);
            const hsb = rgb2hsb(rgb[0], rgb[1], rgb[2]);
            result.push({
                hex: color,
                rgb: rgb,
                hsb: hsb
            });
        }

        this.setData({
            id: id,
            source: source,
            name: name,
            colors: result
        });
    },

    /**
     * 颜色详情
     */
    detail: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const hex = event.currentTarget.dataset.color;
            wx.navigateTo({
                url: '/pages/web/colordetail?color=' + hex
            });
        }
    },

    /**
     * 收藏
     */
    fav: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            wx.navigateTo({
                url: '/pages/plaza/fav?name=' + this.data.name +
                '&color1=' + this.data.colors[0].hex +
                '&color2=' + this.data.colors[1].hex +
                '&color3=' + this.data.colors[2].hex +
                '&color4=' + this.data.colors[3].hex +
                '&color5=' + this.data.colors[4].hex
            });
        }
    },

    copy: function () {
        let content = "";
        for (let i = 0; i < this.data.colors.length; i++) {
            content += this.data.colors[i].hex + ', ';
        }
        content = content.substring(0, content.lastIndexOf(','));
        wx.setClipboardData({
            data: content,
            success: function (res) {
                wx.showToast({
                    title: '复制配色方案成功',
                });
            }
        });
    },

    drop: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const that = this;
            if (this.data.source == 'my' && this.data.id != -1) {
                wx.showModal({
                    title: '提示',
                    content: '删除配色方案' + that.data.name + '？',
                    showCancel: true,
                    success: function (res) {
                        if (res.confirm) {
                            const url = DELETE_USER_COLORS;
                            const data = {
                                cust_id: wx.getStorageSync('cust_id'),
                                openid: wx.getStorageSync('openid'),
                                id: that.data.id
                            };
                            httpGet(url, data).then(data => {
                                if (data.code == 0) {
                                    wx.showToast({
                                        title: '删除成功',
                                        success: function () {
                                            setTimeout(function () {
                                                wx.navigateBack({
                                                    delta: 1
                                                });
                                            }, 1500);
                                        }
                                    })
                                }
                            });
                        }
                    }
                });
            }
        }
    },

    edit: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const name = this.data.name;
            const color1 = this.data.colors[0].hex;
            const color2 = this.data.colors[1].hex;
            const color3 = this.data.colors[2].hex;
            const color4 = this.data.colors[3].hex;
            const color5 = this.data.colors[4].hex;
            const id = this.data.id;
            wx.navigateTo({
                url: '/pages/plaza/edit?id=' + id + '&name=' + name +
                '&color1=' + color1 +
                '&color2=' + color2 +
                '&color3=' + color3 +
                '&color4=' + color4 +
                '&color5=' + color5
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return onShare('配色方案' + this.data.name + '详情');
    }
})