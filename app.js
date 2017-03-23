var express = require("express");
var Twit = require("twit");
var twitter_config = require("./config");

var app = express();

app.set("view engine", "ejs");

var client = new Twit({
  consumer_key: twitter_config.CONSUMER_KEY,
  consumer_secret: twitter_config.CONSUMER_SECRET,
  access_token: twitter_config.ACCESS_TOKEN_KEY,
  access_token_secret: twitter_config.ACCESS_TOKEN_SECRET,
  timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
});

//======
//ROUTES
//======
app.get("/", function(req, res){
    res.render("index");
});

app.listen(process.env.port | 8080, process.env.IP, function(){
    console.log("Running in port 8080");
});
