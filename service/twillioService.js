var twilio = require('twilio');
var twilioClient = new twilio.RestClient('ACfec6001ff128b28a1c575e56a1f56798', 'f43804e468c4894bcb7a2f9b44cb4bbc');

this.sendMessage = function(textMessage){
    twilioClient.sms.messages.create({
        to:'+44 7713935655',
        from:'+44 1227 641117',
        body: textMessage
    }, function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });
}
