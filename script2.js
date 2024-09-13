$(document).ready(function () {
  function getColor(event) {
    const hexColor = event.target.value;
    console.log(hexColor);
    $("#color-display").css("background-color", hexColor);

    $("#hex").css("color", hexColor);

    const [r, g, b] = hexa_to_rgb(hexColor);
    $("#rgb-red").html(`${r}`);
    $("#rgb-green").html(`${g}`);
    $("#rgb-blue").html(`${b}`);

    const [grayscale_rgb] = colorToGrayscale(r, g, b);
    $("#gray-red").html(` ${grayscale_rgb}`);
    $("#gray-green").html(`${grayscale_rgb}`);
    $("#gray-blue").html(`${grayscale_rgb}`);

    const grayscaleHex = rgbToHex(grayscale_rgb, grayscale_rgb, grayscale_rgb);
    $("#grayscale").css("background-color", grayscaleHex);

    const [c, m, y, k] = rgb_to_cmyk(r, g, b);
    $("#cmyk-cyan").html(` ${c}`);
    $("#cmyk-magenta").html(`${m}`);
    $("#cmyk-yellow").html(`${y}`);
    $("#cmyk-black").html(`${k}`);

    const [h, s, l] = rgb_to_hsl(r, g, b);
    $("#hue-h").html(` ${h}`);
    $("#saturation-s").html(`${s}`);
    $("#light-l").html(`${l}`);

    $("#hex").html(event.target.value);

    const [grayscale_rgb1] = colorToGrayscale(r, g, b);
    const [c1, m1, y1, k1] = grayscaleRgbToCmyk(grayscale_rgb1);

    $("#gray-cyan").html(`${c1}`);
    $("#gray-magenta").html(`${m1}`);
    $("#gray-yellow").html(`${y1}`);
    $("#gray-black").html(`${k1}`);

    const [grayscale_rgb2] = colorToGrayscale(r, g, b);
    const [h1, s1, l1] = grayscaleRgbToHsl(grayscale_rgb2);
    $("#gray-hue").html(`${h1}`);
    $("#gray-saturation").html(`${s1}`);
    $("#gray-light").html(`${l1}`);

    const grayscaleHex1 = grayscaleRgbToHex(grayscale_rgb);
    $("#hex1").html(`${grayscaleHex1}`);

    const [Luminosity] = colorToLuminosity(r, g, b);
    $("#Luminosity").html(` ${Luminosity}`);
  }

  function hexa_to_rgb(hexColor) {
    hexColor = hexColor.replace(/#/, "");
    const bigint = parseInt(hexColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  function rgb_to_cmyk(r, g, b) {
    const red_Frac = r / 255;
    const green_Frac = g / 255;
    const blue_Frac = b / 255;
    const k = 1 - Math.max(red_Frac, green_Frac, blue_Frac);
    const c = (1 - red_Frac - k) / (1 - k) || 0;
    const m = (1 - green_Frac - k) / (1 - k) || 0;
    const y = (1 - blue_Frac - k) / (1 - k) || 0;

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100),
    ];
  }

  function rgb_to_hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
  }

  function colorToGrayscale(r, g, b) {
    const grayscale_rgb = Math.round((r + g + b) / 3);
    return [grayscale_rgb, grayscale_rgb, grayscale_rgb];
  }

  function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function grayscaleRgbToCmyk(grayscale_rgb1) {
    const k = 1 - grayscale_rgb1 / 255;
    const c = 0;
    const m = 0;
    const y = 0;

    return [
      Math.round(c * 100),
      Math.round(m * 100),
      Math.round(y * 100),
      Math.round(k * 100),
    ];
  }

  function grayscaleRgbToHsl(grayscale_rgb) {
    const h = 0;
    const s = 0;
    const l = Math.round((grayscale_rgb / 255) * 100);

    return [h, s, l];
  }

  function grayscaleRgbToHex(grayscale_rgb) {
    const toHex = (value) => value.toString(16).padStart(2, "0");

    const hexColor = `#${toHex(grayscale_rgb)}${toHex(grayscale_rgb)}${toHex(
      grayscale_rgb
    )}`;

    return hexColor;
  }

  function colorToLuminosity(r, g, b) {
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return [luminosity];
  }

  $("#colorpicker").change(function (e) {
    getColor(e);
  });
});