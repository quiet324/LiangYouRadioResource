const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');
var shell = require('shelljs');
var dateFormat = require('dateformat');
var async = require('async');
var downloadFileSync = require('download-file-sync');

var results = JSON.parse(fs.readFileSync('../../artist.json', 'utf8'));
results.forEach(function(artist) {

    x('http://txly2.net/' + artist.shortName, 'tbody tr', {
            "time": '.ss-title a',
            "title": '.ss-title p',
            "downUrl": '.ss-dl a@href'
        })
        // .write('results.json')
        (function(err, audio) {

            if (err === null) {
                var index = audio.downUrl.indexOf('?');
                var sub = audio.downUrl.substring(0, index);
                var lastIndex = audio.downUrl.lastIndexOf('/');
                var fileName = sub.substring(lastIndex + 1);
                audio.downUrl = sub;
                audio.time = audio.time.substring(audio.time.lastIndexOf('-') + 1);
                console.log(artist.name)
                console.log(audio.time)
                var today = dateFormat(new Date(), "yyyymmdd");
                if (audio.time === today) {
                    var file = '../../' + artist.shortName + '/' + fileName;

                    if (true) { //
                        // Do something

                        // var data =  require('child_process').execFileSync('curl', ['--silent', '-L', audio.downUrl]);
                        // // var data = downloadFileSync(audio.downUrl)

                        // fs.writeFileSync('../../' + artist.shortName + '/' + fileName, data);

                        // var commitTag = artist.shortName + audio.time;

                        var commitTag = artist.shortName + audio.time;

                        audio.duration = artist.duration;
                        audio.size = artist.size;
                        audio.artistId = artist.id;
                        audio.artistName = artist.name;
                        audio.path = "https://rawcdn.githack.com/quiet324/LiangYouRadioResource/" + commitTag + "/" + artist.shortName + "/" + fileName;
                        audio.id = artist.id * 1000000 + parseInt(audio.time.substring(2), 10);

                        fs.writeFileSync("./" + artist.shortName + audio.time + ".json", JSON.stringify(audio, null, '\t'));

                        // if (!shell.which('git')) {
                        //     shell.echo('Sorry, this script requires git');
                        //     shell.exit(1);
                        // }

                        // if (shell.exec('git add ../../.').code !== 0) {
                        //     shell.echo('Error: Git add failed');
                        //     shell.exit(1);
                        // }

                        // if (shell.exec('git commit -m "Auto-commit"').code !== 0) {
                        //     shell.echo('Error: Git commit failed');
                        //     shell.exit(1);
                        // }

                        // if (shell.exec('git tag ' + artist.shortName + audio.time).code !== 0) {
                        //     shell.echo('Error: Git tag failed');
                        //     shell.exit(1);
                        // }

                        // if (shell.exec('git push --tags').code !== 0) {
                        //     shell.echo('Error: Git push failed');
                        //     shell.exit(1);
                        // }



                    }

                    //  else {
                    //     console.log(file + " exit");
                    // }


                }

            }







            // download(audio.downUrl).then(data => {
            //     fs.writeFileSync('../../' + artist.shortName + '/' + fileName, data);

            //     var commitTag = artist.shortName + audio.time


            //     audio.duration = artist.duration;
            //     audio.size = artist.size;
            //     audio.artistId = artist.id;
            //     audio.artistName = artist.name;
            //     audio.path = "https://rawcdn.githack.com/quiet324/LiangYouRadioResource/" + commitTag + "/" + artist.shortName + "/" + fileName;
            //     audio.id = 1000000 + parseInt(audio.time.substring(2), 10);

            //     fs.writeFileSync("./" + artist.shortName + ".json", JSON.stringify(audio, null, '\t'));

            //     if (!shell.which('git')) {
            //         shell.echo('Sorry, this script requires git');
            //         shell.exit(1);
            //     }

            //     if (shell.exec('git add ../../.').code !== 0) {
            //         shell.echo('Error: Git add failed');
            //         shell.exit(1);
            //     }

            //     if (shell.exec('git commit -m "Auto-commit"').code !== 0) {
            //         shell.echo('Error: Git commit failed');
            //         shell.exit(1);
            //     }

            //     if (shell.exec('git tag ' + artist.shortName + audio.time).code !== 0) {
            //         shell.echo('Error: Git tag failed');
            //         shell.exit(1);
            //     }

            //     if (shell.exec('git push --tags').code !== 0) {
            //         shell.echo('Error: Git push failed');
            //         shell.exit(1);
            //     }



            // });



        });
});