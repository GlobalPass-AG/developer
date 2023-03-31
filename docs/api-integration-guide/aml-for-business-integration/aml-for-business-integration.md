---
sidebar_position: 7
---

# AML for Business integration

To initiate a business AML screening, make an HTTP POST request to

/api/v2/business

Request Headers:

**Content-Type: application/json**

Request body:

**Name:** Name of the company
 **TaxRegistrationNumber:** EIN, SEC or national company registration number (optional)
 **CountryCode:** ISO 3166-1 alpha-3 compliant country code (optional)

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/business' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}'-H 'Content-Type: application/json' -d '{ "name": "Apple", "taxRegistrationNumber": "0000320193", "countryCode": "USA" }'
```



```js title="Example response"
{
    "token": "f4564d3d-69de-4093-971d-796699c0e8c5"
}
```

You will receive a webhook with type **business.change** whenever the screening status changes.


```js title="Example webhook"
{
    "type": "business.change",
    "data": {
        "ScreeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5"
    },
    "secret": "secret"
}
```

After receiving this webhook, you can get screening status by making an HTTP GET request to:

api/v2/business/{screeningToken}

```bash title="Example request"
curl -X 'GET' 'https://screenings-api-test.globalpass.ch/api/v2/business/f4564d3d-69de-4093-971d-796699c0e8c5' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token} '
```


```js title="Example response"
{
    "name": "Apple",
    "taxRegistrationNumber": "0000320193",
    "country": "United States",
    "status": "Accepted"
}
```

> Possible **status** values:
- Accepted – screening is completed, AML matches over your set-up threshold **are not** found.
- Rejected – screening is completed, AML matches over your set-up threshold **are** found.

To access any given business AML screening, you can navigate to:

[https://portal-test.globalpass.ch/aml-screenings/business/{screeningToken}](https://portal-test.globalpass.ch/aml-screenings/business/%7BscreeningToken%7D) – development

[https://portal.globalpass.ch/aml-screenings/business/{screeningToken}](https://portal.globalpass.ch/aml-screenings/business/%7BscreeningToken%7D) – production
