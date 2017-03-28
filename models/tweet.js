var mongoose = require("mongoose");

var tweetSchema = mongoose.Schema({
    hashtags: [],
    coordinates: [],
    created_at: {
        type: Date,
        default: Date.now(), 
        expiresAfterSeconds: 86400
    }
});

module.exports = mongoose.model("Tweet", tweetSchema);