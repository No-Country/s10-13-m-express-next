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

If authentication is successful, you will receive a `200 OK` response, `userId` and `sessionId` in the response body.

```json
{
  "userId": "64e6db62bfaa945735cbec7c"
  "sessionId": "870cba88-9201-4bc8-b57d-82640b348909"
}
```

You can use the `sessionId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send sessionId in headers to pass a verification middleware.

**Axios example login and test request:**

```js
const handleLoginLocal = async () => {
  const { data } = await axios.post(`${serverUrl}/auth/login`, credentials);
  Cookies.set("userId", data.userId, { expires: 1 });
  Cookies.set("sessionId", data.sessionId, { expires: 1 });
};

const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        sessionId: `${Cookies.get("sessionId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("sessionId");
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

If authentication is successful, the user will be redirected to the client application and in the url you will see `userId` and `sessionId` as query parameters.

You can use the `sessionId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send sessionId in headers to pass a verification middleware.

**Axios example test request:**

```js
const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        sessionId: `${Cookies.get("sessionId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("sessionId");
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

If authentication is successful, the user will be redirected to the client application and in the url you will see `userId` and `sessionId` as query parameters.

You can use the `sessionId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** in determine cases, you have to send sessionId in headers to pass a verification middleware.

**Axios example test request:**

```js
const handleTest = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        sessionId: `${Cookies.get("sessionId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("sessionId");
    console.log(err);
  }
};
```

### Verify Session

To verify a session, make a **get** request to this endpoint with the `sessionId` in the headers.

```http
GET /auth/verify
```

**Example with axios:**

```js
const handleVerify = async () => {
  try {
    await axios.get(`${serverUrl}/auth/verify`, {
      headers: {
        sessionId: `${Cookies.get("sessionId")}`,
      },
    });
  } catch (err) {
    Cookies.remove("sessionId");
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

**You dont need to send `sessionId` in the headers for this endpoint.**

### Get Users

To get all users, make a **get** request to this endpoint.

```http
GET /users
```

**You dont need to send `sessionId` in the headers for this endpoint.**

### Get User

To get a user, make a **get** request to this endpoint with the user's id as a parameter.

```http
GET /users/:id
```

**You dont need to send `sessionId` in the headers for this endpoint.**

### Delete User

To delete a user, make a **delete** request to this endpoint with the user's id as a parameter.

```http
DELETE /users/:id
```

You can only delete your own user.

**Explanation of the system:** A middleware checks if the id sent in the request parameters is the same as userId in the headers, if it is, the request is allowed, otherwise it is rejected.

**You need to send `userId` and `sessionId` in the headers for this endpoint.**

---

## Posts API

The Posts API provides endpoints for posts management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

#### Create a post

To create a post, make a **post** request to this endpoint with the post's details as body parameters.

```http
POST /posts
```

**Request Parameters**

| Field         | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. User Id             |
| `description` | `string` | **Required**. Description of post |
| `galery`      | `string` | **Required**. Galery image url    |

**Successful Response**

```json
{
  "newPost": {
    "id": "64ec7d59bf2050a701c8cefe",
    "userId": "64ec74df1c7cb25833355d33",
    "description": "Mi primer post",
    "createdAt": "2023-08-28T10:56:25.202Z",
    "galery": "image.jpg"
  },
  "message": "Post created Successfully"
}
```

#### Get Posts

To get all posts of a user, make a **get** request to this endpoint with the user's id as a parameter.

```http
GET /posts/:id
```

**Successful Response**

```json
{
  "posts": [
    {
      "id": "64ec7564e07c41c767643f39",
      "userId": "64ec74df1c7cb25833355d33",
      "description": "Mi mi post",
      "createdAt": "2023-08-28T10:22:28.872Z",
      "galery": "xk"
    },
    {
      "id": "64ec7d59bf2050a701c8cefe",
      "userId": "64ec74df1c7cb25833355d33",
      "description": "Mi segundo post",
      "createdAt": "2023-08-28T10:56:25.202Z",
      "galery": "pasd"
    }
  ],
  "message": "Posts successfully found"
}
```

#### Update Posts

To update a post of a user, make a **patch** request to this endpoint with the user's id as a parameter and the update details in the body.

```http
PATCH /posts/:id
```

**Request Parameters**

| Field         | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `description` | `string` | **Required**. Description of post |
| `galery`      | `string` | **Required**. Galery image url    |

**Successful Response**

```json
{
  "newPost": {
    "id": "64ec7d59bf2050a701c8cefe",
    "userId": "64ec74df1c7cb25833355d33",
    "description": "Mi primer post",
    "createdAt": "2023-08-28T10:56:25.202Z",
    "galery": "image.jpg"
  },
  "message": "Post update Successfully"
}
```

#### Delete Post

To delete a post of a user, make a **delete** request to this endpoint with the post's id as a parameter.

```http
DELETE /posts/:id
```

**Successful Response**

```json
{
  "newPost": {
    "id": "64ec7d59bf2050a701c8cefe",
    "userId": "64ec74df1c7cb25833355d33",
    "description": "Mi primer post",
    "createdAt": "2023-08-28T10:56:25.202Z",
    "galery": "image.jpg"
  },
  "message": "Post delete Successfully"
}
```

---

## Reviews API

The Reviews API provides endpoints for reviews management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

#### Create a review

To create a review, make a **post** request to this endpoint with the review's details as body parameters.

```http
POST /reviews
```

**Request Parameters**

| Field     | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `title`   | `string` | **Required**. Review title   |
| `body`    | `string` | **Required**. Review body    |
| `rating`  | `string` | **Required**. Review rating  |
| `userIDs` | `string` | **Required**. Review user id |

**Successful Response**

```json
{
  "newReview": {
    "id": "64ec9ad65388ee778b2ef219",
    "title": "primer review",
    "body": "body review",
    "rating": "Buena",
    "dateReview": "2023-08-28T13:02:14.908Z",
    "userIDs": "64ec74df1c7cb25833355d33"
  },
  "message": "Review created Successfully"
}
```

#### Get Reviews

To get all reviews, make a **get** request to this endpoint.

```http
GET /reviews/
```

**Successful Response**

```json
{
  "reviews": [
    {
      "id": "64ec95daaf8723707266cc8d",
      "title": "Primer review",
      "body": "body review",
      "rating": "Excelente",
      "dateReview": "2023-08-28T12:40:58.953Z",
      "userIDs": "64ec74df1c7cb25833355d33"
    },
    {
      "id": "64ec9ad65388ee778b2ef219",
      "title": "segundo review",
      "body": "body review",
      "rating": "Buena",
      "dateReview": "2023-08-28T13:02:14.908Z",
      "userIDs": "64ec74df1c7cb25833355d33"
    }
  ],
  "message": "Reviews found Successfully"
}
```

#### Get Review

To get a review by review id, make a **get** request to this endpoint with the review's id as a parameter.

```http
GET /reviews/:id
```

**Successful Response**

```json
{
  "review": {
    "id": "64ec9ad65388ee778b2ef219",
    "title": "segundo review",
    "body": "body review",
    "rating": "Buena",
    "dateReview": "2023-08-28T13:02:14.908Z",
    "userIDs": "64ec74df1c7cb25833355d33"
  },
  "message": "Review found Successfully"
}
```

#### Update Review

To update a review, make a **patch** request to this endpoint with the review's id as a parameter and the update details in the body.

```http
PATCH /review/:id
```

**Request Parameters**

| Field    | Type     | Description                 |
| :------- | :------- | :-------------------------- |
| `title`  | `string` | **Required**. Review title  |
| `body`   | `string` | **Required**. Review body   |
| `rating` | `string` | **Required**. Review rating |

**Successful Response**

```json
{
  "updateReview": {
    "id": "64ec9ad65388ee778b2ef219",
    "title": "segundo review",
    "body": "body review",
    "rating": "Genial",
    "dateReview": "2023-08-28T13:02:14.908Z",
    "userIDs": "64ec74df1c7cb25833355d33"
  },
  "message": "Review update Successfully"
}
```

#### Delete Review

To delete a review, make a **delete** request to this endpoint with the review's id as a parameter.

```http
DELETE /reviews/:id
```

**Successful Response**

```json
{
  "deleteReview": {
    "id": "64ec95daaf8723707266cc8d",
    "title": "Primer review",
    "body": "body review",
    "rating": "Excelente",
    "dateReview": "2023-08-28T12:40:58.953Z",
    "userIDs": "64ec74df1c7cb25833355d33"
  },
  "message": "Reviews delete Successfully"
}
```

---

## Initiatives API

The Initiatives API provides endpoints for Initiatives management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

#### Create a Initiative

To create a Initiatives, make a **post** request to this endpoint with the initiatives's details as body parameters.

```http
POST /initiatives
```

**Request Parameters**

| Field           | Type     | Description                                  |
| :-------------- | :------- | :------------------------------------------- |
| `title`         | `string` | **Required**. Initiative title               |
| `description`   | `string` | **Required**. Initiative description         |
| `deadLine`      | `Date`   | **Required**. Initiative deadLine            |
| `startDate`     | `Date`   | **Required**. Initiative startDate           |
| `endDate`       | `Date`   | **Required**. Initiative endDate             |
| `galery`        | `string` | **Optional**. Initiative url galery          |
| `thumbnail`     | `string` | **Optional**. Initiative thumbnail           |
| `categories`    | `array`  | **Required**. Initiative categories array    |
| `opportunities` | `array`  | **Required**. Initiative opportunities array |
| `locations`     | `string` | **Required**. Initiative locations           |
| `languages`     | `array`  | **Required**. Initiative languages array     |
| `ownerId`       | `string` | **Required**. Initiative ownerId             |

**Successful Response**

```json
{
  "id": "64ef6306ccf3711314014e5e",
  "title": "Pintar paredes del barrio",
  "description": "Pintar paredes del barrio sucias de tu barrio",
  "deadLine": "2023-12-05T19:23:33.479Z",
  "startDate": "2023-12-05T19:23:33.479Z",
  "endDate": "2023-12-05T19:23:33.479Z",
  "galery": null,
  "thumbnail": null,
  "categories": ["Educación", "Agricultura"],
  "opportunities": ["Comunicación y Marketing", "Enseñar y Compartir"],
  "locations": "Argentina",
  "languages": ["Español", "Guaraní"],
  "reviewsId": [],
  "postsId": [],
  "ownerId": "64e1bb0cb3ca40c582add154",
  "createdAt": "2023-08-30T15:40:54.699Z",
  "updatedAt": "2023-08-30T15:40:54.699Z"
}
```

#### Get initiatives

To get all initiatives, make a **get** request to this endpoint.

```http
GET /initiatives/
```

**Successful Response**

```json
[
  {
    "id": "64ef5fbdcea482be494ec01d",
    "title": "Pintar paredes del barrio",
    "description": "Pintar paredes del barrio sucias de tu barrio",
    "deadLine": "2023-12-05T19:23:33.479Z",
    "startDate": "2023-12-05T19:23:33.479Z",
    "endDate": "2023-12-05T19:23:33.479Z",
    "galery": null,
    "thumbnail": null,
    "categories": ["Educación", "Agricultura"],
    "opportunities": ["Comunicación y Marketing", "Enseñar y Compartir"],
    "locations": "Argentina",
    "languages": ["Español", "Guaraní"],
    "reviewsId": [],
    "postsId": [],
    "ownerId": "64e1bb0cb3ca40c582add154",
    "createdAt": "2023-08-30T15:26:52.498Z",
    "updatedAt": "2023-08-30T15:26:52.498Z"
  },
  {
    "id": "64ef603fcea482be494ec01f",
    "title": "Pintar paredes del barrio",
    "description": "Pintar paredes del barrio sucias de tu barrio",
    "deadLine": "2023-12-05T19:23:33.479Z",
    "startDate": "2023-12-05T19:23:33.479Z",
    "endDate": "2023-12-05T19:23:33.479Z",
    "galery": null,
    "thumbnail": null,
    "categories": ["Educación", "Agricultura"],
    "opportunities": ["Comunicación y Marketing", "Enseñar y Compartir"],
    "locations": "Argentina",
    "languages": ["Español", "Guaraní"],
    "reviewsId": [],
    "postsId": [],
    "ownerId": "64e1bb0cb3ca40c582add154",
    "createdAt": "2023-08-30T15:29:01.206Z",
    "updatedAt": "2023-08-30T15:29:01.206Z"
  }
]
```

#### Get initiative

To get a initiative by initiative id, make a **get** request to this endpoint with the initiatives's id as a parameter.

```http
GET /initiatives/:id
```

**Successful Response**

```json
{
  "id": "64ef6306ccf3711314014e5e",
  "title": "Pintar paredes del barrio",
  "description": "Pintar paredes sucias de tu barrio",
  "deadLine": "2023-12-05T19:23:33.479Z",
  "startDate": "2023-12-05T19:23:33.479Z",
  "endDate": "2023-12-05T19:23:33.479Z",
  "galery": null,
  "thumbnail": null,
  "categories": ["Educación", "Agricultura"],
  "opportunities": ["Comunicación y Marketing", "Enseñar y Compartir"],
  "locations": "Argentina",
  "languages": ["Español", "Guaraní"],
  "reviewsId": [],
  "postsId": [],
  "ownerId": "64e1bb0cb3ca40c582add154",
  "createdAt": "2023-08-30T15:40:54.699Z",
  "updatedAt": "2023-08-30T15:45:57.715Z"
}
```

#### Update Initiatives

To update an initiative, make a **patch** request to this endpoint with the initiatives's id as a parameter and the update details in the body.

```http
PATCH /initiatives/:id
```

**Request Parameters**

| Field           | Type     | Description                                  |
| :-------------- | :------- | :------------------------------------------- |
| `title`         | `string` | **Required**. Initiative title               |
| `description`   | `string` | **Required**. Initiative description         |
| `deadLine`      | `Date`   | **Required**. Initiative deadLine            |
| `startDate`     | `Date`   | **Required**. Initiative startDate           |
| `endDate`       | `Date`   | **Required**. Initiative endDate             |
| `galery`        | `string` | **Optional**. Initiative url galery          |
| `thumbnail`     | `string` | **Optional**. Initiative thumbnail           |
| `categories`    | `array`  | **Required**. Initiative categories array    |
| `opportunities` | `array`  | **Required**. Initiative opportunities array |
| `locations`     | `string` | **Required**. Initiative locations           |
| `languages`     | `array`  | **Required**. Initiative languages array     |
| `ownerId`       | `string` | **Required**. Initiative ownerId             |

**Successful Response**

```json
{
  "id": "64ef6306ccf3711314014e5e",
  "title": "Pintar paredes del barrio",
  "description": "Pintar paredes del barrio sucias de tu barrio",
  "deadLine": "2023-12-05T19:23:33.479Z",
  "startDate": "2023-12-05T19:23:33.479Z",
  "endDate": "2023-12-05T19:23:33.479Z",
  "galery": null,
  "thumbnail": null,
  "categories": ["Educación", "Agricultura"],
  "opportunities": ["Comunicación y Marketing", "Enseñar y Compartir"],
  "locations": "Argentina",
  "languages": ["Español", "Guaraní"],
  "reviewsId": [],
  "postsId": [],
  "ownerId": "64e1bb0cb3ca40c582add154",
  "createdAt": "2023-08-30T15:40:54.699Z",
  "updatedAt": "2023-08-30T15:40:54.699Z"
}
```

#### Delete an initiative

To delete an initiative, make a **delete** request to this endpoint with the initiative's id as a parameter.

```http
DELETE /initiatives/:id
```

**Successful Response**

```json
{
  "message": "Initiative #64ef6301ccf3711314014e5d was successfully removed.",
  "status": 200
}
```

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
# Stripe
STRIPE_SECRET_KEY=
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
- `STRIPE_SECRET_KEY`= is the api secret key of the Stripe account.
