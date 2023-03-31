---
sidebar_position: 3
---

# Retrieving Original Files

To retrieve identity and/or proof of address documents originally submitted in the widget, first, make an HTTP GET request to receive unique file identifiers of the files to:

/api/v2/screenings/{screeningToken}/files

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/files' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "frontSidePhoto": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "backSidePhoto": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "proofOfAddress": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
}
```

Then, to receive a needed file, make an HTTP GET request with the file ID to:

/api/v2/screenings/{screeningToken}/files/{fileId}

```bash title="Example request"
curl --location --request GET 'https://screenings-api-test.globalpass.ch/api/v2/screenings/9519c730-5d6e-4c23-b89a-8c4d06899e7f/files/3fa85f64-5717-4562-b3fc-2c963f66afa6' --header 'Authorization: Bearer {your_access_token}'
```

:::note
Response returns the original file.
:::
