---
sidebar_position: 8
---
# Recurring AML Screenings

Recurring AML Screenings is an additional compliance service offered by GlobalPass, which re-screens verified users through AML lists at required periods of time. Initiation of the service can be requested via contacting GlobalPass support. If the service is not requested, no webhooks will be sent and integration is not needed.

When new AML-related information is available in a specific screening after a recurring AML screening is performed, you will receive a webhook with type **screening.aml.change**.

```js title="Example webhook"
{
    "type": "screening.aml.change",
    "data": {
        "screeningToken": "f4564d3d-69de-4093-971d-796699c0e8c5"
    },
    "secret": "secret"
}
```

Then you can navigate to the screening report to review the AML changes:

* [https://portal-test.globalpass.ch/screenings/{screeningToken}/report](https://portal-test.globalpass.ch/screenings/%7BscreeningToken%7D/report) (*sandbox*)
* [https://portal.globalpass.ch/screenings/{screeningToken}/report](https://portal.globalpass.ch/screenings/%7BscreeningToken%7D/report) (*production*)
