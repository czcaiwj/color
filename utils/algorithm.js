// 配色算法
const colors = require("colors.js");

// 类比色算法
function render_analogous(r, g, b, angle) {
    let render_color = new Array;
    const hsl = colors.rgb2hsb(r, g, b);
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];
    for (let i = 1; i < 5; i++) {
        const a = angle * i;
        const new_h = (h + a) % 360;
        const rgb = colors.hsb2rgb(new_h, s, l);
        const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });
    }
    return render_color;
}

// 补色算法
function render_complementary(r, g, b) {
    let render_color = new Array;
    const hsl = colors.rgb2hsb(r, g, b);
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];

    // 变化基数 = 10
    const hue_base = s < 50 ? 10 : -10;

    // 辅色 H变化，S，B和主色一样
    let new_h = h + hue_base;
    let rgb = colors.hsb2rgb(new_h, s, l);
    let hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
    render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

    // 补色1 H + 180， S、B和主色一样
    new_h = (h + 180) % 360;
    rgb = colors.hsb2rgb(new_h, s, l);
    hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
    render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

    // 补色2 
    new_h = (new_h + hue_base) % 360;
    rgb = colors.hsb2rgb(new_h, s, l);
    hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
    render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

    // 补色3 
    new_h = (new_h + hue_base) % 360;
    rgb = colors.hsb2rgb(new_h, s, l);
    hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
    render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: new_h, s: s, b: l });

    return render_color;
}

// 分裂补色算法
function render_triad(r, g, b) {
    let render_color = new Array;
    const hsl = colors.rgb2hsb(r, g, b);
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];

    const saturation = s > 50 ? s - 25 : s + 25;

    for (let i = 1; i <= 2; i++) {
        // 分裂补色组第1值
        const hue = (h + 120 * i) % 360;
        let rgb = colors.hsb2rgb(hue, s, l);
        let hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: hue, s: s, b: l });

        // 分裂补色组第2值
        rgb = colors.hsb2rgb(hue, saturation, l);
        hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: hue, s: saturation, b: l });
    }

    return render_color;
}

// 单色算法         
function render_monochromatic(r, g, b) {
    let render_color = new Array;
    const hsl = colors.rgb2hsb(r, g, b);
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];
    // 变化基数 = 10
    const saturation_base = s < 50 ? 10 : -10;
    const brightness_base = l < 50 ? 10 : -10;

    for (let i = 1; i < 5; i++) {
        const new_s = s + saturation_base * i;
        const new_b = l + brightness_base * i;
        const rgb = colors.hsb2rgb(h, new_s, new_b);
        const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, red: rgb[0], green: rgb[1], blue: rgb[2], h: h, s: new_s, b: new_b });
    }
    return render_color;
}

// 渐变算法
function render_shade(r, g, b, percent, kind) {
    const hsb = colors.rgb2hsb(r, g, b);
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
        const rgb = colors.hsb2rgb(hue, s, l);
        const hex = colors.rgb2hex(rgb[0], rgb[1], rgb[2]);
        render_color.push({ hex: hex, percent: percent * i + "%" });
    }
    return render_color;
}

// 二次色配比算法
function render_secondary(r, g, b) {
    const hex = colors.rgb2hex(r, g, b);
    const hsb = colors.rgb2hsb(r, g, b);
    let render_color = new Array({ hex: hex, red: r, green: g, blue: b, h: hsb[0], s: hsb[1], b: hsb[2] });

    const r1 = Math.round(Math.random() * 255);
    const g1 = Math.round(Math.random() * 255);
    const b1 = Math.round(Math.random() * 255);
    const r2 = Math.round(Math.random() * 255);
    const g2 = Math.round(Math.random() * 255);
    const b2 = Math.round(Math.random() * 255);

    const hex1 = colors.rgb2hex(r, g1, b1);
    const hex2 = colors.rgb2hex(r, g, b2);
    const hex3 = colors.rgb2hex(r1, g, b);
    const hex4 = colors.rgb2hex(r2, g2, b);

    const hsb1 = colors.rgb2hsb(r, g1, b1);
    const hsb2 = colors.rgb2hsb(r, g, b2);
    const hsb3 = colors.rgb2hsb(r1, g, b);
    const hsb4 = colors.rgb2hsb(r2, g2, b);

    render_color.push({
        hex: hex1,
        red: r, green: g1, blue: b1,
        h: hsb1[0], s: hsb1[1], b: hsb1[2]
    });

    render_color.push({
        hex: hex2,
        red: r, green: g, blue: b2,
        h: hsb2[0], s: hsb2[1], b: hsb2[2]
    });

    render_color.push({
        hex: hex3,
        red: r1, green: g, blue: b,
        h: hsb3[0], s: hsb3[1], b: hsb3[2]
    });

    render_color.push({
        hex: hex4,
        red: r2, green: g2, blue: b,
        h: hsb4[0], s: hsb4[1], b: hsb4[2]
    });

    return render_color;
}

module.exports = {
    render_analogous,       // 类比色算法
    render_complementary,   // 补色算法
    render_triad,           // 分裂补色算法
    render_monochromatic,   // 单色算法
    render_shade,           // 渐变算法
    render_secondary        // 二次色配比算法
};