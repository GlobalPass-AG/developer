---
sidebar_position: 3
---

# Document Forensic Analysis

Begin by getting a screening token as described in [KYC screenings](./kyc-screenings/initiating-a-kyc-screening.md), or use a screening token that belongs to a specific user whose document you are about to send to forensic analysis.

Make a HTTP POST request to: _/api/v1/screenings/{screeningToken}/forensics_

Request headers:

> Content-Type: multipart/form-data

Request data:

> Files: File sent to forensic analysis

> Tag: String describing the type of document uploaded (optional)

```bash title="Example request"
curl --location --request POST 'https://screenings-api-test.globalpass.ch/api/v1/screenings/ bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd/forensics' --header 'Authorization: Bearer {your_access_token}' --form 'Files=@"/C:/Image1.jpg"' --form 'Tag="TransferExplanation"'
```

Response returns the ID of the forensic analysis report:

```js title="Example response"
{
    "id": "b538fac5-ab02-4af6-aae0-04046eb143cc"
}
```

After the forensic analysis status changes, you will receive **forensics.change** webook:

```js
{
    "type": "forensics.change",
    "data": {
        "screeningToken":"bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd",
        "ForensicAnalysisId": "b538fac5-ab02-4af6-aae0-04046eb143cc"
    }
}
```

To get forensics status, make an HTTP GET request to _/api/v1/screenings/{screeningToken}/forensics/{forensicsId}_

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v1/screenings/ bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd/forensics/b538fac5-ab02-4af6-aae0-04046eb143cc' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response #1"
{
    "status": "LikelyGenuine",
    "comments": ["Forensic Analysis of the document has been completed successfully."]
}
```

```js title="Example response #2
{
    "status": "Edited",
    "comments": ["The metadata appears to be manually deleted or edited in some way. Please provide the original document without any alterations."]
}
```

```js title="Example response #3
{
    "status": "BadData",
    "comments": ["The file cannot be verified as the document cannot be reviewed. Please make sure to provide an original, unaltered version of the file and make sure it is not password protected or restricted from viewing."]
}
```

```js title="Example response #4
{
    "status": "Forged",
    "comments": ["Forensic Analysis of the document was not completed successfully as it appears that the document may have been forged."]
}
```

> Possible **status** values:

- LikelyGenuine
- Edited
- BadData
- Forged

To access any given forensic analysis report, you can navigate to:

- [https://portal-test.globalpass.ch/forensic-analysis/{ForensicAnalysisId}/report](https://portal-test.globalpass.ch/forensic-analysis/%7BForensicAnalysisId%7D/report) (_sandbox_)
- [https://portal.globalpass.ch/forensic-analysis/{ForensicAnalysisId}/report](https://portal-test.globalpass.ch/forensic-analysis/%7BForensicAnalysisId%7D/report) (_production_)
