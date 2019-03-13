# BACKEND Water-My-Plants

### API ><> https://api-watermyplants.herokuapp.com/ <><

## Table of Contents

- [ BACKEND Water-My-Plants ](#backend---water-my-plants)
  - [API ><> https://api-watermyplants.herokuapp.com/ <><](#api--httpsapiwatermyplantsherokuappcom)
  - [Table of Contents](#table-of-contents)
  - [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
    - [POST /auth/register](#post-/auth/register)
    - [POST /auth/login](#post-/auth/login)
    - [GET /api/users](#get-/api/users)
    - [GET /api/users/:id](#get-/api/users/:id)
    - [GET /api/users/:id/plants](#get-/api/users/:id/plants)
    - [GET /api/users/:id/notifications](#get-/api/users/:id/notifications)
    - [DELETE /api/users/:id](#get-/api/users/:id)
    - [GET /api/plants](#get-/api/plants)
    - [GET /api/plants/:id](#get-/api/plants/:id)
    - [POST /api/plants](#post-/api/plants)
    - [DELETE /api/plants/:id](#get-/api/plants/:id)
    - [GET /api/notifications](#get-/api/notifications)
    - [GET /api/notifications/:id](#get-/api/notifications/:id)
    - [POST /api/notifications](#post-/api/notifications)
    - [DELETE /api/notifications/:id](#get-/api/notifications/:id)
- [✨ Tech Used ✨](#%E2%9C%A8-tech-used-%E2%9C%A8)
- [Author](#author)

## Summary Table of API Endpoints

| Type   | Endpoints                    | Description                                                  |
| ------ | ---------------------------- | ------------------------------------------------------------ |
| POST   | /auth/register               | Register user                                                |
| POST   | /auth/login                  | Login                                                        |
| GET    | /api/users                   | get a list of all users if authorized                        |
| GET    | /api/users/:id               | gets a specific user by id                                   |
| GET    | /api/users/:id/plants        | gets all plants associated with a specific user by id        |
| GET    | /api/users/:id/notifications | gets all notifications associated with a specific user by id |
| PUT    | /api/users/:id               | update a user's information                                  |
| DELETE | /api/users/:id               | delete a user                                                |
| GET    | /api/plants/                 | get a list of all plants                                     |
| GET    | /api/plants/:id              | get a list of all plants associated with a userId            |
| POST   | /api/plants                  | create a new plant                                           |
| PUT    | /api/plants/:id              | update a plant's information                                 |
| GET    | /api/notifications/:id       | get a list of all notifications                              |
| GET    | /api/notifications/:id       | get all notifications associated with a user based on userId |
| POST   | /api/notifications/          | create a new notification                                    |
| PUT    | /api/notifications/:id       | update a notification                                        |
| DELETE | /api/notifications/:id       | delete a notification                                        |

### POST /auth/register

```
{
	"username": "testUser", // string, unique
	"firstName": "test", // string
	"lastName": "user", // string
	"phoneNumber": 12345678, // integer
	"password": "pass" // string
}
```

`200 ✅`

```
{
    "message": "Successfully created new user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTI1MDkxMzAsImV4cCI6MTU1MzExMzkzMH0.zi_85rm3hBO1OFrfNiGW2tH6ISDI5BEmMT_Qif4XqIk"
}
```

`400 ❌`

```
{
    "message": "Please enter information for all required fields."
}
```

### POST /auth/login

```
{
	"username": "testUser",
	"password": "pass"
}
```

`200 ✅`

```
{
    "message": "Login Success",
    "username": "testUser",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTU1MjUwOTI0MSwiZXhwIjoxNTUzMTE0MDQxfQ.1TCUGrEyP_jQ2fct48mPiZ7RGSnDezEfyTymvcPN0lg"
}
```

`400 ❌`

```
{
    "message": "Please enter a username and password."
}
```

### GET /api/users

`200 ✅ (AUTHORIZED)`

```
[
    {
        "id": 1,
        "firstName": "test",
        "lastName": "user",
        "username": "testUser",
        "password": "$2a$12$Q7Py5NG.M5CQHyQGH1Nzm.R0bW2AIpmSW0o3LhYBKDgdgD/TBtgIi",
        "phoneNumber": "12345678",
        "profileURL": null
    },
    {
        "id": 2,
        "firstName": "test",
        "lastName": "user",
        "username": "testUser2",
        "password": "$2a$12$Q7Py5NG.M5CQHyQGH1Nzm.R0bW2AIpmSW0o3LhYBKDgdgD/TBtgIp",
        "phoneNumber": "12345678",
        "profileURL": null
    }
]

```

`401 ❌ (NOT AUTHORIZED)`

```
[
    {
    "error": "No token provided, must be set on the Authorization Header."
    }
]

```

### GET /api/users/:id

`GET 200 ✅`

```
[{
        "id": 1,
        "firstName": "test",
        "lastName": "user",
        "username": "testUser",
        "password": "$2a$12$Q7Py5NG.M5CQHyQGH1Nzm.R0bW2AIpmSW0o3LhYBKDgdgD/TBtgIi",
        "phoneNumber": "12345678",
        "profileURL": null
    }]
```

`404 ❌`

```
{
    "message": "There is no user with that id."
}
```

### GET /api/users/:id/plants

`200 ✅`

```
[
    {
        "id": 2,
        "name": "yellow plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    },
    {
        "id": 4,
        "name": "red plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    }
]
```

`404 ❌`

```
{
    "message": "There are no plants with this user"
}
```

### GET /api/users/:id/notifications

`200 ✅`

```
[
    {
        "id": 2,
        "notificationTime": "2019-05-01T07:00:00.000Z",
        "smsDelivered": false,
        "plantId": 2,
        "userId": 5
    },
    {
        "id": 3,
        "notificationTime": "2000-01-01T19:00:00.000Z",
        "smsDelivered": false,
        "plantId": 2,
        "userId": 5
    }
]
```

`404 ❌`

```
{
    "message": "There are no notifications with this user"
}
```

### DELETE /api/users/:id/

`200 ✅`

```
{
    "message": "The user was successfully deleted."
}
```

`404 ❌`

```
{
    "message": "There are no users to delete corresponding with that id."
}
```

### GET /api/plants/

`200 ✅`

```
[
    {
        "id": 2,
        "name": "yellow plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    },
    {
        "id": 3,
        "name": "yellow plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 6
    }
]
```

### GET /api/plants/:id

`200 ✅`

```
[
    {
        "id": 2,
        "name": "yellow plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    },
    {
        "id": 3,
        "name": "yellow plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    }
]
```

`404 ❌`

```
{
    "message": "There are no plants associated with that id."
}
```

### POST /api/plants

`201 ✅`

```
[
    {
        "id": 6,
        "name": "blue plant",
        "location": "utah",
        "description": "It's a green plant",
        "plantURL": "google.com",
        "userId": 5
    }
]
```

`400 ❌`

```
{
    "message": "Please give the plant a name."
}
```

### DELETE /api/plants/:id/

`200 ✅`

```
{
    "message": "The plant was successfully deleted."
}
```

`404 ❌`

```
{
    "message": "There are no plants to delete corresponding with that id."
}
```

### GET /api/notifications

`200 ✅`

```
[
    {
        "id": 2,
        "notificationTime": "2019-05-01T07:00:00.000Z",
        "smsDelivered": false,
        "plantId": 2,
        "userId": 5
    },
    {
        "id": 3,
        "notificationTime": "2000-01-01T19:00:00.000Z",
        "smsDelivered": false,
        "plantId": 4,
        "userId": 6
    }
]
```

### GET /api/notifications/:id

`200 ✅`

```
[
    {
        "id": 2,
        "notificationTime": "2019-05-01T07:00:00.000Z",
        "smsDelivered": false,
        "plantId": 2,
        "userId": 5
    },
    {
        "id": 3,
        "notificationTime": "2000-01-01T19:00:00.000Z",
        "smsDelivered": false,
        "plantId": 3,
        "userId": 5
    }
]
```

`404 ❌`

```
{
    "message": "There are no notifications associated with that id."
}
```

### POST /api/notifications

`201 ✅`

```
[
    {
        "id": 2,
        "notificationTime": "2019-05-01T07:00:00.000Z",
        "smsDelivered": false,
        "plantId": 2,
        "userId": 10
    }
]
```

`400 ❌`

```
{
    "message": "Please give the notification a plantId and userId."
}
```

### DELETE /api/plants/:id/

`200 ✅`

```
{
    "message": "The notification was successfully deleted."
}
```

`404 ❌`

```
{
    "message": "There are no notifications to delete corresponding with that id."
}
```

### ✨ Tech Used ✨

```
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "helmet": "^3.16.0",
    "jsonwebtoken": "^8.5.0",
    "knex": "^0.16.3",
    "moment": "^2.24.0",
    "node-cron": "^2.0.3",
    "pg": "^7.8.2",
    "sqlite3": "^4.0.6",
    "twilio": "^3.29.1"
  },
  "devDependencies": {
    "jest": "^24.3.1",
    "nodemon": "^1.18.10",
    "supertest": "^4.0.0"
  }
```

### Author

- Christian Allen
