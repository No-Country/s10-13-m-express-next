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

If authentication is successful, you will receive a `200 OK` response, `userId` in the response body and `sessionId` and `userId` in the response cookies.

```json
{
  "userId": "64e6db62bfaa945735cbec7c"
}
```

You can use the `userId` to make request to the [Users API](#users-api) to get the user's details.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** you must send every request **(unless the documentation says otherwise)** with the `withCredentials: true` option in order to send the cookies. If you don't do this, you will receive a `401 Unauthorized` response.

**Axios example login and test request:**

```js
const handleLogin = async () => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/login",
    {
      email: "example@email.com",
      password: "examplePassword",
    },
    {
      withCredentials: true,
    }
  );
  console.log(response);
};

const handleTest = async () => {
  const response = await axios.get("http://localhost:3001/api/auth/verify", {
    withCredentials: true,
  });
  console.log(response);
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

Besides, you will receive a `sessionId` and `userId` in the response cookies.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** You must send every request **(unless the documentation says otherwise)** with the `withCredentials: true` option in order to send the cookies. If you don't do this, you will receive a `401 Unauthorized` response.

**Axios example session verification or test request:**

```js
const handleTest = async () => {
  const response = await axios.get("http://localhost:3001/api/auth/verify", {
    withCredentials: true,
  });
  console.log(response);
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

Besides, you will receive a `sessionId` and `userId` in the response cookies.

You must make a request to the `/auth/verify` endpoint to verify the session. Check the [Verify Session](#verify-session) section for more details.

**Important:** You must send every request **(unless the documentation says otherwise)** with the `withCredentials: true` option in order to send the cookies. If you don't do this, you will receive a `401 Unauthorized` response.

**Axios example session verification or test request:**

```js
const handleTest = async () => {
  const response = await axios.get("http://localhost:3001/api/auth/verify", {
    withCredentials: true,
  });
  console.log(response);
};
```

### Verify Session

To verify a session, make a **get** request to this endpoint.

```http
GET /auth/verify
```

If the session is valid, you will receive a `200 OK` response, otherwise you will receive a `401 Unauthorized` response.

For test propose, you have to implement a **"Postman interceptor"** and sync the cookies with the request. Check the [Postman Interceptor](#postman-interceptor) section for more details.

**You need use `withCredentials: true` for this endpoint.**

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

**You dont need use `withCredentials: true` for this endpoint.**

#### Get Users

To get all users, make a **get** request to this endpoint.

```http
GET /users
```

**You dont need use `withCredentials: true` for this endpoint.**

#### Get User

To get a user, make a **get** request to this endpoint with the user's id as a parameter.

```http
GET /users/:id
```

**You dont need use `withCredentials: true` for this endpoint.**

#### Delete User

To delete a user, make a **delete** request to this endpoint with the user's id as a parameter.

```http
DELETE /users/:id
```

You can only delete your own user.

**Explanation of the system:** A middleware checks if the id sent in the request parameters is the same as userId in the cookies, if it is, the request is allowed, otherwise it is rejected.

For test propose, you have to implement a **"Postman interceptor"** and sync the cookies with the request. Check the [Postman Interceptor](#postman-interceptor) section for more details.

**You need use `withCredentials: true` for this endpoint.**

---

## Postman Interceptor

To test the API endpoints, you can use the [Postman](https://www.postman.com/) application.

**¿What is Postman Interceptor?**

Postman Interceptor is a Chrome/Edge/Others extension that works with the Postman app to intercept and capture requests and responses between your browser and web servers. Besides, it syncs cookies between the browser and Postman by intercepting the network traffic.

**¿How to use Postman Interceptor?**

1. Download the [Postman](https://www.postman.com/) app and the [Postman Interceptor](https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo) extension.

2. Open the Postman app and click the "Cookies" button under the "Send" button.

![App Screenshot](https://i.ibb.co/sVSB4rx/interceptor-1.png)

3. Click "Sync Cookies", add the domain of your backend application and click "Start Syncing".

![App Screenshot](https://i.ibb.co/GsFcMfr/interceptor-2.png)

If you have the alert "No connection to interceptor: Make sure your browser is open and you've installed the Interceptor extension.", just open the Postman Interceptor extension and click "Sync Cookies" there.

4. Login in the browser to get the cookies.

5. Now you can make requests to the API protected endpoints.
