const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
// x('https://blog.ycombinator.com/', '.post', [{
//         title: 'h1 a',
//         link: '.article-title@href'
//     }])
//     .paginate('.nav-previous a@href')
//     .limit(3)
//     .write('results.json')



// x('https://www.meetup.com/BellevueJS/members/', '.memberInfo', [{
//         name: '.memName',
//         bio: '.bioText p'
//     }])
//     .write('results.json')





x('http://txly2.net/cw', 'tbody tr', [{
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    }])
    .paginate('.pagenav@href')
    .limit(2)
    // .write('results.json')
    (function(err, results) {
        console.log(err);
        console.log(results);
        // results = results.map(function(audio) {
        //     var index = audio.downUrl.indexOf('?');
        //     var sub = audio.downUrl.substring(0, index);
        //     var lastIndex = audio.downUrl.lastIndexOf('/');
        //     var fileName = sub.substring(lastIndex + 1);
        //     audio.downUrl = sub;
        //     // audio.fileName = fileName;
        // }).forEach(function(audio) {
        //     console.log(audio);
        //     // download(audio.downUrl).then(data => {
        //     //     fs.writeFileSync('/audios/' + audio.fileName, data);
        //     // });
        // });
        results = results.reverse();
        results.forEach(function(audio, arrayIndex) {
            // console.log(audio);

            var index = audio.downUrl.indexOf('?');
            var sub = audio.downUrl.substring(0, index);
            var lastIndex = audio.downUrl.lastIndexOf('/');
            var fileName = sub.substring(lastIndex + 1);
            audio.downUrl = sub;
            audio.time = audio.time.substring(audio.time.indexOf('-') + 1);
            download(audio.downUrl).then(data => {
                //TODO: if data size small than 14.1M, redownload
                fs.writeFileSync('./audios/' + fileName, data);
            });
            audio.duration = 1760;
            audio.size = "14.1M";
            audio.artistId = 51;
            audio.artistName = "齐来颂扬";
            audio.id = 51000001 + arrayIndex;

        });

        fs.writeFile("./results.json", JSON.stringify(results, null, '\t'));
    });



// download('http://txly2.net/ly/audio/2017/cw/cw170414.mp3').then(data => {
//     fs.writeFileSync('cw/cw170414.mp3', data);
// });