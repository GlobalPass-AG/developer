---
sidebar_position: 9.1
---

# Webhook Notifications

GlobalPass broadcasts live instant biometrics updates to 3rd party systems through webhooks same way as described in [Retrieving Screening Data](../kyc-screenings/retrieving-screening-data.md).

```js title="Example webhook"
{
    "type": "biometrics.instant.change",
    "data": {
        "screeningToken": "screening_token",
        "instantBiometricsId": "biometrics_id",
        "status": "status"
    }
}
```
