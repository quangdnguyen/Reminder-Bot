var HTTPS = require("https");
var HTTP = require("http");

var botID = process.env.BOT_ID;

var OWEN_ID = 39868511;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
    formalRegex = /^\/parents$/;
    pigRegex = /^\/pig$/;
    boRegex = /^\/Bo$/;

  if (request.text && formalRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Parents Formal: 10/26");
    this.res.end();
  } 
  else if (request.text && pigRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Pig Dinner: 9/28");
    this.res.end();
  }
  else if (request.text && boRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Bo Blair: Status - Pledge; Interests - Beans");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}



function postMessage(message) {
  var botResponse, options, body, botReq;

  botResponse = message;

  options = {
    hostname: "api.groupme.com",
    path: "/v3/bots/post",
    method: "POST"
  };

  body = {
    bot_id: botID,
    text: botResponse
  };

  console.log("sending " + botResponse + " to " + botID);

  botReq = HTTPS.request(options, function(res) {
    if (res.statusCode == 202) {
      //neat
    } else {
      console.log("rejecting bad status code " + res.statusCode);
    }
  });

  botReq.on("error", function(err) {
    console.log("error posting message " + JSON.stringify(err));
  });
  botReq.on("timeout", function(err) {
    console.log("timeout posting message " + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
