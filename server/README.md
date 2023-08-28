# API Reference

All routes are prefixed with `/api/v1`.

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
  "sessionID": "your-session-id",
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

## Posts API

The Posts API provides endpoints for posts management.

**This API is currently under development and is subject to change. We recommend just use the `POST` endpoint for now.**

#### Create a post

To create a post, make a **post** request to this endpoint with the post's details as body parameters.

```http
POST /posts
```

**Request Parameters**

| Field       | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `userId`    | `string` | **Required**. User Id             |
| `description`  | `string` | **Required**. Description of post                |
| `galery`      | `string` | **Required**. Galery image url |

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

To update a post of a user, make a **patch** request to this endpoint with the user's id as a parameter and  the update details in the body.

```http
PATCH /posts/:id
```
**Request Parameters**

| Field       | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `description`  | `string` | **Required**. Description of post    |
| `galery`      | `string` | **Required**. Galery image url |

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

#### Create a review

To create a review, make a **post** request to this endpoint with the review's details as body parameters.

```http
POST /reviews
```

**Request Parameters**

| Field       | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `title`    | `string` | **Required**. Review title            |
| `body`  | `string` | **Required**. Review body              |
| `rating`      | `string` | **Required**. Review rating |
| `userIDs`      | `string` | **Required**. Review user id |

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

To update a review, make a **patch** request to this endpoint with the review's id as a parameter and  the update details in the body.

```http
PATCH /review/:id
```
**Request Parameters**

| Field       | Type     | Description                             |
| :---------- | :------- | :-------------------------------------- |
| `title`  | `string` | **Required**. Review title   |
| `body`      | `string` | **Required**. Review body |
| `rating`      | `string` | **Required**. Review rating |

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