// Web安全色
const { preventDoubleClick, onShare, range } = require('../../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        color_array: new Array(),
        index_array: new Array()
    },

    onShow: function () {
        let array = new Array;
        for (let i = 0; i <= 255; i += 51) {
            let red = new Number(i);
            red = red.toString(16);
            red = this.numberFix(red);

            for (let j = 0; j <= 255; j += 51) {
                let green = new Number(j);
                green = green.toString(16);
                green = this.numberFix(green);

                for (let k = 0; k <= 255; k += 51) {
                    let blue = new Number(k);
                    blue = blue.toString(16);
                    blue = this.numberFix(blue);

                    let color = "#" + red + green + blue;
                    array.push(color);
                }
            }
        }

        this.setData({
            color_array: array,
            index_array: range(72)
        });
    },

    numberFix: function (a) {
        if (a.length == 1) {
            return "0" + a;
        }
        return a;
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
        return onShare("Web安全色参考");
    }
})