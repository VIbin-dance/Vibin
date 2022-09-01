const moment = require('moment');
const Channel = require("../../models/Channel");
const { forEach } = require("async");

const {
    CloudWatchClient,
    GetMetricDataCommand,
} = require("@aws-sdk/client-cloudwatch");

const aivs_client = new CloudWatchClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
});

const getMetric = async (req, arn) => {
    const StartTime = moment.utc().subtract(30, 'seconds').format("YYYY-MM-DDTHH:mm:ssZ")
    const EndTime = moment.utc().format("YYYY-MM-DDTHH:mm:ssZ")

    const getMetric_option = {
        StartTime: new Date(StartTime),
        EndTime: new Date(EndTime),
        MetricDataQueries: [{
            "Id": "views",
            "MetricStat": {
                "Metric": {
                    Namespace: "AWS/IVS",
                    MetricName: "ConcurrentViews",

                    Dimensions: [{
                        Name: "Channel",
                        Value: arn
                    }],
                },
                "Period": 30,
                "Stat": "Maximum"
            },
            "ReturnData": true
        },
        {
            "Id": "bitrate",
            "MetricStat": {
                "Metric": {
                    Namespace: "AWS/IVS",
                    MetricName: "IngestVideoBitrate",
                    Dimensions: [{
                        Name: "Channel",
                        Value: arn
                    }],
                },
                "Period": 30,
                "Stat": "Average"
            },
            "ReturnData": true
        },
        {
            "Id": "fps",
            "MetricStat": {
                "Metric": {
                    Namespace: "AWS/IVS",
                    MetricName: "IngestFramerate",
                    Dimensions: [{
                        Name: "Channel",
                        Value: arn
                    }],
                },
                "Period": 30,
                "Stat": "Average"
            },
            "ReturnData": true
        },
        ]
    }

    const getMetric = new GetMetricDataCommand(getMetric_option);

    aivs_client.send(getMetric)
        .then((data) => {
            try {
                data.MetricDataResults.forEach(metric => {
                    return {
                        name: metric.Id,
                        time: metric.Timestamps,
                        value: metric.Values,
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })
};

module.exports = { getMetric };