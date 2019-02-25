'use strict';
const https = require('https');
const fs    = require('fs');
const nrc = require('node-run-cmd');

function dataCallback(data) 
{
    console.log(data);
}

var startPlayer = [
        {
            'command' : 'pm2 start ecosystem.config.js',
        }
    ];
nrc.run(startPlayer,
    {
        'onData' : dataCallback,
        'onDone' : dataCallback
    }
);
setTimeout(function(){
    var stopPlayer = [
            {
                'command' : 'pm2 stop ecosystem.config.js',
            }
        ];
    nrc.run(stopPlayer,
        {
            'onData' : dataCallback
        }
    );
}, 1000*50);
/*
var KEY = '';
fs.readFile('API', 'utf8', function(err, content) 
    {
        KEY = content;
        let options = {
            'host'   : 'api.pushbullet.com',
            'path'   : '/v2/pushes',
            'method' : 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Access-Token': KEY
            }
        };
        let req = https.request(options, function (res) {
            var responseString = '';

            res.on('data', function (data) {
                responseString += data;
            });

            res.on('end', function () {
                console.log(responseString); 
                // print to console when response ends
            });
        });
        req.write('');
        req.end();
    }
);
*/