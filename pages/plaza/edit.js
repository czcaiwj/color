// pages/plaza/edit.js

const colors = require('../../utils/colors.js');
const { UPDATE_USER_COLORS } = require('../../utils/constant.js');
const { httpPost } = require('../../utils/functions.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: -1,
        name: '',
        red: 0,                    // 颜色版-红色分量
        green: 0,                  // 颜色版-绿色分量
        blue: 0,                   // 颜色版-蓝色分量
        saturation: 0,             // 颜色版-饱和度
        brightness: 0,             // 颜色版-亮度        
        index: 0,                  // 颜色1
        render_color: new Array(), // 颜色数组
        array: ["颜色1", "颜色2", "颜色3", "颜色4", "颜色5"],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id;
        const name = options.name;
        const color1 = options.color1;
        const color2 = options.color2;
        const color3 = options.color3;
        const color4 = options.color4;
        const color5 = options.color5;
        if (color1 == undefined ||
            color2 == undefined ||
            color3 == undefined ||
            color4 == undefined ||
            color5 == undefined || id == undefined || name == undefined) {
            wx.navigateBack({
                delta: 1
            });
        } else {
            let colors_array = new Array;
            const rgb1 = colors.hex2rgb(color1);
            const hsb1 = colors.rgb2hsb(rgb1[0], rgb1[1], rgb1[2]);
            colors_array.push({
                hex: color1,
                red: rgb1[0],
                green: rgb1[1],
                blue: rgb1[2],
                h: hsb1[0],
                s: hsb1[1],
                b: hsb1[2]
            });

            const rgb2 = colors.hex2rgb(color2);
            const hsb2 = colors.rgb2hsb(rgb2[0], rgb2[1], rgb2[2]);
            colors_array.push({
                hex: color2,
                red: rgb2[0],
                green: rgb2[1],
                blue: rgb2[2],
                h: hsb2[0],
                s: hsb2[1],
                b: hsb2[2]
            });

            const rgb3 = colors.hex2rgb(color3);
            const hsb3 = colors.rgb2hsb(rgb3[0], rgb3[1], rgb3[2]);
            colors_array.push({
                hex: color3,
                red: rgb3[0],
                green: rgb3[1],
                blue: rgb3[2],
                h: hsb3[0],
                s: hsb3[1],
                b: hsb3[2]
            });

            const rgb4 = colors.hex2rgb(color4);
            const hsb4 = colors.rgb2hsb(rgb4[0], rgb4[1], rgb4[2]);
            colors_array.push({
                hex: color4,
                red: rgb4[0],
                green: rgb4[1],
                blue: rgb4[2],
                h: hsb4[0],
                s: hsb4[1],
                b: hsb4[2]
            });

            const rgb5 = colors.hex2rgb(color5);
            const hsb5 = colors.rgb2hsb(rgb5[0], rgb5[1], rgb5[2]);
            colors_array.push({
                hex: color5,
                red: rgb5[0],
                green: rgb5[1],
                blue: rgb5[2],
                h: hsb5[0],
                s: hsb5[1],
                b: hsb5[2]
            });

            const rgb = colors.hex2rgb(color1);
            const hsb = colors.rgb2hsb(rgb[0], rgb[1], rgb[2]);
            this.setData({
                id: id,
                name: name,
                render_color: colors_array,
                red: rgb[0],
                green: rgb[1],
                blue: rgb[2],
                saturation: hsb[1],
                brightness: hsb[2]
            });
        }
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

    input: function (event) {
        const value = event.detail.value;
        if (value.length <= 20) {
            this.setData({
                name: value
            });
        }
    },

    save: function () {
        if (this.data.name.length == 0) {
            wx.showToast({
                title: '请输入配色名称',
                icon: 'none'
            });
        } else {
            let data = {
                id: this.data.id,
                cust_id: wx.getStorageSync('cust_id'),
                openid: wx.getStorageSync('openid'),
                color1: this.data.render_color[0].hex,
                color2: this.data.render_color[1].hex,
                color3: this.data.render_color[2].hex,
                color4: this.data.render_color[3].hex,
                color5: this.data.render_color[4].hex,
                name: this.data.name
            };
            httpPost(UPDATE_USER_COLORS, data).then(data => {
                if (data.code == 0) {                    
                    wx.showToast({
                        title: '更新配色成功',
                        icon: 'success',
                        success: function () {
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 2
                                });
                            }, 1500);
                        }
                    });
                } else {
                    wx.showToast({
                        title: data.msg,
                    });
                }
            });
        }
    }
})