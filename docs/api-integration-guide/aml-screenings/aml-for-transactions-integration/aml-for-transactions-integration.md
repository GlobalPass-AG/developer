---
sidebar_position: 7
---

# AML for Transactions integration

AML for Transactions allows screening any data of an individual or a business and retrieving AML screening results. It is used for transaction monitoring, to screen the counterparties and financial institutions of a transaction.

To initiate an AML screening of a transaction data, make an HTTP POST request to:

_/api/v2/quick-search/name-search_

Request headers:

> Content-Type: application/json

Request data:

| Property    | Description                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------- |
| givenNames  | Full name of an individual or an entity                                                             |
| surname     | Surname or Last Name (optional)                                                                     |
| gender      | Possible values: Male and Female (optional)                                                         |
| dateOfBirth | Date of Birth (optional)                                                                            |
| nationality | ISO 3166-1 alpha-3 compliant country code (optional)                                                |
| externalId  | External identifier (your unique identifier of the transaction, not used in AML results) (optional) |

```bash title="Example request"
curl -X 'POST' \'https://screenings-api-test.globalpass.ch/api/v2/quick-search/name-search' \-H 'accept:text/plain' \-H'Authorization: Bearer {your\_access\_token}'\-H 'Content-Type: application/json' \-d '{"givenNames": "Donald John","surname": "Trump","gender": "Male","nationality": "USA","dateOfBirth": "1946-06-14","externalId": "123456789"}'
```

```js title="Example response"
{
    "token": "f4564d3d-69de-4093-971d-796699c0e8c5"
}
```
