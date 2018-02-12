var express = require('express');
var app = express();
import twitterDB from './twitterDB';

var port = 8081;
var server = app.listen(port, () => {
  console.log("Server started on 127.0.0.1:8081")
});

app.get('/', (req, res) => res.send("Hello World! \n In here you can see the differten sites i have created \r\n -Total count 127.0.0.1:8081/totalCount \n Most Links: 127.0.0.1:8081/mostLinks \n -Most Grumpy: 127.0.0.1:8081/mostGrumpy \n -Most Happy: 127.0.0.1:8081/mostHappy \n -Most Active: 127.0.0.1:8081/mostActive \n -Most Mentioned: 127.0.0.1:8081/mostMentioned"));

app.get('/totalCount', (req, res) => {
  getResultAsJSON(twitterDB.getCount, res)
});

app.get('/mostLinks', (req, res) => {
  getResultAsJSON(twitterDB.getMostLinks, res)
});

app.get('/mostGrumpy', (req, res) => {
  getResultAsJSON(twitterDB.getMostGrumpy, res)
});

app.get('/mostHappy', (req, res) => {
  getResultAsJSON(twitterDB.getMostHappy, res)
});

app.get('/mostActive', (req, res) => {
  getResultAsJSON(twitterDB.getMostActive, res)
});

app.get('/mostMentioned', (req, res) => {
  getResultAsJSON(twitterDB.getMostMentioned, res)
});

function getResultAsJSON(call, res) {
  call().then(result => {
      res.end(JSON.stringify(result));
  }).catch(err => {
      res.end(JSON.stringify(err));
  });
}