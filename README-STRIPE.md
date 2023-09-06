#STRIPE API Reference

All routes are prefixed with `/api`.

- Remember to add the `STRIPE_SECRET_KEY` in your .env in /server and the `STRIPE_PUBLIC_KEY` in the .env of /client.

##General explanation

In the frontend stripe uses the `STRIPE_PUBLIC_KEY` to create a payment intent, this payment intent creates it (for our specific case) by sending the amount of money to collect (donation amount), sending the id of the user who is making the payment and finally sending the id of the initiative to which the payment is going to be directed, in return the backend will respond with a client secret, that secret client stripe in the frontend will use it to initialize the payment form where the user will be able to enter his debit/credit card data, if the card data is correct stripe will complete the payment successfully, in the following image you can see better the flow:

![stripe flow](https://miro.medium.com/v2/resize:fit:765/1*1380x8iqFlXB8-e_R7KXVw.png)

Please read the official stripe documentation to learn how to integrate stripe in the frontend [Stripe documentation](https://stripe.com/docs/stripe-js/react)

##Create Payment Intent

To create a payment intent, make a **post** request to this endpoint.

```http
POST /stripe
```

**Request Parameters**

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `amount`    | `number` | **Required**. Amount of donation    |
| `userId` | `string` | **Required**. User id of donor |
| `initiativeId` | `string` | **Required**. Initiative Id |

In the case of the initiative id if the donation will be for the maintenance of the site (not for a specific initiative) then you should send "globalDonation".

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
	"clientSecret": "pi_3NnTm4FIeveWazdR0G3A59tb_secret_2qniXczt9HEMhzWtGKxs7aeHq",
	"message": "Payment Intent create successful"
}
```