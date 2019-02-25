const fs = require('fs')

var KEY;
function startWebSocket()
{
    let WebSocket = require('ws');
        
    let websocket = new WebSocket('wss://stream.pushbullet.com/websocket/' + KEY);
    websocket.onopen = function(e) {
        console.log("Opening")
    }
    websocket.onmessage = function(e) {
        data = JSON.parse(e.data);
        if(data.type === 'nop')
        {
            console.log("Connection is still alive.");
        }
        else if(data.type === 'tickle')
        {
            console.log("Push is performed.");
            if(data.subtype === 'push')
            {
                require('./perform-request.js');
                functions.sendRequest(KEY);
            }
        }
    }
    websocket.onerror = function(e) {
        console.log("WebSocket onerror");
    }
    websocket.onclose = function(e) {
        console.log("WebSocket onclose");
    }
}

fs.readFile('API', 'utf8', function(err, content) 
    {
        KEY = content;
        startWebSocket();
        console.log("API KEY", KEY)
    }
);