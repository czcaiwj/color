// pages/plaza/fav.js

const { SAVE_USER_COLORS } = require('../../utils/constant.js');
const { httpGet } = require('../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        color1: '',
        color2: '',
        color3: '',
        color4: '',
        color5: '',
        name: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {        
        this.setData({
            color1: options.color1,
            color2: options.color2,
            color3: options.color3,
            color4: options.color4,
            color5: options.color5,
            name: options.name == undefined ? '' : options.name
        });
    },

    input: function (event) {        
        const value = event.detail.value;
        if (value.length <= 20) {
            this.setData({
                name: value
            });
        }
    },

    save: function () {
        if (this.data.name.length == 0) {
            wx.showToast({
                title: '请输入配色名称',
                icon: 'none'
            });
        } else {
            let data = {
                cust_id: wx.getStorageSync('cust_id'),
                openid: wx.getStorageSync('openid'),
                color1: this.data.color1,
                color2: this.data.color2,
                color3: this.data.color3,
                color4: this.data.color4,
                color5: this.data.color5,
                name: this.data.name
            };
            httpGet(SAVE_USER_COLORS, data).then(data => {
                if (data.code == 0) {
                    const value = data['data'];
                    if (value == 1) {
                        wx.showToast({
                            title: '保存配色成功',
                            icon: 'success',
                            success: function () {
                                setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 1500);
                            }
                        });
                    } else if (value == 2) {
                        wx.showToast({
                            title: '更新配色成功',
                            icon: 'success',
                            success: function () {
                                setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 1500);
                            }
                        });
                    }
                } else {
                    wx.showToast({
                        title: data.msg,                    
                    });
                }
            });
        }        
    }
})