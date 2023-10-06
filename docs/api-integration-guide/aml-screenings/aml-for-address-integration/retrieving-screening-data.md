---
sidebar_position: 3.1
---

# Retrieving Screening Data

You will receive a webhook with type **screening.change** whenever the screening status changes.
After this webhook you can retrieve latest data from the API.

```js title="Example webhook"
{
    "type": "screening.change",
    "data": {
        "screeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5"
    },
    "secret": "<secret>"
}
```

### Retrieve Screening Status

To get screenings status, make a HTTP GET request to:

_/api/v2/screenings/{screeningToken}/status_

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/f4564d3d-69de-4093-971d-796699c0e8c5/status' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response #1"
{
    "status": "Accepted"
}
```

```js title="Example response #2"
{
    "status": "Rejected"
}
```

> Possible **status** values:

- Accepted – screening is completed, AML matches over your set-up threshold **are not** found.
- Rejected – screening is completed, AML matches over your set-up threshold **are** found.

### Retrieve AML matches

To retrieve **AML scan results** from a completed screening, make an HTTP GET request to:

_/api/v2/address/{screeningToken}/aml/matches_

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/address/9519c730-5d6e-4c23-b89a-8c4d06899e7f/aml/matches' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
  "screeningToken": "26e68cdc-d604-4bee-bfa3-12d978e6bf9b",
  "created": "2023-10-05T12:36:49.7836279Z",
  "matches": [
    {
      "profileId": 12164100,
      "name": "Eurochem Logistics International",
      "matchScore": 97,
      "category": "Associated Entity",
      "subCategory": "Ownership Or Control",
      "source": {
        "name": "EU-European Union List - Sanctions Ownership or Control",
        "countryName": "International"
      },
      "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed tortor viverra, tincidunt arcu pulvinar, placerat lectus. Maecenas tristique velit vitae sem dignissim ultrices. Suspendisse nec congue massa. Nam porta posuere lacus ut posuere. Morbi finibus lectus eget ornare tempor. Vivamus ultricies non ipsum vitae ornare. Praesent ut fermentum nunc. Maecenas et dui malesuada, rutrum purus a, blandit eros. Quisque ex nibh, vestibulum nec purus sit amet, ultricies vulputate urna. Proin fringilla libero odio, at elementum elit vehicula eu. Etiam ac est a massa pulvinar congue at non felis. Suspendisse varius commodo elit sed cursus. Nullam auctor erat fringilla velit sodales mollis. In quis enim quam."
    }
  ]
}
```

Where:

| Property| Description|
|-|-|
| profileId | Unique identifier of the match record |
| name | Name of the detected possible AML match |
| matchScore | AML match strength. Values up to 99.9999 (highest possible strength)|
| category | AML match category. Possible categories: "Sanction List", "PEP", "Adverse Media", "Enforcement". One match will have one category.|
| subCategory | Available only for PEP, Adverse Media and Enforcement categories. Specifies subcategory of the main category (e.g., PEP – Family Member, Adverse Media – Burglary, etc.). |
| source | Information about the source of the AML hit |
| source.name | Name of the source of the hit. Will return exact name of the source when the hit was found on an original list. Will return "Website" when the hit was found in media sources. |
| source.countryName | Full name of the country that listed the hit (e.g., country that released a sanction list where the hit was count). Will return full country name of the source when the hit was found on an original list. Will return "International" when the hit was found in media sources, or in case of "Consolidated Sanctions List" hit. |
| source.countryCode | 3-letter code in _ISO 3166-1 Alpha-3_ format of the country that released the hit. Available only when countryName is not "International", but a specific country. |
| comments | A detailed comment about found match. |