---
sidebar_position: 2.1
---

# Retrieving Screening Data

You will receive a webhook with type **business.change** whenever the screening status changes.

```js title="Example webhook"
{
    "type": "business.change",
    "data": {
        "screeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5"
    },
    "secret": "secret"
}
```

After receiving this webhook, you can get screening status by making an HTTP GET request to:

_api/v2/business/{screeningToken}_

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

To retrieve **AML scan results** from a completed screening, make an HTTP GET request to:

_/api/v2/business/{screeningToken}/aml/matches _

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/business/9519c730-5d6e-4c23-b89a-8c4d06899e7f/aml/matches' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "screeningToken": "9519c730-5d6e-4c23-b89a-8c4d06899e7f",
    "created": "2022-12-28T11:04:25.0931836Z",
    "matches": [
        {
            "name": "Company ABC",
            "matchScore": 99.99999,
            "category": "SOE",
            "subCategory": "Govt Owned Corp",
            "source": {
                "name": "Website",
                "countryName": "International"
            }
        },
        {
            "name": "Company ABC",
            "matchScore": 96.666664,
            "category": "Enforcement",
            "subCategory": "Antitrust Violations",
            "source": {
                "name": "BG–Commission for Protection of Competition",
                "countryName": "Bulgaria",
                "countryCode": "BGR"
            }
        },
        {
            "name": "Company ABC",
            "matchScore": 91.11111,
            "category": "Sanction List",
            "source": {
                "name": "CA-Special Economic Measures against Russia",
                "countryName": "Canada",
                "countryCode": "CAN"
            }
        },
        {
            "name": "Company ABC",
            "matchScore": 74.44444,
            "category": "Associated Entity",
            "subCategory": "Ownership Or Control",
            "source": {
                "name": "UK-Her Majesty’s Treasury Financial Sanctions - Sanctions Ownership or Control",
                "countryName": "United Kingdom",
                "countryCode": "GBR"
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

To access any given business AML screening, you can navigate to:

- [https://portal-test.globalpass.ch/aml-screenings/business/{screeningToken}](https://portal-test.globalpass.ch/aml-screenings/business/%7BscreeningToken%7D) (_sandbox_)
- [https://portal.globalpass.ch/aml-screenings/business/{screeningToken}](https://portal.globalpass.ch/aml-screenings/business/%7BscreeningToken%7D) (_production_)
