---
sidebar_position: 1
---

# Transaction approvals with GlobalPass ID mobile

Make a HTTP POST request to: _/api/v2/screenings/{screeningToken}/transactions_

Request headers:

> Content-Type: application/json

Request body:

| Property              | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| transactionId         | Generated uuid to ensure transaction uniqueness and correlation with webhooks                                 |
| payload               | JSON payload to pass-through to mobile application (optional) |


```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/screenings/2b395705-436b-462e-b655-bbf0b8561382/transactions' -H 'application/json' -H 'Authorization: Bearer {your_access_token}'-H 'Content-Type: application/json' -d '{ "transactionId": "7b5b68cf-28d5-4dd9-adf5-a6a079e25045", "payload": {} }'
```

User will receive push notification to accept or reject the transaction after it has been created.

Webhook will be sent then user accepts or rejects the transaction.

**Example webhook:**

```js title="Example webhook"
{
    "type": "transaction.status.change",
    "data": {
        "screeningToken": "2b395705-436b-462e-b655-bbf0b8561382",
        "transactionId": "7b5b68cf-28d5-4dd9-adf5-a6a079e25045",
        "status": "Approved"
    },
    "secret": "secret"
}
```

:::note
Created transactions expire in 5 minutes. In that case, webhook will be sent with status `Expired`.
:::
