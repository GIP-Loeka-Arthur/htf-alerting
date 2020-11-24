const axios = require("axios");

// Handler that gets triggered when an inproper message has been found.
exports.lambdaHandler = async (event) => {
  // Since event.Records can give a collection of records we want to iterate through them. (handle every one of them)
  for (const item of event.Records) {
    // Send a notification in the slack channel (using a webhook)
    await axios.post(
      "https://hooks.slack.com/services/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",
      {
        text: JSON.parse(item.body).text,
      },
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
