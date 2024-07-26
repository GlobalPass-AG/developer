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
Read about webhook headers [here](https://developer.globalpass.ch/api-integration-guide/kyc-screenings/retrieving-screening-data#webhook-headers).

:::info IMPORTANT

If you are currently using V1 webhooks version (intergation completed on July 2024 and earlier), please read [this article](https://help.globalpass.ch/updating-webhooks-from-v1-to-v2/) for update instructions.

:::
