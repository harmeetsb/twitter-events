//============
//Dependencies
//============
var express = require("express");
var T = require("twit");
var mongoose = require("mongoose");

var Tweet = require("./models/tweet")
//============
//Config Files
//============
var twitter_config = require("./config");

mongoose.connect("mongodb://localhost/twitter");

var app = express();
app.set("view engine", "ejs");

var twitter = new T({
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

var stream = twitter.stream('statuses/sample')

stream.on('tweet', function (tweet) {
    if(tweet.geo != null) {
         console.log("====================================");
         console.log("Coordinates:",tweet.geo.coordinates);
         console.log("Hash Tags:", tweet.entities.hashtags);
         console.log("====================================");
        var tweet = {
            hashtags: tweet.entities.hashtags,
            coordinates: tweet.geo.coordinates
        };
        Tweet.create(tweet, function(err, tweet){
            if(err){
                console.log("error inserting tweet");
            } else {
                console.log("Sucessfully inserted tweet");
            }
        });
    }
})

app.listen(process.env.port | 8080, process.env.IP, function(){
    console.log("Running in port 8080");
});
