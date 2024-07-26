---
sidebar_position: 2
---

# Retrieving Screening Data

During and after the screening process ends, you will receive **webhooks** (HTTP POST requests) to your webhook callback URL that you can insert in the Verification Settings. Read more here: https://help.globalpass.ch/how-to-generate-api-keys-setup-webhook-location-for-integration/

:::info IMPORTANT

If you are currently using V1 webhooks version (intergation completed on July 2024 and earlier), please read [this article](https://help.globalpass.ch/updating-webhooks-from-v1-to-v2/) for update instructions.

:::

#### Webhook types:

| Type                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| screening.submitted        | User has completed the **identity mode** or **regular** widget session, all data for the screening has been submitted. It is recommended to disable user's access to the identity or regular widget once this webhook is received, as the widget will not allow the user to submit any more data, unless the screening status changes to rejected with rejectReason BadData or DocumentExpired, or if document begins approaching expiration following the Auto-Expiry flow. |
| screening.change           | When **identity** or **regular** screening status changes                                                                                                                                                                                                                                                                                                                                                                                                                    |
| screening.report.completed | PDF report of the screening is generated and ready to be retrieved                                                                                                                                                                                                                                                                                                                                                                                                           |
| screening.aml.completed    | When AML screening is completed (_should be ignored in KYC screenings_)                                                                                                                                                                                                                                                                                                                                                                                                      |
| address.submitted          | User has completed the **address mode** widget session, all data for the screening has been submitted. It is recommended to disable user's access to the address widget once this webhook is received, as the widget will not allow the user to submit any more data, unless the screening status changes to rejected with rejectReason BadData                                                                                                                              |
| address.change             | When **address** screening status changes                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Example webhooks:

```json
{
  "type": "screening.submitted",
  "data": {
    "screeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
  }
}
```

```json
{
  "type": "screening.change",
  "data": {
    "screeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
  }
}
```

```json
{
  "type": "address.submitted",
  "data": {
    "screeningToken": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
  }
}
```

#### Webhook headers:

##### `X-GP-Signature`

A hash signature (HMAC-SHA-256) is added to the webhook headers. This is the HMAC hex digest of the request body, and is generated using the SHA-256 hash function and the `Webhook secret` as the HMAC `key`.

To validate a webhook, use the SHA-256 hash function and your Webhook Secret (generated and visible in the Portal when adding your Webhook URL) to generate hash signature of the webhook body. Then it can be compared with the signature in the headers.

##### `X-GP-Created-At`

This header contains date when the webhook was created. Using this date, webhooks can also be validated, for example, by ignoring webhooks which were created more than 15 minutes ago.

#### Retrieving screening status

To get screenings status, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}/status_ – identity mode & regular

_/api/v2/screenings/{screeningToken}/address/status_ – address mode

```bash title="Example request"
curl --location  --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/status' --header 'Authorization: Bearer {your_access_token}'
```

```json title="Example response #1"
{
  "status": "Accepted",
  "riskLevel": "Low",
  "comments": ["KYC verification completed successfully."],
  "tags": ["Expiring"],
  "isActive": true
}
```

```json title="Example response #2"
{
  "status": "Rejected",
  "rejectReason": "BadData",
  "comments": [
    "The security of the network used for the identity verification process could not be validated successfully. Please repeat the identity verification process using a different network, or disable any VPN or web proxy software, if used."
  ],
  "tags": ["Suspicious"],
  "isActive": false
}
```

