'use strict'

const { S3 } = require("aws-sdk");

const s3 = new S3();

exports.handler = async (event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const filename = event.Records[0].s3.object.key;

  const params = {
    Bucket: bucketName,
    Key: filename,
  }

  let data = await s3.getObject(params).promise();
  let update = await s3.putObject(params).promise();
  let numbers = JSON.parse(data.Body.toString());
  
  console.log('numbers', numbers);

  const { numberOne, numberTwo } = numbers.numbers;
  let result = numberOne + numberTwo;
  console.log('Success, our numbers are: ', result);

  const response = {
    statusCode: 200,
    body: JSON.stringify('Lambda, says hi!')
  };
  return response;
};
