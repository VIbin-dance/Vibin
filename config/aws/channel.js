const Channel = require("../../models/Channel");

const {
    IvsClient,
    CreateChannelCommand,
    DeleteStreamKeyCommand,
    CreateStreamKeyCommand,
    GetRecordingConfigurationCommand,
    GetStreamCommand,
    GetStreamSessionCommand,
    PutMetadataCommand,
} = require("@aws-sdk/client-ivs");

const aivs_client = new IvsClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
});

const createChannel = (req, res, ch_name) => {
    const CreateChannel_option = {
        authorized: false,
        latencyMode: "LOW",
        name: ch_name,
        type: "STANDARD",
        recordingConfigurationArn: "arn:aws:ivs:us-east-1:401352423179:recording-configuration/LxErdP3T3v6H",
    };

    const CreateChannel = new CreateChannelCommand(CreateChannel_option);

    aivs_client.send(CreateChannel)
        .then((data) => {
            Channel.findOneAndUpdate({ ch_name: req.session.user._id }, {
                ch_name: data.channel.name,
                arn: data.channel.arn,
                authorized: data.channel.authorized,
                ingestEndpoint: data.channel.ingestEndpoint,
                latencyMode: data.channel.latencyMode,
                playbackUrl: data.channel.playbackUrl,
                type: data.channel.type,
                streamKey: {
                    arn: data.streamKey.arn,
                    value: data.streamKey.value,
                },
                s3: {
                    arn: data.channel.recordingConfigurationArn
                },
            }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ch) => {
                if (err) {
                    req.flash("error_msg", "チャンネルが作成されませんでした。");
                    res.redirect('/lesson/channel');
                } else {
                    req.flash("success_msg", "チャンネルが作成されました。");
                    res.redirect('/lesson/channel');
                }
            });
        })
};

// const getRecording = (req, res) => {
//     Channel.findOne({ uesrId: req.user.id }, (err, ch) => {
//         if (err) {
//             req.flash('error', 'チャンネルを探せませんでした。Failed Mongoose search');
//             res.redirect('/lesson/channel');
//         }

//         let channel_arn = ch.arn;
//         const GetRecording_option = {
//             "arn": channel_arn
//         };

//         const GetRecording = new GetRecordingConfigurationCommand(GetRecording_option);

//         aivs_client.send(GetRecording)
//             .then((data) => {
//                 console.log(data);
//                 req.flash('success_msg', 'チャンネルを削除しました。');
//             }).catch((error) => {
//                 console.log(error)
//                 req.flash('error', 'チャンネルが削除されませんでした。');
//             });
//     });
// };

// const deleteChannel = (req, res) => {
//     Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
//         if (err) {
//             req.flash('error', 'チャンネルを削除できませんでした。Fail Mongoose search');
//             res.redirect('/lesson/channel');
//         }

//         const DeleteRecording_option = {
//             "arn": ch.s3.arn
//         };

//         const DeleteChannel_option = {
//             "arn": ch.arn
//         };

//         const DeleteRecording = new DeleteRecordingConfigurationCommand(DeleteRecording_option);
//         const DeleteChannel = new DeleteChannelCommand(DeleteChannel_option);

//         aivs_client.send(DeleteChannel)
//             .then((cha) => {
//                 aivs_client.send(DeleteRecording)
//                     .then((rec) => {
//                         req.flash('success_msg', 'チャンネルを削除しました。');
//                         res.redirect('/lesson/channel');
//                     })
//             }).catch((error) => {
//                 console.log(error)
//                 req.flash('error', 'チャンネルが削除されませんでした。');
//                 res.redirect('/lesson/channel');
//             });

//         Channel.deleteOne({ ch_name: req.session.user._id }, (err) => {
//             if (err) {
//                 req.flash('error', 'チャンネルを削除できませんでした。- Fail Mongoose delete');
//                 res.redirect('/lesson/channel');
//             }
//         });
//     });
// };

const updateStreamKey = (req, res) => {
    Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
        const DeleteStreamKey_option = {
            "arn": ch.streamKey.arn
        };

        const DeleteStreamKey = new DeleteStreamKeyCommand(DeleteStreamKey_option);

        aivs_client.send(DeleteStreamKey)
            .then(() => {
                const CreateStreamKey_option = {
                    "channelArn": ch.arn
                };

                const CreateStreamKey = new CreateStreamKeyCommand(CreateStreamKey_option);

                aivs_client.send(CreateStreamKey)
                    .then((result) => {
                        Channel.findOneAndUpdate({ ch_name: req.session.user._id }, {
                            streamKey: {
                                arn: result.streamKey.arn,
                                value: result.streamKey.value,
                            }
                        }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ch) => {
                            if (err) {
                                req.flash("error_msg", "ストリームキーがリセットされませんでした。");
                                res.redirect('/lesson/channel');
                            } else {
                                req.flash("success_msg", "ストリームキーがリセットされました。");
                                res.redirect('/lesson/channel');
                            }
                        });
                    })
            })
    });
};

const checkStream = (req, res) => {
    Channel.findOne({ ch_name: req.session.user._id }, (err, ch) => {
        const checkStream_option = {
            "channelArn": ch.arn
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

                    return streamInfo;
                } catch (err) {
                    return err;
                }
            })
    });
}

const sendMetadata = (req, res) => {
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

module.exports = { createChannel, updateStreamKey, checkStream, sendMetadata };