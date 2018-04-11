const colors = require("colors.js");


// rgb滑块变化触发
function rgbChange(event, that) {
    const value = event.detail.value;
    const id = event.currentTarget.id;
    switch (id) {
        case "red":
            that.valueChange(value, that.data.green, that.data.blue);
            break;
        case "green":
            that.valueChange(that.data.red, value, that.data.blue);
            break;
        case "blue":
            that.valueChange(that.data.red, that.data.green, value);
            break;
    }
}

// 带角度滑块的rgb滑块变化触发
function rgbaChange(event, that, a) {
    const value = event.detail.value;
    const id = event.currentTarget.id;
    switch (id) {
        case "red":
            that.valueChange(value, that.data.green, that.data.blue, a);
            break;
        case "green":
            that.valueChange(that.data.red, value, that.data.blue, a);
            break;
        case "blue":
            that.valueChange(that.data.red, that.data.green, value, a);
            break;
    }
}

// 基准色变化时触发
function baseValueChange(r, g, b, that) {
    const hsb = colors.rgb2hsb(r, g, b);
    that.setData({
        red: r,
        green: g,
        blue: b,
        hex: colors.rgb2hex(r, g, b),
        saturation: hsb[1],
        brightness: hsb[2],
        render_color: that.render(r, g, b)
    });
}

// 改变渲染组单选框时触发
function radioChange(event, that) {
    const index = event.detail.value;
    const info = that.data.render_color[index];    
    const s = info.s;
    const b = info.b;

    that.setData({
        check_index: index,
        saturation: s,
        brightness: b
    });
}

// 饱和度滑块变化触发
function saturationChange(event, that) {
    let temp = that.data.render_color;
    // 新亮度值
    const value = event.detail.value;
    const index = that.data.check_index;    
    // 原始颜色    
    const color = that.data.render_color[index];
    const rgb = colors.hsb2rgb(color.h, value, color.b);
    const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2])
    temp[index] = { hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: color.h, s: value, b: color.b };
    that.setData({ 
        saturation: value,
        render_color: temp 
    });    
}

// 亮度滑块变化触发
function brightnessChange(event, that) {
    let temp = that.data.render_color;
    // 新亮度值
    const value = event.detail.value;
    const index = that.data.check_index;    
    // 原始颜色
    const color = that.data.render_color[index];
    const rgb = colors.hsb2rgb(color.h, color.s, value);
    const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2])
    temp[index] = { hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: color.h, s: color.s, b: value };
    that.setData({ 
        brightness: value,
        render_color: temp 
    });
}


module.exports = {
    rgbChange,        // rgb滑块变化触发
    rgbaChange,       // 带角度滑块的rgb滑块变化触发
    baseValueChange,  // 基准色变化时触发
    radioChange,      // 改变渲染组单选框时触发
    saturationChange, // 饱和度滑块变化触发
    brightnessChange, // 亮度滑块变化触发    
}