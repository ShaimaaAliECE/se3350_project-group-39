import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


api = Flask(__name__)

api.config["JWT_SECRET_KEY"] = "Value"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)

jwt = JWTManager(api)


#Routing function to create an access token with each login
#need to configure algorhitm to search array of available logins
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
    response = jsonify({"msg": "succesfully logges out"})
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

