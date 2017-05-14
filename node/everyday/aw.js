const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
var shell = require('shelljs');

x('http://txly2.net/aw', 'tbody tr', {
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
        download(audio.downUrl).then(data => {
            fs.writeFileSync('../../aw/' + fileName, data);

            audio.duration = 3560;
            audio.size = "28.5M";
            audio.artistId = 31;
            audio.artistName = "空中崇拜";
            audio.id = 31000000 + parseInt(audio.time.substring(2), 10);

            fs.writeFileSync("./aw.json", JSON.stringify(audio, null, '\t'));

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

            if (shell.exec('git tag aw' + audio.time).code !== 0) {
                shell.echo('Error: Git tag failed');
                shell.exit(1);
            }

            if (shell.exec('git push').code !== 0) {
                shell.echo('Error: Git push failed');
                shell.exit(1);
            }
        });
        
    });