var url     = "https://api.projectoxford.ai/luis/v1/application?id=799f7e7b-59ab-4ce6-a743-ad1f199af2a4&subscription-key=e21f0b33e2984f6ea3c2f8036e83d0a5&q=";
var request = require('request');

this.parseMessage = function(message, callback) {
  console.log(message);
  request({
      uri: url + message,
      method: "GET"
    }, function (err, res, body) {
      var nlpResponse = JSON.parse(body);
      console.log(JSON.stringify(nlpResponse));
      result = {};
      var certinity = nlpResponse["intents"][0]["score"];
      if(certinity > 0.5){
        result["intent"]   = nlpResponse["intents"][0]["intent"];
        result["entities"] = nlpResponse["entities"];
      } else{
        result["intent"]   = "None";
        result["entities"] = [];
      }
      callback(result)
    });
}