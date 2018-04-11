// 灰度值
const { preventDoubleClick, onShare } = require('../../../utils/functions.js');

Page({
    // 页面的初始数据
    data: {
        color: [
            { hex: "#000000" },
            { hex: "#080808" },
            { hex: "#101010" },
            { hex: "#181818" },
            { hex: "#202020" },
            { hex: "#282828" },
            { hex: "#303030" },
            { hex: "#383838" },
            { hex: "#404040" },
            { hex: "#484848" },
            { hex: "#505050" },
            { hex: "#585858" },
            { hex: "#606060" },
            { hex: "#686868" },
            { hex: "#707070" },
            { hex: "#787878" },
            { hex: "#808080" },
            { hex: "#888888" },
            { hex: "#909090" },
            { hex: "#989898" },
            { hex: "#A0A0A0" },
            { hex: "#A8A8A8" },
            { hex: "#B0B0B0" },
            { hex: "#B8B8B8" },
            { hex: "#C0C0C0" },
            { hex: "#C8C8C8" },
            { hex: "#D0D0D0" },
            { hex: "#D8D8D8" },
            { hex: "#E0E0E0" },
            { hex: "#E8E8E8" },
            { hex: "#F0F0F0" },
            { hex: "#F8F8F8" },
            { hex: "#FFFFFF" }]
    },

    click: function (e) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const color = e.currentTarget.dataset.color;
            wx.navigateTo({
                url: '/pages/web/colordetail?color=' + color,
            });
        }
    },

    onShareAppMessage: function (res) {
        return onShare("灰度值参考");
    }
})