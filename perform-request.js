'use strict';
const child_process = require('child_process')
const https         = require('https')
function startMusic(title)
{
    let p = stopMedia();
    p.stdout.pipe(process.stdout);
    p.on('error',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-test -- "`
                              + title 
                              + ` music"`);
        }
    );
    p.on('exit',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-test -- "`
                              + title 
                              + ` music"`);
        }
    );
}

function stopMedia()
{
    return child_process.exec(`pm2 stop all"`);
}

function learnKorean()
{
    let p = stopMedia();
    p.stdout.pipe(process.stdout);
    p.on('error',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-learn-korean`);
        }
    );
    p.on('exit',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-learn-korean`);
        }
    );
}

function learnCantonese()
{
    let p = stopMedia();
    p.stdout.pipe(process.stdout);
    p.on('error',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-learn-cantonese`);
        }
    );
    p.on('exit',function()
        {
            child_process.exec(`pm2 start ecosystem.config.js --only youtube-learn-cantonese`);
        }
    );
}
function sendRequest(key)
{
    let responseString = '';
    let options = {
        'host'   : 'api.pushbullet.com',
        'path'   : '/v2/pushes',
        'method' : 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Access-Token': key,
            'limit': 1
        }
    };
    let req = https.request(options, function (res) {
        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            data = JSON.parse(responseString);
            processRequest(data);
        });
    });
    req.write('');
    req.end();
}

function processRequest(data)
{
    let title = data.pushes[0]['title']
    if(title !== 'Push2Run NEWLO')
        return;
    let body            = data.pushes[0]['body'];
    
    let play_youtube    = 'play youtube ';
    let stop_youtube    = 'youtube stop all youtube audio';
    let learn_cantonese = 'learn cantonese';
    let learn_korean    = 'learn korean';
    console.log("Command", body);
    if(body.startsWith(play_youtube))
    {
        startMusic(body.substring(play_youtube.length));
    }
    else if(body === stop_youtube)
    {
        stopMedia();
    }
    else if(body === learn_cantonese)
    {
        learnCantonese();
    }
    else if(body === learn_korean)
    {
        learnKorean();
    }
}

function retrievePush(key)
{
    sendRequest(key)
}

global.functions = {
    'sendRequest'  : sendRequest
}