const Channel = require("../../models/Channel");

const {
  IvsClient,
  CreateChannelCommand,
  CreateRecordingConfigurationCommand,
  DeleteChannelCommand,
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
  };

  const CreateChannel = new CreateChannelCommand(CreateChannel_option);

  aivs_client.send(CreateChannel)
    .then((data) => {
      Channel.findOneAndUpdate({ googleId: req.user.id }, {
          googleId: req.user.id,
          ch_name: data.channel.name,
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
        }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, ch) => {
          if (err) {
            console.log(err);
            req.flash("error_msg", "チャンネルが作成されませんでした。");
          } else {
            req.flash("success_msg", "チャンネルが作成されました。");
          }
          res.redirect("/lesson/channel");
        }
      );
    })
    .catch((error) => {
      console.log(error);
      req.flash("error", "チャンネルが作成されませんでした。");
      res.redirect("/lesson/channel");
    });
};

const createRecording = (req, res) => {
  const CreateRecord_option = {
      destinationConfiguration: {
          s3: {
              bucketName: `testvibin-${req.session.user.googleId}`
          }
      },
  };

  const CreateRecord = new CreateRecordingConfigurationCommand(CreateRecord_option);
  
  aivs_client.send(CreateRecord)
      .then((data) => {
          console.log(data);
          Channel.findOneAndUpdate({ googleId: req.user.id }, {
              googleId: req.user.id,
              ch_name: data.channel.name,
              arn: data.channel.arn,
          })
      }).catch((error) => {
          console.log(error)
          req.flash('error', 'チャンネルが作成されませんでした。');
          res.redirect('/lesson/channel');
      })
};

module.exports = { createChannel, createRecording };
