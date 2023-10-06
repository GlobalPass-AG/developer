---
sidebar_position: 3
---

# AML For Address Integration

To intiate an address aml screening, make HTTP POST request to:

_/api/v2/address_

Request headers:

> Content-Type: application/json

Request body:

| Property              | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| address               | Main address                                                |
| city                  | City of the address (optional)                              |
| postalCode            | Address postal code (optional)                              |
| state                 | Address state (optional) (applicable for US)                |
| countryCode           | ISO 3166-1 alpha-3 compliant country code (optional)        |
| externalId            | Specify your internal identifier to be set on the screening. (optional)|

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/address' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}'-H 'Content-Type: application/json' -d '{ "address": "Gran Subida Mario, 7", "city": "Málaga", "countryCode": "ESP", "postalCode": "37764", "externalId": "AAA111" }'
```

```js title="Example response"
{
    "token": "f4564d3d-69de-4093-971d-796699c0e8c5"
}
```