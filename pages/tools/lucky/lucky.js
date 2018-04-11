// pages/tools/lucky/lucky.js
const colors = require('../../../utils/colors.js');
const algorithm = require('../../../utils/algorithm.js');
const { preventDoubleClick, onShare } = require('../../../utils/functions.js');


Page({
    // 页面的初始数据(8个动态数据)
    data: {
        red: 0,                    // 颜色版-红色分量
        green: 0,                  // 颜色版-绿色分量
        blue: 0,                   // 颜色版-蓝色分量
        saturation: 0,             // 颜色版-饱和度
        brightness: 0,             // 颜色版-亮度        
        index: 0,                  // 颜色1
        algorithm_index: 0,        // 算法索引        
        render_color: new Array(), // 颜色数组
        array: ["颜色1", "颜色2", "颜色3", "颜色4", "颜色5"],
        algorithm: ["analogous", "complementary", "triad", "monochromatic", "shade", "secondary"] // 颜色算法
    },

    // 生命周期函数--监听页面加载，外来配置参数为5个color{n}=#hex
    onLoad: function (options) {
        const color1 = options.color1;
        const color2 = options.color2;
        const color3 = options.color3;
        const color4 = options.color4;
        const color5 = options.color5;
        if (color1 == undefined ||
            color2 == undefined ||
            color3 == undefined ||
            color4 == undefined ||
            color5 == undefined) {
            this.random_value();
        }
        else {
            const rgb = colors.hex2rgb(color1);
            const hsb = colors.rgb2hsb(rgb[0], rgb[1], rgb[2]);
            const render_color = [color1, color2, color3, color4, color5];
            this.setData({
                red: rgb[0],
                green: rgb[1],
                blue: rgb[2],
                saturation: hsb[1],
                brightness: hsb[2],
                index: 0,
                algorithm_index: 0,
                render_color: render_color
            });
        }
    },

    // 随机算法
    random_value: function () {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const length = this.data.algorithm.length - 1;
            const algorithm_index = Math.round(Math.random() * length);
            this.setData({ index: 0 });
            this.render(algorithm_index);
        }
    },

    // 生成颜色数组
    render: function (algorithm_index) {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        let a = 20;
        let color = '';
        switch (this.data.algorithm[algorithm_index]) {
            case "analogous":
                a = Math.round(Math.random() * 100) % 52 + 20;
                color = algorithm.render_analogous(r, g, b, a);
                break;
            case "complementary":
                color = algorithm.render_complementary(r, g, b);
                break;
            case "triad":
                color = algorithm.render_triad(r, g, b);
                break;
            case "monochromatic":
                color = algorithm.render_monochromatic(r, g, b);
                break;
            case "shade":
                let p = Math.round(Math.random() * 50) - 25;  // 随机比例
                let k = Math.round(Math.random() * 1) == 1 ? "lightness" : "saturation";
                color = algorithm.render_shade(r, g, b, p, k);
                break;
            case "secondary":
                color = algorithm.render_complementary(r, g, b);
                break;
            default:
                a = Math.round(Math.random() * 100) % 52 + 20;
                color = algorithm.render_analogous(r, g, b, a);
                break;
        }
        const hex = colors.rgb2hex(r, g, b);
        const hsb = colors.rgb2hsb(r, g, b);
        let render_color = [{ hex: hex, red: r, green: g, blue: b, h: hsb[0], s: hsb[1], b: hsb[2] }];
        render_color = render_color.concat(color);

        this.setData({
            red: r,
            green: g,
            blue: b,
            saturation: hsb[1],
            brightness: hsb[2],
            algorithm_index: algorithm,
            render_color: render_color
        });
        this.render_color_board();
    },

    // 渲染颜色版分量
    render_color_board: function () {
        const index = this.data.index;
        const color = this.data.render_color[index];
        this.setData({
            red: color.red,
            green: color.green,
            blue: color.blue,
            saturation: color.s,
            brightness: color.b
        });
    },

    // 点击下拉菜单
    pickerChange: function (event) {
        this.setData({ index: event.detail.value });
        this.render_color_board();
    },

    // 点击收藏按钮
    fav: function (event) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const color1 = this.data.render_color[0].hex;
            const color2 = this.data.render_color[1].hex;
            const color3 = this.data.render_color[2].hex;
            const color4 = this.data.render_color[3].hex;
            const color5 = this.data.render_color[4].hex;
            wx.navigateTo({
                url: '/pages/plaza/fav?name=&color1=' + color1 + "&color2=" + color2 + "&color3=" + color3 + "&color4=" + color4 + "&color5=" + color5
            });
        }
    },

    // 拖动rgb滑块
    rgbChange: function (event) {
        const render_color = this.data.render_color;
        const color_index = this.data.index;
        let color = render_color[color_index];
        let r = color.red;
        let g = color.green;
        let b = color.blue;

        const value = event.detail.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "red":
                r = value;
                break;
            case "green":
                g = value;
                break;
            case "blue":
                b = value;
                break;
        }
        const hex = colors.rgb2hex(r, g, b);
        const hsb = colors.rgb2hsb(r, g, b);
        color = { hex: hex, red: r, green: g, blue: b, h: hsb[0], s: hsb[1], b: hsb[2] };
        render_color[color_index] = color;
        this.setData({
            red: r,
            green: g,
            blue: b,
            saturation: hsb[1],
            brightness: hsb[2],
            index: color_index,
            render_color: render_color
        });
    },

    // 改变饱和度
    saturationChange: function (event) {
        const render_color = this.data.render_color;
        const color_index = this.data.index;
        let color = render_color[color_index];
        const h = color.h;
        const s = event.detail.value;
        const b = color.b;

        const rgb = colors.hsb2rgb(h, s, b);
        const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        color = { hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: h, s: s, b: b };
        render_color[color_index] = color;
        this.setData({ render_color: render_color });
    },

    // 改变亮度
    brightnessChange: function (event) {
        const render_color = this.data.render_color;
        const color_index = this.data.index;
        let color = render_color[color_index];
        const h = color.h;
        const s = color.s;
        const b = event.detail.value;

        const rgb = colors.hsb2rgb(h, s, b);
        const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        color = { hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: h, s: s, b: b };
        render_color[color_index] = color;
        this.setData({ render_color: render_color });
    },

    detail: function (e) {
        if (!this.data.buttonClicked) {
            preventDoubleClick(this);
            const color = e.currentTarget.dataset.color;
            wx.navigateTo({
                url: '/pages/web/colordetail?color=' + color
            });
        }
    },

    onShareAppMessage: function (res) {
        return onShare("Color颜值，优秀的配色助手");
    }
})