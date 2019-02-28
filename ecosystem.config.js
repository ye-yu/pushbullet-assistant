module.exports = {
    apps : [{
            name        : 'youtube-test',
            script      : 'C:/xampp/htdocs/dashboard/workspace/p2r-youtube/index.js',
            args        : '"' + (
                            process.argv[7] === undefined ?
                            'avril lavigne when youre gone' : process.argv[7]
                            ) + '"',
            autorestart : false,
            output: 'NULL',
            error: 'NULL'
        },{
            name        : 'youtube-learn-korean',
            script      : 'C:/xampp/htdocs/dashboard/workspace/p2r-youtube/index.js',
            args        : '"https://www.youtube.com/watch?v=J58tCA9CL2Y&t=1"',
            autorestart : false,
            output: 'NULL',
            error: 'NULL'
        },{
            name        : 'youtube-learn-cantonese',
            script      : 'C:/xampp/htdocs/dashboard/workspace/p2r-youtube/index.js',
            args        : '"https://www.youtube.com/watch?v=VXY8Ip5u_48&t=1"',
            autorestart : false,
            output: 'NULL',
            error: 'NULL'
        }
    ]
}