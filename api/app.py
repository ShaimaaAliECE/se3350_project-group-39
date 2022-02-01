from flask import Flask
import time

app = Flask(__name__)

# default route
@app.route('/')
def index():
    return "<h1 style=\"text-align:center\">Welcome to KnowYourAlgo's Backend</h1>"

@app.route('/time')
def getTime():
    return {'time': time.time()}
