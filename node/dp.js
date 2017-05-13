const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');

x('http://txly2.net/dp', 'tbody tr', [{
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    }])
    .paginate('.active + .hidden-phone a@href')
    .limit(250)
    // .write('results.json')
    (function(err, results) {
        results = results.reverse();
        results.forEach(function(audio, arrayIndex) {

            var index = audio.downUrl.indexOf('?');
            var sub = audio.downUrl.substring(0, index);
            var lastIndex = audio.downUrl.lastIndexOf('/');
            var fileName = sub.substring(lastIndex + 1);
            audio.downUrl = sub;
            audio.time = audio.time.substring(audio.time.indexOf('-') + 1);
            // download(audio.downUrl).then(data => {
            //     fs.writeFileSync('./dp/' + fileName, data);
            // });
            audio.duration = 1500;
            audio.size = "6.1M";
            audio.artistId = 49;
            audio.artistName = "空中门训";
            audio.id = 49000001 + arrayIndex;

        });

        fs.writeFile("./dp.json", JSON.stringify(results, null, '\t'));
    });