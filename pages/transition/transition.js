// 颜色转换
const { 
    check_rgb_value,   // 检查RGB某一分量值是否合法
    hex2rgb,           // 十六进制值转RGB
    rgb2hex,           // RGB值转十六进制表示
    rgb2hsb,           // RGB值转HSB值
    rgb2cmyk,          // RGB值转CMYK值
    rgb2lab,           // RGB值转LAB值
    cmyk2rgb,          // CMYK值转RGB值
    lab2rgb,           // LAB值转RGB值
    hsb2rgb,           // HSB值转RGB值
} = require('../../utils/colors.js');

const { onShare } = require('../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: ['RGB', 'CMYK', 'LAB', 'HSB', 'HEX'],
        index: 0,        
        hex: "#000000",
        hex2: "000000",

        red: 0, green: 0, blue: 0,                   // RGB分量
        cyan: 0, magenta: 0, yellow: 0, black: 0,    // CMYK分量
        luminosity: 0, a: 0, b: 0,                   // LAB分量
        hue: 0, saturation: 0, brightness: 0,        // HSB分量  

        icon: 'icon-unfold'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {        
        this.setData({ 
            hex: "#000000",
            hex2: "000000"
        });
        let r = options.red;
        let g = options.green;
        let b = options.blue;
        if (!check_rgb_value(r) || !check_rgb_value(g) || !check_rgb_value(b)) {
            r = Math.round(Math.random() * 255);
            g = Math.round(Math.random() * 255);
            b = Math.round(Math.random() * 255);            
        }
        this.setData({
            red: r,
            green: g, 
            blue: b
        });
        this.valueChange(r, g, b);
    },

    /**
     * 颜色分量发生变化
     */
    valueChange: function (red, green, blue)
    {
        const hex = rgb2hex(red, green, blue);
        const hsb = rgb2hsb(red, green, blue);
        const cmyk = rgb2cmyk(red, green, blue);
        const lab = rgb2lab(red, green, blue);
        this.setData({
            red: red,
            green: green,
            blue: blue,
            hex: hex,
            hex2: hex.slice(1),
            hue: hsb[0],
            saturation: hsb[1],
            brightness: hsb[2],
            cyan: cmyk[0],
            magenta: cmyk[1], 
            yellow: cmyk[2],
            black: cmyk[3],
            luminosity: lab[0],
            a: lab[1],
            b: lab[2]
        });
    },

    /**
     * 颜色模式改变时触发
     */
    pickerChange: function (event) {        
        this.setData({ index: event.detail.value });
    },

    /**
     * RGB模式颜色分量变化时
     */
    rgbChange: function (event) {
        const value = event.detail.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "red":
                this.valueChange(value, this.data.green, this.data.blue);
                break;
            case "green":
                this.valueChange(this.data.red, value, this.data.blue);
                break;
            case "blue":
                this.valueChange(this.data.red, this.data.green, value);
                break;
        }
    },

    /**
     * CMYK是减色原理，RGB是加色原理，两者在转换的时候会不一样,所以不能用valueChange
     */
    cmykChange: function (event) {
        const value = event.detail.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "cyan":
                this.setData({ cyan: value });
                break;
            case "magenta":
                this.setData({ magenta: value });
                break;
            case "yellow":
                this.setData({ yellow: value });
                break;
            case "black":
                this.setData({ black: value });
                break;
        }

        // 设置分量值
        const rgb = cmyk2rgb(this.data.cyan, this.data.magenta, this.data.yellow, this.data.black);
        const hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        const hsb = rgb2hsb(rgb[0], rgb[1], rgb[2]);
        const lab = rgb2lab(rgb[0], rgb[1], rgb[2]);

        this.setData({ 
            red: rgb[0],
            green: rgb[1],
            blue: rgb[2],
            hex: hex,
            hex2: hex.slice(0),
            hue: hsb[0],
            saturation: hsb[1],
            brightness: hsb[2],
            luminosity: lab[0],
            a: lab[1],
            b: lab[2]
        });                        
    },

    /**
     * LAB颜色分量发生变化时
     */
    labChange: function (event) {
        const value = event.detail.value;
        const id = event.currentTarget.id;
        switch (id) {
            case "luminosity":
                this.setData({ luminosity: value });
                break;
            case "a":
                this.setData({ a: value });
                break;
            case "b":
                this.setData({ b: value });
                break;
        }
        // 设置分量值        
        const rgb = lab2rgb(this.data.luminosity, this.data.a, this.data.b);        
        const hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
        const hsb = rgb2hsb(rgb[0], rgb[1], rgb[2]);
        const cmyk = rgb2cmyk(rgb[0], rgb[1], rgb[2]);
        const lab = rgb2lab(rgb[0], rgb[1], rgb[2]);
        this.setData({
            red: rgb[0],
            green: rgb[1],
            blue: rgb[2],
            hex: hex,
            hex2: hex.slice(0),
            cyan: cmyk[0],
            magenta: cmyk[1],
            yellow: cmyk[2],
            black: cmyk[3],
            hue: hsb[0],
            saturation: hsb[1],
            brightness: hsb[2],
            luminosity: lab[0],
            a: lab[1],
            b: lab[2]
        });        
    },

    /**
     * HSB颜色分量发生变化时
     */
    hsbChange: function (event) {
        var value = event.detail.value;
        var id = event.currentTarget.id;
        var rgb;
        switch (id) {
            case "hue":
                rgb = hsb2rgb(value, this.data.saturation, this.data.brightness);
                break;
            case "saturation":
                rgb = hsb2rgb(this.data.hue, value, this.data.brightness);
                break;
            case "brightness":
                rgb = hsb2rgb(this.data.hue, this.data.saturation, value);
                break;
        }
        this.valueChange(rgb[0], rgb[1], rgb[2]);
    },

    /**
     * 输入HEX值
     */
    hexInput: function (event) {        
        const value = event.detail.value;
        const pattern = /^[\dabcdef]{6}$/;
        if (pattern.test(value)) {
            const hex = '#' + value;
            const hex2 = value;
            const rgb = hex2rgb(hex);            
            const hsb = rgb2hsb(rgb[0], rgb[1], rgb[2]);
            const cmyk = rgb2cmyk(rgb[0], rgb[1], rgb[2]);
            const lab = rgb2lab(rgb[0], rgb[1], rgb[2]);
            this.setData({
                red: rgb[0],
                green: rgb[1],
                blue: rgb[2],
                hex: hex,
                hex2: hex2,
                cyan: cmyk[0],
                magenta: cmyk[1],
                yellow: cmyk[2],
                black: cmyk[3],
                hue: hsb[0],
                saturation: hsb[1],
                brightness: hsb[2],
                luminosity: lab[0],
                a: lab[1],
                b: lab[2]
            });
        }        
    },

    onShareAppMessage: function (res) {
        return onShare("颜色转换工具");
    }
})