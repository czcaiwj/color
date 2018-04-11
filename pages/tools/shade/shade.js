// 渐变色
// pages/shade/shade.js
const {
    check_rgb_value,
    rgb2hsb,
    hsb2rgb,
    rgb2hex
} = require('../../../utils/colors.js');

const { preventDoubleClick, onShare } = require('../../../utils/functions.js');

Page({
    // 页面的初始数据
    data: {
        red: 0,                     // 红值
        green: 0,                   // 绿值
        blue: 0,                    // 蓝值
        saturation_percent: 0,      // 饱和度比例
        brightness_percent: 0,      // 亮度比例
        percent: 0,                 // 比例
        kind: "lightness",          // 勾选的单选框
        hex: "#000000",             // 十六进制RGB值
        render_color: new Array(0), // 要渲染的4个单色                
    },

    // 页面加载时, 读取传入的颜色信息，如果没有则随机，然后缓存页面颜色值
    onLoad: function (options) {
        const red = options.red;
        const green = options.green;
        const blue = options.blue;
        const kind = options.kind;
        const percent = options.percent;

        if (!check_rgb_value(red) ||
            !check_rgb_value(green) ||
            !check_rgb_value(blue) ||
            (kind != "lightness" && kind != "saturation") ||
            percent < -25 || percent > 25 || isNaN(percent)) {
            this.random_value_change();
        }
        else {
            this.valueChange(red, green, blue, percent, kind);
        }
    },

    // 输入值发生变化
    valueChange: function (r, g, b, p, kind) {
        this.setData({
            red: r,
            green: g,
            blue: b,
            percent: p,
            kind: kind,
            hex: rgb2hex(r, g, b),
            render_color: this.render(r, g, b, p, kind)
        });
    },

    // 改变RGB颜色
    rgbChange: function (event) {
        const value = event.detail.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "red":
                this.valueChange(value, this.data.green, this.data.blue, this.data.percent, this.data.kind);
                break;
            case "green":
                this.valueChange(this.data.red, value, this.data.blue, this.data.percent, this.data.kind);
                break;
            case "blue":
                this.valueChange(this.data.red, this.data.green, value, this.data.percent, this.data.kind);
                break;
        }
    },

    radioChange: function (event) {
        this.setData({ kind: event.detail.value });
        this.valueChange(this.data.red, this.data.green, this.data.blue, this.data.percent, this.data.kind);
    },

    percentChange: function (event) {
        this.setData({ percent: event.detail.value });
        this.valueChange(this.data.red, this.data.green, this.data.blue, this.data.percent, this.data.kind);
    },

    render: function (r, g, b, percent, kind) {
        const hsb = rgb2hsb(r, g, b);
        const hue = hsb[0];
        const saturation = hsb[1];
        const lightness = hsb[2];
        let render_color = new Array;

        for (let i = 1; i <= 4; i++) {
            let l = lightness;
            let s = saturation;
            if (kind == "lightness") {
                l = lightness + percent * i;
                l = l > 100 ? 100 : l;
                l = l < 0 ? 0 : l;
            }
            else {
                s = saturation + percent * i;
                s = s > 100 ? 100 : s;
                s = s < 0 ? 0 : s;
            }
            const rgb = hsb2rgb(hue, s, l);
            const hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
            render_color.push({ hex: hex, percent: percent * i + "%" });
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

    // 点击随机按钮，随机颜色值
    random_value_change: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const r = Math.round(Math.random() * 255);      // 随机R值
            const g = Math.round(Math.random() * 255);      // 随机R值
            const b = Math.round(Math.random() * 255);      // 随机R值
            const p = Math.round(Math.random() * 50) - 25;  // 随机比例        
            this.valueChange(r, g, b, p, this.data.kind);   // 初始化
        }
    },

    onShareAppMessage: function (res) {
        return onShare("渐变配色方案");
    }
})