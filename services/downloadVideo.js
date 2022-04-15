const { info } = require('console');
const fs = require('fs');
const ytdl = require('ytdl-core');


const downloadVideo = async(req, res) => {
    try {
        const videoURL = req.query.videoURL;
        const quality = req.query.quality;
        // const height = req.query.height;
        const videoID = req.query.videoID;
        const container = req.query.container;
        let info = await ytdl.getInfo(videoID);
        let formats = ytdl.chooseFormat(info.formats, { quality: '134' });
        // res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        const file = Math.floor(Date.now() / 1000) + ".mp4";
        ytdl(videoURL, {
            filter: format => formats.container === container
        }).pipe(res);
        // res.header(`Content-Disposition', 'attachment; filename="${file}"`);
        // res.download(file, (err) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(400).json(err);
        //     }
        //     fs.unlink(file, (err) => {
        //         if (err) {
        //             console.log(err);
        //             res.status(400).json(err);
        //         }
        //         console.log('FILE [' + file + '] REMOVED!');
        //     });
        // });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

};
const getVideoDetails = (req, res) => {
    const url = req.query.url;
    try {
        const videoID = ytdl.getURLVideoID(url)
        ytdl.getInfo(videoID).then(info => {
            const { title, lengthSeconds } = info.videoDetails;
            const { iframeUrl } = info.videoDetails.embed;

            let fmts = [];
            info.formats.forEach(format => {

                const { audioQuality, quality, qualityLabel, container, height, mimeType, hasAudio, contentLength } = format;
                if (qualityLabel != null && hasAudio)
                    fmts.push({
                        quality: quality,
                        qualityLabel: qualityLabel,
                        audio: !(audioQuality == null),
                        container: container,
                        height: height,
                        mimeType: mimeType,
                        contentLength: contentLength
                    });

            });
            const results = {
                videoID: videoID,
                title: title,
                iframeUrl: iframeUrl,
                lengthSeconds: lengthSeconds,
                formats: fmts
            };
            // console.log(results);
            res.json(results);

        })
    } catch (error) {
        res.status(400).json(error);
    }

}
module.exports = {
    downloadVideo,
    getVideoDetails
};