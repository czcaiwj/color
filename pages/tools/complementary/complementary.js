// 互补色
// pages/complementary/complementary.js
const {
    check_rgb_value,
    rgb2hsb,
    hsb2rgb,
    rgb2hex
} = require('../../../utils/colors.js');

const { preventDoubleClick, onShare } = require('../../../utils/functions.js');

const {
    rgbChange,
    baseValueChange,
    radioChange,
    saturationChange,
    brightnessChange,
} = require('../../../utils/common.js');

Page({
    // 页面的初始数据
    data: {
        red: 0,                     // 红值
        green: 0,                   // 绿值
        blue: 0,                    // 蓝值
        hex: "#000000",             // 十六进制RGB值
        render_color: new Array(0), // 要渲染的4个单色
        saturation: 0,              // 饱和度
        brightness: 0,              // 亮度
        check_index: 0,             // 勾选的单选框
    },

    // 页面加载时, 读取传入的颜色信息，如果没有则随机，然后缓存页面颜色值
    onLoad: function (options) {
        const red = options.red;
        const green = options.green;
        const blue = options.blue;
        if (!check_rgb_value(red) || !check_rgb_value(green) || !check_rgb_value(blue)) {
            this.random_value_change();
        }
        else {
            this.valueChange(red, green, blue);
        }
    },

    // 输入值发生变化
    valueChange: function (r, g, b) {
        baseValueChange(r, g, b, this);
    },

    // 改变RGB颜色
    rgbChange: function (event) {
        rgbChange(event, this);
    },

    // 改变单选框
    radioChange: function (event) {
        radioChange(event, this);
    },

    // 改变饱和度
    saturationChange: function (event) {
        saturationChange(event, this);
    },

    // 改变亮度
    brightnessChange: function (event) {
        brightnessChange(event, this);
    },

    // 计算补色
    render: function (r, g, b) {
        let render_color = new Array;
        const hsl = rgb2hsb(r, g, b);
        const h = hsl[0];
        const s = hsl[1];
        const l = hsl[2];

        // 变化基数 = 10
        const hue_base = s < 50 ? 10 : -10;

        // 辅色 H变化，S，B和主色一样
        let new_h = (h + hue_base) % 360;
        let rgb = hsb2rgb(new_h, s, l);
        let hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

        // 补色1 H + 180， S、B和主色一样
        new_h = (h + 180) % 360;
        rgb = hsb2rgb(new_h, s, l);
        hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

        // 补色2 
        new_h = (h + 180 + hue_base) % 360;
        rgb = hsb2rgb(new_h, s, l);
        hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

        // 补色3 
        new_h = (h + 180 - hue_base) % 360;
        rgb = hsb2rgb(new_h, s, l);
        hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

        return render_color;
    },

    // 点击收藏按钮
    fav: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const color1 = this.data.hex;
            const color2 = this.data.render_color[0].hex;
            const color3 = this.data.render_color[1].hex;
            const color4 = this.data.render_color[2].hex;
            const color5 = this.data.render_color[3].hex;
            wx.navigateTo({
                url: '/pages/plaza/fav?name=&color1=' + color1 + "&color2=" + color2 + "&color3=" + color3 + "&color4=" + color4 + "&color5=" + color5
            });
        }
    },

    // 随机颜色值
    random_value_change: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            this.valueChange(r, g, b);
        }
    },

    copy: function (event) {
        const hex = event.currentTarget.dataset.color;
        wx.setClipboardData({
            data: hex,
            success: function (res) {
                wx.showToast({
                    title: '复制HEX值成功',
                });
            }
        });
    },

    copyAll: function () {
        let content = '基准色：' + this.data.hex + ', 辅色+补色组：';
        for (let i = 0; i < this.data.render_color.length; i++) {
            content += this.data.render_color[i].hex + ', '
        };
        wx.setClipboardData({
            data: content.substring(0, content.lastIndexOf(',')),
            success: function (res) {
                wx.showToast({
                    title: '复制配色方案成功',
                });
            }
        });
    },

    onShareAppMessage: function (res) {
        return onShare("互补色配色方案");
    }
})