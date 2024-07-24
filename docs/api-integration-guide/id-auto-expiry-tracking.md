---
sidebar_position: 4
---

# ID Auto-Expiry Tracking

ID Auto-Expiry tracking is an optional feature, and GlobalPass support should be informed to enable the tracking upon integration of the feature; otherwise, screening statuses will not change and the webhooks will not be sent.

When an identity document of a verified user approaches expiry in _ **n** _ months (required minimum ID validity date defined in the company settings), you will receive a webhook with the type **screening.document.expiring**.

**Example webhook:**

```js title="Example webhook"
{
    "type": "screening.document.expiring",
    "data": {
        "screeningToken":"bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"
    }
}
```
Read about webhook headers [here](https://developer.globalpass.ch/api-integration-guide/kyc-screenings/retrieving-screening-data#webhook-headers).

The screening status will not change. However, after this point, you can prompt the user to go through the screening process again using GlobalPass widget, providing the same screening token as initially used.

When an identity document of a verified user expires, you will receive a webhook with type **screening.change**.

```js title="Example response after getting screening status"
{
    "status": "Rejected",
    "rejectReason": "DocumentExpired",
    "comments": ["The identity document provided cannot be accepted for identity verification as it has already expired. Please provide a different identity document that is valid."]
}
```

These webhooks will be sent daily at GMT+00 00:00.
