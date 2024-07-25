---
sidebar_position: 1
---

# Transaction Screening

:::note IMPORTANT

This section explains integration for Multi-Asset Crypto Screening, launched in July 2024. If you are currently using our older Single-Asset crypto screening version, please read [this article](https://help.globalpass.ch/updating-crypto-screening-from-single-to-multi-asset/) for update instructions.

:::

:::note IMPORTANT

Please note that POST endpoints for Crypto Screenings use the Screening API **V3** instead of V2.

:::

To initiate a crypto transaction screening, make an HTTP POST request to:

_/api/v3/crypto/transactions_

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v3/crypto/transactions' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}' -H 'Content-Type: application/json' -d '{"hash": "string","direction": "string","outputAddress": "string","externalId": "string"}
```

Where:

| Property       | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| hash           | Transaction hash. _Required value_.                                                                         |
| direction      | Specification whether you will be running a source or destination of funds analysis. _Required value_.      |
| outputAddress  | Address of the wallet where the funds were **sent to** in the analyzed transaction. _Required value_.       |
| externalId     | Your custom unique identifier of the screened customer, or any other external identifier. _Required value_. |

> Possible **direction** values:

- source_of_funds – gets details of the entities that have contributed funds to the transaction's source address and calculates a risk score based on this exposure
- destination_of_funds – gets details of the entities that funds have gone to from this transaction's destination address and calculate a risk score based on this exposure

```js title="Example Destination of Funds request"
{
    "hash": "166e2010fd6141b65ac6659ed93b832787ae6241a4998dd0db61189869d1f32e",
    "direction": "destination_of_funds",
    "outputAddress": "3FjSB2Db9KiJi1KLRwvctwZ23an2yV8vwF",
    "externalId": "User123"
}
```

```js title="Example Source of Funds request"
{
    "hash": "166e2010fd6141b65ac6659ed93b832787ae6241a4998dd0db61189869d1f32e",
    "direction": "source_of_funds",
    "outputAddress": "3FjSB2Db9KiJi1KLRwvctwZ23an2yV8vwF",
    "externalId": "User123"
}
```

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 10
}
```

Where:

| Property       | Description                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id             | Unique identifier of the specific screening of the transaction. If rescreening of the same transaction will be performed, the ID value will refer to the exact screening of the same transaction. |
| screeningToken | Unique identifier of the screened transaction in the GlobalPass system.                                                                                                                            |
| created        | Timestamp of when the specific screening of the transaction was performed.                                                                                                                         |
| riskScore      | Transaction's risk value based on exposure in the screened direction, between 0 (no risk rules triggered) and 10 (highest possible risk level).                                                    |

To get status of any given transaction screening, make an HTTP GET request to

_/api/v2/crypto/transactions/{screeningToken}_

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/crypto/transactions/b101d8d6-de0f-45e9-9509-0d43258a416f' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 10
}
```

:::note IMPORTANT

Please note that GET endpoints for Crypto Screenings use the Screening API **V2**.

:::

To access any given latest transaction screening report, you can navigate to:

- [https://portal-test.globalpass.ch/crypto-screenings/transaction/{screeningToken}](https://portal-test.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D) (_sandbox_)
- [https://portal.globalpass.ch/crypto-screenings/transaction/{screeningToken}](https://portal.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D) (_production_)

To access a specific historical transaction screening report, you can navigate to:

- [https://portal-test.globalpass.ch/crypto-screenings/transaction/{screeningToken}/{id}](https://portal-test.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D/%7Bid%7D) (_sandbox_)
- [https://portal.globalpass.ch/crypto-screenings/transaction/{screeningToken}/{id}](https://portal.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D/%7Bid%7D) (_production_)
