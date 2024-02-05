---
hide_table_of_contents: true
---

# Changelog

Welcome to the Changelog to the GlobalPass **Android SDK**. Below you can find the list of latest releases with release notes.

### Version 2.0

> Released on 2024-02-05

Design changes:
- Fully redesigned appearance of the SDK.
- Added support for full design customization, configured via the Portal.
- Added support for dark mode.
- Implemented font customization using the additional optional parameter `typefaceMap` in `GlobalPass.start()` method.

New features & updates:
- Added POA document type selector, configured via the Portal.
- Added option to upload ID photo from device, configured via the Portal.
- Added Postal Code validation, if enabled in the Portal. Currently available for 30+ European countries.
- Upgraded face liveness version.

### Version 1.2.19

> Released on 2023-12-28

- Fixed issue with application crash for some users after liveness verification process.

### Version 1.2.18

> Released on 2023-11-14

- Added support for 4 new locales: `es-MX`, `pt-BR`, `it` and `ar`.

### Version 1.2.17

> Released on 2023-10-16

- Added support for Additional Address Validation setting. If enabled, user is only allowed to enter latin letters when providing address information.
