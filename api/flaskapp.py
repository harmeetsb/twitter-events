from flask import Flask, render_template
from flask_pymongo import PyMongo
import json
from bson import BSON, json_util

app = Flask(__name__)

# Connect to mongodb
app.config['MONGO_DBNAME'] = 'twitter'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/twitter'

mongo = PyMongo(app)

@app.route('/')
def base():
    tweets = mongo.db.tweets
    output = []
    for tweet in tweets.find():
        output.append({'id': tweet['_id'], 'coords': tweet['coordinates']})
    return json.dumps(output, sort_keys=True, indent=4, default=json_util.default)

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == '__main__':
        app.run(debug=True)
