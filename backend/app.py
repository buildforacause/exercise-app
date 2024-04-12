import os
import pickle
import pandas as pd
import random
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from pydantic import BaseModel, ValidationError, constr
from validator import get_validated_data
from waitress import serve


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.urandom(12).hex()

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("exercise_db")

df = pd.read_csv("data/exercises-cleaned.csv")
df.fillna(0, inplace=True)

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['main'])
scaler = StandardScaler()
scaler.fit_transform(tfidf_matrix.toarray())

with open("model.pkl", "rb") as file:
    model = pickle.load(file)


class UserRegistrationModel(BaseModel):
    username: constr(min_length=4)
    password: constr(min_length=4)


@app.route('/api/v1/auth/register', methods=['POST'])
def register():
    validated = get_validated_data(request.get_json(silent=True), UserRegistrationModel, ValidationError)
    if not validated["success"]:
        return jsonify(validated), validated["status"]
    data = validated["data"]
    username = data.username
    password = data.password
    user = db.users.find_one({'username': username})
    if user:
        return jsonify({'success': 0, 'message': 'Username already exists!'}), 400
    hashing = bcrypt.generate_password_hash(password).decode('utf-8')
    db.users.insert_one({'username': username, 'password': hashing})
    return jsonify({'success': 1, 'message': 'User created successfully.'}), 201


@app.route('/api/v1/auth/login', methods=['POST'])
def login():
    validated = get_validated_data(request.get_json(silent=True), UserRegistrationModel, ValidationError)
    if not validated["success"]:
        return jsonify(validated), validated["status"]
    data = validated["data"]
    username = data.username
    password = data.password
    user = db.users.find_one({'username': username})
    if user:
        if bcrypt.check_password_hash(user["password"], password):
            expire_token_time = timedelta(hours=1)
            token = create_access_token(identity=username, expires_delta=expire_token_time)
            return jsonify({'success':1, 'token': token, 'user': user["username"], 'message': 'Logged in successfully!'}), 200
        return jsonify({'success': 0, 'message': 'Incorrect Password.'}), 400
    return jsonify({'success': 0, 'message': 'Username does not exist! Please register first.'}), 400


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


# a route to just get the status of the API running
@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": 200}), 200

if __name__ == '__main__':
   serve(app, host="0.0.0.0", port=5000)