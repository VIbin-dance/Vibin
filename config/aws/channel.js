const Channel = require("../../models/Channel");

const {
  IvsClient,
  CreateChannelCommand,
  CreateRecordingConfigurationCommand,
  DeleteChannelCommand,
  GetRecordingConfigurationCommand
} = require("@aws-sdk/client-ivs");

const aivs_client = new IvsClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION
});

const createChannel = (req, res, ch_name) => {
  const CreateRecord_option = {
    destinationConfiguration: {
      s3: {
        bucketName: "aws-us-east-1-401352423179-vibin-pipe"
      }
    },
  };

  const CreateRecord = new CreateRecordingConfigurationCommand(CreateRecord_option);

  aivs_client.send(CreateRecord)
    .then((record) => {
      console.log(record);
      console.log(record.recordingConfiguration.arn);

      const CreateChannel_option = {
        authorized: false,
        latencyMode: "LOW",
        name: ch_name,
        type: "STANDARD",
        recordingConfigurationArn: record.recordingConfiguration.arn,
      };
    
      const CreateChannel = new CreateChannelCommand(CreateChannel_option);

      aivs_client.send(CreateChannel)
      .then((data) => {
        console.log(data)
        Channel.findOneAndUpdate({ googleId: req.user.id }, {
          googleId: req.user.id,
          ch_name: data.channel.name,
          arn: data.channel.arn,
          authorized: data.channel.authorized,
          ingestEndpoint: data.channel.ingestEndpoint,
          latencyMode: data.channel.latencyMode,
          playbackUrl: data.channel.playbackUrl,
          type: data.channel.type,
          streamKey: {
            arn: data.streamKey.arn,
            channelArn: data.streamKey.channelArn,
            value: data.streamKey.value,
          },
          s3: {
            arn: data.channel.recordingConfigurationArn 
          },
        }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ch) => {
          if (err) {
            console.log(err);
            req.flash("error_msg", "チャンネルが作成されませんでした。");
          } else {
            req.flash("success_msg", "チャンネルが作成されました。");
            res.redirect("/lesson/channel")
          }
        });
      })
    }).catch((error) => {
      console.log(error)
      req.flash('error', 'チャンネルが作成されませんでした。');
    })
};

const getRecording = (req, res) => {
  Channel.findOne({ googleId: req.user.id }, (err, ch) => {
    if (err) {
      req.flash('error', 'チャンネルを探せませんでした。Failed Mongoose search');
      res.redirect('/lesson/channel');
    }

    let channel_arn = ch.arn;
    const GetRecording_option = {
      "arn" : channel_arn
    };

    const GetRecording = new GetRecordingConfigurationCommand(GetRecording_option);

    aivs_client.send(GetRecording)
    .then((data) => {
        console.log(data);
        req.flash('success_msg', 'チャンネルを削除しました。');
    }).catch((error) => {
        console.log(error)
        req.flash('error', 'チャンネルが削除されませんでした。');
    });
  });
};

const deleteChannel = (req, res) => {
  Channel.findOne({ googleId: req.user.id }, (err, ch) => {
    if (err) {
      req.flash('error', 'チャンネルを削除できませんでした。Fail Mongoose search');
      res.redirect('/lesson/channel');
    }

    let channel_arn = ch.arn;
    const DeleteChannel_option = {
      "arn": channel_arn
    };

    const DeleteChannel = new DeleteChannelCommand(DeleteChannel_option);

    aivs_client.send(DeleteChannel)
    .then((data) => {
        req.flash('success_msg', 'チャンネルを削除しました。');
        res.redirect('/lesson/channel');
    }).catch((error) => {
      console.log(error)
      req.flash('error', 'チャンネルが削除されませんでした。');
      res.redirect('/lesson/channel');
    });

    Channel.deleteOne({ googleId: req.user.id }, (err) => {
      if (err) {
        req.flash('error', 'チャンネルを削除できませんでした。- Fail Mongoose delete');
        res.redirect('/lesson/channel');
      }
    });
  });
};

module.exports = { createChannel, getRecording, deleteChannel };
