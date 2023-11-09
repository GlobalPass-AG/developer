---
sidebar_position: 1.1
---

# Retrieving Screening Data

You will receive a webhook with type **screening.aml.completed** indicating that the scan has been completed.

During and after the screening process ends, you will receive **webhooks** (HTTP POST requests) to the webhook callback URL you provide to the GlobalPass support team. When receiving these requests, ensure that the body value of "secret" matches the webhook secret we will provide.

```js title="Example webhook"
{
    "type": "screening.aml.completed",
    "data": {
        "screeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5"
    },
    "secret": "secret"
}
```

#### Retrieving screening status

To get screenings status, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}/status_

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/f4564d3d-69de-4093-971d-796699c0e8c5/status' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response #1"
{
    "status": "Accepted",
    "isActive": true
}
```

```js title="Example response #2"
{
    "status": "Rejected",
    "isActive": false
}
```

> Possible **status** values:

- Accepted – screening is completed, AML matches over your set-up threshold **are not** found.
- Rejected – screening is completed, AML matches over your set-up threshold **are** found.

> Possible **isActive** values:

- true – screening state is Active.
- false – screening state is Inactive.

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
Changing screening state is only relevant if you use ongoing AML screening services for Individual AML Screenings. Screenings set as Inactive will not be included in the ongoing AML scan process, even if they have Accepted status. If required, it is possible to revert the state to Active afterwards, and the ongoing AML process will be resumed for that screening.
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

To access any given individual AML screening, you can navigate to:

- [https://portal-test.globalpass.ch/aml-screenings/individual/{screeningToken}](https://portal-test.globalpass.ch/aml-screenings/individual/%7BscreeningToken%7D) (_sandbox_)
- [https://portal.globalpass.ch/aml-screenings/individual/{screeningToken}](https://portal.globalpass.ch/aml-screenings/individual/%7BscreeningToken%7D) (_production_)
