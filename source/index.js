var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('helloworld1');
app.id = require('../package.json').alexa.applicationId;

app.launch(function(req, res) {
  res.say("Hello World One!!").shouldEndSession(false);;
});

app.intent('NameIntent', {
  "slots": { "NAME": "NOT_LITERAL", "AGE": "NUMBER" },
  "utterances": ["{My name is|my name's} {-|NAME} and I am {1-100|AGE}{ years old|}"]
}, function(req, res) {
  res.say('Your name is ' + req.slot('NAME') + ' and you are ' + req.slot('AGE') + ' years old');
});

app.customSlot("NOT_LITERAL", ["matt", "bob", "bill", "jake", "nancy", "mary", "jane"]);

app.intent('AgeIntent', {
  "slots": { "AGE": "NUMBER" },
  "utterances": ["My age is {1-100|AGE}"]
}, function(req, res) {
  res.say('Your age is ' + req.slot('AGE'));
});


if (process.argv.length > 2) {
    if (process.argv[2] == "--model") {
       console.log(app.schemas.askcli())
    }
}

module.exports = app;
