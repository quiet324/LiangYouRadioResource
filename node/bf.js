const Xray = require('x-ray');
const x = Xray();

x('http://txly2.net/bf', 'tbody tr', [{
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    }])
    .write('bf.json');