const toRgb = require('hsl-to-rgb-for-reals');

const max = (value, maxValue) => value > maxValue ? maxValue : value;

const min = (value, minValue) => value < minValue ? minValue : value;

const cycle = (value) => {
    value = max(value, 1e7);
    value = min(value, -1e7);

    while(value < 0){
        value += 360;
    }
    while(value > 359) {
        value -= 360;
    }
    return value;
}

function hsl (hue, saturation, luminosity) {
    // resolve degrees to 0 - 359 range
    hue = cycle(hue)
    // enforce constraints
    saturation = min(max(saturation, 100), 0)
    luminosity = min(max(luminosity, 100), 0)
    // convert to 0 to 1 range used by hsl-to-rgb-for-reals
    saturation /= 100
    luminosity /= 100
    // let hsl-to-rgb-for-reals do the hard work
    var rgb = toRgb(hue, saturation, luminosity)
    // convert each value in the returned RGB array
    // to a 2 character hex value, join the array into
    // a string, prefixed with a hash
    return '#' + rgb
        .map(function (n) {
            return (256 + n).toString(16).substr(-2)
        })
        .join('')
}

module.exports = hsl;

