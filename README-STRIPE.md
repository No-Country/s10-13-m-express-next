#STRIPE API Reference

All routes are prefixed with `/api`.

- Remember to add the `STRIPE_SECRET_KEY` in your .env in /server and the `STRIPE_PUBLIC_KEY` in the .env of /client.

##General explanation

In the frontend a post request is sent to the payment intention endpoint sending the amount of money to collect (amount of the donation), sending the id of the user who is going to make the payment and finally sending the id of the initiative to which the payment is going to be directed, in return the backend will respond with a session url, this url will take the user to a payment form where the user can enter his debit/credit card details, if the card details are correct stripe will complete the payment successfully, in the following image you can see better the flow:

![stripe flow](https://miro.medium.com/v2/resize:fit:765/1*1380x8iqFlXB8-e_R7KXVw.png)

Please read the official stripe documentation to learn how to integrate stripe in the frontend [Stripe documentation](https://stripe.com/docs/stripe-js/react)

##Create Payment Intent

To create a payment intent, make a **post** request to this endpoint.

```http
POST /create-checkout-session
```

**Request Parameters**

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `amount`    | `number` | **Required**. Amount of donation    |
| `userId` | `string` | **Required**. User id of donor |
| `initiativeId` | `string` | **Required**. Initiative Id |

In the case of the initiative id if the donation will be for the maintenance of the site (not for a specific initiative) then you should send "globalDonation" as value of "initiativeId".

**Example of body**

```json
{
	"amount": 10,
	"userId": "64f6ac5dbd10725027c83414",
	"initiativeId": "67f8ac5dbd10725029c72025"
}
```

**Successful Response**

```json
{
	"sessionUrl": "https://checkout.stripe.com/c/pay/cs_test_a15HhalOlPdWAwKtICaEVboKzERNEV7hPgIRpHqBjpWkKHgtwcNwUph779#fidkdWxOYHwnPyd1blpxYHZxWjA0S1VBNUdDTGBzYFJkf2FXMjVUTjZLSX9wZF10SVRcX0ZPS3xBUV83NXJRM2tIalc9aDQ2SEdJT0k0PUxrZmMwTTFuV3RpMnRJUUBRPElHZGRJUENQXWdjNTUyT2psMnBmMCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
	"message": "Session payment create successful"
}
```