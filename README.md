# Online Horror Library
Your local library for "Horror" genre enthusiast is now available online.

## Overview
Online Horror Library is a repository for the backend of a local library. It provide access to many books in the "Horror" genre. Which you can book an appointment online to borrow and we're open 24 hours.

## Running the program
You can set up the repository manually or using `docker-compose`:
* [Manual Installation](https://github.com/Lunarisnia/online-lib#manual-installation)
* [Using docker-compose](https://github.com/Lunarisnia/online-lib#using-docker-compose)

## Manual Installation
1. Made sure you have at least `Node v16` installed. [See here for detail on installing NodeJS](https://nodejs.org/en)
2. Clone this repository
3. Navigate into the cloned repository
4. Create `.env` file at the root then populate the file according to [.env values details](https://github.com/Lunarisnia/online-lib#environment-variable-details)
5. Install all the required dependencies using:\
   `npm install`
6. Build the app with:\
   `npm run build`
7. Run the app using:\
   `npm start`

## Using Docker Compose
1. Made sure you have `docker` installed and `docker compose | docker-compose` is available. [Click here for detailed instruction on installing docker.](https://docs.docker.com/desktop/)
2. Clone this repository
3. Navigate into the cloned repository
4. Create `.env` file at the root then populate the file according to [.env values details](https://github.com/Lunarisnia/online-lib#environment-variable-details)
5. Run docker compose:
      - docker\
         `docker compose up -d`
      - docker-compose\
         `docker-compose up -d`

## Environment Variable Details
| Variable      | Status        | Example                           | Default                           | Description  |
| ------------- |:-------------:|:---------------------------------:|:---------------------------------:|:------------:|
| NODE_ENV      | REQUIRED      | development \| production \| test | development \| production \| test | The environment variable your app is running on, can be left empty since it will be replaced by the npm command anyway. |
| PORT          | REQUIRED      | 4000                              | 3000                              | The Port your application is running on, default to 3000 if not filled |
| API_VERSION   | OPTIONAL      | 1.2.0                             | 1.0.0                             | Your API Version doesn't affect anything logically. Can be left empty |
| LIBRARY_HOST  | REQUIRED      | https://openlibrary.org           |                                   | OpenLibrary API Host URL. Usually https://openlibrary.org/ |
| JWT_SECRET    | REQUIRED      | mypersonaljwtsecretkey            |                                   | Your private JSONWebToken secret key. [To Learn More About JSONWebToken](https://jwt.io/introduction) |
| JWT_EXP       | REQUIRED      | 2h \| 1d \| 4y                    | 2h                                | Your JWT Token Expiry duration. Expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms) |
