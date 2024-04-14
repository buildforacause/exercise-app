# exercise.me - Exercise Recommendation Application

This app is an exercise recommendation webapp that recommends exercises based on either user's input or selection of muscles from an exercise picker provided in the app.

This app uses Nearest Neighbours algorithm for recommendation and dataset for this app was downloaded from [here](https://github.com/yuhonas/free-exercise-db). 

To view the model building and data pre-processing steps, you can visit [here](https://github.com/buildforacause/exercise-app/blob/main/notebook/JTP_Technical.ipynb)


## Index

- [Introduction](#introduction)
- [App Features](#app-features)
- [Tech Stack Used](#tech-stack-used)
- [Steps To Run The App](#steps-to-run-the-app)
- [Usage](#usage)
- [Sources](#sources)

## Introduction

exercise.me is a fitness web app that is designed for users to help them in their exercise selection process. There are two ways in which the user can be recommended:

 - First way: To enter a specific input according to the need of the user. This can include, for example, 'exercises without equipment'. This input is then passed to the backend of the application and then 5 best exercises are recommended according to this input. (Login is required for this feature)

 - Second way: To select a specific muscle on the body figure provided in the application. The muscles which are available are: Arms, Legs, Core, Chest, Triceps, Glutes, Lower Back and Upper Back. The body can be mapped to add more muscles in future. The selected muscle is then sent to backend and again 5 best exercises are recommended.

Not only recommendation, but this app also contains a BMI (Body Mass Index) calculator which takes in height (in cms) and weight (in kgs) of the user and provide them with the appropriate BMI category.

## App Features

- Feature 1: Recommendation based on user's input.
- Feature 2: Recommendation based on muscle selection from the body figure.
- Feature 3: Body Mass Index calculator which takes in height and weight of the user as an input.

## Tech Stack Used

This application has been developed using Python's Flask framework for the backend and ReactJS for the frontend. It also uses MongoDB as the database to store login information of the user. This application has been containerized using Docker in 3 parts, frontend, backend and database. This ensures smooth deployment and better scalability.

- Python
- Flask
- ReactJS
- MongoDB
- Docker
- HTML, CSS, JavaScript
- Bootstrap

## Steps To Run The App

### With Docker

#### Installation

- Docker 

Download Docker from [here](https://docs.docker.com/get-docker/).

- Docker Compose

Download Docker Compose from [here](https://docs.docker.com/compose/install/).

- Git

Download Git from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

#### After installation

1. Clone the repository

```
git clone https://github.com/buildforacause/exercise-app.git
```

2. Change the directory

```
cd exercise-app
```

3. Build using docker compose

```
docker-compose up --build
```

4. To Access the application

The application should now be running on `http://localhost:3000`.

- For Backend Visit: `http://localhost:5000`
- For Frontend Visit: `http://localhost:3000`

5. To Stop the application, paste the following command
    
```
docker-compose down
```

### Without Docker (needs Python, React and MongoDB installed)


#### Installation

- Python

Download Python from the steps mentioned [here](https://www.datacamp.com/blog/how-to-install-python) or [here](https://docs.python.org/3.10/using/windows.html?highlight=download).

- MongoDB

Download MongoDB from the steps mentioned [here](https://www.mongodb.com/docs/manual/installation/).

- ReactJS

Download React from the steps mentioned [here](https://www.freecodecamp.org/news/how-to-install-react-a-step-by-step-guide/)

- Git

Download Git from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


#### After installation

1. Clone the repository

```
git clone https://github.com/buildforacause/exercise-app.git
```

2. Open two terminals. In one terminal, navigate to frontend

```
cd exercise-app/frontend
```

3. Install frontend dependencies

```
npm install
```

4. In another terminal, navigate to backend

```
cd exercise-app/backend
```

5. Change the below line from 

```
client = MongoClient("mongodb://mongodb:27017")
```

to 

```
client = MongoClient("your mongo server URI from MongoDB compass")
```

5. Install the backend dependencies:

```
pip install -r requirements.txt
```

6. In backend terminal, type

```
waitress-serve --listen=*:5000 app:app
```

7. In frontend terminal, type

```
npm run start
```

8. To Access the application

The application should now be running on `http://localhost:3000`.

- For Backend Visit: `http://localhost:5000`
- For Frontend Visit: `http://localhost:3000`


### API

These are the available API's in the application:

- POST /api/v1/auth/login 
- POST /api/v1/auth/register
- POST /api/v1/exercises/recommend

## Usage

1. Open the application by going to `http://localhost:3000`.

![Homepage](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/homepage.png)


2. Click on the Login button on the top right of the navbar. The URL would be `http://localhost:3000/login`. (Please note that the username and password must be greater than or equal to 4)

![Login](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/login.png)

3. For new users, you will need to register in the application first before logging in. You can either click the button below which says 'Register here' or visit `http://localhost:3000/register`. (Please note that the username and password must be greater than or equal to 4)

![Register](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/register.png)

4. Now to test out the recommendations, you have two options:

- First, you can click on the picker button on the navbar or visit `http://localhost:3000/picker` to choose a particular body part exercise and you can then get recommendations based on it.

![Picker](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/picker.png)

- Second, you can click the recommend button on the navbar or visit `http://localhost:3000/recommend` to type in a query. For example, you can write `workouts for beginners` or `suggest me some exercises for my biceps`. In this way, you may see the following output.

![Recommend](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/recommend.png)


5. Additionally, you can also visit the BMI button provided on the navbar or visit `http://localhost:3000/bmi` to check your body mass index.

![BMI](https://raw.githubusercontent.com/buildforacause/exercise-app/main/screenshots/bmi.png)


## Sources

The dataset of this project was downloaded from [here](https://github.com/yuhonas/free-exercise-db).
