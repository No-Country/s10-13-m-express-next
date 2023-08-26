# API Reference

All routes are prefixed with `/api`.

- Remember run `npm install` in the /server directory before starting the server and create a .env file with the necessary environment variables, you can get the values for the .env file in our Discord server.

- Run `npx prisma generate` in the /server directory before starting the server to generate the Prisma client.

- To start the server, run `npm run start:dev` in the /server directory, then navigate to `localhost:3001/api` in your browser.

## Auth API

The Auth API provides endpoints for user authentication and session management.

### Local Authentication

**Get Session ID**

Obtain an Session ID after authenticating the user locally.

```http
POST /auth/login
```

**Request Parameters**

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | **Required**. Email    |
| `password` | `string` | **Required**. Password |

**Successful Response**

If authentication is successful, you will receive a `200 OK` response, then you should check cookie to get `sessionId` and `userId`.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

### Google Authentication

**Google Login**

You have two options for Google authentication:

1. You can send a redirect URL to the backend and the backend will redirect the user to the redirect URL.

```http
localhost:3001/api/auth/google?redirectURL=about/tech
```

Be sure of send the parameter `redirectURL` without the `/` at the beginning.

**Example: `about/tech` instead of `/about/tech`.**

2. You can send no parameters and the backend will redirect the user to the home page of your application or the URL you provided in the `.env` file as `GOOGLE_DEFAULT_REDIRECT`.

```http
localhost:3001/api/auth/google
```

If authentication is successful, you should check cookies to get `sessionId` and `userId`.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Google Register**

You can also register a user with Google. To do this, you must send the `role` and `orgName` as query parameters.

- `role` can be `volunteer` or `organization`.
- `orgName` is the name of the organization.
- optional `redirectURL` parameter to redirect the user to a specific page after registration, if not provided, the user will be redirected to the URL you provided in the `.env` file as `GOOGLE_DEFAULT_REDIRECT`.

```http
localhost:3001/api/auth/google?redirectURL=about/tech&role=organization&orgName=example
```

If authentication is successful, you should check cookies to get `sessionId` and `userId`.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

### Verify Session

To verify a session, make a **post** request to this endpoint with the `sessionId` and `userId` as body parameters.

```http
POST /auth/verify
```

If the session is valid, you will receive a `200 OK` response, otherwise you will receive a `401 Unauthorized` response.

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

| Field       | Type     | Description                                           |
| :---------- | :------- | :---------------------------------------------------- |
| `firstName` | `string` | **Required**. First Name                              |
| `lastName`  | `string` | **Required**. Last Name                               |
| `phone`     | `string` | **Required**. Phone                                   |
| `password`  | `string` | **Required**. Password                                |
| `email`     | `string` | **Required**. Email                                   |
| `username`  | `string` | **Required**. User Name                               |
| `role`      | `string` | **Required**. Role (volunteer or organization)        |
| `birthday`  | `string` | **Required**. Birthday (YYYY-MM-DD)                   |
| `orgName`   | `string` | **Required for role organization**. Organization Name |

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
    "birthday": null,
    "phone": "1234",
    "email": "thomasbarenghi@gmail.com",
    "role": "volunteer",
    "password": "$2b$10$2B.aBLDJcPF0vI204V5d/uNcWBKnEQO2E4F9EQxDBl.mWzh8oB23W",
    "bannerImage": null,
    "username": "tomasbarenghi",
    "profileImage": null,
    "orgName": null,
    "posts": [],
    "reviews": []
  },
  "message": "User successfully found"
}
```
