// pages/about/about.js
const { onShare } = require('../../utils/functions.js');

Page({
    data: {},

    onShareAppMessage: function (res) {
        return onShare("Color颜值，优秀的配色助手");
    }    
})    