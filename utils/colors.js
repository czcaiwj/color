/**
 * 检查RGB某一分量值是否合法
 * @param int value 分量值
 */
function check_rgb_value(value) {
    if (value === undefined || value === null || value == "" || value < 0 || value > 255 || isNaN(value)) {
        return false;
    }
    return true;
}

/**
 * RGB值转十六进制表示
 */
function rgb2hex(red, green, blue) {
    let r = new Number(red).toString(16);
    let g = new Number(green).toString(16);
    let b = new Number(blue).toString(16);
    if (r.length == 1) {
        r = "0" + r;
    }

    if (g.length == 1) {
        g = "0" + g;
    }

    if (b.length == 1) {
        b = "0" + b;
    }
    
    return "#" + r + g + b;
}

/**
 * 十六进制表示转RGB值
 */
function hex2rgb(hex) {
    hex = hex.indexOf("#") == -1 ? hex : hex.substring(hex.indexOf("#") + 1)
    var r = hex.length == 6 ? hex.substring(0, 2) : hex.substring(0, 1);
    var g = hex.length == 6 ? hex.substring(2, 4) : hex.substring(1, 2);
    var b = hex.length == 6 ? hex.substring(4) : hex.substring(2);

    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);

    return new Array(r, g, b);
}

/**
 * RGB值转HSB值
 * 输入
 * r:0~255
 * g:0~255
 * b:0~255 
 * 输出
 * h:0~359
 * s:0~100
 * b:0~100
 */
function rgb2hsb(r, g, b) {
    let rgb = new Array(r, g, b);
    rgb = rgb.sort(function (i, j) { return i - j; });
    let max = rgb[2];
    let min = rgb[0];

    let hsb_b = max / 255.0;
    let hsb_s = max == 0 ? 0 : (max - min) / max
    let hsb_h = 0;
    if (max == min) {
        hsb_h = 0;
    }
    else if (max == r && g >= b) {
        hsb_h = 60 * (g - b) / (max - min);
    }
    else if (max == r && g < b) {
        hsb_h = 60 * (g - b) / (max - min) + 360;
    }
    else if (max == g) {
        hsb_h = 60 * (b - r) / (max - min) + 120;
    }
    else if (max == b) {
        hsb_h = 60 * (r - g) / (max - min) + 240;
    }
    return new Array(Math.round(hsb_h), Math.round(hsb_s * 100), Math.round(hsb_b * 100));
}


/**
 * RGB值转CMYK值
 * 输入
 * r:0~255
 * g:0~255
 * b:0~255 
 * 输出
 * c:0~100
 * m:0~100
 * y:0~100
 * k:0~100
 */
function rgb2cmyk(r, g, b) {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = 1;
    k = c < k ? c : k;
    k = m < k ? m : k;
    k = y < k ? y : k;
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0
    }
    else {
        c = (c - k) / (1 - k)
        m = (m - k) / (1 - k)
        y = (y - k) / (1 - k)
    }
    return new Array(Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100));
}

/**
 * RGB值转LAB值
 * 输入
 * r:0~255
 * g:0~255
 * b:0~255 
 * 输出
 * l:0~100
 * a:-128~127
 * b:-128~127
 */
function rgb2lab(r, g, b) {    
    r /= 255
    g /= 255
    b /= 255

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    r *= 100
    g *= 100
    b *= 100

    let x = r * 0.4124 + g * 0.3576 + b * 0.1805
    let y = r * 0.2126 + g * 0.7152 + b * 0.0722
    let z = r * 0.0193 + g * 0.1192 + b * 0.9505

    x /= 95.047
    y /= 100.0
    z /= 108.883

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    let l1 = 116 * y - 16;
    let a1 = 500 * (x - y);
    let b1 = 200 * (y - z);

    return new Array(Math.round(l1), Math.round(a1), Math.round(b1));
}

/**
 * CMYK值转RGB值
 * 输入
 * c:0~100
 * m:0~100
 * y:0~100
 * k:0~100
 * 输出
 * r:0~255
 * g:0~255
 * b:0~255
 */
function cmyk2rgb(c, m, y, k) {
    const oc = c, om = m, oy = y, ok = k;
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;
    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;
    const r = (1 - c) * 255;
    const g = (1 - m) * 255;
    const b = (1 - y) * 255;
    return new Array(Math.round(r), Math.round(g), Math.round(b));
}

/**
 * LAB值转RGB值
 * 输入
 * l:0~100
 * a:-128~127
 * b:-128~127
 * 输出
 * r:0~255
 * g:0~255
 * b:0~255
 */
function lab2rgb(l, a, b) {
    let y = (l + 16) / 116;
    let x = a / 500 + y;
    let z = y - b / 200;

    x = Math.pow(x, 3) > 0.008856 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
    y = Math.pow(y, 3) > 0.008856 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
    z = Math.pow(z, 3) > 0.008856 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;

    x *= 95.047;
    y *= 100.0;
    z *= 108.883;

    x /= 100.0;
    y /= 100.0;
    z /= 100.0;

    let red = x * 3.2406 + y * -1.5372 + z * -0.4986;
    let green = x * -0.9689 + y * 1.8758 + z * 0.0415;
    let blue = x * 0.0557 + y * -0.2040 + z * 1.0570;

    red = red > 0.0031308 ? 1.055 * Math.pow(red, 1 / 2.4) - 0.055 : red * 12.92;
    green = green > 0.0031308 ? 1.055 * Math.pow(green, 1 / 2.4) - 0.055 : green * 12.92;
    blue = blue > 0.0031308 ? 1.055 * Math.pow(blue, 1 / 2.4) - 0.055 : blue * 12.92;

    red *= 255;
    green *= 255;
    blue *= 255;

    red = red < 0 ? 0 : red > 255 ? 255 : red;
    green = green < 0 ? 0 : green > 255 ? 255 : green;
    blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
    return new Array(Math.round(red), Math.round(green), Math.round(blue));
}

/**
 * HSB值转RGB值
 * 输入
 * h:0~359
 * s:0~100
 * b:0~100
 * 输出
 * r:0~255
 * g:0~255
 * b:0~255
 */
function hsb2rgb(h, s, b) {    
    h = h % 360;
    s = s / 100.0;
    b = b / 100.0;
    let hi = parseInt((h / 60) % 6);
    let f = h / 60 - hi;
    let p = b * (1 - s);
    let q = b * (1 - f * s);
    let t = b * (1 - (1 - f) * s);
    let red = 0, green = 0, blue = 0;

    switch (hi) {
        case 0:
            red = b, green = t, blue = p;
            break;
        case 1:
            red = q, green = b, blue = p;
            break;
        case 2:
            red = p, green = b, blue = t;
            break;
        case 3:
            red = p, green = q, blue = b;
            break;
        case 4:
            red = t, green = p, blue = b;
            break;
        case 5:
            red = b, green = p, blue = q;
            break;
    }

    red *= 255;
    green *= 255;
    blue *= 255;
    return new Array(parseInt(red.toFixed(0)), parseInt(green.toFixed(0)), parseInt(blue.toFixed(0)));
}

module.exports = {
    check_rgb_value,   // 检查RGB某一分量值是否合法
    rgb2hex,           // RGB值转十六进制表示
    hex2rgb,           // 十六进制表示转RGB值
    rgb2hsb,           // RGB值转HSB值
    rgb2cmyk,          // RGB值转CMYK值
    rgb2lab,           // RGB值转LAB值
    cmyk2rgb,          // CMYK值转RGB值
    lab2rgb,           // LAB值转RGB值
    hsb2rgb,           // HSB值转RGB值
}