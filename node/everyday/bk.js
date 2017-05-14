const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
var shell = require('shelljs');
var dateFormat = require('dateformat');

x('http://txly2.net/bk', 'tbody tr', {
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    })
    // .write('results.json')
    (function(err, audio) {

        var index = audio.downUrl.indexOf('?');
        var sub = audio.downUrl.substring(0, index);
        var lastIndex = audio.downUrl.lastIndexOf('/');
        var fileName = sub.substring(lastIndex + 1);
        audio.downUrl = sub;
        audio.time = audio.time.substring(audio.time.lastIndexOf('-') + 1);

        var today = dateFormat(new Date(), "yyyymmdd");
        if (audio.time !== today) {
            return;
        }

        download(audio.downUrl).then(data => {
            fs.writeFileSync('../../bk/' + fileName, data);

            var commitTag = 'bk' + audio.time

            audio.duration = 560;
            audio.size = "4.5M";
            audio.artistId = 4;
            audio.artistName = "听书‧想飞";
            audio.path = "https://rawcdn.githack.com/quiet324/LiangYouRadioResource/" + commitTag + "/bk/"+ fileName;           
            audio.id = 4000000 + parseInt(audio.time.substring(2), 10);

            fs.writeFileSync("./bk.json", JSON.stringify(audio, null, '\t'));

            if (!shell.which('git')) {
                shell.echo('Sorry, this script requires git');
                shell.exit(1);
            }

            if (shell.exec('git add ../../.').code !== 0) {
                shell.echo('Error: Git add failed');
                shell.exit(1);
            }

            if (shell.exec('git commit -m "Auto-commit"').code !== 0) {
                shell.echo('Error: Git commit failed');
                shell.exit(1);
            }

            if (shell.exec('git tag bk' + audio.time).code !== 0) {
                shell.echo('Error: Git tag failed');
                shell.exit(1);
            }

            if (shell.exec('git push --tags').code !== 0) {
                shell.echo('Error: Git push failed');
                shell.exit(1);
            }
        });
        
    });