---
sidebar_position: 1
---

# Initiating a KYC Screening

#### Swagger docs

[https://screenings-api-test.globalpass.ch/swagger](https://screenings-api-test.globalpass.ch/swagger)

#### Screening API endpoints

- [https://screenings-api-test.globalpass.ch](https://screenings-api-test.globalpass.ch/) (_sandbox_)
- [https://screenings-api.globalpass.ch](https://screenings-api.globalpass.ch/) (_production_)

#### Retrieving screening token

To initiate a user screening, first create a **screening token** by making an HTTP POST request to:

_/api/v2/screenings_

```bash title="Request"
curl --location --request POST 'https://screenings-api-test.globalpass.ch/api/v2/screenings' --header 'Authorization: Bearer {your_access_token}'
```

```js title="Response"
{"token": "bf42e9f1-9af8-4a6b-a1fd-9440f1fe9bfd"}
```

:::caution IMPORTANT
For each unique user account in your system, you should issue and keep only **one screening token** - treat it as each user's **unique GlobalPass Screening ID**. Therefore, when propmpting user to repeat a widget session, or when initializing identity and address screening modes of the same unique user, make sure to provide the same unique screening token issued for the unique user.
:::

#### Initiating GlobalPass Widget

After getting the screening token, provide it to our javascript widget that you have pasted into your frontend.

##### Widget source URLs:

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
        language: "en"
      });
    </script>
  </body>
</html>
```

#### Widget initialization properties

| Property    | Description                                                                                           |
| :---------- | :---------------------------------------------------------------------------------------------------- |
| elementId   | HTML DOM element that the widget will attach to                                                       |
| token       | screening token, retrieved as per instructions above                                                  |
| redirectUri | your custom widget redirect URI (optional)                                                            |
| externalId  | customer ID of the unique user from your system that will reflect on the GlobalPass report (optional) |
| mode        | **Identity** (identity documents, biometrics, AML) or **Address** (proof of address, geolocation) **(required in Split Flow only)**    |
| language    | pre-selected language code (optional)                                                                 |

:::note
Specifying mode is required if you wish to use _Split Flow_ approach. If _Regular Flow_ is used – do not specify mode. Before starting integration, contact GlobalPass support to find out more about the differences and inform which approach you wish to use, as appropriate set-up on GlobalPass end will be required as well.
:::

##### Specifying required language

By default, widget is displayed in browser's language, if it is supported. If browser's language is not supported, widget is displayed in English. If required, you can pre-select a specific locale for the widget instead, by specifying one of the supported language codes below.

- `en` - English
- `de` - German
- `es-MX` - Spanish
- `it` - Italian
- `lt` - Lithuanian
- `pt-BR` - Portuguese
- `ru` - Russian
- `ar` - Arabic
- `zh-CN` - Chinese Simplified
