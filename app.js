var express = require("express");
var Twitter = require("twitter");
var twitter_config = require("./config");

var app = express();
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

app.listen(process.env.port | 8080, process.env.IP, function(){
    console.log("Running in port 8080");
});
