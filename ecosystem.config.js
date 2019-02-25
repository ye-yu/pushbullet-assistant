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
        }
    ]
}