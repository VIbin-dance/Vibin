const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
        unique: true
    },
    choreographerID: {
        type: String,
        require: true
    },
    ch_name: {
        type: String,
        require: true
    },
    arn: {
        type: String,
        require: true
    },
    authorized: {
        type: String,
        require: true
    },
    ingestEndpoint: {
        type: String,
        require: true
    },
    latencyMode: {
        type: String,
        require: true
    },
    playbackUrl: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    s3: {
        arn: {
            type: String
        }
    },
    streamKey: {
        arn: {
            type: String,
            require: true
        },
        channelArn: {
            type: String,
            require: true
        },
        value: {
            type: String,
            require: true
        }
    }
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;