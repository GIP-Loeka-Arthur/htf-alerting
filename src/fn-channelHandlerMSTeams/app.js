
const axios = require('axios');

exports.lambdaHandler = async ( event ) => {

    console.log(event)

    console.log("triggered channelhandler")

    axios.post("https://hooks.slack.com/services/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", {
        text: event.detail.text
    },
    {
       header: {
           "Content-Type": "application/json"
       } 
    }).then(() => "succesfully finished")
};
