from flask import Flask, render_template, request
from flask_pymongo import PyMongo
import json
from bson import BSON, json_util

app = Flask(__name__)

# Connect to mongodb
app.config['MONGO_DBNAME'] = 'twitter'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/twitter'

mongo = PyMongo(app)

@app.route('/', methods=['GET', 'POST'])
def base():
    tweets = mongo.db.tweets
    output = []

    # In case we want to request all tweets
    if request.method == 'GET':
        print "GET"
        for tweet in tweets.find():
            output.append(
                {'id': tweet['_id'], 
                'hashtags': tweet['hashtags'], 
                'coords': tweet['coordinates']})
        return json.dumps(output, indent=4, default=json_util.default)

    if request.method == 'POST':
        print "POST"
        try:
            lat = float(request.form['lat'])
            lon = float(request.form['lon'])

            # Find all tweets within about a 50km radius, 0.4 lat ~ 50km
            for tweet in tweets.find(
                {'coordinates.0': {'$gt': lat - 0.4, '$lt': lat + 0.4},
                'coordinates.1': {'$gt': lon - 0.4, '$lt': lon + 0.4}}):
                output.append(
                    {'id': tweet['_id'], 
                    'hashtags': tweet['hashtags'], 
                    'coords': tweet['coordinates']})
            return json.dumps(output, indent=4, default=json_util.default)
        except Exception as e:
            return str(e)

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == '__main__':
        app.run(debug=True)
