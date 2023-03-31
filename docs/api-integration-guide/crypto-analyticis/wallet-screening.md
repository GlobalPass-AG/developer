# 10.2 Wallet Screening

To initiate a crypto transaction screening, make an HTTP POST request to

_/api/v2/crypto/wallets_

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/crypto/wallets' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}' -H 'Content-Type: application/json' -d '{"blockchain": "bitcoin","ticker": "BTC","address": "1LoP929sXe5cGEuLw1tKRwDvSFVRJkqDW7","externalId": "User029"}
```

Where:

| Property | Description |
| -------- | ----------- |
| blockchain | Full name of the blockchain of the screened wallet. _Required value_. |
| yicker | Ticker of the screened asset of the wallet. _Required value_. |
| address | Address of the screened wallet. _Required value_. |
| externalId | Unique identifier of the user in your system. _Required value_. |

Example response:

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 2.9223575587389448
}
```

Where:

| Property | Description |
| -------- | ----------- |
| id | Unique identifier of the specific screening of the wallet. If rescreening of the same wallet will be performed, the ID value will refer to the exact screening of the same wallet. |
| screeningToken | Unique identifier of the screened wallet in the GlobalPass system |
| created | Timestamp of when the specific screening of the wallet was performed |
| riskScore | Wallet's risk value based on its exposure, between 0 (no risk rules triggered) and 10 (highest possible risk level) |

To get status of any given wallet screening, make an HTTP GET request to

_/api/v2/crypto/wallets/{screeningToken}_

```bash title="Example request"
curl -X 'GET' 'https://screenings-api-test.globalpass.ch/api/v2/crypto/wallets/b101d8d6-de0f-45e9-9509-0d43258a416f' -H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 2.9223575587389448
}
```

To access any given latest wallet screening report, you can navigate to:

[https://portal-test.globalpass.ch/crypto-screenings/wallet/{screeningToken}](https://portal-test.globalpass.ch/crypto-screenings/wallet/%7BscreeningToken%7D/%7Bid%7D) – development

[https://portal.globalpass.ch/crypto-screenings/wallet/{screeningToken}](https://portal.globalpass.ch/crypto-screenings/wallet/%7BscreeningToken%7D/%7Bid%7D)– production

To access a specific historical wallet screening report, you can navigate to:

[https://portal-test.globalpass.ch/crypto-screenings/wallet/{screeningToken}/{id}](https://portal-test.globalpass.ch/crypto-screenings/wallet/%7BscreeningToken%7D/%7Bid%7D)– development

[https://portal.globalpass.ch/crypto-screenings/wallet/{screeningToken}/{id}](https://portal.globalpass.ch/crypto-screenings/wallet/%7BscreeningToken%7D/%7Bid%7D)– production
