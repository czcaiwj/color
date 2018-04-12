// pages/about/about.js
const { onShare, httpGet } = require('../../utils/functions.js');
const { ABOUT_CONTENT } = require('../../utils/constant.js');

Page({
    data: {
        about: '',
        author: '',
        email: '',
        show_contact: 0
    },

    onLoad: function () {
        const url = ABOUT_CONTENT;
        const that = this;
        httpGet(url).then(data => {
            if (data.code == 0) {
                const res = data.data;
                that.setData({
                    about: res['about'].split("|"),
                    author: res['author'],
                    email: res['email'],
                    show_contact: res['show_contact']
                });
            }
        });
    },

    onShareAppMessage: function (res) {
        return onShare("Color颜值，优秀的配色助手");
    }    
})    