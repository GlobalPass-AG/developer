---
sidebar_position: 6
---

# AML for Business integration

To initiate a business AML screening, make an HTTP POST request to

/api/v2/business

Request headers:

> Content-Type: application/json

Request body:

| Property              | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| name                  | Name of the company                                         |
| taxRegistrationNumber | EIN, SEC or national company registration number (optional) |
| countryCode           | ISO 3166-1 alpha-3 compliant country code (optional)        |

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/business' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}'-H 'Content-Type: application/json' -d '{ "name": "Apple", "taxRegistrationNumber": "0000320193", "countryCode": "USA" }'
```

```js title="Example response"
{
    "token": "f4564d3d-69de-4093-971d-796699c0e8c5"
}
```
