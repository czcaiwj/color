// 类比色
// pages/analogous/analogous.js
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
    rgbaChange,
} = require('../../../utils/common.js');

Page({
    // 页面的初始数据
    data: {
        red: 0,                     // 红值
        green: 0,                   // 绿值
        blue: 0,                    // 蓝值
        hex: "#000000",             // 十六进制RGB值
        render_color: new Array(),  // 要渲染的4个类比色        
        saturation: 0,              // 饱和度
        brightness: 0,              // 亮度
        check_index: 0,             // 勾选的单选框
        angle: 1,                   // 角度
    },

    // 页面加载时, 读取传入的颜色信息，如果没有则随机，然后缓存页面颜色值
    onLoad: function (options) {
        const red = options.red;
        const green = options.green;
        const blue = options.blue;
        if (!check_rgb_value(red) || !check_rgb_value(green) || !check_rgb_value(blue) || angle > 72 || angle < 1 || isNaN(angle)) {
            this.random_value_change();
        }
        else {
            this.valueChange(red, green, blue, angle);
        }
    },

    // 输入值发生变化 缓存页面颜色值
    valueChange: function (r, g, b, angle) {
        const hsb = rgb2hsb(r, g, b, angle);
        this.setData({
            red: r,
            green: g,
            blue: b,
            angle: angle,
            hex: rgb2hex(r, g, b),
            saturation: hsb[1],
            brightness: hsb[2],
            render_color: this.render(r, g, b, angle)
        });
    },

    // 改变RGB颜色
    rgbChange: function (event) {
        rgbaChange(event, this, this.data.angle);
    },

    // 改变单选框
    radioChange: function (event) {
        common.radioChange(event, this);
    },

    // 改变饱和度
    saturationChange: function (event) {
        saturationChange(event, this);
    },

    // 改变亮度
    brightnessChange: function (event) {
        common.brightnessChange(event, this);
    },

    // 改变角度
    angleChange: function (event) {
        this.valueChange(this.data.red, this.data.green, this.data.blue, event.detail.value);
    },

    // 计算类比色
    render: function (r, g, b, angle) {
        let render_color = new Array;
        const hsl = rgb2hsb(r, g, b);
        const h = hsl[0];
        const s = hsl[1];
        const l = hsl[2];
        for (let i = 1; i < 5; i++) {
            const a = angle * i;
            const new_h = (h + a) % 360;
            const rgb = hsb2rgb(new_h, s, l);
            const hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
            render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });
        }
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
            const a = Math.round(Math.random() * 100) % 72 + 1;
            this.valueChange(r, g, b, a);
        }
    },

    onShareAppMessage: function (res) {
        return onShare("类比色（相似色）配色方案");
    }
})