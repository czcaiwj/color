// 二次色配比
const {
    check_rgb_value,
    rgb2hsb,
    hsb2rgb,
    rgb2hex
} = require('../../../utils/colors.js');

const { preventDoubleClick, onShare } = require('../../../utils/functions.js');

const { rgbChange } = require('../../../utils/common.js');

Page({
    data: {
        red: 0,
        green: 0,
        blue: 0,
        hex: 0,
        render_color: new Array,
        hue: 0,
        saturation: 0,
        brightness: 0
    },

    // 页面加载时, 读取传入的颜色信息，如果没有则随机，然后缓存页面颜色值
    onLoad: function (options) {
        const red = options.red;
        const green = options.green;
        const blue = options.blue;
        const saturation = options.saturation;
        const brightness = options.brightness;
        if (!check_rgb_value(red) || !check_rgb_value(green) || !check_rgb_value(blue) ||
            brightness < 0 || brightness > 100 || saturation < 0 || saturation > 100) {
            this.random_value_change();
        }
        else {
            this.valueChange(red, green, blue);
        }
    },

    valueChange: function (r, g, b) {
        var hsb = rgb2hsb(r, g, b);
        this.setData({
            red: r,
            green: g,
            blue: b,
            hex: rgb2hex(r, g, b),
            hue: hsb[0],
            saturation: hsb[1],
            brightness: hsb[2]
        });
        this.render();
    },

    rgbChange: function (event) {
        rgbChange(event, this);
    },

    saturationChange: function (event) {
        const value = event.detail.value;
        const rgb = hsb2rgb(this.data.hue, value, this.data.brightness);
        this.valueChange(rgb[0], rgb[1], rgb[2]);
    },

    brightnessChange: function (event) {
        const value = event.detail.value;
        const rgb = hsb2rgb(this.data.hue, this.data.saturation, value);
        this.valueChange(rgb[0], rgb[1], rgb[2]);
    },

    render: function () {
        let render_color = new Array;

        const r1 = Math.round(Math.random() * 255);
        const g1 = Math.round(Math.random() * 255);
        const b1 = Math.round(Math.random() * 255);
        const r2 = Math.round(Math.random() * 255);
        const g2 = Math.round(Math.random() * 255);
        const b2 = Math.round(Math.random() * 255);

        const hex1 = rgb2hex(this.data.red, g1, b1);
        const hex2 = rgb2hex(this.data.red, this.data.green, b2);
        const hex3 = rgb2hex(r1, this.data.green, this.data.blue);
        const hex4 = rgb2hex(r2, g2, this.data.blue);

        const hsb1 = rgb2hsb(this.data.red, g1, b1);
        const hsb2 = rgb2hsb(this.data.red, this.data.green, b2);
        const hsb3 = rgb2hsb(r1, this.data.green, this.data.blue);
        const hsb4 = rgb2hsb(r2, g2, this.data.blue);

        render_color.push({
            hex: hex1,
            red: this.data.red, green: g1, blue: b1,
            h: hsb1[0], s: hsb1[1], b: hsb1[2]
        });

        render_color.push({
            hex: hex2,
            red: this.data.red, green: this.data.green, blue: b2,
            h: hsb2[0], s: hsb2[1], b: hsb2[2]
        });

        render_color.push({
            hex: hex3,
            red: r1, green: this.data.green, blue: this.data.blue,
            h: hsb3[0], s: hsb3[1], b: hsb3[2]
        });

        render_color.push({
            hex: hex4,
            red: r2, green: g2, blue: this.data.blue,
            h: hsb4[0], s: hsb4[1], b: hsb4[2]
        });

        this.setData({ render_color: render_color });
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

    // 点击随机按钮，随机颜色值
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
        let content = '基准色：' + this.data.hex + ', 配比色组：';
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
        return onShare("二次色配比配色方案");
    }
})