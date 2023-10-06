---
sidebar_position: 3.2
---

# Retrieve Address AML PDF Report

New address AML PDF report will start generation each time it's status has been changed. A webhook request with type **screening.report.completed** will be sent when the new report is generated.

```js title="Example webhook"
{
    "type": "screening.report.completed",
    "data": {
        "screeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5",
        "reportId": "ebd5f31d-936f-4ef1-a7fb-0d8c269211ad"
    },
    "secret": "<secret>"
}
```

### Get specific report

Using Report ID received from the webhook you can retrieve specific report for that screening.
To retrieve this report make HTTP GET request to:

_/api/v2/screenings/{screeningToken}/report/{reportId}_

```bash title="Example request"
curl -X 'GET' 'https://screenings-api-test.globalpass.ch/api/v2/screenings/f4564d3d-69de-4093-971d-796699c0e8c5/report/ebd5f31d-936f-4ef1-a7fb-0d8c269211ad' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token} '
```

```text title="Example response"
Response returns the specific requested file.
```

### Get report history

To get a list of all available historical screening reports, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}/report/history_

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/screenings/f4564d3d-69de-4093-971d-796699c0e8c5/report/history' \-H 'accept: text/plain' \ -H 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
[
  {
    reportCreatedAt: "2022-12-20T09:22:27.188Z",
    reportId: "30f61d2d-f0f8-4f3b-92f5-4ba4e3c05516",
  },
  {
    reportCreatedAt: "2022-12-20T09:06:57.653Z",
    reportId: "5856cc18-59b5-4716-972d-5eeeefa0bfd0",
  },
];
```

### Get latest screening report

To retrieve a latest PDF report of the screening, make an HTTP GET request to:

_/api/v2/screenings/{screeningToken}/report_

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/screenings/a4101182-f4d8-4ca9-11db-797a726abdbf/report' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'
```

```text title="Example response"
Response returns the PDF file.
```

### Trigger new report generation

If latest PDF report does not contain some new data, you can trigger generation of a new PDF report. To do so, make a HTTP POST request to:

_/api/v2/screenings/{screeningToken}/report_

```bash title="Example request"
curl -X 'POST' \'https://screenings-api-test.globalpass.ch/api/v2/screenings/1i0404b1-0fe9-4i9a-805c-f41e78de1d0e/report' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'\-d ''
```

API returns the report ID of the newly requested PDF report. Operation is asynchronous and the response code is 202 (Accepted):

```js title="Example response"
{
    "reportId": "30f61d2d-f0f8-4f3b-92f5-4ba4e3c05516"
}
```

To retrieve the updated report, allow the system up to 20 seconds to generate a new PDF and simply make a new request to retrieve the latest PDF report of the screening token like in the previous instructions above. **Or** you can wait for the **screening.report.completed** webhook to be received.