```json title="Example response #3"
{
  "status": "Rejected",
  "rejectReason": "ConditionsNotMet",
  "comments": [
    "After a careful evaluation of the personal information and documents that were submitted, our KYC compliance team has unfortunately taken the final decision to reject your application."
  ],
  "tags": ["Blacklisted", "Duplicate"],
  "isActive": true
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
- DocumentExpired

> Possible **tags** values:

- Blacklisted
- AML
- Duplicate
- Suspicious
- Expiring
- Expired

> Possible **isActive** values:

- true
- false

:::note
isActive is not returned in Address mode.
:::

#### Resubmission flow

If **rejectReason** is "BadData" or "DocumentExpired", you should prompt the user to go through the widget process again and provide the **same screening token** as used in the previous user's session to the widget. This way user will only need to repeat the specific screening sections that he failed during the previous attempt, and his screening report will update with the newly provided data.

#### Retrieving full screening data

To get full screening data, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}_ – identity mode & regular

_/api/v2/screenings/{screeningToken}/address_ – address mode

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
        "tags": ["Expiring"],
        "isActive": true
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

#### Retrieving AML scan results

To retrieve **AML scan results** from a completed screening, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}/aml/matches_

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
      "category": "Enforcement",
      "subCategory": "Corruption",
      "source": {
          "name": "ZA-South African Police Service",
          "countryName": "South Africa",
          "countryCode": "ZAF"
      }
    },
    {
      "name": "Ali, Mohammad",
      "matchScore": 91.11111,
      "level": "National",
      "category": "PEP",
      "subCategory": "Former PEP",
      "source": {
          "name": "Website",
          "countryName": "International"
      }
    },
    {
      "name": "Ali Mohammed",
      "matchScore": 74.44444,
      "category": "Sanction List",
      "source": {
          "name": "US-U.S. Office of Foreign Asset Control (OFAC) - SDN List",
          "countryName": "United States",
          "countryCode": "USA"
      }
    }
  ]
}
```

Where:

| Property           | Description                                                                                                                                                                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name               | Name of the detected possible AML match                                                                                                                                                                                                                                                                                           |
| matchScore         | AML match strength. Values up to 99.9999 (highest possible strength)                                                                                                                                                                                                                                                              |
| category           | AML match category. Possible categories: "Sanction List", "PEP", "Adverse Media", "Enforcement". One match will have one category.                                                                                                                                                                                                |
| subCategory        | Available only for PEP, Adverse Media and Enforcement categories. Specifies subcategory of the main category (e.g., PEP – Family Member, Adverse Media – Burglary, etc.).                                                                                                                                                         |
| level              | Available only for PEP category. Specifies PEP level – "International", "National", "State", or "Local".                                                                                                                                                                                                                          |
| source             | Information about the source of the AML hit                                                                                                                                                                                                                                                                                       |
| source.name        | Name of the source of the hit. Will return exact name of the source when the hit was found on an original list. Will return "Website" when the hit was found in media sources.                                                                                                                                                    |
| source.countryName | Full name of the country that listed the hit (e.g., country that released a sanction list where the hit was count). Will return full country name of the source when the hit was found on an original list. Will return "International" when the hit was found in media sources, or in case of "Consolidated Sanctions List" hit. |
| source.countryCode | 3-letter code in _ISO 3166-1 Alpha-3_ format of the country that released the hit. Available only when countryName is not "International", but a specific country.                                                                                                                                                                |

#### Changing screening state

:::note
Changing screening state is only relevant if you use ongoing AML screening services. Screenings set as Inactive will not be included in the ongoing AML scan process, even if they have Accepted status. If required, it is possible to revert the state to Active afterwards, and the ongoing AML process will be resumed for that screening.
:::

:::note
By default, all screenings will be **Active**. To mark screening as Inactive, you must do so manually on the Screening Report or via API, as described below.
:::

If you wish to mark a screening as **Inactive**, make an HTTP PUT request to:

_/api/v2/screenings/{screeningToken}/active_

In the request body, specify required `isActive` state - either `false` to set screening as **Inactive**, or `true` to set screening as **Active**.

```bash title="Example request - setting state as Inactive"
curl --location  --request PUT 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/active' --header 'Authorization: Bearer {your_access_token}'\-H 'Content-Type: application/json' \-d '{"isActive": false}'
```

```bash title="Example request - setting state as Active"
curl --location  --request PUT 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/active' --header 'Authorization: Bearer {your_access_token}'\-H 'Content-Type: application/json' \-d '{"isActive": true}'
```

If the state change is successful, API will respond with code 204.

#### Accessing screening reports

To access any given screening report, you can navigate to:

- [https://portal-test.globalpass.ch/screenings/{screeningToken}/report](https://portal-test.globalpass.ch/screenings/%7BscreeningToken%7D/report) (_sandbox_)
- [https://portal.globalpass.ch/screenings/{screeningToken}/report](https://portal.globalpass.ch/screenings/%7BscreeningToken%7D/report) (_production_)
