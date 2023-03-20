# Online Horror Library
Your local library for "Horror" genre enthusiast is now available online.

## Table of contents
* [Overview](https://github.com/Lunarisnia/online-lib#overview)
* [Running the program](https://github.com/Lunarisnia/online-lib#running-the-program)
   * [Manual Installation](https://github.com/Lunarisnia/online-lib#manual-installation)
   * [Using Docker Compose](https://github.com/Lunarisnia/online-lib#using-docker-compose)
* [Environment Variable Details](https://github.com/Lunarisnia/online-lib#environment-variable-details)
* [API Documentation](https://github.com/Lunarisnia/online-lib#api-documentations)
   * [Introduction](https://github.com/Lunarisnia/online-lib#introduction)
   * [Authorization](https://github.com/Lunarisnia/online-lib#authorization)
   * [Error Response](https://github.com/Lunarisnia/online-lib#error-response)
   * [Endpoints](https://github.com/Lunarisnia/online-lib#endpoints)
* [Pre-Existing User List](https://github.com/Lunarisnia/online-lib#pre-existing-user-list)
* [Open Library API](https://openlibrary.org/developers/api)

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
|:-------------:|:-------------:|:---------------------------------:|:---------------------------------:|:------------:|
| NODE_ENV      | REQUIRED      | development \| production \| test |                                   | The environment variable your app is running on. |
| PORT          | REQUIRED      | 4000                              |                                   | The Port your application is running on. |
| API_VERSION   | OPTIONAL      | 1.2.0                             | 1.0.0                             | Your API Version doesn't affect anything logically. Can be left empty |
| LIBRARY_HOST  | REQUIRED      | https://openlibrary.org           |                                   | OpenLibrary API Host URL. Usually https://openlibrary.org/ |
| JWT_SECRET    | REQUIRED      | mypersonaljwtsecretkey            |                                   | Your private JSONWebToken secret key. [To Learn More About JSONWebToken](https://jwt.io/introduction) |
| JWT_EXP       | OPTIONAL      | 2h \| 1d \| 4y                    | 2h                                | Your JWT Token Expiry duration. Expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms) |

## API Documentations
### Introduction
First of all, since the focus of the challenge is not the process of user sign in, I am assuming we only use pre-existing users which can be found [here](https://github.com/Lunarisnia/online-lib#pre-existing-user-list). Also the App doesn't have persistent storage, everything is stored in an Array.

### Authorization
Almost all API require the use of a generated JWT Token. You can get this token by requesting the login API, you should provide your token in the `Authorization` header with value as `Bearer <insert your token>`


### Error Response
Many API endpoint return the JSON representation of the resources created or edited. However, if an invalid request is submitted, or some other error occurs, the API return a response in the following format:
```
{
    "error": {
        "id": number,
        "name": string,
        "message": string
    }
}
```
`id` attribute contains a unique identifier for the error

`name` attribute contains the name of the error

`message` attribute contains the error message

### Endpoints
- Login\
   Endpoint used to obtain the JWT Token required to access most endpoints.

   ```
   API: /v1/auth/login
   METHOD: POST
   CONTENT TYPE: application/json
   AUTH: none
   BODY: {
       "username": string,
       "password": string
   }
   ```

   `REQUIRED` the `username` attribute is a string representing the user's username.

   `REQUIRED` the `password` attribute is a string representing the user's password.

   - Response

      ```
      {
       "token": string
      }
      ```
      
      `token` attribute is a string containing the generated JWT Token
   
- Book List\
   Endpoint used to obtain the list of horror books available.

   ```
   API: /v1/book?page_number=1&page_size=10
   METHOD: GET
   CONTENT TYPE: application/json
   AUTH: none
   ```

   `OPTIONAL` the `page_size` attribute is a number representing the page size. Default to 10

   `OPTIONAL` the `page_number` attribute is a number representing the page number (starting from 1). Default to 1

   - Response
      ```
      {
          "total_work": number,
          "works": [
              {
                  "key": string,
                  "title": string,
                  "edition_count": number,
                  "cover_id": number,
                  "cover_edition_key": string,
                  "subject": [string],
                  "ia_collection": [string],
                  "lendinglibrary": boolean,
                  "printdisabled": boolean,
                  "lending_edition": string,
                  "lending_identifier": string,
                  "authors": [
                      {
                          "key": string,
                          "name": string
                      }
                  ],
                  "first_publish_year": number,
                  "ia": string,
                  "public_scan": boolean,
                  "has_fulltext": boolean,
              }
          ]
      }
      ```

      `total_work` number representing the total books available
   
      `works` array containing the response body obtained from the OpenLibrary API
      - `key` string representing the unique identifier of the whole work
      - `title` string representing the title of the work
      - `cover_id` number representing the cover id
      - `cover_edition_key` string representing the unique edition key (this is what is used to submit appointment)
      - `subject` array of strings representing the list of genre/subject for the work
      - `ia_collection` array of strings representing the list of ia collection
      - `lendinglibrary` boolean
      - `printdisabled` boolean
      - `lending_edition` string
      - `lending_identifier` string
      - `authors` array of object representing the list of authors
      - `first_publish_year` number representing the work first published year
      - `ia` string
      - `public_scan` boolean
      - `has_fulltext` boolean 

- Show Your Borrow Appointment List\
   Endpoint used to obtain the list of appointment the logged in user made.

   ```
   API: /v1/borrow?page_size=10&page_number=1
   METHOD: GET
   CONTENT TYPE: application/json
   AUTH: Bearer <Token>
   ```

   `OPTIONAL` the `page_size` attribute is a number representing the page size. Default to 10

   `OPTIONAL` the `page_number` attribute is a number representing the page number (starting from 1). Default to 1

   - Response
      ```
      {
          "page_size": number,
          "page_number": number,
          "total_appointment": number,
          "appointments": [
              {
                  "id": string,
                  "authors": [
                      {
                          "key": string
                      }
                  ],
                  "cover_edition_key": string,
                  "title": string,
                  "user_id": string,
                  "pickup_in": Date,
              }
          ]
      }
      ```

      `page_size` attribute representing the page size.

      `page_number` attribute representing the page number.

      `total_appointment` attribute representing the total appointment for the user logged in.

      `appointments` array containing the list appointment for the user logged in.
      
      - `id` string representing the ID of the appointment.
      - `authors` array representing the author info.
      - `cover_edition_key` string representing the unique cover identifier from open library.
      - `title` string representing the book title.
      - `user_id` string representing the owner of the appointment.
      - `pickup_in` date string representing the scheduled pickup time in ISO 8601.

- Make an Appointment to borrow book\
   Endpoint used to create a booking to pickup book.

   ```
   API: /v1/borrow
   METHOD: POST
   CONTENT TYPE: application/json
   AUTH: Bearer <Token>
   BODY: {
    "cover_edition_key": string,
    "pickup_in": Date,
   }
   ```

   `REQUIRED` the `cover_edition_key` a string representing the unique identifier from the OpenLibrary API with the same name.

   `REQUIRED` the `pickup_in` a date string representing the specific pickup time (ISO 8601). Example: "2023-03-19 19:00:00"

   - Response
      ```
      {
         "id": string,
         "authors": [
             {
                 "key": string
             }
         ],
         "cover_edition_key": string,
         "title": string,
         "user_id": string,
         "pickup_in": Date,
     }
      ```

      `id` string representing the ID of the appointment.

      `authors` array representing the author info.

      `cover_edition_key` string representing the unique cover identifier from open library.

      `title` string representing the book title.

      `user_id` string representing the owner of the appointment.

      `pickup_in` date string representing the scheduled pickup time in ISO 8601.

- ADMIN ONLY: Show The List of Appointment\
   ADMIN ONLY: Endpoint used to obtain the list of appointment from every user

   ```
   API: /v1/admin/borrow/list?page_size=10&page_number=1
   METHOD: GET
   CONTENT TYPE: application/json
   AUTH: Bearer <Token>
   ```

   `OPTIONAL` the `page_size` attribute is a number representing the page size. Default to 10

   `OPTIONAL` the `page_number` attribute is a number representing the page number (starting from 1). Default to 1

   - Response
      ```
      {
          "page_size": number,
          "page_number": number,
          "total_appointment": number,
          "appointments": [
              {
                  "id": string,
                  "authors": [
                      {
                          "key": string
                      }
                  ],
                  "cover_edition_key": string,
                  "title": string,
                  "user_id": string,
                  "pickup_in": Date,
              }
          ]
      }
      ```

      `page_size` attribute representing the page size.

      `page_number` attribute representing the page number.

      `total_appointment` attribute representing the total appointment for the user logged in.

      `appointments` array containing the list appointment for the user logged in.
      
      - `id` string representing the ID of the appointment.
      - `authors` array representing the author info.
      - `cover_edition_key` string representing the unique cover identifier from open library.
      - `title` string representing the book title.
      - `user_id` string representing the owner of the appointment.
      - `pickup_in` date string representing the scheduled pickup time in ISO 8601.
         


## Pre-Existing User List
| User ID | Username         | Password      | Is admin  | 
|:-------:|:----------------:|:-------------:|:---------:|
| 0       | rio              | 123           | false     |
| 1       | tania            | 123           | false     |
| 2       | connor           | 123           | false     |
| 3       | joey             | 123           | true      |