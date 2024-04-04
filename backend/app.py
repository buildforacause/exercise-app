import os
import pickle
import pandas as pd
import random
import requests
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors


headers = {
    "x-app-id": os.getenv("NUTRI_API_APP_ID"),
    "x-app-key": os.getenv("NUTRI_API_KEY"),
}

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("exercise_db")

df = pd.read_csv("data/exercises-cleaned.csv")

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['main'])
scaler = StandardScaler()
scaler.fit_transform(tfidf_matrix.toarray())

with open("model.pkl", "rb") as file:
    model = pickle.load(file)


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
    return jsonify({'success': 1, 'message': f'Successfully logged out user {current_user}'}), 200


# todo 1 - optimise this + use mongoDB + add validations to all API's
@app.route('/api/v1/exercises/recommend', methods=['POST'])
def recommend():
    data = request.get_json(silent=True)
    if not data or 'input' not in data:
        return jsonify({'success': 0, 'message': 'Input is required to post this route.'}), 400
    input = [data.get("input")]
    tfidf = tfidf_vectorizer.transform(input)
    scaled_input = scaler.transform(tfidf.toarray())
    _, indices = model.kneighbors(scaled_input)
    recommended_exercises_indices = indices[0]
    recommended_exercises_indices = recommended_exercises_indices.tolist()
    recommended_exercises = df.iloc[recommended_exercises_indices].to_dict(orient='records')
    exercises = random.sample(recommended_exercises, k=min(5, len(recommended_exercises)))
    return jsonify({'success': 1, 'data': exercises, 'message': 'Data recommended successfully'}), 200


# 1 second loading time due to external api call
# todo 2 - optimise this
@app.route('/api/v1/exercises/get-calories', methods=['POST'])
def get_calories():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'success': 0, 'message': 'Input is required to post this route.'}), 400
    exercise_params = {
        "query": data.get("query", ""),
        "gender": data.get("gender", ""),
        "weight_kg": float(data.get("weight", "0.00")),
        "height_cm": float(data.get("height", "0.00")),
        "age": int(data.get("age", "0"))
    }
    query = requests.post(url=os.getenv("NUTRI_API_ENDPOINT"), json=exercise_params, headers=headers)
    data = query.json()
    total_cal_burnt = 0
    total_mins_spent = 0
    exercises = []
    for n in range(0, len(data['exercises'])):
        exercise = [data['exercises'][n]['name'].title(), data['exercises'][n]['nf_calories'],
                    data['exercises'][n]['duration_min']]
        exercises.append(exercise)
        total_cal_burnt = total_cal_burnt + data['exercises'][n]['nf_calories']
        total_mins_spent = total_mins_spent + data['exercises'][n]['duration_min']
        return jsonify({'success': 1, 'message': f"You've burnt {total_cal_burnt} calories and spent {total_mins_spent} minutes!"}), 200


@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": 200}), 200


if __name__ == '__main__':
    app.run(debug=True)
