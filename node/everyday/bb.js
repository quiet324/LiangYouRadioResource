const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
var shell = require('shelljs');
var dateFormat = require('dateformat');

x('http://txly2.net/bb', 'tbody tr', {
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
            fs.writeFileSync('../../bb/' + fileName, data);


            audio.duration = 860;
            audio.size = "6.9M";
            audio.artistId = 45;
            audio.artistName = "生根建造";
            audio.id = 45000000 + parseInt(audio.time.substring(2), 10);

            fs.writeFileSync("./bb.json", JSON.stringify(audio, null, '\t'));

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

            if (shell.exec('git tag ba' + audio.time).code !== 0) {
                shell.echo('Error: Git tag failed');
                shell.exit(1);
            }

            if (shell.exec('git push --tags').code !== 0) {
                shell.echo('Error: Git push failed');
                shell.exit(1);
            }
        });
        
    });