var http            = require('http');
var dispatcher      = require('httpdispatcher');
var nlpService      = require('./service/nlpService');
var delegateManager = require('./service/delegateManager');
var twilioService   = require('./service/twillioService');

function handleRequest(request, response){
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

console.log("Server working!"); 
http.createServer(function (req, res) {
  handleRequest(req, res)
}).listen(8000);

dispatcher.setStatic('resources');

dispatcher.onPost("/text", function(req, res) {
    var message = req['params']['Body'];
    nlpService.parseMessage(message, function(parsedMessage){
        console.log(parsedMessage);
        res.writeHead(200, {
            'Content-Type':'text/xml'
        });
        delegateManager.delegateMessage(parsedMessage, function(result){
            twilioService.sendMessage(result);
            res.end(JSON.stringify(result));
        });
    });
}); 

dispatcher.onPost("/delegate", function(req, res) {
    var message = req.body;
    console.log(message);
    twilioService.sendMessage(message);
    res.end("recieved");
}); 