var express = require('express');
var app = express();

var dbo;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("social_net");
});

var port = 8081;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

app.get('/', (req, res) => res.send("Hello World! \n In here you can see the differten sites i have created \r\n -Total count 127.0.0.1:8081/totalCount \n Most Links: 127.0.0.1:8081/links \n -Most Grumpy: 127.0.0.1:8081/mostGrumpy \n -Most Happy: 127.0.0.1:8081/mostHappy \n -Most Active: 127.0.0.1:8081/mostActive \n -Most Mentioned: 127.0.0.1:8081/mostMentioned"));

app.get('/totalCount', function(req, res, next) {
  res.send(data)
});

app.get('/links', function(req, res, next) {
  res.send()
});

app.get('/mostGrumpy', function(req, res, next) {
  res.send()
});

app.get('/mostHappy', function(req, res, next) {
  res.send()
});

app.get('/mostActive', function(req, res, next) {
  res.send()
});

app.get('/mostMentioned', function(req, res, next) {
  res.send()
});
