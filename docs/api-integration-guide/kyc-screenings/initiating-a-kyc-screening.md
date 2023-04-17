---
sidebar_position: 1
---

# Initiating a KYC Screening

Swagger docs:

[https://screenings-api-test.globalpass.ch/swagger](https://screenings-api-test.globalpass.ch/swagger)

Screening API endpoints:

- [https://screenings-api-test.globalpass.ch](https://screenings-api-test.globalpass.ch/) (_sandbox_)
- [https://screenings-api.globalpass.ch](https://screenings-api.globalpass.ch/) (_production_)

To initiate a user screening, first create a screening token by making an HTTP POST request to:

_/api/v2/screenings_

```bash title="Request"
curl --location --request POST 'https://screenings-api-test.globalpass.ch/api/v2/screenings' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Response"
{"token": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"}
```

After getting the token, provide it to our javascript widget that you have pasted into your frontend.

Widget source URLs:

- [https://cdn.globalpass.ch/stage/global-pass-screening-widget.latest.js](https://cdn.globalpass.ch/stage/global-pass-screening-widget.latest.js) (_sandbox_)
- [https://cdn.globalpass.ch/live/global-pass-screening-widget.latest.js](https://cdn.globalpass.ch/live/global-pass-screening-widget.latest.js) (_production_)

Your page should look something like this:

```html
<html>
  <head>
    <script src="https://cdn.globalpass.ch/stage/global-pass-screening-widget.latest.js"></script>
  </head>
  <body>
    <div id="widgetScreening"></div>
    <script>
      GPScreeningWidget.init({
        elementId: "widgetScreening",
        token: "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd",
        redirectUri: "https://your-redirect-uri.com/",
        externalId: "your-customer-ID",
        mode: "Identity",
      });
    </script>
  </body>
</html>
```

**Initialization properties:**

| Property    | Description                                                                                           |
| :---------- | :---------------------------------------------------------------------------------------------------- |
| elementId   | HTML DOM element that the widget will attach to                                                       |
| token       | screening token, retrieved as per instructions above                                                  |
| redirectUri | your custom widget redirect URI (optional)                                                            |
| externalId  | customer ID of the unique user from your system that will reflect on the GlobalPass report (optional) |
| mode        | **Identity** (identity documents, biometrics, AML) or **Address** (proof of address, geolocation)     |

:::note
Specifying mode is required if you wish to use _Split Flow_ approach. If _Regular Flow_ is used – do not specify mode. Before starting integration, contact GlobalPass support to find out more about the differences and inform which approach you wish to use, as appropriate set-up on GlobalPass end will be required as well.
:::

:::caution IMPORTANT
Provide the same screening token when initializing both identity and address screenings of the same unique user. This will ensure the two sections, once both completed, will combine on the final screening report.
:::
