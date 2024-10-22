---
hide_table_of_contents: true
---

# Changelog

Welcome to the Changelog to the GlobalPass **iOS SDK**. Below you can find the list of latest releases with release notes.

### Version 2.4

> Released on 2024-10-21

- Updated facial liveness module

:::info Important
Please make sure the latest FaceTecSDK dependency pod version 0.0.6 is installed while updating GlobalPass SDK.
:::

### Version 2.3

> Released on 2024-08-16

- Updated the certificate to resolve a certificate-related issue some developers were experiencing.

### Version 2.2

> Released on 2024-07-24

New features:
- Instant Resubmission flow without leaving the Widget after screening is completed unsuccessfully
- Validation whether address is a PO Box

New fields:
- State field in address details
- SSN submission with personal details

Updates:
- Facial liveness module update

### Version 2.1

> Released on 2024-05-06

- Added `GPEvents` enumeration to observe SDK flow events, including:
    - flow is started
    - flow is canceled
    - flow is completed
- Added error screen for handling instant biometrics session expiry
- Bug fixes

### Version 2.0

> Released on 2024-02-05

Design changes:
- Fully redesigned appearance of the SDK.
- Added support for full design customization, configured via the Portal.
- Added support for dark mode.
- Introduced `GPFontConfiguration` to provide custom fonts in the SDK. Regular and semibold fonts are currently supported.

New features & updates:
- Added POA document type selector, configured via the Portal.
- Added option to upload ID photo from device, configured via the Portal.
- Added Postal Code validation, if enabled in the Portal. Currently available for 30+ European countries.
- Upgraded face liveness version.

Developer notes:
- Added required lottie dependency to run animations.
- Added callback methods to start the SDK, allowing it to run with custom color settings set in the background.
- Added privacy manifest and code signing in accordance with Apple's privacy policy.

### Version 1.12

> Released on 2023-11-14

- Added support for 4 new locales: `es-MX`, `pt-BR`, `it` and `ar`.

### Version 1.11

> Released on 2023-10-16

- Added support for Additional Address Validation setting. If enabled, user is only allowed to enter latin letters when providing address information.
