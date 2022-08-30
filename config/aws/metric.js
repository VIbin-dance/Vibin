const moment = require('moment');

const {
    CloudWatchClient,
    ListMetricsCommand,
    GetMetricStatisticsCommand,
} = require("@aws-sdk/client-cloudwatch");
const { forEach } = require("async");

const aivs_client = new CloudWatchClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION
});

const getMetric = (req, res) => {
    const chArn = "yGUo8U4W1oCA"

    // const getMetric_option = {
    //     Namespace: "AWS/IVS",
    //     Dimensions: [{
    //         Name: "Channel",
    //         Value: chArn
    //     }],
    // };

    const StartTime = moment().subtract(1, 'day').format("YYYY-MM-DDTHH:mm:ss+09:00")
    const EndTime = moment().format("YYYY-MM-DDTHH:mm:ss+09:00")
    console.log(StartTime)
    console.log(new Date(StartTime))
    console.log(EndTime)

    const getMetric_option = {
        Namespace: "AWS/IVS",
        MetricName: "LiveDeliveredTime",
        StartTime: new Date(StartTime),
        EndTime: new Date(EndTime),
        Period: 60,
        Dimensions: [{
            Name: "Channel",
            Value: chArn
        }],
        Statistics: ["SampleCount", "Average", "Sum"]
    };

    // const getMetric = new ListMetricsCommand(getMetric_option);
    const getMetric = new GetMetricStatisticsCommand(getMetric_option);

    aivs_client.send(getMetric)
        .then((data) => {
            try {
                console.log(data)
                // console.log(data.Metrics[0].Dimensions)
                // data.Metrics.forEach(metric => console.log(metric))
            } catch (err) {
                console.log(err)
            }
        })
};

module.exports = { getMetric };