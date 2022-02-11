import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from random import seed, randint
from flaskext.mysql import MySQL
from db import get_user


api = Flask(__name__)
mysql = MySQL()
api.config["JWT_SECRET_KEY"] = "Value"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
# mysql configs
api.config['MYSQL_DATABASE_USER'] = 'root'
api.config['MYSQL_DATABASE_PASSWORD'] = 'root'
api.config['MYSQL_DATABASE_DB'] = 'EmpData'
api.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(api)

jwt = JWTManager(api)


# global variables
stats = {  # dictionary to store the statistics
    'test': [
        {
            'algorithm': 'BubbleSort',
            'level': 1,
            'time': 10.00
        }
    ]
}

#Routing function to create an access token with each login
#need to configure algorithm to search array of available logins
@api.route('/token', methods=["POST"])
def createToken():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg: Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


#Routing to user profile
#needs to return correct profile according to login
#profile includes user statistics
@api.route('/profile')
@jwt_required()
def myProfile():
    response_body = {
        "name" : "User",
        "about" : "Hello I am User"
    }

    return response_body


#Loging out route
@api.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"msg": "successfully logged out"})
    unset_jwt_cookies(response)
    return response


api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

# route to add statistics
@api.route('/add_entry', methods=["POST"])
def add_entry():
    if request.method == "POST":
        data = request.form

        # create a new entry if one for the user doesn't exist
        if stats[f'{data["user"]}']:
            stats[f'{data["user"]}'].append({
                'level': data["level"],
                'algorithm': data["algorithm"],
                'time': data["time"]
            });
        else:
            stats[f'{data["user"]}'] = [{
                'level': data["level"],
                'algorithm': data["algorithm"],
                'time': data["time"]
            }]
        return { 'message': 'Successfully added to statistics' }

# route to get all the statistics
@api.route('/get_stats', methods=["GET"])
@jwt_required()
def get_stats():
    email = get_jwt_identity()
    return { 'data': stats[email] }

# route to get randome numbers
@api.route('/random', methods=["GET"])
def random_nums():
    config = request.args

    results = []

    # default values
    ## size --> 10
    ## min --> 0
    ## max --> 10

    for _ in range(int(config.get("size", 10))):
        results.append(randint(int(config.get("min", 0)), int(config.get("max", 10))))
    return jsonify(results)
