const axios = require("axios");

exports.lambdaHandler = async (event) => {
  for (const item of event.Records) {
      await axios
        .post(
          "https://hooks.slack.com/services/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",
          {
            text: JSON.parse(item.body).text,
          },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        )
  }
};
