# API Reference

All routes are prefixed with `/api`.

- Remember run `npm install` in the /server directory before starting the server and create a .env file with the necessary environment variables, you can get the values for the .env file in our Discord server.

- Run `npx prisma generate` in the /server directory before starting the server to generate the Prisma client.

- To start the server, run `npm run start:dev` in the /server directory, then navigate to `localhost:3001/api` in your browser.

**Suggestion:** run backend in `localhost` and frontend in `127.0.0.1`, this is necessary to prevent problems with the cookies and other things.

## Auth API

The Auth API provides endpoints for user authentication and session management.

### Local Authentication

To login with email and password, make a **post** request to this endpoint.

```http
POST /auth/login
```

**Request Parameters**

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `email`    | `string` | **Required**. Email    |
| `password` | `string` | **Required**. Password |

**Successful Response**

If authentication is successful, you will receive a `200 OK` response, `userId` in the response body.

```json
{
  "userId": "64e6db62bfaa945735cbec7c"
}
```

You can use the `userId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send userId in headers to pass a verification middleware.

**Axios example login and test request:**

```js
const handleLoginLocal = async () => {
  const { data } = await axios.post(`${serverUrl}/auth/login`, credentials);
  Cookies.set("userId", data.userId, { expires: 1 });
};

const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        userId: `${Cookies.get("userId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("userId");
    console.log(err);
  }
};
```

### Google Authentication

**Google Login**

You have two options for Google authentication:

1. You can send a redirect URL to the backend and the backend will redirect the user to the redirect URL.

```http
localhost:3001/api/auth/google?redirectURL=about/tech
```

Be sure of send the parameter `redirectURL` without the `/` at the beginning.

**Example: use `about/tech` instead of `/about/tech`.**

2. You can send no parameters and the backend will redirect the user to the home page of your application or the URL you provided in the `.env` file as `GOOGLE_DEFAULT_REDIRECT`.

```http
localhost:3001/api/auth/google
```

If authentication is successful, the user will be redirected to the client application and in the url you will see `userId` as query parameters.

You can use the `userId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send userId in headers to pass a verification middleware.

**Axios example test request:**

```js
const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        userId: `${Cookies.get("userId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("userId");
    console.log(err);
  }
};
```

**Google Register**

You can also register a user with Google. To do this, you must send the `role` and `orgName` as query parameters (if the user is an organization)

- `role` can be `volunteer` or `organization`.
- `orgName` is the name of the organization.
- optional `redirectURL` parameter to redirect the user to a specific page after registration, if not provided, the user will be redirected to the URL you provided in the `.env` file as `GOOGLE_DEFAULT_REDIRECT`.

```http
localhost:3001/api/auth/google?redirectURL=about/tech&role=organization&orgName=example
```

If authentication is successful, the user will be redirected to the client application and in the url you will see `userId` as query parameters.

You can use the `userId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send userId in headers to pass a verification middleware.

**Axios example test request:**

```js
const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        userId: `${Cookies.get("userId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("userId");
    console.log(err);
  }
};
```

### Verify Session

To verify a session, make a **get** request to this endpoint with the `userId` in the headers.

```http
GET /auth/verify
```

**Example with axios:**

```js
const handleVerify = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        userId: `${Cookies.get("userId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("userId");
    console.log(err);
  }
};
```

If the session is valid, you will receive a `200 OK` response, otherwise you will receive a `401 Unauthorized` response.

### Close Session

To close a session, make a **get** request to this endpoint.

```http
GET /auth/logout
```

If the session is closed successfully, you will receive a `200 OK` response.

---

## Users API

The Users API provides endpoints for user management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

### Create User

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

**You dont need to send `userId` in the headers for this endpoint.**

### Get Users

To get all users, make a **get** request to this endpoint.

```http
GET /users
```

**You dont need to send `userId` in the headers for this endpoint.**

### Get User

To get a user, make a **get** request to this endpoint with the user's id as a parameter.

```http
GET /users/:id
```

**You dont need to send `userId` in the headers for this endpoint.**

### Delete User

To delete a user, make a **delete** request to this endpoint with the user's id as a parameter.

```http
DELETE /users/:id
```

You can only delete your own user.

**Explanation of the system:** A middleware checks if the id sent in the request parameters is the same as userId in the headers, if it is, the request is allowed, otherwise it is rejected.

**You need to send `userId` in the headers for this endpoint.**

---

## Env file explanation

```js
# General
PORT=
CLIENT_URL=
SESSION_MAX_AGE=3600000
# Database
DATABASE_URL=
#Google
GOOGLE_OAUTH_SECRET=
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_CALLBACK_URL=
GOOGLE_DEFAULT_REDIRECT=example
# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- `PORT` is the port where the server will run.
- `CLIENT_URL` is the url of the client application.
- `SESSION_MAX_AGE` is the time in milliseconds that the session will last.
- `DATABASE_URL` is the url of the database.
- `GOOGLE_OAUTH_SECRET` is the secret of the Google OAuth.
- `GOOGLE_OAUTH_CLIENT_ID` is the client id of the Google OAuth.
- `GOOGLE_CALLBACK_URL` is the callback url of the Google OAuth.
- `GOOGLE_DEFAULT_REDIRECT` is the default redirect url of the Google OAuth.
- `CLOUDINARY_CLOUD_NAME` is the cloud name of the Cloudinary account.
- `CLOUDINARY_API_KEY` is the api key of the Cloudinary account.
- `CLOUDINARY_API_SECRET` is the api secret of the Cloudinary account.
