const Aws = require("aws-sdk");

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});


const uploadObject = async(params) => {
    const image = await s3.upload(params).promise();
    return image
}

module.exports = { uploadObject };