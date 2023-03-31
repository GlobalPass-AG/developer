---
sidebar_position: 2
---

# Retrieving Screening Data

During and after the screening process ends, you will receive **webhooks** (HTTP POST requests) to the webhook callback URL you provide to the GlobalPass support team. When receiving these requests, ensure that the body value of "secret" matches the webhook secret we will provide.

**Webhook types:**

| Type | Description |
| ---- | ----------- |
| screening.submitted | user has completed the **identity mode** or **regular** widget session, all data for the screening has been submitted. It is recommended to disable user's access to the identity or regular widget once this webhook is received, as the widget will not allow the user to submit any more data, unless the screening status changes to rejected with rejectReason BadData or ConditionsNotMet |
| screening.change | when **identity** or **regular** screening status changes |
| screening.report.completed | PDF report of the screening is generated and ready to be retrieved |
| screening.aml.completed | when AML screening is completed (_should be ignored in KYC screenings_) |
| address.submitted | user has completed the **address mode** widget session, all data for the screening has been submitted. It is recommended to disable user's access to the address widget once this webhook is received, as the widget will not allow the user to submit any more data, unless the screening status changes to rejected with rejectReason BadData or ConditionsNotMet |
| address.change | when **address** screening status changes |

**Example webhooks:**

```json
{
    "type": "screening.submitted",
    "data": {
        "ScreeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
    },
    "secret": "secret"
}
```

```json
{
    "type": "screening.change",
    "data": {
        "ScreeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
    },
    "secret": "secret"
}
```

```json
{
    "type": "address.submitted",
    "data": {
        "ScreeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
    },
    "secret": "secret"
}
```

To get screenings status, make an HTTP GET request to:

/api/v2/screenings/{screeningToken}/status – identity mode & regular

/api/v2/screenings/{screeningToken}/address/status – address mode

```bash title="Example request"
curl --location  --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/status' --header 'Authorization: Bearer {your_access_token}'
```


```json title="Example response #1"
{
    "status": "Accepted",
    "riskLevel": "Low",
    "comments": ["KYC verification completed successfully."],
    "tags": ["Expiring"]
}
```

```json title="Example response #2"
{
    "status": "Rejected",
    "rejectReason": "BadData",
    "comments": ["The security of the network used for the identity verification process could not be validated successfully. Please repeat the identity verification process using a different network, or disable any VPN or web proxy software, if used."],
    "tags": ["Suspicious"]
}
```

```json title="Example response #3"
{
    "status": "Rejected",
    "rejectReason": "ConditionsNotMet",
    "comments": ["After a careful evaluation of the personal information and documents that were submitted, our KYC compliance team has unfortunately taken the final decision to reject your application."],
    "tags": ["Blacklisted", "Duplicate"]
}
```

> Possible **riskLevel** values:
- Low
- Medium
- High

> Possible **status** values:
- Initiated
- Processing
- Accepted
- Rejected

> Possible **rejectReason** values:
- BadData
- ConditionsNotMet
- DocumentExpired"

> Possible **tags** values:
- Blacklisted
- AML
- Duplicate
- Suspicious
- Expiring
- Expired

If **rejectReason** is "BadData" or "DocumentExpired", you should prompt the user to go through the widget process again and provide the **same screening token** as used in the previous user's session to the widget. This way user will only need to repeat the specific screening sections that he failed during the previous attempt, and his screening report will update with the newly provided data.

To get full screening data, make an HTTP GET request to:

/api/v2/screenings/{screeningToken} – identity mode & regular

/api/v2/screenings/{screeningToken}/address – address mode

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "resourceId": "9519c730-5d6e-4c23-b89a-8c4d06899e7f",
    "screeningStatus": {
        "status": "Accepted",
        "riskLevel": "Low",
        "comments": ["KYC verification completed successfully."],
        "tags": ["Expiring"]
    },
    "basicData": {
        "firstName": "Sven",
        "middleName": "",
        "lastName": "Specimen",
        "givenNames": "Sven",
        "surname": "Specimen",
        "dateOfBirth": "1987-03-14",
        "gender": "Male",
        "personalIdentificationNumber": "198703142391",
        "nationality": "SWE"
    },
    "documentData": {
        "documentNumber": "59000001",
        "countryOfIssue": "SWE",
        "expiryDate": "2017-01-02T00:00:00",
        "documentType": "Passport",
        "dateOfIssue": "2012-01-02T00:00:00"
    },
    "addressData": {
        "countryCode": "CHE",
        "city": "Zug",
        "address": "Metallstrasse 8",
        "postCode": "6300"
    }
}
```

Country codes are provided in [ISO 3166-1 Alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) format.

To retrieve **AML scan results** from a completed screening, make an HTTP GET request to:

/api/v2/screenings/{screeningToken}/aml/matches

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/aml/matches' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "screeningToken": "9519c730-5d6e-4c23-b89a-8c4d06899e7f",
    "created": "2022-12-28T11:04:25.0931836Z",
    "matches": [
        {
            "name": "Ali, Muhamad",
            "matchScore": 99.99999,
            "category": "Adverse Media",
            "subCategory": "Burglary"
        },
        {
            "name": "Ali, Mohamed",
            "matchScore": 96.666664,
            "category": "Enforcement",
            "subCategory": "Corruption"
        },
        {
            "name": "Ali, Mohammad",
            "matchScore": 91.11111,
            "level": "National",
            "category": "PEP",
            "subCategory": "Former PEP"
        },
        {
            "name": "Ali, Mohammad",
            "matchScore": 91.11111,
            "level": "State",
            "category": "PEP",
            "subCategory": "Family Member"
        },
        {
            "name": "Ali Mohammed",
            "matchScore": 74.44444,
            "category": "Sanction List"
        }
    ]
}
```

Where:

| Property | Description |
| -------- | ----------- |
| name | name of the detected possible AML match |
| matchScore | AML match strength. Values up to 99.9999 (highest possible strength) |
| category | AML match category. Possible categories: "Sanction List", "PEP", "Adverse Media", "Enforcement". One match will have one category.
| subCategory | available only for PEP, Adverse Media and Enforcement categories. Specifies subcategory of the main category (e.g., PEP – Family Member, Adverse Media – Burglary, etc.). |
| level | available only for PEP category. Specifies PEP level – "International", "National", "State", or "Local". |

To access any given screening report, you can navigate to:

[https://portal-test.globalpass.ch/screenings/{screeningToken}/report](https://portal-test.globalpass.ch/screenings/%7BscreeningToken%7D/report) - development

[https://portal.globalpass.ch/screenings/{screeningToken}/report](https://portal.globalpass.ch/screenings/%7BscreeningToken%7D/report)- production
