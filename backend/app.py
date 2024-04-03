import os
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("exercise_db")


@app.route('/api/v1/users/register', methods=['POST'])
def register():
    data = request.get_json(silent=True)
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'success': 0, 'message': 'Username and password are required.'}), 400
    username = data.get('username')
    password = data.get('password')
    if username and password:
        user = db.users.find_one({'username': username})
        if user:
            return jsonify({'success': 0, 'message': 'Username already exists!'}), 400
        hashing = bcrypt.generate_password_hash(password).decode('utf-8')
        db.users.insert_one({'username': username, 'password': hashing})
        return jsonify({'success': 1, 'message': 'User created successfully.'}), 201


@app.route('/api/v1/users/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'success': 0, 'message': 'Username and password are required.'}), 400
    username = data.get('username')
    password = data.get('password')
    if username and password:
        user = db.users.find_one({'username': username})
        if user:
            if bcrypt.check_password_hash(user["password"], password):
                token = create_access_token(identity=username)
                return jsonify({'success':1, 'token': token, 'message': 'Logged in successfully!'}), 200
            return jsonify({'success': 0, 'message': 'Incorrect Password.'}), 400
        return jsonify({'success': 0, 'message': 'Username does not exist! Please register first.'}), 400


@app.route('/api/v1/users/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Successfully logged out user {current_user}'}), 200


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": 200}), 200


if __name__ == '__main__':
    app.run(debug=True)
