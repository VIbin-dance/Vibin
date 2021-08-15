const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

const s3_client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const run = async () => {
  const data = await s3_client.send(new ListBucketsCommand({}));
  console.log("Success", data.Buckets);
};

run();
