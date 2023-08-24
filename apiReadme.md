# API Reference

All routes are prefixed with `/api/v1`. To start the server, run `npm run start:dev` in the /server directory, then navigate to `localhost:3001/api/v1` in your browser.
Remember run `npm install` in the /server directory before starting the server and create a .env file with the necessary environment variables, you can get the values for the .env file in our Discord server.



## Auth API

The Auth API provides endpoints for user authentication and session management.

### Local Authentication

**Get Access Token**

Obtain an access token after authenticating the user locally.

```http
POST /auth/login
```

**Request Parameters**

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | **Required**. Email    |
| `password` | `string` | **Required**. Password |

**Successful Response**

```json
{
  "sessionId": "your-session-id",
  "user": {
    "id": "your-user-id",
    "email": "your-email",
    "provider": "local"
  }
}
```

You will redirect the user to your application's URL with the `sessionId` and `userId` as query parameters, and then make a request to the `/auth/verify` endpoint to verify the session.

### Google Authentication

**Start Google Authentication**

Initiate the Google authentication process. Redirect the user to this route.

```http
GET /auth/google
```

**Redirect from Google**

After Google authentication, the user will be redirected to this route.

```http
GET /auth/google/callback
```

**Successful Response (Redirect)**

The user will be redirected to your application's URL with relevant parameters such as `sessionId` and `userId` if authentication is successful. You can then make a request to the `/auth/verify` endpoint to verify the session.

### Verify Session

To verify a session, make a **post** request to this endpoint with the `sessionId` and `userId` as body parameters.

```http
GET /auth/verify
```

If the session is valid, you will receive a `200 OK` response with the user object, otherwise you will receive a `401 Unauthorized` response.

---

## Users API

The Users API provides endpoints for user management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

#### Create User

To create a user, make a **post** request to this endpoint with the user's details as body parameters.

```http
POST /users
```

**Request Parameters**

| Field       | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `firstName` | `string` | **Required**. First Name                |
| `lastName`  | `string` | **Required**. Last Name                 |
| `phone`     | `string` | **Required**. Phone                     |
| `password`  | `string` | **Required**. Password                  |
| `email`     | `string` | **Required**. Email                     |
| `role`      | `string` | **Required**. Role (volunteer or admin) |

#### Get Users

To get all users, make a **get** request to this endpoint.

```http
GET /users
```

#### Get User

To get a user, make a **get** request to this endpoint with the user's id as a parameter.

```http
GET /users/:id
```

**Successful Response**

```json
{
  "user": {
    "id": "64e6db62bfaa945735cbec7c",
    "firstName": "test1",
    "lastName": "test1",
    "phone": "1234",
    "email": "thomasbarenghi@gmail.com",
    "role": "volunteer",
    "password": "$2b$10$2B.aBLDJcPF0vI204V5d/uNcWBKnEQO2E4F9EQxDBl.mWzh8oB23W",
    "profileImage": null,
    "posts": []
  },
  "message": "User successfully found"
}
```
