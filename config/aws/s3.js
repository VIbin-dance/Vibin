// const Aws = require("aws-sdk");

// const s3 = new Aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
// });


// const uploadObject = async(key) => {
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: req.session.user._id,
//         Body: buffer,
//         ACL: "public-read-write",
//         ContentType: "image/jpeg",
//     };

//     const image = await s3.upload(params).promise();
// }

// module.exports = { uploadObject };