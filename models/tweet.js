var mongoose = require("mongoose");

var tweetSchema = mongoose.Schema({
    tweet: String,
    coordinates: [],
    created_at: {
        type: Date, 
        expiresAfterSeconds: 86400
    }
});

module.exports = mongoose.model("Tweet", tweetSchema);