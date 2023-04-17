---
sidebar_position: 9
---

# Instant Biometrics

Widget source URLs:

- [https://cdn.globalpass.ch/stage/global-pass-screening-widget.latest.js](https://cdn.globalpass.ch/stage/global-pass-screening-widget.latest.js) (_sandbox_)
- [https://cdn.globalpass.ch/live/global-pass-screening-widget.latest.js](https://cdn.globalpass.ch/live/global-pass-screening-widget.latest.js) (_production_)

All backend API calls should be executed sending _access_token_ in requests header received in the [Authentication](#_Authentication)step.

To **initiate** instant biometrics process, make an HTTP POST request to:

_/api/v2/instant-biometrics_

- Instant biometrics are allowed only for already Accepted or Rejected ConditionsNotMet KYC screenings
- It's possible to provide instant biometrics check timeout in minutes before it expires in GlobalPass in case user abandons the process

To **fetch** instant biometric details, make an HTTP GET request to:

_/api/v2/instant-biometrics/{instantBiometricsId}_

To **cancel** initiated instant biometric process, make an HTTP POST request to:

_/api/v2/instant-biometrics/{instantBiometricsId}/cancel_

> Possible **status** values:

- Initiated - Process initiated. Waiting for user actions,
- Cancelled - Process was cancelled over API by 3rd party system,
- Expired - User did not go through the process and after timeout screening was set as expired,
- Processing - User went through the process. GlobalPass is executing biometric match,
- Accepted - Biometrics verification ended successfully,
- Rejected - Biometrics verification ended not successfully

**Frontend**

The preferred method for user instant biometric check using GlobalPass widget:

- Add an HTML div element with your preferred HTML element id.
- Load the provided js file before calling the widget's init function.

Example:

```js
GPScreeningWidget.init({
  elementId: "widget_div_id",
  instantBiometricsId: "screening_token",
  onComplete: () => {
    alert("done");
  },
  mode: "InstantBiometrics",
});
```

This will load and render a working GlobalPass instant biometric check web widget that will be sending collected data directly to the GlobalPass back-end.

A callback function can be passed to execute javascript upon widget completion.
