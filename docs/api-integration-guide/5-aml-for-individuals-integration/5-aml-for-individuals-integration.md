# 5 AML for Individuals integration

To initiate an AML screening of an individual, make an HTTP POST request to:

_/api/v2/individual_

Request headers:

> Content-Type: application/json

Request body:

| Property | Description |
| -------- | ----------- |
| givenNames | First Name(s) of the individual, or full name (if surname not applicable/unknown). |
| surname | Surname or Last Name (optional). |
| gender | Possible values: Male and Female (optional). |
| dateOfBirth | Date of Birth (optional). |
| nationality | ISO 3166-1 alpha-3 compliant country code (optional). |
| externalId | External identifier (your unique identifier of the person/screening, not used in AML results) (optional). |

```bash title="Example request"
curl -X 'POST' \'https://screenings-api-test.globalpass.ch/api/v2/individual' \-H 'accept:text/plain' \-H'Authorization: Bearer {your_access_token}'\-H 'Content-Type: application/json' \-d '{"givenNames": "Donald John","surname": "Trump","gender": "Male","nationality": "USA","dateOfBirth": "1946-06-14"}'
```

```js title="Example response"
{
    "token": "f4564d3d-69de-4093-971d-796699c0e8c5"
}
```
