---
hide_table_of_contents: true
---

# Native

:::note
Latest GlobalPass iOS SDK version: **1.11**
:::

## 1. CocoaPods installation step-by-step

### a. Edit Podfile

Add plugin to the beginning of Podfile:

```ruby
plugin 'cocoapods-azure-universal-packages', {
  :organization => 'https://dev.azure.com/isun-ag'
}
```

Provide `source` urls:

```ruby
source 'https://cdn.cocoapods.org'
source 'https://dev.azure.com/isun-ag/GlobalPassApp-Public/_git/GlobalPassApp-sdk-ios-private-specs'
```

and required dependencies:

```ruby
pod 'GlobalPass', '~> 1.11'
pod 'FaceTecSDK', :http => 'https://dev.azure.com/isun-ag/368936e7-5cb5-4092-96c5-fe9942e2c3e1/_apis/packaging/feeds/FaceTecSDK/upack/packages/facetecsdk/versions/0.0.2'
```

### b. Install Cocoa Pods in Terminal

Run the following commands:

```bash
$ brew update && brew install azure-cli
```

```bash
$ az devops login
```

:::info
When asked for credentials, put the **repository access token** you were provided by GlobalPass.
:::

```bash
$ gem install cocoapods-azure-universal-packages
```

```bash
$ pod install
```

## 2. Project setup

### Paste the following lines to `Info.plist`

```xml title="Info.plist"
<key>NFCReaderUsageDescription</key>
<string>Provide you description here</string>
<key>NSCameraUsageDescription</key>
<string>Provide you description here</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Provide you description here</string>
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
<string>A0000002471001</string>
<string>A0000002472001</string>
<string>00000000000000</string>
</array>
```

:::caution important
Please change the descriptions under `NFCReaderUsageDescription`, `NSCameraUsageDescription` and `NSLocationWhenInUseUsageDescription` in the file above. This is important to pass **App Store** review process for your application.
:::

## 3. Usage

### Regular flow

```swift
do {
    callback = try GlobalPassSDK.setupScreening(environment: environment, screeningToken: screeningToken)
} catch {
    print(error)
}
DispatchQueue.main.async {
    guard let viewController = GlobalPassSDK.startScreening(externalID: nil) else {
        return
    }
    viewController.modalPresentationStyle = .overFullScreen
    self.present(viewController, animated: true, completion: nil)
}
```

Call to this method (`setupScreening(environment:screeningToken:)`) returns a closure. You should call it in order to make SDK know that you have finished a KYC flow. Pass to `externalID` a string to associate it with the KYC session record or `nil` to leave it empty.

```swift
try GlobalPassSDK.setupScreening(
    environment: environment,
    screeningToken: screeningToken
)
```

Call to this method (`startScreening(completion:)`) returns an instance of `UIViewController`. Completion you pass here is called when SDK finishes the KYC flow.

```swift
GlobalPassSDK.startScreening(externalID: "some external id")
```

You should present this controller over the `rootViewController`.

And that’s it. After the KYC flow is passed SDK returns control to React Native part by dismissing its view controller and calling the callback you passed earlier.

### Split flow

To start split screening instead of a regular one should call `startSplitScreening` method passing there a type of a split process (`identity` or `address`). The rest of the steps are the same as in the case of the regular screening flow.

```swift
do {
    callback = try GlobalPassSDK.setupScreening(environment: environment, screeningToken: screeningToken)
} catch {
    print(error)
}
DispatchQueue.main.async {
    guard let viewController = GlobalPassSDK.startSplitScreening(type: .address, externalID: nil) else {
        return
    }
    viewController.modalPresentationStyle = .overFullScreen
    self.present(viewController, animated: true, completion: nil)
}
```

### Instant Biometrics flow

```swift
do {
    callback = try GlobalPassSDK.setupInstant(environment: environment, instantBiometricsId: instantBiometricsId)
} catch {
    print(error)
}
DispatchQueue.main.async {
    guard let viewController = GlobalPassSDK.startInstant() else {
        return
    }
    viewController.modalPresentationStyle = .overFullScreen
    self.present(viewController, animated: true, completion: nil)
}
```

Call to this method (`setupInstant(environment:instantBiometricsId:)`) returns a closure. You should call it in order to make SDK know that you have finished a KYC flow.

```swift
try GlobalPassSDK.setupInstant(
    environment: environment,
    instantBiometricsId: instantBiometricsId
)
```

Call to this method (`startInstant(completion:)`) returns an instance of `UIViewController`. Completion you pass here is called when SDK finishes the KYC flow.

```swift
GlobalPassSDK.startInstant(completion: { _, _ in callback?() })
```

You should present this controller over the `rootViewController`.

And that’s it. After the KYC flow is passed SDK dismisses its view controller and calls the callback you passed earlier.

## 4. Localisation

To specify the required SDK display language, provide the `localeIdentifier` parameter with a string value containing the locale identifier in the function call:

```swift
do {
    callback = try GlobalPassSDK.setupScreening(environment: environment, screeningToken: screeningToken, localeIdentifier: "en")
} catch {
    print(error)
}
DispatchQueue.main.async {
    guard let viewController = GlobalPassSDK.startSplitScreening(type: .address, externalID: nil) else {
        return
    }
    viewController.modalPresentationStyle = .overFullScreen
    self.present(viewController, animated: true, completion: nil)
}
```
Available locales:
- English (`en`)
- German (`de`)
- Russian (`ru`)
- Chinese Simplified (`zh-CN`)
- Lithuanian (`lt`)

:::note
If an unsupported locale will be provided, the SDK will fallback to English.
:::

`localeIdentifier` parameter is defined for static builders. Use the method without this parameter to use the default English localisation.

```swift
GlobalPassSDK.setupScreening(environment:screeningToken:) // Default English
GlobalPassSDK.setupScreening(environment:screeningToken:localeIdentifier:) // Provided Localisation
GlobalPassSDK.setupInstant(environment:instantBiometricsId:) // Default English
GlobalPassSDK.setupInstant(environment:instantBiometricsId:localeIdentifier:) // Provided Localisation
```