const express = require('express')
const ytdl = require('ytdl-core')
const fs = require('fs');
const app = express()

app.get('/', async(req, resp) => {
        const { url } = req.query

        ytdl(url, { filter: format => format.container === 'audioonly' })
            .pipe(fs.createWriteStream('video.mp3'));
    })

app.listen(3000, () => {
    console.log('foi');
})