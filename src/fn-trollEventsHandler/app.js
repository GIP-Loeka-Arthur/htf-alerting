const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const comprehend = new AWS.Comprehend();

exports.lambdaHandler = async event => {
  try {
    // Log incoming event and environment variables
    console.log("EVENT: ", event);

    // console.log(
    //   "Variable 'UserPreferencesTable': " + process.env.UserPreferencesTable
    // );
    // console.log("Variable 'MSTeamsSQSUrl': " + process.env.MSTeamsSQSUrl);

    // // STEP 1: Amazon Comprehend => AI Sentiment analysis to retrieve severity
    // var sentiment = await detectSentiment(event.detail.text, "en");
    // console.log("Message sentiment: " + sentiment);

    // // STEP 2: DynamoDB => Retrieve list of subscribed profiles to sensitive-types

    // // STEP 3: For each subscriber route to channel sqs

    // sqs.createQueue({
    //     QueueName: "queue",
    //     Attributes: {

    //     }
    // })

    sqs.createQueue(
      {
        QueueName: "slack",
        tags: {
          Records: JSON.stringify([
            {
              body: {
                url:
                  "https://hooks.slack.com/services/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",
                text: event.text,
              },
              eventSource: "aws:sqs",
              awsRegion: "eu-west-1",
            },
          ]),
        },
      },
      (err, data) => {
        if (err) console.log(err, err.stack);
        else console.log(data);
      }
    );

    // sqs.createQueue(
    //   {
    //   },
    //   (err, data) => {
    //       if (err) console.log(err, err.stack);
    //       else console.log(data)
    //   }
    // );

    return "successfully finished";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function detectSentiment(text, language) {
  var params = {
    LanguageCode: language,
    Text: text,
  };

  var sentimentAnalysis = await comprehend.detectSentiment(params).promise();
  console.log(sentimentAnalysis);
  return sentimentAnalysis.Sentiment;
}
