# Retrieving Business AML PDF Report

To retrieve a latest PDF report of the screening, make an HTTP GET request to

/api/v2/business/{screeningToken}/report

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/business/a4101182-f4d8-4ca9-11db-797a726abdbf/report' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'
```

```text title="Example response"
Response returns the PDF file.
```

If latest PDF report does not contain some new data, you can trigger generation of a new PDF report. To do so, make an HTTP POST request to:

/api/v2/business/{screeningToken}/report

```bash title="Example request"
curl -X 'POST' \'https://screenings-api-test.globalpass.ch/api/v2/business/1i0404b1-0fe9-4i9a-805c-f41e78de1d0e/report' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'\-d ''
```

API returns the report ID of the newly requested PDF report. Operation is asynchronous and the response code is 202 (Accepted):

```js title="Example response"
{
    "reportId": "30f61d2d-f0f8-4f3b-92f5-4ba4e3c05516"
}
```

To retrieve the updated report, allow the system up to 20 seconds to generate a new PDF and simply make a new request to retrieve the latest PDF report of the screening token like in the instructions above.

Report ID value allows you to retrieve any specific historical PDF report of a screening. To get a list of all available historical screening reports, make an HTTP GET request to:

/api/v2/business/{screeningToken}/report/history

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/business/1i0404b1-0fe9-4i9a-805c-f41e78de1d0e/report/history' \-H 'accept: text/plain' \ -H 'Authorization: Bearer {your_access_token}'
```

Response returns report IDs of all available PDF reports for retrieving, with timestamps when they were created:

```js title="Example response"
[
    {
        "reportCreatedAt": "2022-12-20T09:22:27.188Z",
        "reportId": "30f61d2d-f0f8-4f3b-92f5-4ba4e3c05516"
    },
    {
        "reportCreatedAt": "2022-12-20T09:06:57.653Z",
        "reportId": "5856cc18-59b5-4716-972d-5eeeefa0bfd0"
    }
]
```

To retrieve a specific historical PDF report, make an HTTP GET request to

/api/v2/business/{screeningToken}/report/{reportId}

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/business/1i0404b1-0fe9-4i9a-805c-f41e78de1d0e/report/5856cc18-59b5-4716-972d-5eeeefa0bfd0' \-H 'accept: text/plain' \ -H 'Authorization: Bearer {your_access_token}'
```

```text title="Example response"
Response returns the specific requested file.
```
