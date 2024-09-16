---
sidebar_position: 5
---

# GPS-Based Address Verification Report

GPS-Based Address Verification reports allow you to verify applicants' address using their physical location at the time of verification.
The feature is only available for KYC Screenings (Regular Flow or Address screenings from Split Flow), and requires Geolocation service to be activated.

GPS-based Address Verification works by comparing the geo-coordinates of the Applicant's residential address with the geo-coordinates of the device location retrieved during the verification process. If the two coordinates are within your acceptable range from each other, the verification is successful and a PDF file of the verification results is generated.

### Getting Started

To activate the feature, follow these steps:

1. Head over to your Verification Settings inside your GlobalPass account.
2. Check whether `Geolocation Verification` setting is active for your account. If it is not activated, discuss enabling the feature with your account manager.
3. Head over to `Address Verification Settings` below, and turn on `Generate GPS-Based Address Verification Reports` setting.

:::info NOTE
An `Admin` or `Settings Manager` role is required to edit the settings.
:::

4. Once turned on, insert the maximum allowed distance in *meters* between the Address and Device in the field that appears nearby.
5. Save changes. The feature is now activated.

### Retrieving the Report

Once the feature is activated, the verification reports will be generarated automatically by the GlobalPass system. *A report is generated only in cases of successful GPS-Address verification*. The conditions are as follows:

1. The steps in listed in `Getting Started` section above are completed.
2. Screening type is `Regular KYC` or `Split Flow - Address`.
3. Applicant has consented to providing access to device location during the verification process.
4. The straight-line distance between the coordinates of the submitted address and device location are within the range provided in the verification settings.
5. Screening is `Accepted`.

The GPS-Based Address report generation triggers after the screening gets Accepted, therefore, it would be ready a few seconds later than the screening is completed.

When the GPS-Address Report is ready, you will get notified via a webhook notification:

```js title="Example webhook"
{
  "type": "screening.gps-address-report.completed",
  "data": {
    "screeningToken": "abb2a689-dbaa-4fb5-b185-142093f91b34",
    "reportId": "90d94f22-e5e7-465d-ba22-d7537a464498"
  }
}
```

To retrieve the latest available report, make an HTTP GET request to:

_api/v3/gps-address/{screeningToken}/report_

:::info IMPORTANT
Please note that API V3 version is used for GPS-Based Address Verification Reports
:::

To get history of all past reports, make an HTTP GET request to:

_/api/v3/gps-address/{screeningToken}/report/history_

Response will contain report IDs and timestamps of all previously generated reports.

To request a specific report, make an HTTP GET request by specifying both the `screening token` and `report ID` to:

_/api/v3/gps-address/{screeningToken}/report/{reportId}_

To trigger a generation of a new report, make an HTTP POST request to:

_/api/v3/gps-address/{screeningToken}/report_
