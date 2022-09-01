const Channel = require("../../models/Channel");

Channel.findOne({ ch_name: user._id }, (err, ch) => {
    const arn = ch.arn.substring(ch.arn.lastIndexOf('/') + 1);
    const intervalFunc = async () => {
        const stream = await getMetric(req, arn)
        // const stream = checkStream(req, ch.arn)
        console.log(stream)
    }

    setInterval(intervalFunc, 5000);

    res.render('broadcast', {
        layout: "layouts/noFooter",
        ch: ch,
    });
})

const checkStream = (req, arn) => {
    const checkStream_option = {
        "channelArn": arn
    };

    const checkStream = new GetStreamCommand(checkStream_option);

    aivs_client.send(checkStream)
        .then((stream, err) => {
            try {
                const streamInfo = {
                    health: stream.stream.health,
                    state: stream.stream.state,
                    viewerCount: stream.stream.viewerCount,
                    startTime: stream.stream.startTime,
                }

                console.log(streamInfo);
            } catch (err) {
                return err;
            }
        })
}

const sendMetadata = (req, arn) => {
    Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
        const sendMetadata_option = {
            channelArn: ch.arn,
            metadata: "hello test"
        };

        const sendMetadata = new PutMetadataCommand(sendMetadata_option);

        aivs_client.send(sendMetadata)
            .then((result, err) => {
                try {
                    console.log(result || err)

                    return result;
                } catch (err) {
                    return err;
                }
            })
    })
}