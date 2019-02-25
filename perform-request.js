'use strict';
const child_process = require('child_process')
const https         = require('https')
function startMusic(title)
{
    stopMusic();
    child_process.exec(`pm2 start ecosystem.config.js --name youtube-test -- "`
                      + title 
                      + `"`);
}

function stopMusic()
{
    child_process.exec(`pm2 stop all"`);
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
    let body  = data.pushes[0]['body'];
    
    let play_youtube = 'play youtube ';
    let stop_youtube = 'youtube stop all youtube audio';
    
    console.log("Command", body);
    if(body.startsWith(play_youtube))
    {
        startMusic(body.substring(play_youtube.length));
    }
    else if(body === stop_youtube)
    {
        stopMusic();
    }
}

function retrievePush(key)
{
    sendRequest(key)
}

global.functions = {
    'sendRequest'  : sendRequest
}